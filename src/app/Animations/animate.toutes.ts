import { Routes } from '@angular/router';
import { EnterLeaveDemoComponent } from './enter-leave-demo.component';
import { CssComplexDemoComponent } from './css-complex-demo.component';
import { RouteTransitionsDemoComponent } from './route-transitions-demo.component';
import { AppStartAnimationComponent } from './app-start-animation.component';

export const ANIMATION_ROUTES: Routes = [
  {
    path: 'start-animation',
    component: AppStartAnimationComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'enter-leave' },
      { path: 'enter-leave', component: EnterLeaveDemoComponent },
      { path: 'css-complex', component: CssComplexDemoComponent },
      { path: 'route-transitions', component: RouteTransitionsDemoComponent },
    ],
  },
];
