import { Component, signal } from '@angular/core';
import { SignalLoginFormComponent } from './signal-login-form.component';
import { ReactiveProfileFormComponent } from './reactive-profile-form.component';
import { TypedOrderFormComponent } from './typed-order-form.component';
import { TemplateContactFormComponent } from './template-contact-form.component';
import { DynamicSurveyFormComponent } from './dynamic-survey-form.component';
import { DynamicInputFormComponent } from './DynamicInputDemo.component';

type DemoView = 'signal' | 'reactive' | 'typed' | 'template' | 'dynamic' | 'dynamic-input';

@Component({
  selector: 'forms-demo',
  imports: [

    SignalLoginFormComponent,
    ReactiveProfileFormComponent,
    TypedOrderFormComponent,
    TemplateContactFormComponent,
    DynamicSurveyFormComponent,
    DynamicInputFormComponent
  ],
  template: `
    <h1>Angular Forms Demo (v21)</h1>

    <nav class="tabs">
      <button class="btn btn-primary" (click)="view.set('signal')"  [class.active]="view() === 'signal'">Signal forms</button>
      <button class="btn btn-primary" (click)="view.set('reactive')" [class.active]="view() === 'reactive'">Reactive forms</button>
      <button class="btn btn-primary" (click)="view.set('typed')"    [class.active]="view() === 'typed'">Strictly typed</button>
      <button class="btn btn-primary" (click)="view.set('template')" [class.active]="view() === 'template'">Template-driven</button>
      <button class="btn btn-primary" (click)="view.set('dynamic')"  [class.active]="view() === 'dynamic'">Dynamic forms</button>
      <button class="btn btn-primary" (click)="view.set('dynamic-input')"  [class.active]="view() === 'dynamic-input'">Dynamic Input forms</button>

    </nav>

    <section>
      @switch (view()) {
        @case ('signal') {
          <signal-login-form />
        }
        @case ('reactive') {
          <reactive-profile-form />
        }
        @case ('typed') {
          <typed-order-form />
        }
        @case ('template') {
          <template-contact-form />
        }
        @case ('dynamic') {
          <dynamic-survey-form />
        }
        @case ('dynamic-input') {
          <!-- create dynamic input form using reactive forms -->
          <dynamic-input-form />
        }
        @default {
          <p>Unknown view selected.</p>
        }
      }
    </section>
  `,
  styles: [
    `
      .tabs {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1rem;
        flex-wrap: wrap;
      }
      .tabs button {
        padding: 0.35rem 0.75rem;
        border-radius: 4px;
        border: 1px solid #444;
        background: #111;
        cursor: pointer;
      }
      .tabs button.active {
        background: #1976d2;
        border-color: #1976d2;
        color: #fff;
      }
      section {
        border: 1px solid #333;
        padding: 1rem;
        border-radius: 6px;
      }
    `,
  ],
})
export class FormsDemoComponent {
  view = signal<DemoView>('signal');
}
