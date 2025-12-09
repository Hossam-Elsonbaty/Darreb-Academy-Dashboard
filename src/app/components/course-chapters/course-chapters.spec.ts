import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseChapters } from './course-chapters';

describe('CourseChapters', () => {
  let component: CourseChapters;
  let fixture: ComponentFixture<CourseChapters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseChapters]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseChapters);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
