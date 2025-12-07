import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ExclaimPipe } from '../Pipes/exclaim';

@Component({
  standalone: true,
  selector: 'custom-pipe-demo',
  imports: [FormsModule, ExclaimPipe],
  template: `
    <div class="pipe-demo">
      <label>
        Message:
        <input
          type="text"
          [(ngModel)]="message"
          placeholder="Type any text here..."
        />
      </label>

      <label>
        Times:
        <input
          type="number"
          min="1"
          max="15"
          [(ngModel)]="times"
        />
      </label>

      <div class="preview">
        <p><strong>Original:</strong> {{ message }}</p>
        <p>
          <strong>With custom pipe:</strong>
          {{ message | exclaim: times  }}
        </p>
      </div>
    </div>
  `,
  styles: [
    `
      .pipe-demo {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        max-width: 420px;
      }

      label {
        display: flex;
        flex-direction: column;
        font-size: 0.9rem;
        gap: 0.25rem;
      }

      input[type='text'],
      input[type='number'] {
        padding: 0.35rem 0.5rem;
        border-radius: 4px;
        border: 1px solid #ccc;
      }

      .preview {
        margin-top: 0.75rem;
        padding: 0.5rem 0.75rem;
        border-radius: 6px;
        background: #f9fafb;
        font-size: 0.9rem;
      }
    `,
  ],
})
export class CustomPipeDemo {
  message = 'Angular pipes are awesome';
  times = 3;
}
