import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterLectures } from './chapter-lectures';

describe('ChapterLectures', () => {
  let component: ChapterLectures;
  let fixture: ComponentFixture<ChapterLectures>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChapterLectures]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChapterLectures);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
