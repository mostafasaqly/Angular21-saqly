import { Component, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, Subscription, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map, mergeMap, concatMap, exhaustMap, tap, catchError, finalize } from 'rxjs/operators';
import { RxjsDemoService, Post } from './rxjs-demo.service';

@Component({
  standalone: true,
  selector: 'rxjs-operators-http',
  imports: [CommonModule, FormsModule],
  template: `
    <h2>RxJS + HttpClient Operators</h2>

    <div class="row g-3">
      <div class="col-md-6">
        <div class="p-3 border rounded bg-light">
          <h5 class="mb-2">switchMap (Search)</h5>

          <input class="form-control"
                 placeholder="type to search (client-filtered)..."
                 [(ngModel)]="query"
                 (ngModelChange)="search$.next($event)" />

          <small class="text-muted">debounceTime + distinctUntilChanged + switchMap</small>

          <ul class="mt-3">
            @for (p of searchResults(); track p.id) {
              <li>#{{p.id}} - {{ p.title }}</li>
            }
          </ul>
        </div>
      </div>

      <div class="col-md-6">
        <div class="p-3 border rounded bg-light">
          <h5 class="mb-2">exhaustMap (Prevent double submit)</h5>

          <button class="btn btn-dark btn-sm" (click)="saveClicks$.next()"
                  [disabled]="saving()">
            {{ saving() ? 'Saving...' : 'Create Post' }}
          </button>

          <pre class="mt-3 p-2 bg-white border rounded">{{ createdJson() }}</pre>
        </div>
      </div>

      <div class="col-md-6">
        <div class="p-3 border rounded bg-light">
          <h5 class="mb-2">mergeMap (Parallel)</h5>

          <button class="btn btn-dark btn-sm" (click)="runMergeMap()">Load details for ids: 1,2,3 in parallel</button>
          <pre class="mt-3 p-2 bg-white border rounded">{{ mergeLog() }}</pre>
        </div>
      </div>

      <div class="col-md-6">
        <div class="p-3 border rounded bg-light">
          <h5 class="mb-2">concatMap (Queue)</h5>

          <button class="btn btn-dark btn-sm" (click)="runConcatMap()">Load details for ids: 1,2,3 in order</button>
          <pre class="mt-3 p-2 bg-white border rounded">{{ concatLog() }}</pre>
        </div>
      </div>
    </div>
  `,
})
export class OperatorsHttpComponent implements OnDestroy {
  private api = inject(RxjsDemoService);

  query = '';
  searchResults = signal<Post[]>([]);
  saving = signal(false);
  createdJson = signal('');

  mergeLog = signal('');
  concatLog = signal('');

  search$ = new Subject<string>();
  saveClicks$ = new Subject<void>();

  private sub = new Subscription();

  constructor() {
    // switchMap search stream
    this.sub.add(
      this.search$.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(q =>
          this.api.searchPosts(q, 10).pipe(
            // client-side filter (demo)
            map(list => list.filter(p => p.title.toLowerCase().includes((q ?? '').toLowerCase()))),
            catchError(() => of([]))
          )
        )
      ).subscribe(results => this.searchResults.set(results))
    );

    // exhaustMap submit stream (ignore clicks while request is running)
    this.sub.add(
      this.saveClicks$.pipe(
        tap(() => {
          this.saving.set(true);
          this.createdJson.set('');
        }),
        exhaustMap(() =>
          this.api.createPost({
            userId: 1,
            title: 'Created from RxJS exhaustMap',
            body: 'This prevents double submit.',
          }).pipe(
            finalize(() => this.saving.set(false)),
            catchError(err => {
              this.createdJson.set('Error: ' + (err.message ?? 'Unknown'));
              return of(null);
            })
          )
        )
      ).subscribe(res => {
        if (res) this.createdJson.set(JSON.stringify(res, null, 2));
      })
    );
  }

  runMergeMap() {
    this.mergeLog.set('');
    const ids = [1, 2, 3];

    this.sub.add(
      of(...ids).pipe(
        mergeMap(id => this.api.getPost(id)),
      ).subscribe(p => {
        this.mergeLog.update(v => v + `#${p.id}: ${p.title}\n`);
      })
    );
  }

  runConcatMap() {
    this.concatLog.set('');
    const ids = [1, 2, 3];

    this.sub.add(
      of(...ids).pipe(
        concatMap(id => this.api.getPost(id)),
      ).subscribe(p => {
        this.concatLog.update(v => v + `#${p.id}: ${p.title}\n`);
      })
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
