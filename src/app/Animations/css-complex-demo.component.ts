import { Component, signal } from '@angular/core';

type Todo = { id: number; title: string };

@Component({
  standalone: true,
  template: `
    <section class="card">
      <h2>Reusable keyframes + staggered list</h2>

      <div class="row">
        <input
          class="input"
          placeholder="Add item…"
          (keydown.enter)="add($any($event.target).value); $any($event.target).value='';"
        />
        <button class="btn" (click)="add('New item ' + (items().length + 1))">Add</button>
        <button class="btn ghost" (click)="reset()">Reset</button>
      </div>

      <ul class="list">
        @for (item of items(); track item.id; let i = $index) {
          <li
            class="li"
            animate.enter="li-enter"
            animate.leave="li-leave"
            [style.animationDelay.ms]="i * 40"
          >
            <span>{{ item.title }}</span>
            <button class="x" (click)="remove(item.id)">✕</button>
          </li>
        }
      </ul>

      <div class="hint">
        Stagger is done via <code>animation-delay</code> based on the item index.
      </div>
    </section>
  `,
  styleUrl: './css-complex-demo.component.css'
})
export class CssComplexDemoComponent {
  private id = 3;

  items = signal<Todo[]>([
    { id: 1, title: 'Learn animate.enter / animate.leave' },
    { id: 2, title: 'Make CSS keyframes reusable' },
    { id: 3, title: 'Add stagger with delay' },
  ]);

  add(title: string) {
    const t = (title ?? '').trim();
    if (!t) return;

    const nextId = ++this.id;
    this.items.update(list => [{ id: nextId, title: t }, ...list]);
  }

  remove(id: number) {
    this.items.update(list => list.filter(x => x.id !== id));
  }

  reset() {
    this.id = 3;
    this.items.set([
      { id: 1, title: 'Learn animate.enter / animate.leave' },
      { id: 2, title: 'Make CSS keyframes reusable' },
      { id: 3, title: 'Add stagger with delay' },
    ]);
  }
}
