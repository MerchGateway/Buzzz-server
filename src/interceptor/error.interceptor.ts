import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
  RequestTimeoutException,
  ServiceUnavailableException,
  HttpException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AxiosError } from 'axios';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        if (
          err.message === 'getaddrinfo ENOTFOUND api.paystack.co' ||
          err.message === 'getaddrinfo EAI_AGAIN api.paystack.co'
        ) {
          return throwError(
            () =>
              new ServiceUnavailableException(
                'Error connecting to Paystack, your connection might be down',
              ),
          );
        } else if (err instanceof AxiosError) {
          return throwError(
            () => new BadRequestException(err.response?.data.message),
          );
        } else if (err.message.includes('timeout')) {
          return throwError(
            () => new RequestTimeoutException('Request timed out'),
          );
        }
        return throwError(
          () => new HttpException(err?.message || err, err.status || 500),
        );
      }),
    );
  }
}
