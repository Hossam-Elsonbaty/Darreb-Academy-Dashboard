import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { IChapter, ICourse } from '../../models/i-course';
import { CoursesService } from '../../services/courses/courses.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-chapter-modal-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './add-chapter-modal-component.html',
  styleUrl: './add-chapter-modal-component.css',
})
export class AddChapterModalComponent implements OnChanges {

  @Input() isOpen: boolean = false;
  @Input() chapterToEdit: IChapter | null = null;
  @Input() courseId!: string;

  @Output() refreshList = new EventEmitter<IChapter>();
  @Output() chapterUpdated  = new EventEmitter<IChapter>();
  @Output() closeModal = new EventEmitter<void>();
  onClose(): void {
    this.closeModal.emit();
    this.chapterProp = {} as IChapter;

  }
  chapterProp: IChapter = {} as IChapter;
  ngOnChanges() {
    if (this.chapterToEdit) {
      this.chapterProp = { ...this.chapterToEdit };
    } else {
      this.chapterProp = {} as IChapter;
    }
  }
  constructor(private courseService: CoursesService) {}
  handleChapterSubmit() {
     if (this.chapterToEdit && this.chapterToEdit.id) {
      this.courseService
        .updateChapter( this.chapterToEdit.id, this.chapterProp)
        .subscribe({
          next: (res) => {
            console.log('Chapter updated:', res);
            this.chapterUpdated.emit(res);
            this.closeModal.emit();
          },
          error: (error) => {
            console.error('Error updating chapter:', error);
          },
        });
    }else{ this.courseService
      .addChapter(this.courseId, this.chapterProp)
      .subscribe({
        next: (res) => {
          console.log('Chapter added:', res);
          this.refreshList.emit(res);
          this.closeModal.emit();
        },
        error: (error) => {
          console.error('Error adding chapter:', error);
        },
      });}
  }


}
