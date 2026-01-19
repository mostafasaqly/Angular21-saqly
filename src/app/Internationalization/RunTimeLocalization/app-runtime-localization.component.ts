import { Component, computed } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-runtime-localization',
  imports: [CommonModule, TranslocoModule, DatePipe, CurrencyPipe],
  templateUrl: './app-runtime-localization.html',
  styleUrl: './app-runtime-localization.scss',
})
export class AppRunTimeLocalizationComponent {
  constructor(private t: TranslocoService) {}

  lang = computed(() => this.t.getActiveLang());

  itemsCount = 3;
  today = new Date();
  price = 1999.5;

  setLang(lang: 'en' | 'ar') {
    this.t.setActiveLang(lang);

    // ✅ RTL/LTR instantly
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }
}
