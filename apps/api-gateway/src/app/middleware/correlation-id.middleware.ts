import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { NextFunction, Request, Response } from 'express';
import { CorrelationContext } from '@articles/shared';

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  public use(req: Request, res: Response, next: NextFunction): void {
    const correlationId = req.headers['x-correlation-id']?.toString() || randomUUID();

    CorrelationContext.run({ correlationId }, () => next());
  }
}
