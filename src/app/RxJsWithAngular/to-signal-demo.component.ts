import { Component, effect, signal } from '@angular/core';
import { interval, map } from 'rxjs';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'to-signal-demo',
  template: `
    <h2>RxJS Interop – toSignal / toObservable</h2>

    <div class="alert alert-secondary">
      <div><strong>Observable → Signal</strong></div>
      <div>counter(): {{ counter() }}</div>
    </div>

    <button class="btn btn-dark btn-sm" (click)="manual.set(manual() + 1)">
      manual signal +1
    </button>

    <div class="alert alert-secondary mt-3">
      <div><strong>Signal → Observable</strong></div>
      <div>Check console logs (observable emits when signal changes)</div>
    </div>
  `,
})
export class ToSignalDemoComponent {
  // Observable -> Signal
  private counter$ = interval(1000).pipe(map(v => v + 1));
  counter = toSignal(this.counter$, { initialValue: 0 });

  // Signal -> Observable
  manual = signal(0);
  manual$ = toObservable(this.manual);

  constructor() {
    this.manual$.subscribe(v => console.log('[toObservable] manual changed:', v));

    effect(() => {
      // signal reactivity (just to show both styles)
      console.log('[signal effect] manual:', this.manual());
    });
  }
}
