import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expensive-widget',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card shadow-sm p-3 mb-4">
      @defer  {
  <h3 class="h5 mb-2">Statistics Widget (loaded with)</h3>
      }

  <p class="text-muted mb-3">
    This component was only created when it entered the viewport.
  </p>

  <ul class="list-group">
    <li class="list-group-item d-flex justify-content-between">
      <span>Users online</span>
      <strong>{{ 1234 | number }}</strong>
    </li>

    <li class="list-group-item d-flex justify-content-between">
      <span>Conversion rate</span>
      <strong>{{ 0.176 | percent:'1.1-1' }}</strong>
    </li>
  </ul>
</div>

  `,
  styles: [
    `
      .widget {
        border: 1px dashed #888;
        border-radius: 8px;
        padding: 1rem;
      }
    `,
  ],
})
export class ExpensiveWidgetComponent { }
