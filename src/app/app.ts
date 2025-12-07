import { Component, inject, signal } from '@angular/core';
import { Calculator } from './Essentials/DependencyInjection/calculator';
import { FormsDemoComponent } from "./Forms/forms-demo.component";

@Component({
  selector: 'app-root',
  imports: [ FormsDemoComponent],
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
