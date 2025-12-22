export interface CorrelationContextPort {
  getCorrelationId: () => string | undefined;
}
