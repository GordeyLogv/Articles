import { UserRegisterCommand, UserRegisteResult, UserRegisterResultFactory, UserRegisterError } from '../../contracts';
import { UserRepositoryPort, LoggerPort, CommandRepositoryPort, CorrelationContextPort } from '../ports';
import { UserRegisterMessages } from '../messages';
import { UserCheckUniqueEmail } from './user-check-unique-email';
import { UserFactory } from '../../domain';

export class UserRegisterUseCase {
  constructor(
    private readonly logger: LoggerPort,
    private readonly commandReposirory: CommandRepositoryPort,
    private readonly correlationContext: CorrelationContextPort,
    private readonly userRepository: UserRepositoryPort,
    private readonly сheckEmail: UserCheckUniqueEmail,
  ) {}

  public async execute(command: UserRegisterCommand): Promise<UserRegisteResult> {
    const correlationId = this.correlationContext.getCorrelationId();

    const { commandId, email, userId } = command;

    const isProcessed = await this.commandReposirory.isProcessed(command.commandId);
    if (isProcessed) {
      this.logger.info(UserRegisterMessages.COMMAND_ALREADY_PROCESSED, { correlationId, commandId });
      return UserRegisterResultFactory.failed(UserRegisterError.COMMAND_ALREADY_PROCESSED);
    }

    const isUniqueEmail = await this.сheckEmail.execute(email);
    if (!isUniqueEmail) {
      this.logger.info(UserRegisterMessages.EMAIL_ALREADY_USED, {
        correlationId,
        commandId,
        email,
      });
      await this.commandReposirory.completeProcessed(commandId);
      return UserRegisterResultFactory.failed(UserRegisterError.EMAIL_ALREADY_EXISTS);
    }

    const tempUser = UserFactory.createNew({
      userId,
      email,
      firstName: undefined,
      lastName: undefined,
      birthDay: undefined,
    });

    await this.userRepository.save(tempUser);
    await this.commandReposirory.completeProcessed(commandId);

    this.logger.info(UserRegisterMessages.USER_CREATED, {
      correlationId,
      commandId,
      userId,
    });

    return UserRegisterResultFactory.success(userId);
  }
}
