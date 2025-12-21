import {
  LoggerPort,
  UserRepositoryPort,
  CommandRepositoryPort,
  CorrelationContextPort,
  PasswordServicePort,
} from '../ports';
import { UserLoginMessages } from '../messages';
import { UserLoginCommand, UserLoginError, UserLoginResult, UserLoginResultFactory } from '../../contracts';

export class UserLoginUseCase {
  constructor(
    private readonly logger: LoggerPort,
    private readonly userRepository: UserRepositoryPort,
    private readonly commandRepository: CommandRepositoryPort,
    private readonly correlationContext: CorrelationContextPort,
    private readonly passwordService: PasswordServicePort,
  ) {}

  public async execute(command: UserLoginCommand): Promise<UserLoginResult> {
    const correlationId = this.correlationContext.getCorrelationId();

    const { commandId, email, passwordRaw } = command;

    const isProcessed = await this.commandRepository.isProcessed(commandId);
    if (isProcessed) {
      this.logger.info(UserLoginMessages.COMMAND_ALREADY_PROCESSED, { correlationId, commandId });
      return UserLoginResultFactory.failed(UserLoginError.COMMAND_ALREADY_PROCESSED);
    }

    const existedUser = await this.userRepository.getUserAuthData(email);
    if (!existedUser) {
      this.logger.error(UserLoginMessages.EMAIL_NOT_FOUND, { correlationId, commandId });
      return UserLoginResultFactory.failed(UserLoginError.EMAIL_NOT_FOUND);
    }

    const isValidPassword = await this.passwordService.compare(existedUser.passwordHash, passwordRaw);
    if (!isValidPassword) {
      this.logger.error(UserLoginMessages.INVALID_PASSWORD, { correlationId, commandId });
      return UserLoginResultFactory.failed(UserLoginError.INVALID_EMAIL_OR_PASSWORD);
    }

    return UserLoginResultFactory.success(existedUser.userId);
  }
}
