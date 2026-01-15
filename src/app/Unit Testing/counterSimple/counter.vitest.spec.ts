import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CounterComponent } from './counter.component';

function text(fixture: any, id: string) {
  return (
    (fixture.debugElement.query(By.css(`[data-testid="${id}"]`)).nativeElement as HTMLElement)
      .textContent?.trim() ?? ''
  );
}

function click(fixture: any, id: string) {
  (fixture.debugElement.query(By.css(`[data-testid="${id}"]`)).nativeElement as HTMLButtonElement).click();
  fixture.detectChanges();
}

describe('CounterComponent (Vitest) - Simple', () => {
  it('1) renders default title and default count', async () => {
    await TestBed.configureTestingModule({ imports: [CounterComponent] }).compileComponents();
    const fixture = TestBed.createComponent(CounterComponent);
    fixture.detectChanges();

    expect(text(fixture, 'title')).toBe('Counter');
    expect(text(fixture, 'value')).toBe('0');
  });

  it('2) increments count', async () => {
    await TestBed.configureTestingModule({ imports: [CounterComponent] }).compileComponents();
    const fixture = TestBed.createComponent(CounterComponent);
    fixture.detectChanges();

    expect(text(fixture, 'value')).toBe('0');

    click(fixture, 'inc');
    expect(text(fixture, 'value')).toBe('1');

    click(fixture, 'inc');
    expect(text(fixture, 'value')).toBe('2');
  });

  it('3) decrements count', async () => {
    await TestBed.configureTestingModule({ imports: [CounterComponent] }).compileComponents();
    const fixture = TestBed.createComponent(CounterComponent);
    fixture.detectChanges();

    expect(text(fixture, 'value')).toBe('0');

    click(fixture, 'dec');
    expect(text(fixture, 'value')).toBe('-1');

    click(fixture, 'dec');
    expect(text(fixture, 'value')).toBe('-2');
  });

  it('4) increments and decrements', async () => {
    await TestBed.configureTestingModule({ imports: [CounterComponent] }).compileComponents();
    const fixture = TestBed.createComponent(CounterComponent);
    fixture.detectChanges();

    expect(text(fixture, 'value')).toBe('0');

    click(fixture, 'inc');
    expect(text(fixture, 'value')).toBe('1');

    click(fixture, 'inc');
    expect(text(fixture, 'value')).toBe('2');

    click(fixture, 'dec');
    expect(text(fixture, 'value')).toBe('1');

    click(fixture, 'dec');
    expect(text(fixture, 'value')).toBe('0');
  });

  it('5) emits saved output with current count', async () => {
    await TestBed.configureTestingModule({ imports: [CounterComponent] }).compileComponents();
    const fixture = TestBed.createComponent(CounterComponent);
    fixture.detectChanges();

    const component = fixture.componentInstance;

    expect(component.lastSaved()).toBeNull();

    click(fixture, 'inc');
    click(fixture, 'inc');
    click(fixture, 'inc');
    expect(text(fixture, 'value')).toBe('3');

    click(fixture, 'emit');
    expect(component.lastSaved()).toBe(3);

    click(fixture, 'inc');
    expect(text(fixture, 'value')).toBe('4');

    click(fixture, 'emit');
    expect(component.lastSaved()).toBe(4);
  });
});
