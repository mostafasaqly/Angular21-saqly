import { Component, signal } from '@angular/core';

@Component({
  template: `
    <div class="container py-3">
      <h2>Hydration</h2>
      <p class="text-muted">
        This page is SSR rendered first, then hydrated on the client.
      </p>

      <button class="btn btn-success" (click)="count.set(count() + 1)">
        Click count: {{ count() }}
      </button>

      <hr />

      <p>
        If hydration is working, clicks should work instantly, and the page should not fully re-render.
      </p>
    </div>
  `,
})
export class PerfHydrationComponent {
  count = signal(0);
}
