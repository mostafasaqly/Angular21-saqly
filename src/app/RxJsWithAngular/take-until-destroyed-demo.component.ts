import { Component, DestroyRef, inject, signal } from '@angular/core';
import { interval } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  imports: [],
  selector: 'take-until-destroyed-demo',
  template: `
    <h2>RxJS Interop – takeUntilDestroyed</h2>

    <div class="alert alert-secondary">
      This counter keeps ticking while the component is alive.
      Once you navigate away, it automatically unsubscribes.
    </div>

    <h3>{{ counter() }}</h3>
  `,
})
export class TakeUntilDestroyedDemoComponent {
  private destroyRef = inject(DestroyRef);
  counter = signal(0);

  constructor() {
    interval(500)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(v => this.counter.set(v));
  }
}
