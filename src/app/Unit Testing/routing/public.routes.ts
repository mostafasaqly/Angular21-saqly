import { Routes } from '@angular/router';
import { Component } from '@angular/core';

/** Demo public pages (standalone) */
@Component({
  template: `<h1 data-testid="home">Public Home</h1>`,
})
export class PublicHomePage {}

@Component({
  template: `<h1 data-testid="about">About</h1>`,
})
export class AboutPage {}

@Component({
  template: `<h1 data-testid="signIn">Sign In</h1>`,
})
export class SignInPage {}

@Component({
  template: `<h1 data-testid="notFound">Not Found</h1>`,
})
export class NotFoundPage {}

/**
 * PUBLIC ROUTES
 * - no guards
 * - accessible without auth
 */
export const PUBLIC_ROUTES: Routes = [
  { path: '', pathMatch: 'full', component: PublicHomePage },
  { path: 'about', component: AboutPage },
  { path: 'sign-in', component: SignInPage },

  // optional: not found
  { path: '404', component: NotFoundPage },

  // wildcard at end
  { path: '**', redirectTo: '404' },
];
