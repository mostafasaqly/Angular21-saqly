import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  template: `
    <div class="card shadow-sm mb-4" style="max-width: 420px;">

      <div class="card-header bg-light fw-semibold">
        <!-- title slot -->
        <ng-content select="[card-title]"></ng-content>
      </div>

      <div class="card-body">
        <!-- body slot -->
        <ng-content select="[card-body]"></ng-content>
      </div>

      <div class="card-footer text-muted small">
        <!-- footer slot -->
        <ng-content select="[card-footer]"></ng-content>
      </div>

    </div>
`,
})
export class ProfileCardComponent {}
