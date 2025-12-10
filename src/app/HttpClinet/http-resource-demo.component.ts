import { Component, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Post } from './http-demo.service';

@Component({
  standalone: true,
  selector: 'http-resource-demo',
  template: `
    <h2>Reactive data – httpResource</h2>

    <label>
      Limit
      <input type="number" min="1" max="10" [value]="limit()" (input)="onLimitChange($any($event.target).value)" />
    </label>

    @if (posts.isLoading()) {
      <p>Loading...</p>
    } @else if (posts.error()) {
      <p class="error">Error: {{ posts.error()?.message ?? posts.error() }}</p>
      <button (click)="posts.reload()">Retry</button>
    } @else if (posts.hasValue()) {
      <ul>
        @for (p of posts.value(); track p.id) {
          <li>{{ p.id }} – {{ p.title }}</li>
        }
      </ul>
    }
  `,
  styles: [`
    .error { color: #f44336; }
    label { display: inline-flex; gap: .5rem; align-items: center; margin-bottom: .5rem; }
  `],
})
export class HttpResourceDemoComponent {
  limit = signal(5);

  posts = httpResource<Post[]>(() => ({
    url: 'https://jsonplaceholder.typicode.com/posts',
    params: { _limit: String(this.limit()) },
  }));

  onLimitChange(value: string) {
    const parsed = Number(value) || 1;
    this.limit.set(Math.max(1, Math.min(parsed, 10)));
  }
}
