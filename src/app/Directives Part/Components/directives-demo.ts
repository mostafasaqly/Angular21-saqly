import { Component } from '@angular/core';



import { ComposedButton } from './composed-button';
import { ImageOptimizedDemo } from './image-optimized-demo';
import { Unless } from '../Directives/unless';
import { Highlight } from '../Directives/highlight.directive';
@Component({
  standalone: true,
  selector: 'directives-demo',
  imports: [
    Unless,
    ComposedButton,
    ImageOptimizedDemo,
    Highlight
],
  template: `
    <h1>Angular Directives Demo</h1>

    <section class="demo-block">
      <h2>1. Attribute Directive</h2>
      <p  [Highlight]="colorNew" [defaultColor]="'#333'" >
        Hover here to see <strong>appHighlight</strong> in action.
      </p>
    </section>

    <section class="demo-block">
      <h2>2. Structural Directive</h2>

      <button (click)="show = !show">
        Toggle *Unless (show = {{ show }})
      </button>

      <p *Unless="show" class="box">
        This text appears only when <code>show === false</code>.
      </p>
    </section>

    <section class="demo-block">
  <h2>3. Directive Composition API</h2>

  <composed-button
    label="Save changes"
    mode="primary"
    (buttonClick)="onBtnClick($event)"
  ></composed-button>

  <composed-button
    label="Delete"
    mode="danger"
    (buttonClick)="onBtnClick($event)"
  ></composed-button>

  @if(lastClick){
  <div class="click-log" >
    Last click:
    <strong>{{ lastClick.label }}</strong>
    (mode: {{ lastClick.mode }})
    at {{ lastClick.time }} – {{ lastClick.date }}
  </div>
  }

</section>

<section class="demo-block">
  <h2>3. Directive Composition API</h2>

  <div class="btn-row">
    @for(b of buttons; track $index){
    <composed-button
      [label]="b.label"
      [mode]="b.mode"
      (buttonClick)="onBtnClick($event)"
    ></composed-button>
}
  </div>

  @if(lastClick){
  <div class="click-log" >
    Last click:
    <strong>{{ lastClick.label }}</strong>
    (mode: {{ lastClick.mode }})
    at {{ lastClick.time }} – {{ lastClick.date }}
  </div>
  }
</section>




    <section class="demo-block">
      <h2>4. Optimizing images with NgOptimizedImage</h2>
      <image-optimized-demo></image-optimized-demo>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
        padding: 1.5rem;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
          sans-serif;
      }

      .demo-block {
        border: 1px solid #444;
        padding: 1rem;
        margin-bottom: 1.5rem;
        border-radius: 8px;
      }

      .box {
        padding: 0.75rem;
        border-radius: 6px;
        border: 1px dashed #888;
      }

      button {
        margin-bottom: 0.75rem;
      }
      .click-log {
        margin-top: 1rem;
        padding: 0.5rem 0.75rem;
        border-radius: 6px;
        background: #f3f4ff;
        font-size: 0.9rem;
      }
      .btn-row {
        display: flex;
        gap: 0.75rem;
        flex-wrap: wrap;
      }


    `,
  ],
})
export class DirectivesDemo {
  show = true;
  lastClick:
    | { label: string; mode: string; date: string; time: string }
    | null = null;

  onBtnClick(e: any) {
    this.lastClick = e;
    console.log('Button clicked →', e);
  }
  buttons: { label: string; mode: 'primary' | 'danger' }[] = [
  { label: 'Save changes', mode: 'primary' },
  { label: 'Delete', mode: 'danger' },
];

colorNew:string='blue';
}
