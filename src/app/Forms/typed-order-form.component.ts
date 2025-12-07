import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { JsonPipe } from '@angular/common';

interface OrderFormModel {
  product: FormControl<string>;
  quantity: FormControl<number>;
  express: FormControl<boolean>;
}

@Component({
  selector: 'typed-order-form',
  imports: [ReactiveFormsModule, JsonPipe],
  template: `
    <h2>Strictly typed reactive form – Order</h2>

    <form [formGroup]="orderForm" (ngSubmit)="onSubmit()" class="form-grid">
      <label>
        Product
        <input formControlName="product" />
      </label>

      <label>
        Quantity
        <input type="number" formControlName="quantity" />
      </label>
      @if(orderForm.controls.quantity.invalid && orderForm.controls.quantity.touched){
      <div class="error">
        Quantity must be at least 1
      </div>
      }

      <label class="inline">
        <input type="checkbox" formControlName="express" />
        Express delivery
      </label>

      <button type="submit" [disabled]="orderForm.invalid">
        Place order
      </button>
    </form>

    <pre>Typed value: {{ orderForm.value | json }}</pre>
  `,
  styles: [
    `
      .form-grid {
        display: grid;
        gap: 0.75rem;
        max-width: 420px;
      }
      .inline {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      .error {
        font-size: 0.8rem;
        color: #f44336;
      }
    `,
  ],
})
export class TypedOrderFormComponent {
  orderForm = new FormGroup<OrderFormModel>({
    product: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    quantity: new FormControl(1, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1)],
    }),
    express: new FormControl(false, { nonNullable: true }),
  });

  onSubmit() {
    if (this.orderForm.invalid) return;
    const value = this.orderForm.getRawValue(); // fully typed
    console.log('Typed reactive form submitted', value);
  }
}
