export interface CommandRepositoryPort {
  isProcessed: (commandId: string) => Promise<boolean>;
  completeProcessed: (commandId: string) => Promise<void>;
}
