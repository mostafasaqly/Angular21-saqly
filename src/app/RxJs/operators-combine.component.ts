import { Component, inject, signal } from '@angular/core';
import { forkJoin, combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { RxjsDemoService } from './rxjs-demo.service';

@Component({
  selector: 'rxjs-operators-combine',
  template: `
    <h2>RxJS – Combine Streams</h2>

    <div class="d-flex gap-2 mb-3">
      <button class="btn btn-dark btn-sm" (click)="runForkJoin()">forkJoin (parallel then emit once)</button>
      <button class="btn btn-dark btn-sm" (click)="runCombineLatest()">combineLatest</button>
    </div>

    <pre class="p-3 bg-light border rounded">{{ out() }}</pre>
  `,
})
export class OperatorsCombineComponent {
  private api = inject(RxjsDemoService);
  out = signal('');

  runForkJoin() {
    this.out.set('');
    forkJoin({
      p1: this.api.getPost(1),
      p2: this.api.getPost(2),
      p3: this.api.getPost(3),
    }).subscribe(res => this.out.set(JSON.stringify(res, null, 2)));
  }

  runCombineLatest() {
    this.out.set('');

    const limit$ = of(5);
    const keyword$ = of('esse');

    combineLatest([limit$, keyword$]).pipe(
      map(([limit, keyword]) => ({ limit, keyword }))
    ).subscribe(v => this.out.set(JSON.stringify(v, null, 2)));
  }
}
