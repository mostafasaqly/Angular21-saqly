import { Component, output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'demo-login-form',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()" data-testid="form">
      <input data-testid="email" formControlName="email" />
      <input data-testid="password" formControlName="password" type="password" />

      <p data-testid="emailError" *ngIf="form.controls.email.touched && form.controls.email.invalid">
        Email invalid
      </p>

      <button data-testid="submit" type="submit" [disabled]="form.invalid">Login</button>
    </form>
  `,
})
export class LoginFormComponent {

  private fb = inject(FormBuilder);

  loggedIn = output<{ email: string; password: string }>();

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  submit() {
    if (this.form.invalid) return;
    this.loggedIn.emit(this.form.getRawValue() as { email: string; password: string });
  }
}
