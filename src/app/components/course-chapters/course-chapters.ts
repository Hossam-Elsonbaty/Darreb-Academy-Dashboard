import { ChangeDetectorRef, Component } from '@angular/core';
import { IChapter, ICourse } from '../../models/i-course';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CoursesService } from '../../services/courses/courses.service';
import { AddChapterModalComponent } from "../add-chapter-modal-component/add-chapter-modal-component";
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-course-chapters',
  imports: [AddChapterModalComponent,CommonModule, RouterLink],
  templateUrl: './course-chapters.html',
  styleUrl: './course-chapters.css',
})
export class CourseChapters {

  isLoading: boolean = true;
  course: ICourse | null = null;
  courseId: string = '';
  chapters: IChapter[] = [];

  isChapterModalOpen: boolean = false;
  isDeleteModalOpen: boolean = false;

  selectedChapter: IChapter | null = null;
  chapterIdToDelete: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private cd: ChangeDetectorRef,
    private toastr : ToastrService
  ) {}

  ngOnInit() {

    this.courseId = this.route.snapshot.paramMap.get('id') ?? '';

    if (!this.courseId) {
      console.error('NO COURSE ID FOUND IN URL');
      return;
    }

    this.loadCourse();
  }

  loadCourse() {
    this.coursesService.getCourseChapters(this.courseId).subscribe({
      next: (res) => {
        this.chapters = res.data ?? [];

        console.log("Loaded chapters:", res.data);

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
    this.selectedChapter = chapter ?? null;
    this.isChapterModalOpen = true;
  }

  closeModalHandler() {
    this.isChapterModalOpen = false;
  }

  onChapterCreated(newChapter: IChapter) {
    this.chapters.push(newChapter);
    this.closeModalHandler();
  }
  updateChapter(id: string): void {
  const chapterToEdit = this.chapters.find((ch) => ch._id === id);
  if (chapterToEdit) {
    this.openChapterModal(chapterToEdit);
  }
}


  onChapterUpdate(updated: IChapter) {
    const index = this.chapters.findIndex(c => c._id === updated._id);
    if (index !== -1) {
      this.chapters[index] = updated;
    }
    this.closeModalHandler();
  }

  openDeleteChapterModal(id: string) {
    this.chapterIdToDelete = id;
    this.isDeleteModalOpen = true;
  }

  cancelDelete() {
    this.chapterIdToDelete = null;
    this.isDeleteModalOpen = false;
    this.cd.detectChanges();
  }

  // confirmDeleteYes() {
  //   if (!this.chapterIdToDelete || !this.courseId) return;

  //   this.coursesService.deleteChapter(this.courseId, this.chapterIdToDelete).subscribe({
  //     next: () => {
  //       this.chapters = this.chapters.filter(ch => ch.id !== this.chapterIdToDelete);
  //       this.cancelDelete();
  //     },
  //     error: err => console.error(err),
  //   });
  // }
  confirmDeleteYes() {
    if (this.chapterIdToDelete) {
     this.coursesService.deleteChapter( this.chapterIdToDelete).subscribe({
        next: () => {
          this.chapters = this.chapters.filter(ch => ch._id !== this.chapterIdToDelete);
          this.toastr.success("chapter deleted and table updated");
          console.log('chapter deleted and table updated!');
          this.cancelDelete();
        },
        error: (err) => {
          this.toastr.error("Error deleting chapter");
          console.error(err)
        }
      });
    }
  }
}
