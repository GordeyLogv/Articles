import { CorrelationContextPort } from './correlation-context.port';
import { AsyncLocalStorage } from 'node:async_hooks';

interface ContextData {
  correlationId: string;
}

export class CorrelationContext implements CorrelationContextPort {
  private static als = new AsyncLocalStorage<ContextData>();

  static run(context: ContextData, fn: (...args: unknown[]) => void) {
    CorrelationContext.als.run(context, fn);
  }

  public getCorrelationId(): string | undefined {
    return CorrelationContext.als.getStore()?.correlationId;
  }
}
