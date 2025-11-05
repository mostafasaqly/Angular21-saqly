import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePhoto } from './profile-photo';

describe('ProfilePhoto', () => {
  let component: ProfilePhoto;
  let fixture: ComponentFixture<ProfilePhoto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilePhoto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilePhoto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
