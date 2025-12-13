import { ChangeDetectorRef, Component } from '@angular/core';
import { ICourse, ILecture } from '../../models/i-course';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CoursesService } from '../../services/courses/courses.service';
import { AddChapterModalComponent } from "../add-chapter-modal-component/add-chapter-modal-component";
import { CommonModule } from '@angular/common';
import { AddLectureModal } from "../add-lecture-modal/add-lecture-modal";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-chapter-lectures',
  imports: [CommonModule, RouterLink, AddLectureModal],
  templateUrl: './chapter-lectures.html',
  styleUrl: './chapter-lectures.css',
})

export class ChapterLectures {

  isLoading: boolean = true;
  // course: ICourse | null = null;
  chapterId: string = '';
  lectures: ILecture[] = [];

  isLectureModalOpen: boolean = false;
  isDeleteModalOpen: boolean = false;

  selectedLecture: ILecture | null = null;
  lectureIdToDelete: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private cd: ChangeDetectorRef,
    private toastr: ToastrService
  ) {}

  ngOnInit() {

    this.chapterId = this.route.snapshot.paramMap.get('id') ?? '';

    if (!this.chapterId) {
      console.error('NO COURSE ID FOUND IN URL');
      return;
    }

    this.loadLectures();
  }

  loadLectures() {
    this.coursesService.getAllLectures(this.chapterId).subscribe({
      next: (res) => {
        console.log(res);
        this.lectures = res;
        // this.lectures = res.lectures;
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

  openLectureModal(lecture?: ILecture) {
    this.selectedLecture = lecture ?? null;
    this.isLectureModalOpen = true;
  }

  closeModalHandler() {
    this.isLectureModalOpen = false;
  }

  onLectureCreated(newLecture: ILecture) {
    this.lectures.push(newLecture);
    this.closeModalHandler();
  }
  updateLecture(id: string): void {
  const lectureToEdit = this.lectures.find((ch) => ch._id === id);
  if (lectureToEdit) {
    this.openLectureModal(lectureToEdit);
  }
}


  onLectureUpdate(updated: ILecture) {
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
     this.coursesService.deleteLecture( this.lectureIdToDelete).subscribe({
        next: () => {
          this.lectures = this.lectures.filter(ch => ch._id !== this.lectureIdToDelete);
          this.toastr.success('Lecture deleted successfully');
          console.log('chapter deleted and table updated!');
          this.cancelDelete();
        },
        error: (err) => {
          this.toastr.error('Error deleting lecture');
          console.error(err)
        },
      });
    }
  }
}

