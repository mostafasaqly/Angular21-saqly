import { Routes } from '@angular/router';

export const LOCALIZATION_ROUTES: Routes = [
  {
    path: 'localization',
    loadComponent: () =>
      import('./app-localization.component').then((m) => m.AppLocalizationComponent),
  },

  {
    path: 'runtime-localization',
    loadComponent: () =>
      import('./RunTimeLocalization/app-runtime-localization.component').then((m) => m.AppRunTimeLocalizationComponent),
  },

];
