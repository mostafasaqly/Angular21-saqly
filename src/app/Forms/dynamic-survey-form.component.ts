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

interface QuestionConfig {
  key: string;
  label: string;
  type: 'text' | 'number' | 'checkbox';
  required?: boolean;
}

@Component({
  selector: 'dynamic-survey-form',
  imports: [ReactiveFormsModule, JsonPipe],
  template: `
    <h2>Dynamic form – Survey</h2>

    <p>Questions are generated from a config array.</p>

    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="form-grid">
      <div formArrayName="questions">
      @for(qCtrl of questions.controls;track $index; let i = $index){
      <div
          [formGroupName]="i"
          class="question"
        >
          <label>
            {{ config[i].label }}
            @if(config[i].type !== 'checkbox'){
            <input
              [type]="config[i].type"
              formControlName="value"
            />
            }
            @if(config[i].type === 'checkbox'){
            <input
              type="checkbox"
              formControlName="value"
            />
            }
          </label>

          @if(qCtrl.get('value')?.invalid && qCtrl.get('value')?.touched){
          <div class="error" >
            This field is required
          </div>
          }
        </div>
      }
      </div>


      <button type="submit" [disabled]="form.invalid">Submit survey</button>
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
      .question {
        margin-bottom: 0.5rem;
      }
      .question label {
        display: flex;
        gap: 0.5rem;
        align-items: center;
      }
      .error {
        font-size: 0.8rem;
        color: #f44336;
      }
    `,
  ],
})
export class DynamicSurveyFormComponent {
  private fb = inject(FormBuilder);

  // config drives the form structure
  config: QuestionConfig[] = [
    { key: 'name', label: 'Your name', type: 'text', required: true },
    { key: 'age', label: 'Your age', type: 'number' },
    { key: 'newsletter', label: 'Subscribe to newsletter', type: 'checkbox' },
  ];

  form = this.fb.group({
    questions: this.fb.array([] as FormGroup[]),
  });

  get questions(): FormArray<FormGroup> {
    return this.form.controls['questions'] as FormArray<FormGroup>;
  }

  constructor() {
    this.buildForm();
  }

  private buildForm() {
    this.config.forEach(q => {
      const validators = q.required ? [Validators.required] : [];
      const ctrl = this.fb.group({
        key: [q.key],
        value: new FormControl(
          q.type === 'checkbox' ? false : '',
          validators,
        ),
      });
      this.questions.push(ctrl);
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    console.log('Dynamic form submitted', this.form.value);
  }
}
