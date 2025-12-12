import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLectureModal } from './add-lecture-modal';

describe('AddLectureModal', () => {
  let component: AddLectureModal;
  let fixture: ComponentFixture<AddLectureModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddLectureModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLectureModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
