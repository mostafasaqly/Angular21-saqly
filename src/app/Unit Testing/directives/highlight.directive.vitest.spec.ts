import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HighlightDirective } from './highlight.directive';

@Component({
  imports: [HighlightDirective],
  template: `<p data-testid="p" [demoHighlight]="'red'">Hello</p>`,
})
class HostComponent {}

describe('HighlightDirective (Vitest) - Simple', () => {
  it('highlights on enter and clears on leave', async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();

    const de = fixture.debugElement.query(By.css('[data-testid="p"]'));
    const el = de.nativeElement as HTMLElement;

    de.triggerEventHandler('mouseenter', new Event('mouseenter'));
    fixture.detectChanges();
    expect(el.style.backgroundColor).toBe('red');

    de.triggerEventHandler('mouseleave', new Event('mouseleave'));
    fixture.detectChanges();
    expect(el.style.backgroundColor).toBe('');
  });
});
