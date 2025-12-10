import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const cloned = req.clone({
    setHeaders: {
      'X-Demo-Interceptor': 'HttpDemo'
    },
  });

  console.log('[HTTP] Request', cloned.method, cloned.urlWithParams);

  const started = performance.now();

  return next(cloned).pipe(tap({
    next: event => {
      // HttpResponse events will be logged automatically
    },
    error: err => {
      const elapsed = performance.now() - started;
      console.error(`[HTTP] Error after ${elapsed.toFixed(0)} ms`, err);
    },
    complete: () => {
      const elapsed = performance.now() - started;
      console.log(`[HTTP] Completed in ${elapsed.toFixed(0)} ms`);
    },
  }));
};
