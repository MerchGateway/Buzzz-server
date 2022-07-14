import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { nanoid } from 'nanoid';
import { Observable, tap } from 'rxjs';
import { WinstonLoggerService } from './logger/winston-logger/winston-logger.service';

@Injectable()
export class RequestLoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: WinstonLoggerService) {
    this.logger.setContext(RequestLoggingInterceptor.name);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType() === 'http') {
      // do something that is only important in the context of regular HTTP requests (REST)
      const req = context.switchToHttp().getRequest();
      return this.handleHTTPRequest(req, next);
    } else if (context.getType() === 'rpc') {
      // do something that is only important in the context of Microservice requests
    }
  }

  handleHTTPRequest(req: any, next: CallHandler): Observable<any> {
    const now = Date.now();

    const { method, url, body, ip, query } = req;

    const requestHash = nanoid();

    this.logger.log(`HTTP request ${requestHash}`, {
      method,
      url,
      body,
      ip,
      query,
    });
    return next
      .handle()
      .pipe(
        tap(() =>
          this.logger.log(
            `HTTP response ${requestHash} +${Date.now() - now}ms`,
            req.response,
          ),
        ),
      );
  }
}
