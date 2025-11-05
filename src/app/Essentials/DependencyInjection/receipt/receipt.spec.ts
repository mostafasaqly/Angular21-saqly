import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Receipt } from './receipt';

describe('Receipt', () => {
  let component: Receipt;
  let fixture: ComponentFixture<Receipt>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Receipt]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Receipt);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
