import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'reactive-profile-form',
  imports: [ReactiveFormsModule, JsonPipe],
  template: `
    <h2>Reactive form – Profile</h2>

    <form [formGroup]="profileForm" (ngSubmit)="onSubmit()" class="form-grid">
      <label>
        First name
        <input formControlName="firstName" />
      </label>
      @if(firstName.invalid && firstName.touched){
      <div class="error" >
        First name is required (min 3 chars)
      </div>
      }

      <label>
        Last name
        <input formControlName="lastName" />
      </label>

      <label>
        Email
        <input type="email" formControlName="email" />
      </label>
      @if(email.invalid && email.touched){
      <div class="error" >
        Please enter a valid email
      </div>
      }

      <button type="submit" [disabled]="profileForm.invalid">
        Save profile
      </button>
    </form>

    <pre>Value: {{ profileForm.value | json }}</pre>
  `,
  styles: [
    `
      .form-grid {
        display: grid;
        gap: 0.75rem;
        max-width: 420px;
      }
      label {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }
      .error {
        font-size: 0.8rem;
        color: #f44336;
      }
    `,
  ],
})
export class ReactiveProfileFormComponent {
  private fb = inject(FormBuilder);

  profileForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: [''],
    email: ['', [Validators.required, Validators.email]],
  });

  get firstName() {
    return this.profileForm.controls.firstName;
  }

  get email() {
    return this.profileForm.controls.email;
  }

  onSubmit() {
    if (this.profileForm.invalid) return;
    console.log('Reactive form submitted', this.profileForm.value);
  }
}
