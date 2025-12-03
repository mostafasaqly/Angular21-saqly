// app/pages/products.component.ts
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  template: `
    <h2>Products (Navigate to routes)</h2>

    <button (click)="goToUser(5)">Go to user 5 (router.navigate)</button>

    <p>
      <a
        [routerLink]="['/products']"
        [queryParams]="{ page: 2, sort: 'price' }"
        fragment="top"
      >
        Same route with query params &amp; fragment
      </a>
    </p>

    <ul>
      @for(id of [1, 2, 3]; track $index){
      <li>
        <a [routerLink]="['/users', id]">User {{ id }} details (guard+resolver)</a>
      </li>
      }
    </ul>
  `,
})
export class ProductsComponent {
  constructor(private router: Router) {}

  goToUser(id: number) {
    this.router.navigate(['/users', id], {
      queryParams: { from: 'products' },
    });
  }
}
