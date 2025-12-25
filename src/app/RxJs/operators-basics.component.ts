import { Component, OnDestroy, signal } from '@angular/core';
import { Subscription, from } from 'rxjs';
import { map, filter, tap, take, finalize } from 'rxjs/operators';

@Component({
  selector: 'rxjs-operators-basics',
  template: `
    <h2>RxJS – Core Operators</h2>

    <button class="btn btn-dark btn-sm mb-3" (click)="run()">Run pipeline</button>

    <pre class="p-3 bg-light border rounded">{{ log() }}</pre>
  `,
})
export class OperatorsBasicsComponent implements OnDestroy {
  log = signal('');
  private sub = new Subscription();

  private write(msg: string) {
    this.log.update(v => v + msg + '\n');
  }

  run() {
    this.log.set('');
    const source$ = from([1,2,3,4,5,6,7,8,9,10]);

    this.sub.add(
      source$.pipe(
        tap(v => this.write(`tap: ${v}`)),
        filter(v => v % 2 === 0),
        map(v => v * 10),
        take(3),
        finalize(() => this.write('finalize: stream ended'))
      ).subscribe({
        next: v => this.write(`next: ${v}`),
        complete: () => this.write('complete'),
      })
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
