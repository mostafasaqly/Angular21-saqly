/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { LOCALE_ID } from '@angular/core';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .then((appRef) => {
    const locale = appRef.injector.get(LOCALE_ID); // e.g. 'en-US' or 'ar'
    document.documentElement.lang = locale;
    document.documentElement.dir = locale.startsWith('ar') ? 'rtl' : 'ltr';
  })
  .catch(console.error);
