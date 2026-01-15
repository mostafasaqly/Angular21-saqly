import { Directive, ElementRef, HostListener, Input, inject } from '@angular/core';

@Directive({
  selector: '[demoHighlight]',
})
export class HighlightDirective {
  @Input('demoHighlight') color = 'yellow';

  private el = inject(ElementRef<HTMLElement>);

  @HostListener('mouseenter')
  onEnter() {
    this.el.nativeElement.style.backgroundColor = this.color;
  }

  @HostListener('mouseleave')
  onLeave() {
    this.el.nativeElement.style.backgroundColor = '';
  }
}
