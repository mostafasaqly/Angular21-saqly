import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  imports: [CommonModule],
  template: `<h1 data-testid="home">Home</h1>`,
})
export class HomePage {}

@Component({
  imports: [CommonModule],
  template: `
    <h1 data-testid="details">Details</h1>
    <button data-testid="goHome" (click)="goHome()">Go Home</button>
  `,
})
export class DetailsPage {
  private router = inject(Router);
  goHome() {
    return this.router.navigateByUrl('/');
  }
}
