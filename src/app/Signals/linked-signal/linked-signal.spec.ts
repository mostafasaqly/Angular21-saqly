import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkedSignal } from './linked-signal';

describe('LinkedSignal', () => {
  let component: LinkedSignal;
  let fixture: ComponentFixture<LinkedSignal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkedSignal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkedSignal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
