import { Component, signal } from '@angular/core';
import { ObservableBasicsComponent } from './observable-basics.component';
import { OperatorsBasicsComponent } from './operators-basics.component';
import { OperatorsHttpComponent } from './operators-http.component';
import { OperatorsErrorComponent } from './operators-error.component';
import { OperatorsCombineComponent } from './operators-combine.component';

type View = 'create' | 'basics' | 'http' | 'error' | 'combine';

@Component({
  standalone: true,
  selector: 'rxjs-shell',
  imports: [
    ObservableBasicsComponent,
    OperatorsBasicsComponent,
    OperatorsHttpComponent,
    OperatorsErrorComponent,
    OperatorsCombineComponent,
  ],
  template: `
    <h2>RxJS Demo (Overview → Operators → Http)</h2>

    <div class="btn-group mb-3">
      <button class="btn btn-dark btn-sm" (click)="view.set('create')">Create Observable</button>
      <button class="btn btn-dark btn-sm" (click)="view.set('basics')">Core Operators</button>
      <button class="btn btn-dark btn-sm" (click)="view.set('http')">Operators + HttpClient</button>
      <button class="btn btn-dark btn-sm" (click)="view.set('error')">Error Handling</button>
      <button class="btn btn-dark btn-sm" (click)="view.set('combine')">Combine Streams</button>
    </div>

    @switch (view()) {
      @case ('create') { <rxjs-observable-basics /> }
      @case ('basics') { <rxjs-operators-basics /> }
      @case ('http') { <rxjs-operators-http /> }
      @case ('error') { <rxjs-operators-error /> }
      @case ('combine') { <rxjs-operators-combine /> }
    }
  `,
})
export class RxjsStartComponent {
  view = signal<View>('create');
}
