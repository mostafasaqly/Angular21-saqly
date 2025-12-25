import { Component, OnDestroy, signal } from '@angular/core';
import { Observable, Subscription, of, from, interval } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'rxjs-observable-basics',
  template: `
    <h2>RxJS – Create Observable</h2>

    <div class="d-flex gap-2 mb-3">
      <button class="btn btn-dark btn-sm" (click)="runManual()">Manual Observable</button>
      <button class="btn btn-dark btn-sm" (click)="runOf()">of()</button>
      <button class="btn btn-dark btn-sm" (click)="runFrom()">from()</button>
      <button class="btn btn-dark btn-sm" (click)="runInterval()">interval()</button>
      <button class="btn btn-outline-danger btn-sm" (click)="clear()">Clear</button>
    </div>

    <pre class="p-3 bg-light border rounded">{{ log() }}</pre>
  `,
})
export class ObservableBasicsComponent implements OnDestroy {
  log = signal<string>('');
  private sub = new Subscription();

  private write(msg: string) {
    this.log.update(v => v + msg + '\n');
  }

  runManual() {
    this.clear();

    const obs$ = new Observable<number>((observer) => {
      this.write('Producer: start');
      observer.next(1);
      observer.next(2);

      setTimeout(() => {
        observer.next(3);
        observer.complete();
      }, 600);

      // cleanup
      return () => this.write('Producer: cleanup (unsubscribe)');
    });

    this.sub.add(
      obs$.subscribe({
        next: v => this.write(`next: ${v}`),
        error: e => this.write(`error: ${String(e)}`),
        complete: () => this.write('complete'),
      })
    );
  }

  runOf() {
    this.clear();
    this.sub.add(
      of('A', 'B', 'C').subscribe(v => this.write(`of next: ${v}`))
    );
  }

  runFrom() {
    this.clear();
    this.sub.add(
      from([10, 20, 30]).subscribe(v => this.write(`from next: ${v}`))
    );
  }

  runInterval() {
    this.clear();
    this.sub.add(
      interval(300).pipe(take(3)).subscribe(v => this.write(`interval next: ${v}`))
    );
  }

  clear() {
    this.log.set('');
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
