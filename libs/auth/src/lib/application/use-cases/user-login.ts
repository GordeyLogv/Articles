import { UserRepositoryPort, PasswordServicePort } from '../ports';
import { UserLoginMessages } from '../messages';
import { UserLoginCommand, UserLoginError, UserLoginResult, UserLoginResultFactory } from '../../contracts';
import { LoggerPort, CommandRepositoryPort } from '@articles/shared';
export class UserLoginUseCase {
  constructor(
    private readonly logger: LoggerPort,
    private readonly userRepository: UserRepositoryPort,
    private readonly commandRepository: CommandRepositoryPort,
    private readonly passwordService: PasswordServicePort,
  ) {}

  public async execute({ correlationId, commandId, email, passwordRaw }: UserLoginCommand): Promise<UserLoginResult> {
    this.logger.info(UserLoginMessages.LOGIN_START, { correlationId, commandId });

    if (await this.commandRepository.isProcessed(commandId)) {
      this.logger.warn(UserLoginMessages.COMMAND_ALREADY_PROCESSED, { correlationId, commandId });
      return UserLoginResultFactory.failed(UserLoginError.COMMAND_ALREADY_PROCESSED);
    }

    const existedUser = await this.userRepository.getUserAuthData(email);
    if (!existedUser) {
      this.logger.warn(UserLoginMessages.EMAIL_NOT_FOUND, { correlationId, commandId });
      return UserLoginResultFactory.failed(UserLoginError.EMAIL_NOT_FOUND);
    }

    if (!(await this.passwordService.compare(existedUser.passwordHash, passwordRaw))) {
      this.logger.warn(UserLoginMessages.INVALID_PASSWORD, { correlationId, commandId, userId: existedUser.userId });
      return UserLoginResultFactory.failed(UserLoginError.INVALID_EMAIL_OR_PASSWORD);
    }

    this.logger.info(UserLoginMessages.LOGIN_SUCCESS, { correlationId, commandId, userId: existedUser.userId });
    return UserLoginResultFactory.success(existedUser.userId);
  }
}
