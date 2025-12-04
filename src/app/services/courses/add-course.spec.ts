import { TestBed } from '@angular/core/testing';

import { AddCourse } from './add-course';

describe('AddCourse', () => {
  let service: AddCourse;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddCourse);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
