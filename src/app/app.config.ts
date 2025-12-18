import { ApplicationConfig, inject, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { PreloadAllModules, provideRouter, RedirectCommand, Router, withComponentInputBinding, withInMemoryScrolling, withNavigationErrorHandler, withPreloading, withRouterConfig, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { APP_CONFIG } from './Dependency injection/app-config.token';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loggingInterceptor } from './HttpClinet/logging.interceptor';
import { provideClientHydration, withEventReplay, withIncrementalHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    {
      provide: APP_CONFIG,
      useValue: {
        apiUrl: 'https://api.example.com',
        featureFlag: true,
      },
    },
    provideRouter(
      routes,
      withComponentInputBinding(), // Bind route params/data @Input
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
      withPreloading(PreloadAllModules),
      withNavigationErrorHandler(error => {
        console.error('Navigation error', error);
        // Redirect to a custom error page
        const router = inject(Router);
        return new RedirectCommand(router.parseUrl('/error'), {
          skipLocationChange: true,
        });
      }),
      withRouterConfig({
        onSameUrlNavigation: 'reload',
        urlUpdateStrategy: 'deferred',
      }),
      withViewTransitions() // Route transition animations (View Transitions API)
    ),
    provideHttpClient(
      withInterceptors([loggingInterceptor]) // intercepting requests/responses
    ),

     // ✅ Hydration
    provideClientHydration(
      withEventReplay(),          // optional: replay clicks during hydration
      withIncrementalHydration(), // ✅ Incremental Hydration
    ),
  ]
};
