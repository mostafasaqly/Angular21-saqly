import { Component, signal } from '@angular/core';

type Item = { id: number; name: string };

@Component({
  template: `
    <div class="container py-3">
      <h2>Large List</h2>

      <button class="btn btn-outline-dark me-2" (click)="shuffle()">Shuffle</button>
      <button class="btn btn-outline-dark" (click)="mutateOne()">Mutate one</button>

      <ul class="mt-3">
        <!-- ✅ track by stable unique id -->
        @for (item of items(); track item.id) {
          <li>{{ item.id }} - {{ item.name }}</li>
        }
      </ul>
    </div>
  `,
})
export class PerfListComponent {
  items = signal<Item[]>(
    Array.from({ length: 2000 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` })),
  );

  shuffle() {
    const copy = [...this.items()];
    copy.sort(() => Math.random() - 0.5);
    this.items.set(copy);
  }

  mutateOne() {
    const copy = [...this.items()];
    copy[0] = { ...copy[0], name: copy[0].name + ' *' };
    this.items.set(copy);
  }
}
