import { LoggerPort, CommandRepositoryPort } from '@articles/shared';
import { UserRegisterCommand, UserRegisterResult, UserRegisterResultFactory, UserRegisterError } from '../../contracts';
import { UserRepositoryPort } from '../ports';
import { UserRegisterMessages } from '../messages';
import { UserCheckUniqueEmail } from './user-check-unique-email';
import { UserFactory } from '../../domain';

export class UserRegisterUseCase {
  constructor(
    private readonly logger: LoggerPort,
    private readonly commandRepository: CommandRepositoryPort,
    private readonly userRepository: UserRepositoryPort,
    private readonly checkEmail: UserCheckUniqueEmail,
  ) {}

  public async execute({ commandId, correlationId, userId, email }: UserRegisterCommand): Promise<UserRegisterResult> {
    this.logger.info(UserRegisterMessages.USER_EXECUTE_START, { correlationId, commandId, userId });

    if (await this.commandRepository.isProcessed(commandId)) {
      this.logger.warn(UserRegisterMessages.COMMAND_ALREADY_PROCESSED, { correlationId, commandId, userId });
      return UserRegisterResultFactory.failed(UserRegisterError.COMMAND_ALREADY_PROCESSED);
    }

    if (!(await this.checkEmail.execute(email))) {
      this.logger.warn(UserRegisterMessages.EMAIL_ALREADY_USED, { correlationId, commandId, userId });
      await this.commandRepository.completeProcessed(commandId);
      return UserRegisterResultFactory.failed(UserRegisterError.EMAIL_ALREADY_EXISTS);
    }

    const tempUser = UserFactory.createNew({ userId, email });

    await this.userRepository.save(tempUser);
    await this.commandRepository.completeProcessed(commandId);

    this.logger.info(UserRegisterMessages.USER_CREATED, { correlationId, commandId, userId });

    return UserRegisterResultFactory.success(userId);
  }
}
