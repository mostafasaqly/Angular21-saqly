
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

type ItemType = 'task' | 'bug' | 'feature';
type Item = { id: number; title: string; type: ItemType };
type ScrollItem = { id: number; title: string };

@Component({
  standalone: true,
  selector: 'app-drag-drop-demo',
  imports: [CommonModule, DragDropModule],
  template: `
    <section class="wrap">
      <header class="head">
        <h1>Drag & Drop (CDK)</h1>
        <p class="sub">Reorder + transfer + handle + axis lock + delay + preview/placeholder</p>
      </header>

      <!-- Single draggable -->
      <section class="card">
        <h2>Single draggable</h2>

        <div class="single-zone">
          <div class="single" cdkDrag [cdkDragDisabled]="dragDisabled()" [cdkDragStartDelay]="dragDelay()">
            Drag me
            <ng-template cdkDragPreview>
              <div class="preview">Dragging…</div>
            </ng-template>
          </div>
        </div>
      </section>

      <!-- Reorder list -->
      <section class="card">
        <div class="card-head">
          <h2>Reorder list</h2>
          <div class="hint">Use the handle (⠿) to drag</div>
        </div>

        <div
          class="list"
          cdkDropList
          [cdkDropListData]="todo()"
          [cdkDropListSortingDisabled]="sortingDisabled()"
          (cdkDropListDropped)="dropTodo($event)"
        >
          @for (item of todo(); track item.id) {
            <div
              class="row"
              cdkDrag
              [cdkDragData]="item"
              [cdkDragDisabled]="dragDisabled()"
              [cdkDragLockAxis]="axisLock() ?? null"

              [cdkDragStartDelay]="dragDelay()"
            >
              <span class="dot" [class.bug]="item.type==='bug'" [class.feature]="item.type==='feature'"></span>
              <span class="title">{{ item.title }}</span>

              <button class="handle" cdkDragHandle type="button" aria-label="Drag handle">⠿</button>

              <ng-template cdkDragPlaceholder>
                <div class="placeholder">Drop here…</div>
              </ng-template>

              <ng-template cdkDragPreview>
                <div class="row preview-row">
                  <span class="dot" [class.bug]="item.type==='bug'" [class.feature]="item.type==='feature'"></span>
                  <span class="title">{{ item.title }}</span>
                </div>
              </ng-template>
            </div>
          }
        </div>
      </section>

      <!-- Transfer between lists -->
      <section class="card">
        <div class="card-head">
          <h2>Transfer between lists</h2>
          <div class="hint">Drag items between Backlog and Done</div>
        </div>

        <div class="grid">
          <div class="col">
            <h3>Backlog</h3>

            <div
              class="list"
              cdkDropList
              #backlogList="cdkDropList"
              [cdkDropListData]="backlog()"
              [cdkDropListConnectedTo]="[doneList]"
              [cdkDropListSortingDisabled]="sortingDisabled()"
              (cdkDropListDropped)="dropBetween($event)"
            >
              @for (item of backlog(); track item.id) {
                <div
                  class="row"
                  cdkDrag
                  [cdkDragData]="item"
                  [cdkDragDisabled]="dragDisabled()"
                  [cdkDragLockAxis]="axisLock() ?? null"

                  [cdkDragStartDelay]="dragDelay()"
                >
                  <span class="dot" [class.bug]="item.type==='bug'" [class.feature]="item.type==='feature'"></span>
                  <span class="title">{{ item.title }}</span>
                  <span class="pill">backlog</span>
                </div>
              }
              @if (backlog().length === 0) {
                <div class="empty">Drop items here</div>
              }
            </div>
          </div>

          <div class="col">
            <h3>Done</h3>

            <div
              class="list"
              cdkDropList
              #doneList="cdkDropList"
              [cdkDropListData]="done()"
              [cdkDropListConnectedTo]="[backlogList]"
              [cdkDropListSortingDisabled]="sortingDisabled()"
              (cdkDropListDropped)="dropBetween($event)"
            >
              @for (item of done(); track item.id) {
                <div
                  class="row"
                  cdkDrag
                  [cdkDragData]="item"
                  [cdkDragDisabled]="dragDisabled()"
                  [cdkDragLockAxis]="axisLock() ?? null"

                  [cdkDragStartDelay]="dragDelay()"
                >
                  <span class="dot" [class.bug]="item.type==='bug'" [class.feature]="item.type==='feature'"></span>
                  <span class="title">{{ item.title }}</span>
                  <span class="pill ok">done</span>
                </div>
              }
              @if (done().length === 0) {
                <div class="empty">Drop items here</div>
              }
            </div>
          </div>
        </div>

        <div class="controls">
          <label class="chk">
            <input type="checkbox" [checked]="axisLock() === 'y'" (change)="toggleAxis($event)" />
            Lock axis to Y (vertical only)
          </label>

          <label class="chk">
            <input type="checkbox" [checked]="sortingDisabled()" (change)="sortingDisabled.set(($any($event.target).checked))" />
            Disable sorting
          </label>

          <label class="chk">
            <input type="checkbox" [checked]="dragDisabled()" (change)="dragDisabled.set(($any($event.target).checked))" />
            Disable dragging
          </label>

          <label class="chk">
            <input type="checkbox" [checked]="delayEnabled()" (change)="delayEnabled.set(($any($event.target).checked))" />
            Drag delay (press & hold)
          </label>
        </div>
      </section>

      <!-- Scrollable container -->
      <section class="card">
        <div class="card-head">
          <h2>Dragging in a scrollable container</h2>
          <div class="hint">Reorder inside a scroll area</div>
        </div>

        <div class="scrollbox">
          <div class="list" cdkDropList [cdkDropListData]="scrollItems()" (cdkDropListDropped)="dropScroll($event)">
            @for (item of scrollItems(); track item.id) {
              <div class="row" cdkDrag [cdkDragDisabled]="dragDisabled()" [cdkDragStartDelay]="dragDelay()">
                {{ item.title }}
              </div>
            }
          </div>
        </div>
      </section>
    </section>
  `,
  styles: [
    `
      :host {
        --bg: #000;

        --surface: rgba(255, 255, 255, 0.06);
        --surface-2: rgba(148, 163, 184, 0.08);

        --border: rgba(148, 163, 184, 0.22);
        --border-strong: rgba(148, 163, 184, 0.32);

        --text: red;
        --muted: red;
        --muted2: #94a3b8;

        --item: #0b1220;
        --item-hover: #0f172a;

        display: block;
        color: var(--text);
      }

      .wrap {
        max-width: 1100px;
        margin: 0 auto;
        padding: 18px;
        color: var(--text);
      }

      .head {
        margin-bottom: 14px;
      }
      h1 {
        margin: 0 0 6px;
        font-size: 22px;
        color: var(--text);
      }
      .sub {
        margin: 0;
        color: var(--muted);
        opacity: 0.95;
      }

      .card {
        margin-top: 14px;
        border: 1px solid var(--border);
        background: var(--surface);
        border-radius: 16px;
        padding: 14px;
        backdrop-filter: blur(6px);
      }

      .card-head {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: 12px;
        margin-bottom: 10px;
      }

      .hint {
        color: var(--muted2);
        font-size: 12px;
      }

      h2 {
        margin: 0;
        font-size: 16px;
        color: var(--text);
      }

      h3 {
        margin: 0 0 10px;
        font-size: 14px;
        color: var(--muted);
      }

      .single-zone {
        padding: 14px;
        border: 1px dashed var(--border-strong);
        border-radius: 14px;
        background: rgba(0, 0, 0, 0.28);
      }

      .single {
        width: fit-content;
        padding: 10px 14px;
        border-radius: 12px;
        border: 1px solid var(--border-strong);
        background: var(--item);
        color: var(--text);
        cursor: grab;
        user-select: none;
      }
      .single:hover {
        background: var(--item-hover);
      }
      .single:active {
        cursor: grabbing;
      }

      .list {
        display: grid;
        gap: 10px;
        min-height: 56px;
        padding: 10px;
        border-radius: 14px;
        border: 1px solid var(--border);
        background: var(--surface-2);
      }

      .row {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 12px;
        border-radius: 12px;
        border: 1px solid var(--border-strong);
        background: var(--item);
        color: var(--text);
        user-select: none;
        transition: background 150ms ease, border-color 150ms ease, transform 150ms ease;
      }

      .row:hover {
        background: var(--item-hover);
        border-color: rgba(148, 163, 184, 0.45);
      }

      .row.cdk-drag-preview {
        box-shadow: 0 18px 55px rgba(0, 0, 0, 0.55);
        transform: scale(1.01);
      }

      .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #60a5fa;
        flex: 0 0 auto;
      }
      .dot.bug {
        background: #fb7185;
      }
      .dot.feature {
        background: #a78bfa;
      }

      .title {
        flex: 1;
        color: var(--text);
        line-height: 1.2;
      }

      .pill {
        font-size: 12px;
        padding: 4px 8px;
        border-radius: 999px;
        border: 1px solid var(--border-strong);
        color: var(--muted);
        background: rgba(255, 255, 255, 0.04);
      }
      .pill.ok {
        border-color: rgba(34, 197, 94, 0.35);
      }

      .handle {
        border: 1px solid var(--border-strong);
        background: transparent;
        color: var(--muted);
        border-radius: 10px;
        padding: 6px 10px;
        cursor: grab;
      }
      .handle:hover {
        background: rgba(255, 255, 255, 0.04);
        color: var(--text);
      }

      .placeholder {
        padding: 10px 12px;
        border-radius: 12px;
        border: 1px dashed rgba(148, 163, 184, 0.5);
        background: rgba(255, 255, 255, 0.04);
        color: var(--muted);
      }

      .preview {
        padding: 10px 12px;
        border-radius: 12px;
        border: 1px solid var(--border-strong);
        background: var(--item);
        color: var(--text);
      }
      .preview-row {
        width: 360px;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 12px;
      }
      @media (max-width: 900px) {
        .grid {
          grid-template-columns: 1fr;
        }
      }

      .empty {
        padding: 12px;
        border-radius: 12px;
        border: 1px dashed rgba(148, 163, 184, 0.5);
        color: var(--muted);
        opacity: 0.95;
        text-align: center;
      }

      .controls {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        margin-top: 12px;
        padding-top: 12px;
        border-top: 1px solid rgba(148, 163, 184, 0.18);
      }

      .chk {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        color: var(--muted);
        font-size: 13px;
      }

      input[type='checkbox'] {
        transform: translateY(1px);
        accent-color: #60a5fa;
      }


      .scrollbox {
        height: 220px;
        overflow: auto;
        border-radius: 14px;
        border: 1px solid rgba(148, 163, 184, 0.22);
        padding: 10px;
        background: rgba(0, 0, 0, 0.3);
      }
    `,
  ],
})
export class DragDropDemoComponent {
  // Reorder list data
  todo = signal<Item[]>([
    { id: 1, title: 'Learn CDK DragDrop basics', type: 'task' },
    { id: 2, title: 'Add custom preview/placeholder', type: 'feature' },
    { id: 3, title: 'Fix a bug in drop logic', type: 'bug' },
    { id: 4, title: 'Add drag handle', type: 'task' },
  ]);

