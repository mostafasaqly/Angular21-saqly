import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { AppStartComponent } from './Routing/appStart';
describe('Routing demo', () => {
  it('navigates to /products', async () => {
    TestBed.configureTestingModule({
      imports: [AppStartComponent],
      providers: [provideRouter(routes)],
    });

    const router = TestBed.inject(Router);
    await router.navigateByUrl('/products');
    expect(router.url).toBe('/products');
  });
  it('navigates to /home', async () => {
    TestBed.configureTestingModule({
      imports: [AppStartComponent],
      providers: [provideRouter(routes)],
    });

    const router = TestBed.inject(Router);
    await router.navigateByUrl('/');
    expect(router.url).toBe('/');
  });
  it('navigates to /route-state', async () => {
    TestBed.configureTestingModule({
      imports: [AppStartComponent],
      providers: [provideRouter(routes)],
    });

    const router = TestBed.inject(Router);
    await router.navigateByUrl('/route-state');
    expect(router.url).toBe('/route-state');
  });
  it('navigates to /admin/dashboard', async () => {
    TestBed.configureTestingModule({
      imports: [AppStartComponent],
      providers: [provideRouter(routes)],
    });

    const router = TestBed.inject(Router);
    await router.navigateByUrl('/admin/dashboard');
    expect(router.url).toBe('/admin/dashboard');
  });

});
