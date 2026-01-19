import { inject, isDevMode } from '@angular/core';
import {
  provideTransloco,
  translocoConfig,
  TranslocoLoader,
} from '@ngneat/transloco';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  private http = inject(HttpClient);

  getTranslation(lang: string) {
    return this.http.get<Record<string, any>>(
      `/i18n/${lang}.json`
    );
  }
}

export const translocoProviders = [
  provideTransloco({
    config: translocoConfig({
      availableLangs: ['en', 'ar'],
      defaultLang: 'en',
      fallbackLang: 'en',
      reRenderOnLangChange: true,
      prodMode: !isDevMode(),
    }),
    loader: TranslocoHttpLoader,
  }),
];
