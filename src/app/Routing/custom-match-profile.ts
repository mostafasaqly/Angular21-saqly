import { Component, input } from '@angular/core';

@Component({
  template: `
    <h2>Custom route match (@username)</h2>
    <p>Hello, @{{ username() }}!</p>
  `,
})
export class CustomMatchProfileComponent {
  // bound via withComponentInputBinding + posParams.username
  username = input.required<string>();
}
