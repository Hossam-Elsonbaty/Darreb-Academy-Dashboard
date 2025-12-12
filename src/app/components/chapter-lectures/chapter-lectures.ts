import { ChangeDetectorRef, Component } from '@angular/core';
import { IChapter, ICourse } from '../../models/i-course';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CoursesService } from '../../services/courses/courses.service';
import { AddChapterModalComponent } from "../add-chapter-modal-component/add-chapter-modal-component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chapter-lectures',
  imports: [AddChapterModalComponent,CommonModule, RouterLink],
  templateUrl: './chapter-lectures.html',
  styleUrl: './chapter-lectures.css',
})

export class ChapterLectures {

  isLoading: boolean = true;
  course: ICourse | null = null;
  chapterId: string = '';
  lectures: IChapter[] = [];

  isLectureModalOpen: boolean = false;
  isDeleteModalOpen: boolean = false;

  selectedLecture: IChapter | null = null;
  lectureIdToDelete: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {

    this.chapterId = this.route.snapshot.paramMap.get('id') ?? '';

    if (!this.chapterId) {
      console.error('NO COURSE ID FOUND IN URL');
      return;
    }

    this.loadCourse();
  }

  loadCourse() {
    this.coursesService.getChapterById(this.chapterId).subscribe({
      next: (res) => {
        this.course = res;
        this.lectures = res.chapters?.map((c: any) => c.chapter) ?? [];

        console.log("Loaded chapters:", this.lectures);

        this.isLoading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error("Error:", err);
        this.isLoading = false;
      }
    });
  }

  openChapterModal(chapter?: IChapter) {
    this.selectedLecture = chapter ?? null;
    this.isLectureModalOpen = true;
  }

  closeModalHandler() {
    this.isLectureModalOpen = false;
  }

  onChapterCreated(newChapter: IChapter) {
    this.lectures.push(newChapter);
    this.closeModalHandler();
  }
  updateLecture(id: string): void {
  const chapterToEdit = this.lectures.find((ch) => ch._id === id);
  if (chapterToEdit) {
    this.openChapterModal(chapterToEdit);
  }
}


  onChapterUpdate(updated: IChapter) {
    const index = this.lectures.findIndex(c => c._id === updated._id);
    if (index !== -1) {
      this.lectures[index] = updated;
    }
    this.closeModalHandler();
  }

  openDeleteLectureModal(id: string) {
    this.lectureIdToDelete = id;
    this.isDeleteModalOpen = true;
  }

  cancelDelete() {
    this.lectureIdToDelete = null;
    this.isDeleteModalOpen = false;
    this.cd.detectChanges();
  }
  confirmDeleteYes() {
    if (this.lectureIdToDelete) {
     this.coursesService.deleteChapter( this.lectureIdToDelete).subscribe({
        next: () => {
         this.lectures = this.lectures.filter(ch => ch._id !== this.lectureIdToDelete);

          console.log('chapter deleted and table updated!');
          this.cancelDelete();
        },
        error: (err) => console.error(err),
      });
    }
  }
}

