import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet, RouterLink],
  template: `
    <h2>Admin Area (child routes)</h2>
    <nav>
      <a routerLink="dashboard">Dashboard</a> |
      <a routerLink="settings">Settings</a>
    </nav>

    <router-outlet/>
  `,
})
export class AdminLayoutComponent {}
