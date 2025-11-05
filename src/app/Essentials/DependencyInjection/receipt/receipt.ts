import { Component, inject, signal } from '@angular/core';
import { Calculator } from '../calculator';

@Component({
  selector: 'app-receipt',
  imports: [],
  templateUrl: './receipt.html',
  styleUrl: './receipt.css',
})
export class Receipt {
private calculator = inject(Calculator);
totalCost = signal( this.calculator.add(100, 100));
}
