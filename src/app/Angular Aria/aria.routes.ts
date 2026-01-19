import { Routes } from '@angular/router';

export const ARIA_ROUTES: Routes = [
  {
    path: 'aria',
    loadComponent: () =>
      import('./aria-page.component').then((m) => m.AriaPageComponent),
  },
];
