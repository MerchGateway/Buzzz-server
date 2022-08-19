import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  BadGatewayException,
  CallHandler,
  BadRequestException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AxiosError } from 'axios';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        if (err.message === 'getaddrinfo ENOTFOUND api.paystack.co') {
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
        } else if (err instanceof BadRequestException) {
          return throwError(() => new BadRequestException(err));
        }
        return throwError(() => new BadGatewayException(err?.message || err));
      }),
    );
  }
}
