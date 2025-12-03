import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  template: `
    <h2>Routing Overview</h2>
    <p>
      This single demo covers: define routes, outlets, navigation, route state,
      redirects, guards, resolvers, lifecycle events, custom matching,
      rendering / behavior config, and route animations.
    </p>

    <ul>
      <li><a routerLink="/products">Navigate & Params demo</a></li>
      <li><a routerLink="/users/1">Guard + Resolver demo</a></li>
      <li><a routerLink="/admin">Child routes (Admin)</a></li>
      <li><a routerLink="/route-state">Read route state</a></li>
      <li><a routerLink="/@Angular">Custom matcher /@Angular</a></li>
    </ul>
  `,
})
export class HomeComponent {}
