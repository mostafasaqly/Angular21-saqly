import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HttpDemoService } from './http-demo.service';

@Component({
  selector: 'http-create',
  imports: [ReactiveFormsModule],
  template: `
    <h2>POST – Create new post</h2>

    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="form-grid">
      <label>
        Title
        <input formControlName="title" />
      </label>

      <label>
        Body
        <textarea rows="3" formControlName="body"></textarea>
      </label>

      <label>
        User ID
        <input type="number" formControlName="userId" />
      </label>

      <button type="submit" [disabled]="form.invalid || submitting()">
        {{ submitting() ? 'Saving...' : 'Create post' }}
      </button>
    </form>

    @if (createdJson()) {
      <h3>Server response</h3>
      <pre>{{ createdJson() }}</pre>
    }
  `,
  styles: [`
    .form-grid {
      display: grid;
      gap: .75rem;
      max-width: 400px;
    }
    label { display: flex; flex-direction: column; gap: .25rem; }
    textarea, input { padding: .35rem .5rem; }
  `],
})
export class HttpCreateComponent {
  private fb = inject(FormBuilder);
  private api = inject(HttpDemoService);

  // nonNullable => controls are string / number (no null)
  form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    body: ['', Validators.required],
    userId: this.fb.nonNullable.control(1, { validators: Validators.required }),
  });

  submitting = signal(false);
  createdJson = signal<string>('');

  onSubmit() {
    if (this.form.invalid) return;

    this.submitting.set(true);
    this.createdJson.set('');

    this.api.createPost(this.form.getRawValue()).subscribe({
      next: res => {
        this.createdJson.set(JSON.stringify(res, null, 2));
        this.submitting.set(false);
      },
      error: err => {
        this.createdJson.set('Error: ' + (err.message ?? 'Unknown error'));
        this.submitting.set(false);
      },
    });
  }
}