  // Transfer lists data
  backlog = signal<Item[]>([
    { id: 10, title: 'Implement kanban transfer', type: 'feature' },
    { id: 11, title: 'Refactor drag styles', type: 'task' },
  ]);

  done = signal<Item[]>([{ id: 20, title: 'CDK installed', type: 'task' }]);

  // Scrollable list
  scrollItems = signal<ScrollItem[]>(
    Array.from({ length: 20 }, (_, i) => ({
      id: 100 + i,
      title: `Scrollable item #${i + 1}`,
    }))
  );

  // Controls
  axisLock = signal<'x' | 'y' | undefined>(undefined);
  sortingDisabled = signal(false);
  dragDisabled = signal(false);
  delayEnabled = signal(false);

  // Derived: drag delay (ms)
  dragDelay() {
    return this.delayEnabled() ? 200 : 0;
  }

  // Reorder inside one list
  dropTodo(ev: CdkDragDrop<Item[]>) {
    if (this.sortingDisabled()) return;
    if (ev.previousIndex === ev.currentIndex) return;

    const list = [...this.todo()];
    moveItemInArray(list, ev.previousIndex, ev.currentIndex);
    this.todo.set(list);
  }

  // Transfer between lists (and optional sorting)
  dropBetween(ev: CdkDragDrop<Item[]>) {
    const sameList = ev.previousContainer === ev.container;

    if (sameList && this.sortingDisabled()) return;

    if (sameList) {
      const curr = [...ev.container.data];
      moveItemInArray(curr, ev.previousIndex, ev.currentIndex);
      // Keep CDK's data reference updated
      ev.container.data.splice(0, ev.container.data.length, ...curr);
    } else {
      const prev = [...ev.previousContainer.data];
      const curr = [...ev.container.data];
      transferArrayItem(prev, curr, ev.previousIndex, ev.currentIndex);
      ev.previousContainer.data.splice(0, ev.previousContainer.data.length, ...prev);
      ev.container.data.splice(0, ev.container.data.length, ...curr);
    }

    // Re-sync signals (CDK mutates the same array references)
    this.backlog.set([...this.backlog()]);
    this.done.set([...this.done()]);
  }

  dropScroll(ev: CdkDragDrop<ScrollItem[]>) {
    if (ev.previousIndex === ev.currentIndex) return;
    const list = [...this.scrollItems()];
    moveItemInArray(list, ev.previousIndex, ev.currentIndex);
    this.scrollItems.set(list);
  }

  toggleAxis(e: Event) {
    const checked = (e.target as HTMLInputElement).checked;
    this.axisLock.set(checked ? 'y' : undefined);
  }
}

