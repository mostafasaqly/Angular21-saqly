import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  imports: [JsonPipe],
  template: `
    <h2>User details (Guard + Resolver)</h2>
    <pre>{{ user | json }}</pre>
  `,
})
export class UserDetailsComponent {
  private route = inject(ActivatedRoute);
  user = this.route.snapshot.data['user'];
}
