import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  template: `
    <h2>Route state</h2>

    <pre>currentNavigation id: {{ currentNav()?.id }}</pre>
    <pre>currentNavigation initialUrl: {{ currentNav()?.initialUrl?.toString() }}</pre>
    <pre>currentNavigation trigger: {{ currentNav()?.trigger }}</pre>
  `,
})
export class RouteStateDemoComponent {
  params = signal<any>({});
  queryParams = signal<any>({});
  fragment = signal<string | null>(null);
  data = signal<any>({});
  currentNav = signal<any>(null);

  constructor(route: ActivatedRoute, router: Router) {
    route.paramMap.subscribe(m =>
      this.params.set(
        m.keys.reduce((obj, k) => ({ ...obj, [k]: m.get(k) }), {}),
      ),
    );

    route.queryParamMap.subscribe(m =>
      this.queryParams.set(
        m.keys.reduce((obj, k) => ({ ...obj, [k]: m.get(k) }), {}),
      ),
    );

    route.fragment.subscribe(f => this.fragment.set(f));
    route.data.subscribe(d => this.data.set(d));

    this.currentNav.set(router.getCurrentNavigation());
  }
}
