import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'heavy-widget',
  template: `
    <div class="card p-3">
      <h4>Heavy Widget</h4>
      <p>Computed result: {{ result() }}</p>
      <button class="btn btn-primary" (click)="n.set(n() + 1)">Recompute</button>
    </div>
  `,
})
export class HeavyWidgetComponent {
  n = signal(20000);

  // fake expensive compute
  result = computed(() => {
    let sum = 0;
    for (let i = 0; i < this.n(); i++) sum += i % 7;
    return sum;
  });
}
