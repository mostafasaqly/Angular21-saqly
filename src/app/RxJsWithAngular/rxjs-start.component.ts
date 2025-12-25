import { Component, signal } from '@angular/core';
import { OutputInteropDemoComponent } from './output-interop-demo.component';
import { TakeUntilDestroyedDemoComponent } from './take-until-destroyed-demo.component';
import { ToSignalDemoComponent } from './to-signal-demo.component';


type View = 'toSignal' | 'output' | 'take';

@Component({
  standalone: true,
  selector: 'rxjs-shell-3',
  imports: [ OutputInteropDemoComponent, TakeUntilDestroyedDemoComponent, ToSignalDemoComponent],
  template: `
    <h2>RxJS Demo (Create → Operators → Combine)</h2>

    <div class="btn-group mb-3">
      <button class="btn btn-dark btn-sm" (click)="view.set('toSignal')">to Signal</button>
      <button class="btn btn-dark btn-sm" (click)="view.set('output')">output</button>
      <button class="btn btn-dark btn-sm" (click)="view.set('take')">take</button>
    </div>

    @switch (view()) {
      @case ('toSignal') { <to-signal-demo /> }
      @case ('output') { <output-interop-demo /> }
      @case ('take') { <take-until-destroyed-demo /> }
    }
  `,
})
export class RxjsStartWithAngularComponent {
  view = signal<View>('toSignal');
}
