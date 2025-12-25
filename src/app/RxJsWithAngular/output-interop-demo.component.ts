import { Component, Directive, output } from '@angular/core';
import { Subject } from 'rxjs';
import { outputFromObservable, outputToObservable } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[dragLike]',
  exportAs: 'dragLike',
  standalone: true,
})
export class DragLikeDirective {
  private move$ = new Subject<{ x: number; y: number }>();

  moved = outputFromObservable(this.move$);

  simulateMove() {
    this.move$.next({
      x: Math.floor(Math.random() * 100),
      y: Math.floor(Math.random() * 100),
    });
  }
}

@Component({
  selector: 'app-slider',
  template: `
    <div class="border rounded p-3">
      <input
        type="range"
        class="form-range"
        min="0"
        max="100"
        [value]="value"
        (input)="emit($any($event.target).valueAsNumber)"
      />
      <div>Value: {{ value }}</div>
    </div>
  `,
})
export class SliderComponent {
  value = 50;

  valueChange = output<number>();

  valueChange$ = outputToObservable(this.valueChange);

  emit(v: number) {
    this.value = v;
    this.valueChange.emit(v);
  }
}

@Component({
  imports: [ DragLikeDirective, SliderComponent],
  selector: 'output-interop-demo',
  template: `
    <h2>RxJS Interop – Output interop</h2>

    <div dragLike #d="dragLike" (moved)="onMoved($event)" class="p-3 border rounded">
      <button class="btn btn-dark btn-sm" (click)="d.simulateMove()">Simulate move event</button>
      <div class="mt-2">Last moved: {{ last }}</div>
    </div>

    <hr />

    <h5>Output → Observable</h5>
    <app-slider (valueChange)="onSlider($event)"></app-slider>
  `,
})
export class OutputInteropDemoComponent {
  last = '—';

  onMoved(v: { x: number; y: number }) {
    this.last = `x=${v.x}, y=${v.y}`;
  }

  onSlider(v: number) {
    console.log('[slider output]', v);
  }
}
