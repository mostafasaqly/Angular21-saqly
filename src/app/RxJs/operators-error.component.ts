import { Component, inject, signal } from '@angular/core';
import { RxjsDemoService } from './rxjs-demo.service';
import { catchError, retry, timeout } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'rxjs-operators-error',
  template: `
    <h2>RxJS – Error Handling</h2>

    <div class="d-flex gap-2 mb-3">
      <button class="btn btn-dark btn-sm" (click)="loadOk()">OK request</button>
      <button class="btn btn-dark btn-sm" (click)="loadFail()">Fail + catchError</button>
      <button class="btn btn-dark btn-sm" (click)="loadRetry()">Retry</button>
    </div>

    <pre class="p-3 bg-light border rounded">{{ out() }}</pre>
  `,
})
export class OperatorsErrorComponent {
  private api = inject(RxjsDemoService);
  out = signal('');

  loadOk() {
    this.out.set('');
    this.api.getPost(1).subscribe(res => this.out.set(JSON.stringify(res, null, 2)));
  }

  loadFail() {
    this.out.set('');
    // invalid id -> will 404
    this.api.getPost(999999).pipe(
      catchError(err => of({ error: true, message: err.message ?? 'Unknown error' }))
    ).subscribe(res => this.out.set(JSON.stringify(res, null, 2)));
  }

  loadRetry() {
    this.out.set('');
    this.api.getPost(999999).pipe(
      timeout(1500),
      retry(2),
      catchError(err => of({ error: true, afterRetry: true, message: err.message ?? 'Unknown' }))
    ).subscribe(res => this.out.set(JSON.stringify(res, null, 2)));
  }
}
