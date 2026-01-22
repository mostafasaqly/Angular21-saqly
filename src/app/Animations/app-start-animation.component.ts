import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-start-animation',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  template: `
    <header class="topbar">
      <nav class="tabs">
        <a routerLink="enter-leave" routerLinkActive="active">Enter/Leave</a>
        <a routerLink="css-complex" routerLinkActive="active">CSS Complex</a>
        <a routerLink="route-transitions" routerLinkActive="active">Route Transitions</a>

      </nav>
    </header>

    <main class="page">
      <router-outlet />
    </main>
  `,
  styles: [`
  :host { display: block; }

  /* Top bar */
  .topbar {
    position: sticky;
    top: 0;
    background: #000;
    padding: 12px 18px;
    border-bottom: 1px solid #1f2937;
    z-index: 10;
  }

  /* Tabs */
  .tabs {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    max-width: 1200px;
    margin: 0 auto;
  }

  .tabs a {
    color: #cbd5e1;
    text-decoration: none;
    padding: 10px 12px;
    border-radius: 12px;
    border: 1px solid transparent;
    transition: background 150ms ease, border-color 150ms ease;
  }

  .tabs a:hover {
    border-color: #334155;
    background: rgba(255, 255, 255, 0.04);
  }

  .tabs a.active {
    color: #fff;
    border-color: #334155;
    background: rgba(255, 255, 255, 0.06);
  }

  /* Page */
  .page {
    padding: 24px 18px;
    color: #ff4949;
    background-color: #fc7676 ;
    min-height: calc(100vh - 58px);
  }

  .page > * {
    max-width: 1200px;
    margin: 0 auto;
  }

  .page :where(section, .card, .demo-card) {
    width: 100%;
  }

  /* Responsive tweaks */
  @media (max-width: 640px) {
    .topbar { padding: 10px 12px; }
    .page { padding: 16px 12px; }
    .tabs a { padding: 9px 10px; border-radius: 10px; }
  }
`],

})
export class AppStartAnimationComponent { }
