
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-start',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <header class="top-bar">
      <h1>Angular Routing Full Demo</h1>

      <nav class="nav">
        <a routerLink="" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a>
        <a routerLink="/products" routerLinkActive="active">Products</a>
        <a routerLink="/route-state" routerLinkActive="active">Route state</a>
        <a routerLink="/admin" routerLinkActive="active">Admin</a>
        <a [routerLink]="[{ outlets: { popup: ['help'] } }]">Open Help (named outlet)</a>
        <a routerLink="/@AngularDev">Custom Match /@AngularDev</a>
      </nav>
    </header>

    <main class="layout">
      <section class="content">
        <router-outlet/>
      </section>

      <!-- Named outlet for popup-style routes -->
      <section class="popup">
        <router-outlet name="popup"></router-outlet>
      </section>
    </main>
  `,
  styles: [
    `
      .top-bar {
        padding: 0.75rem 1rem;
        border-bottom: 1px solid #333;
      }
      .nav a {
        margin-right: 0.75rem;
      }
      .active {
        font-weight: 600;
        text-decoration: underline;
      }
      .layout {
        display: grid;
        grid-template-columns: 1fr 260px;
        gap: 1rem;
        padding: 1rem;
      }
      .popup {
        border-left: 1px dashed #444;
      }
    `,
  ],
})
export class AppStartComponent {}
