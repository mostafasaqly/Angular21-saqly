import { TestBed } from '@angular/core/testing';
import { provideRouter, Routes } from '@angular/router';
import { Location } from '@angular/common';
import { RouterTestingHarness } from '@angular/router/testing';
import { describe, it, expect } from 'vitest';
import { By } from '@angular/platform-browser';
import { HomePage, DetailsPage } from './pages';

const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'details', component: DetailsPage },
];

describe('Routing & Navigation', () => {
  it('should navigate to /details and render DetailsPage', async () => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
    });

    const harness = await RouterTestingHarness.create();
    const comp = await harness.navigateByUrl('/details', DetailsPage);

    expect(comp).toBeTruthy();
    expect(harness.routeNativeElement?.querySelector('[data-testid="details"]')?.textContent).toContain('Details');
  });

  it('button should navigate back to home', async () => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
    });

    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/details', DetailsPage);

    const btn = harness.fixture.debugElement.query(By.css('[data-testid="goHome"]')).nativeElement as HTMLButtonElement;
    btn.click();
    await harness.fixture.whenStable();
    harness.fixture.detectChanges();

    const homeEl = harness.routeNativeElement?.querySelector('[data-testid="home"]');
    expect(homeEl).toBeTruthy();
  });

  it('should update Location path', async () => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
    });

    const location = TestBed.inject(Location);
    const harness = await RouterTestingHarness.create();

    await harness.navigateByUrl('/details');
    expect(location.path()).toBe('/details');
  });
});
