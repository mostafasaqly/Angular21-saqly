import { Component, signal } from '@angular/core';

@Component({
  standalone: true,
  template: `
    <section class="card">
      <h2>animate.enter (CSS class)</h2>
      <button class="btn" (click)="toggleEnter()">Toggle</button>

      @if (showEnter()) {
        <div class="box enter-base" animate.enter="enter-animation">
          <b>Entering…</b>
          <div class="muted">
            The class is applied on enter and removed after the animation finishes.
          </div>
        </div>
      }
    </section>

    <section class="card">
      <h2>animate.enter (Binding)</h2>
      <button class="btn" (click)="toggleEnterBinding()">Toggle</button>
      <button class="btn ghost" (click)="swapEnterStyle()">Swap style</button>

      @if (showEnterBinding()) {
        <div class="box enter-base" [animate.enter]="enterClass()">
          <b>Entering (binding)…</b>
          <div class="muted">
            Class comes from a signal: {{ enterClass() }}
          </div>
        </div>
      }
    </section>

    <section class="card">
      <h2>animate.leave (CSS transition + @starting-style)</h2>
      <button class="btn" (click)="toggleLeave()">Toggle</button>

      @if (showLeave()) {
        <div class="box leave-base" animate.leave="leaving">
          <b>Leaving…</b>
          <div class="muted">
            Angular removes the element from the DOM after the leave animation completes.
          </div>
        </div>
      }
    </section>

    <section class="card">
      <h2>animate.leave (Function callback)</h2>
      <button class="btn" (click)="toggleLeaveFn()">Toggle</button>

      @if (showLeaveFn()) {
        <!-- Using the event binding form -->
        <div class="box leave-base" (animate.leave)="leavingFn($event)">
          <b>Leaving (function)…</b>
          <div class="muted">
            Call <code>animationComplete()</code> to tell Angular when it can remove the element.
          </div>
        </div>
      }
    </section>

    <section class="card">
      <h2>Important nuance</h2>
      <div class="muted">
        The <code>animate.leave</code> directive must be on the same element that is actually being removed.
        If the parent is removed, the child does not get a leave animation.
      </div>

      <button class="btn" (click)="toggleParentCase()">Toggle</button>

      @if (showParentCase()) {
        <div class="parent">
          <!-- This will NOT animate out, because the parent node is removed immediately -->
          <div class="box leave-base" animate.leave="leaving">
            <b>Won’t animate out</b>
            <div class="muted">
              The parent is removed first, so the child disappears with the subtree.
            </div>
          </div>
        </div>
      }
    </section>
  `,
  styles: [`
    .card { border: 1px solid #1f2937; border-radius: 16px; padding: 16px; background: rgba(255,255,255,0.03); margin-bottom: 14px; max-width: 760px; }
    .btn { padding: 10px 14px; border-radius: 12px; border: 1px solid #334155; background: #0b1220; color: #e5e7eb; cursor: pointer; margin-right: 8px; }
    .btn.ghost { background: transparent; }
    .box { margin-top: 12px; padding: 14px; border-radius: 14px; border: 1px solid #2b364a; background: rgba(148,163,184,0.06); }
    .muted { opacity: 0.8; margin-top: 6px; font-size: 13px; color: #cbd5e1; }
    .parent { padding: 10px; border-radius: 14px; border: 1px dashed #334155; margin-top: 10px; }

    /* ENTER: keyframes example */
    .enter-animation { animation: slideFadeIn 420ms ease-out both; }
    .enter-animation-2 { animation: zoomIn 360ms cubic-bezier(.2,.8,.2,1) both; }

    @keyframes slideFadeIn {
      from { opacity: 0; transform: translateY(16px) scale(0.98); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes zoomIn {
      from { opacity: 0; transform: scale(0.92); }
      to   { opacity: 1; transform: scale(1); }
    }

    /* LEAVE: transition example using @starting-style */
    .leave-base {
      opacity: 1;
      transition: opacity 180ms ease-in;
      /* Ensures the transition has a valid starting point for some browsers */
      @starting-style { opacity: 0; }
    }

    .leaving {
      opacity: 0;
      transform: translateY(12px);
      transition: opacity 280ms ease-out, transform 280ms ease-out;
    }
  `],
})
export class EnterLeaveDemoComponent {
  showEnter = signal(false);
  showEnterBinding = signal(false);
  showLeave = signal(false);
  showLeaveFn = signal(false);
  showParentCase = signal(false);

  enterClass = signal<'enter-animation' | 'enter-animation-2'>('enter-animation');

  toggleEnter() { this.showEnter.update(v => !v); }
  toggleEnterBinding() { this.showEnterBinding.update(v => !v); }
  toggleLeave() { this.showLeave.update(v => !v); }
  toggleLeaveFn() { this.showLeaveFn.update(v => !v); }
  toggleParentCase() { this.showParentCase.update(v => !v); }

  swapEnterStyle() {
    this.enterClass.set(this.enterClass() === 'enter-animation' ? 'enter-animation-2' : 'enter-animation');
  }

  leavingFn(event: any) {
    // event.target: the DOM element being removed
    // event.animationComplete(): call this when your custom animation finishes
    // If you integrate a JS animation library, call animationComplete() in its onComplete callback.
    event.animationComplete();
  }
}
