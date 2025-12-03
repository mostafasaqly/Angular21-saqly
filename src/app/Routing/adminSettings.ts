import { Component } from '@angular/core';
import { GuardsDemoFormComponent } from './guards-demo-form';

@Component({
  standalone: true,
  imports: [GuardsDemoFormComponent],
  template: `
    <h3>Admin settings</h3>
    <guards-demo-form></guards-demo-form>
  `,
})
export class AdminSettingsComponent {}
