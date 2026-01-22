import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: `
    <section class="card">
      <h2>Route transitions (View Transitions API)</h2>
      <p class="muted">
        Navigate using the tabs above. If the browser supports View Transitions,
        you will see a smooth page transition.
      </p>

      <div class="grid">
        <div class="panel">
          <h3>Panel A</h3>
          <p>Any content…</p>
        </div>
        <div class="panel">
          <h3>Panel B</h3>
          <p>Any content…</p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .card { border: 1px solid #1f2937; border-radius: 16px; padding: 16px; background: rgba(255,255,255,0.03); max-width: 760px; }
    .muted { opacity: 0.85; color: #cbd5e1; }
    .grid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 12px; margin-top: 12px; }
    .panel { border: 1px solid #2b364a; border-radius: 14px; padding: 12px 14px; background: rgba(148,163,184,0.06); }
    @media (max-width: 720px) { .grid { grid-template-columns: 1fr; } }

    /* View Transitions (progressive enhancement) */
    ::view-transition-old(root) {
      animation: fadeOut 180ms ease-out both;
    }
    ::view-transition-new(root) {
      animation: fadeIn 220ms ease-out both;
    }

    @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
    @keyframes fadeIn  { from { opacity: 0; } to { opacity: 1; } }
  `],
})
export class RouteTransitionsDemoComponent {}
