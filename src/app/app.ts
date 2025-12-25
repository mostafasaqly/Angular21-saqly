import { Component, inject, signal } from '@angular/core';
import { Calculator } from './Essentials/DependencyInjection/calculator';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet,RouterLinkActive ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor() {
    const isLoggedIn = signal<boolean>(false);
    isLoggedIn.set(true);
  }
  private calculator = inject(Calculator);
  totalCost = signal(this.calculator.subtract(200, 100));

  valueToChild = signal<string>('Click Me from App Component');
  navItems = [
    { label: 'Home', path: '' },

    { label: 'Signals', path: 'signals/linked' },
    { label: 'Components', path: 'components/anatomy' },
    { label: 'Lifecycle – OnChanges', path: 'lifecycle/ng-on-changes' },
    { label: 'Templates', path: 'templates/base' },
    { label: 'Directives', path: 'directives/demo' },
    { label: 'Pipes', path: 'pipes/custom' },
    { label: 'Forms', path: 'forms/demo' },
    { label: 'HTTP Client', path: 'http-client' },
    { label: 'Logging', path: 'logging' },


    // ✅ Server-side & hybrid rendering (NEW)
    { label: 'Performance', path: '/Performance' },

    { label: 'RxJS', path: 'rxjs' },
    { label: 'RxJS with Angular', path: 'rxjsWithAngular' },
  ];
}
