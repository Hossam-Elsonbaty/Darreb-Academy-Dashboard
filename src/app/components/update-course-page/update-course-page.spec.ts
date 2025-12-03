import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCoursePage } from './update-course-page';

describe('UpdateCoursePage', () => {
  let component: UpdateCoursePage;
  let fixture: ComponentFixture<UpdateCoursePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCoursePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCoursePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
