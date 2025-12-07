import { Component, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import {
  form,
  Field,
  email,
  required,
  submit,
} from '@angular/forms/signals';

interface LoginModel {
  email: string;
  password: string;
}

@Component({
  selector: 'signal-login-form',
  imports: [JsonPipe, Field],
  template: `
    <h2>Signal form – Login</h2>

    <form (submit)="onSubmit($event)" class="form-grid">
      <label>
        Email
        <input type="email" [field]="loginForm.email" />
      </label>

      @if (emailErrors()) {
        <div class="error">
          {{ emailErrors() }}
        </div>
      }

      <label>
        Password
        <input type="password" [field]="loginForm.password" />
      </label>

      @if (passwordErrors()) {
        <div class="error">
          {{ passwordErrors() }}
        </div>
      }

      <button type="submit">Sign in</button>
    </form>

    <h3>Model preview (signal)</h3>
    <pre>{{ loginModel() | json }}</pre>
  `,
  styles: [
    `
      .form-grid {
        display: grid;
        gap: 0.75rem;
        max-width: 360px;
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
      input {
        padding: 0.35rem 0.5rem;
      }
    `,
  ],
})
export class SignalLoginFormComponent {
  readonly loginModel = signal<LoginModel>({
    email: '',
    password: '',
  });

  readonly loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.email, { message: 'Email is required' });
    email(schemaPath.email, { message: 'Please enter a valid email' });

    required(schemaPath.password, { message: 'Password is required' });
  });

  emailErrors() {
    const emailField = this.loginForm.email();
    if (!emailField.touched()) return '';

    const errors = emailField.errors();
    if (!errors.length) return '';

    return errors[0].message ?? 'Invalid email';
  }

  passwordErrors() {
    const passField = this.loginForm.password();
    if (!passField.touched()) return '';

    const errors = passField.errors();
    if (!errors.length) return '';

    return errors[0].message ?? 'Invalid password';
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    submit(this.loginForm, async () => {
      const value = this.loginModel();
      console.log('Signal form submitted', value);
      alert(JSON.stringify(value, null, 2));
    });
  }
}
