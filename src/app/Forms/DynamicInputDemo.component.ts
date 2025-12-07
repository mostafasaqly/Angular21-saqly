import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';


@Component({
  selector: 'dynamic-input-form',
  imports: [ReactiveFormsModule, JsonPipe],
  template: `
    <h2>Dynamic Input – Survey</h2>

    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="form-grid">
  <div formArrayName="items">
    @for (item of items.controls; let i = $index; track item) {
      <div class="item-row">
        <input
          type="text"
          [formControlName]="i"
          placeholder="Enter Value"
        />

        <button
          type="button"
          class="btn btn-danger"
          (click)="removeItem(i)"
        >
          -
        </button>

        @if (item.invalid && item.touched) {
          <div class="error">
            This field is required
          </div>
        }
      </div>
    }
  </div>

  <button
    type="button"
    class="btn btn-primary"
    (click)="addItem()"
  >
    +
  </button>

  <button type="submit" [disabled]="form.invalid">
    Submit survey
  </button>
</form>


    <pre>Value: {{ form.value | json }}</pre>
  `,
  styles: [
    `
      .form-grid {
        display: grid;
        gap: 0.75rem;
        max-width: 480px;
      }
      .item-row {
        display: flex;
        gap: 10px;
        margin-bottom: 10px;
      }

      .error {
        color: red;
        font-size: 0.8rem;
      }

    `,
  ],
})
export class DynamicInputFormComponent {
  form:FormGroup
  constructor(private fb:FormBuilder) {
    this.form = this.fb.group({
      //test:this.fb.array([]),
      items: this.fb.array([
        this.createItem()
      ])
    });
  }

  get items():FormArray
  {
    return this.form.get('items') as FormArray;
  }
  createItem():FormControl
  {
    return this.fb.control('', Validators.required);
  }
  addItem()
  {
    this.items.push(this.createItem());
  }
  removeItem(index:number)
  {
    this.items.removeAt(index);
  }

  onSubmit() {
    if (this.form.invalid) return;
    console.log('Dynamic form submitted', this.form.value);
  }
}
