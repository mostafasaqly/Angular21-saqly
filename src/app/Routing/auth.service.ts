import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedIn = true; // try true /false and test http://localhost:4200/products
  // //Change to false to simulate unauthenticated user

  constructor(private router: Router) {}

  isLoggedIn() {
    return this.loggedIn;
  }

  redirectToLogin() {
    alert('Not authenticated. Redirecting to home.');
    this.router.navigateByUrl('/');
    return false;
  }
}
