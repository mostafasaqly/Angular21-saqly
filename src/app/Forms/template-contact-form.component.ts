import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'template-contact-form',
  imports: [FormsModule, JsonPipe],
  template: `
    <h2>Template-driven form – Contact</h2>

    <form #f="ngForm" (ngSubmit)="onSubmit(f)" class="form-grid">
      <label>
        Name
        <input name="name" [(ngModel)]="model.name" required minlength="3" #name="ngModel" />
      </label>
      @if(name.invalid && name.touched){
      <div class="error" >
        Name is required (min 3 chars)
      </div>
      }

      <label>
        Email
        <input name="email" [(ngModel)]="model.email" email required #email="ngModel" />
      </label>
      @if(email.invalid && email.touched){
      <div class="error" >
        Please enter a valid email
      </div>
      }

      <label>
        Message
        <textarea name="message" [(ngModel)]="model.message" rows="3"></textarea>
      </label>

      <button type="submit" [disabled]="f.invalid">Send</button>
    </form>

    <pre>Model: {{ model | json }}</pre>
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
export class TemplateContactFormComponent {
  model = {
    name: '',
    email: '',
    message: '',
  };

  onSubmit(form: NgForm) {
    if (form.invalid) return;
    console.log('Template-driven form submitted', this.model);
  }
}
