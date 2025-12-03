import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'guards-demo-form',
  imports: [FormsModule],
  template: `
    <form>
      <label>
        Setting name:
        <input [(ngModel)]="value" name="setting" />
      </label>
    </form>
    @if(dirty()){
    <p >You have unsaved changes.</p>
    }
  `,
})
export class GuardsDemoFormComponent {
  value = '';
  private savedValue = '';
  dirty = signal(false);

  constructor() {
    // track dirty
  }

  ngDoCheck() {
    this.dirty.set(this.value !== this.savedValue);
  }

  canLeave(): boolean {
    return !this.dirty();
  }
}
