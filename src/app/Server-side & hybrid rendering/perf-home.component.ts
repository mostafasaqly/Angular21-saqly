
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeavyWidgetComponent } from "./heavy-widget.component";

@Component({
  imports: [RouterLink, HeavyWidgetComponent],
  template: `
    <div class="container py-3">
      <h1>Angular Performance Playground</h1>

      <div class="d-flex gap-2 flex-wrap my-3">
        <a class="btn btn-dark" routerLink="/perf/list">Large List</a>
        <a class="btn btn-dark" routerLink="/perf/hydration">Hydration</a>
      </div>

      <hr />

      <h3>Defer demo (render later)</h3>

      <!-- ✅ @defer improves initial render -->
      @defer (on viewport) {
        <heavy-widget />
      } @placeholder {
        <p class="text-muted">Scroll down to load the heavy widget…</p>
      } @loading {
        <p>Loading widget…</p>
      } @error {
        <p class="text-danger">Failed to load widget.</p>
      }

      <div style="height: 900px"></div>
      <p class="text-muted">Bottom area to trigger viewport defer</p>
    </div>
  `,
})
export class PerformanceHomeComponent {}
