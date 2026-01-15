import { describe, it, expect } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import {
  PUBLIC_ROUTES,
  PublicHomePage,
  AboutPage,
  SignInPage,
  NotFoundPage,
} from './public.routes';

function findRoute(path: string) {
  return PUBLIC_ROUTES.find(r => r.path === path);
}

describe('PUBLIC_ROUTES', () => {
  it('should include required public paths', () => {
    expect(findRoute('')).toBeTruthy();
    expect(findRoute('about')).toBeTruthy();
    expect(findRoute('sign-in')).toBeTruthy();
    expect(findRoute('404')).toBeTruthy();
    expect(findRoute('**')).toBeTruthy();
  });

  it('should not contain guards (public routes must be accessible)', () => {
    for (const r of PUBLIC_ROUTES) {
      // If you have conventions, enforce them
      expect((r as any).canActivate).toBeUndefined();
      expect((r as any).canMatch).toBeUndefined();
      expect((r as any).canActivateChild).toBeUndefined();
    }
  });

  it('should render PublicHomePage on "/"', async () => {
    TestBed.configureTestingModule({
      providers: [provideRouter(PUBLIC_ROUTES)],
    });

    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/', PublicHomePage);

    const el = harness.routeNativeElement?.querySelector('[data-testid="home"]');
    expect(el?.textContent).toContain('Public Home');
  });

  it('should render AboutPage on "/about"', async () => {
    TestBed.configureTestingModule({
      providers: [provideRouter(PUBLIC_ROUTES)],
    });

    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/about', AboutPage);

    const el = harness.routeNativeElement?.querySelector('[data-testid="about"]');
    expect(el?.textContent).toContain('About');
  });

  it('should render SignInPage on "/sign-in"', async () => {
    TestBed.configureTestingModule({
      providers: [provideRouter(PUBLIC_ROUTES)],
    });

    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/sign-in', SignInPage);

    const el = harness.routeNativeElement?.querySelector('[data-testid="signIn"]');
    expect(el?.textContent).toContain('Sign In');
  });

  it('should redirect unknown routes to /404 and render NotFoundPage', async () => {
    TestBed.configureTestingModule({
      providers: [provideRouter(PUBLIC_ROUTES)],
    });

    const harness = await RouterTestingHarness.create();
    // navigate to unknown path -> should hit wildcard -> redirectTo 404
    await harness.navigateByUrl('/unknown', NotFoundPage);

    const el = harness.routeNativeElement?.querySelector('[data-testid="notFound"]');
    expect(el?.textContent).toContain('Not Found');
  });
});
