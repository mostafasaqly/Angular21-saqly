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
import { FakeUserService, User } from './Routing/fake-user.service';
import { AppStartComponent } from './Routing/appStart';
import { LinkedSignal } from './Signals/linked-signal/linked-signal';
import { AnatomyComponent } from './Components/AnatomyOfComponents/anatomyOfComponent';
import { NgOnChangesParent } from './Components/LifeCycle/ng-on-changes-parent/ng-on-changes-parent';
import { BaseComponent } from './Templates/base';
import { DirectivesDemo } from './Directives Part/Components/directives-demo';
import { CustomPipeDemo } from './CustomPipe/Components/custom-pipe-demo';
import { FormsDemoComponent } from './Forms/forms-demo.component';
import { AppHttpComponent } from './HttpClinet/apphttp.component';
import { AppLogComponent } from './Dependency injection/logComponent';
import { PerformanceHomeComponent } from './Server-side & hybrid rendering/perf-home.component';
import { RxjsStartComponent } from './RxJs/rxjs-start.component';
import { RxjsStartWithAngularComponent } from './RxJsWithAngular/rxjs-start.component';



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
  // Home – Learning Path landing page
  {
    path: '',
    component: AppStartComponent,
    title: 'Angular 21 – Saqly Learning Path',
  },

  // Signals
  {
    path: 'signals/linked',
    component: LinkedSignal,
    title: 'Signals – Linked Signal Demo',
  },

  // Components
  {
    path: 'components/anatomy',
    component: AnatomyComponent,
    title: 'Components – Anatomy',
  },

  // Lifecycle (OnChanges)
  {
    path: 'lifecycle/ng-on-changes',
    component: NgOnChangesParent,
    title: 'Lifecycle – OnChanges Demo',
  },

  // Templates
  {
    path: 'templates/base',
    component: BaseComponent,
    title: 'Templates – Base Demo',
  },

  // Directives
  {
    path: 'directives/demo',
    component: DirectivesDemo,
    title: 'Directives – Demo',
  },

  // Pipes
  {
    path: 'pipes/custom',
    component: CustomPipeDemo,
    title: 'Pipes – Custom Pipe Demo',
  },

  // Forms
  {
    path: 'forms/demo',
    component: FormsDemoComponent,
    title: 'Forms – Demo',
  },

  // HTTP Client
  {
    path: 'http-client',
    component: AppHttpComponent,
    title: 'HTTP Client – Demo',
  },

  // Logging / Router events or console logs playground
  {
    path: 'logging',
    component: AppLogComponent,
    title: 'Logging – Demo',
  },


  { path: 'Performance', component: PerformanceHomeComponent, title: 'Performance Demo' },

  // lazy page
  {
    path: 'perf/list',
    loadComponent: () =>
      import('../app/Server-side & hybrid rendering/perf-list.component').then(m => m.PerfListComponent),
    title: 'Perf – List',
  },

  // another lazy page
  {
    path: 'perf/hydration',
    loadComponent: () =>
      import('../app/Server-side & hybrid rendering/perf-hydration.component').then(m => m.PerfHydrationComponent),
    title: 'Perf – Hydration',
  },

  {
  path: 'rxjs',
  component: RxjsStartComponent,
  title: 'RxJS – Demo',
},
{
  path: 'rxjsWithAngular',
  component: RxjsStartWithAngularComponent,
  title: 'RxJS – With Angular Demo',
},


  // Fallback
  {
    path: '**',
    redirectTo: '',
  },
];
