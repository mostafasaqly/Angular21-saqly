import { Component, signal } from '@angular/core';

@Component({
  selector: 'demo-counter',
  template: `
    <section>
      <h3 data-testid="title">Counter</h3>
      <p data-testid="value">{{ count() }}</p>

      <button data-testid="inc" (click)="inc()">+</button>
      <button data-testid="dec" (click)="dec()">-</button>

      <button data-testid="emit" (click)="emit()">Save</button>
    </section>
  `,
})
export class CounterComponent {
  count = signal(0);
  lastSaved = signal<number | null>(null);

  inc() {
    this.count.update(v => v + 1);
  }

  dec() {
    this.count.update(v => v - 1);
  }

  emit() {
    this.lastSaved.set(this.count());
  }
}
