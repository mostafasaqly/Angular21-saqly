import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LoginFormComponent } from './login-form.component';

function getElement(fixture: any, testId: string): HTMLElement {
  return fixture.debugElement.query(By.css(`[data-testid="${testId}"]`))?.nativeElement;
}

function getText(fixture: any, testId: string): string {
  return getElement(fixture, testId)?.textContent?.trim() ?? '';
}

function setValue(fixture: any, testId: string, value: string) {
  const input = getElement(fixture, testId) as HTMLInputElement;
  input.value = value;
  input.dispatchEvent(new Event('input'));
  fixture.detectChanges();
}

function click(fixture: any, testId: string) {
  const button = getElement(fixture, testId) as HTMLButtonElement;
  button.click();
  fixture.detectChanges();
}

function blur(fixture: any, testId: string) {
  const element = getElement(fixture, testId);
  element.dispatchEvent(new Event('blur'));
  fixture.detectChanges();
}

function isDisabled(fixture: any, testId: string): boolean {
  const button = getElement(fixture, testId) as HTMLButtonElement;
  return button.disabled;
}

describe('LoginFormComponent (Vitest)', () => {

  it('1) renders form with email and password inputs', async () => {
    await TestBed.configureTestingModule({ imports: [LoginFormComponent] }).compileComponents();
    const fixture = TestBed.createComponent(LoginFormComponent);
    fixture.detectChanges();

    expect(getElement(fixture, 'form')).toBeTruthy();
    expect(getElement(fixture, 'email')).toBeTruthy();
    expect(getElement(fixture, 'password')).toBeTruthy();
    expect(getElement(fixture, 'submit')).toBeTruthy();
  });

  it('2) submit button is disabled when form is invalid', async () => {
    await TestBed.configureTestingModule({ imports: [LoginFormComponent] }).compileComponents();
    const fixture = TestBed.createComponent(LoginFormComponent);
    fixture.detectChanges();

    expect(isDisabled(fixture, 'submit')).toBe(true);
  });

  it('3) submit button is enabled when form is valid', async () => {
    await TestBed.configureTestingModule({ imports: [LoginFormComponent] }).compileComponents();
    const fixture = TestBed.createComponent(LoginFormComponent);
    fixture.detectChanges();

    setValue(fixture, 'email', 'test@example.com');
    setValue(fixture, 'password', '123456');

    expect(isDisabled(fixture, 'submit')).toBe(false);
  });

  it('4) shows email error when email is invalid and touched', async () => {
    await TestBed.configureTestingModule({ imports: [LoginFormComponent] }).compileComponents();
    const fixture = TestBed.createComponent(LoginFormComponent);
    fixture.detectChanges();

    expect(getElement(fixture, 'emailError')).toBeFalsy();

    setValue(fixture, 'email', 'invalid-email');

    expect(getElement(fixture, 'emailError')).toBeFalsy();

    blur(fixture, 'email');

    expect(getElement(fixture, 'emailError')).toBeTruthy();
    expect(getText(fixture, 'emailError')).toBe('Email invalid');
  });

  it('5) does not show email error when email is valid', async () => {
    await TestBed.configureTestingModule({ imports: [LoginFormComponent] }).compileComponents();
    const fixture = TestBed.createComponent(LoginFormComponent);
    fixture.detectChanges();

    setValue(fixture, 'email', 'test@example.com');
    blur(fixture, 'email');

    expect(getElement(fixture, 'emailError')).toBeFalsy();
  });

  it('6) emits loggedIn event with form values on submit', async () => {
    await TestBed.configureTestingModule({ imports: [LoginFormComponent] }).compileComponents();
    const fixture = TestBed.createComponent(LoginFormComponent);
    fixture.detectChanges();

    const component = fixture.componentInstance;
    let emittedValue: any = null;

    component.loggedIn.subscribe((value) => {
      emittedValue = value;
    });

    setValue(fixture, 'email', 'user@test.com');
    setValue(fixture, 'password', 'password123');

    click(fixture, 'submit');

    expect(emittedValue).toEqual({
      email: 'user@test.com',
      password: 'password123',
    });
  });

  it('7) does not emit loggedIn when form is invalid', async () => {
    await TestBed.configureTestingModule({ imports: [LoginFormComponent] }).compileComponents();
    const fixture = TestBed.createComponent(LoginFormComponent);
    fixture.detectChanges();

    const component = fixture.componentInstance;
    let emittedValue: any = null;

    component.loggedIn.subscribe((value) => {
      emittedValue = value;
    });

    setValue(fixture, 'email', 'invalid');
    setValue(fixture, 'password', '123');

    click(fixture, 'submit');

    expect(emittedValue).toBeNull();
  });

  it('8) validates password minimum length', async () => {
    await TestBed.configureTestingModule({ imports: [LoginFormComponent] }).compileComponents();
    const fixture = TestBed.createComponent(LoginFormComponent);
    fixture.detectChanges();

    const component = fixture.componentInstance;

    // password
    setValue(fixture, 'email', 'test@example.com');
    setValue(fixture, 'password', '12345');

    expect(component.form.controls.password.invalid).toBe(true);
    expect(isDisabled(fixture, 'submit')).toBe(true);

    // password
    setValue(fixture, 'password', '123456');

    expect(component.form.controls.password.valid).toBe(true);
    expect(isDisabled(fixture, 'submit')).toBe(false);
  });

  it('9) validates email format', async () => {
    await TestBed.configureTestingModule({ imports: [LoginFormComponent] }).compileComponents();
    const fixture = TestBed.createComponent(LoginFormComponent);
    fixture.detectChanges();

    const component = fixture.componentInstance;

    // email
    setValue(fixture, 'email', 'notanemail');
    setValue(fixture, 'password', '123456');

    expect(component.form.controls.email.invalid).toBe(true);
    expect(isDisabled(fixture, 'submit')).toBe(true);

    // email
    setValue(fixture, 'email', 'valid@email.com');

    expect(component.form.controls.email.valid).toBe(true);
    expect(isDisabled(fixture, 'submit')).toBe(false);
  });

  it('10) requires both email and password', async () => {
    await TestBed.configureTestingModule({ imports: [LoginFormComponent] }).compileComponents();
    const fixture = TestBed.createComponent(LoginFormComponent);
    fixture.detectChanges();

    const component = fixture.componentInstance;

    expect(component.form.invalid).toBe(true);

    // email
    setValue(fixture, 'email', 'test@example.com');
    expect(component.form.invalid).toBe(true);

    // password
    component.form.reset();
    fixture.detectChanges();
    setValue(fixture, 'password', '123456');
    expect(component.form.invalid).toBe(true);

    setValue(fixture, 'email', 'test@example.com');
    setValue(fixture, 'password', '123456');
    expect(component.form.valid).toBe(true);
  });
});
