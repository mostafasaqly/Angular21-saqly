import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBiography } from './user-biography';

describe('UserBiography', () => {
  let component: UserBiography;
  let fixture: ComponentFixture<UserBiography>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserBiography]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserBiography);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
