import { Component } from '@angular/core';

@Component({
  template: `
    <aside class="help">
      <h3>Help (named outlet)</h3>
      <p>This content is rendered in the 'popup' outlet.</p>
    </aside>
  `,
  styles: [
    `
      .help {
        border: 1px solid #555;
        padding: 0.75rem;
        border-radius: 6px;
        font-size: 0.9rem;
      }
    `,
  ],
})
export class PopupHelpComponent {}
