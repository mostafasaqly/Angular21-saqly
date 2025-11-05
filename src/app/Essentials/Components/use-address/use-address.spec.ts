import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseAddress } from './use-address';

describe('UseAddress', () => {
  let component: UseAddress;
  let fixture: ComponentFixture<UseAddress>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UseAddress]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UseAddress);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
