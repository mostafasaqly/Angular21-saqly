import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileDynamic } from './user-profile-dynamic';

describe('UserProfileDynamic', () => {
  let component: UserProfileDynamic;
  let fixture: ComponentFixture<UserProfileDynamic>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileDynamic]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfileDynamic);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
