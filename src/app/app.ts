import { Component, inject, signal } from '@angular/core';
import { Calculator } from './Essentials/DependencyInjection/calculator';
import { AppStartComponent } from "./Routing/appStart";

@Component({
  selector: 'app-root',
  imports: [ AppStartComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor() {
    const isLoggedIn = signal<boolean>(false);
    isLoggedIn.set(true);
  }
  private calculator = inject(Calculator);
totalCost = signal( this.calculator.subtract(200, 100));

valueToChild=signal<string>('Click Me from App Component');
}
