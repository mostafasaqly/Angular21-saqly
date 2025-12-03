// app/app.routes.ts
import {
  Routes,
  UrlMatcher,
  UrlSegment,
  UrlMatchResult,
  CanDeactivateFn,
  ResolveFn,
} from '@angular/router';
import { inject } from '@angular/core';
import { HomeComponent } from './Routing/home';
import { UserDetailsComponent } from './Routing/usersDetails';
import { AdminLayoutComponent } from './Routing/admin-layout';
import { NotFoundComponent } from './Routing/notfound';
import { ErrorPageComponent } from './Routing/error-page';
import { CustomMatchProfileComponent } from './Routing/custom-match-profile';
import { PopupHelpComponent } from './Routing/popup-help';
import { AdminSettingsComponent } from './Routing/adminSettings';
import { AdminDashboardComponent } from './Routing/adminDashboard';
import { RouteStateDemoComponent } from './Routing/route-state-demo';
import { ProductsComponent } from './Routing/products';
import { FakeUserService, User } from './Routing/fake-user.service';
import { authGuard } from './Routing/auth.guard';



/** --------- GUARDS ---------- **/



export const pendingChangesGuard: CanDeactivateFn<unknown> = component => {
  if (typeof (component as any).canLeave === 'function') {
    return (component as any).canLeave() ||
      confirm('You have unsaved changes. Leave?');
  }
  return true;
};


/** --------- RESOLVER ---------- **/
export const userResolver: ResolveFn<User> = route => {
  const userService = inject(FakeUserService);
  const id = route.paramMap.get('id') ?? '1';
  return userService.getUser(id);
};

/** --------- CUSTOM MATCHER ---------- **/
// matches URLs like /@Mostafa or /@AngularDev
const twitterHandleMatcher: UrlMatcher = (
  url: UrlSegment[],
): UrlMatchResult | null => {
  if (url.length === 1 && /^@[\w]+$/.test(url[0].path)) {
    return {
      consumed: url,
      posParams: {
        username: new UrlSegment(url[0].path.slice(1), {}),
      },
    };
  }
  return null;
};

export const routes: Routes = [
  // Overview / Home
  {
    path: '',
    component: HomeComponent,
    title: 'Routing Demo Home',
  },

  // Redirecting routes
  {
    path: 'old-home',
    redirectTo: '',
    pathMatch: 'full',
  },

  // Navigation + Route params + Resolver
  {
    path: 'products',
    component: ProductsComponent,
    title: 'Navigate & Params Demo',
  },
  {
    path: 'users/:id',
    component: UserDetailsComponent,
    resolve: { user: userResolver },
    title: 'User details (resolver)',
    data: { requiresAuth: true },
    canActivate: [authGuard],
  },

  // Read route state / query params / fragment
  {
    path: 'route-state',
    component: RouteStateDemoComponent,
    title: 'Route state demo',
  },

  // Child routes (outlets)
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canDeactivate: [pendingChangesGuard],
    children: [
      {
        path: 'dashboard',
        component: AdminDashboardComponent,
        title: 'Admin dashboard',
      },
      {
        path: 'settings',
        component: AdminSettingsComponent,
        title: 'Admin settings',
      },
    ],
  },

  // Named outlet – popup help
  {
    path: 'help',
    outlet: 'popup',
    component: PopupHelpComponent,
  },

  // Custom route match – /@username
  {
    matcher: twitterHandleMatcher,
    component: CustomMatchProfileComponent,
    title: 'Custom matcher profile',
  },

  // Error page (for navigation error handler)
  {
    path: 'error',
    component: ErrorPageComponent,
    title: 'Navigation error',
  },

  // Wildcard 404
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Not found',
  },
];
