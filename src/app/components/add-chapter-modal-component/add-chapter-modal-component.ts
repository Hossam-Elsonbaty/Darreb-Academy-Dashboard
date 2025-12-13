import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { IChapter, ICourse } from '../../models/i-course';
import { CoursesService } from '../../services/courses/courses.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

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
    console.log(this.chapterToEdit);

  }
  constructor(private courseService: CoursesService,private toastr:ToastrService) {}
  handleChapterSubmit() {
     if (this.chapterToEdit && this.chapterToEdit._id) {
      this.courseService
        .updateChapter( this.chapterToEdit._id, this.chapterProp)
        .subscribe({
          next: (res) => {
            this.toastr.success("Chapter updated successfully");
            console.log('Chapter updated:', res);
            this.chapterUpdated.emit(res);
            this.closeModal.emit();
          },
          error: (error) => {
            this.toastr.error("Error updating chapter");
            console.error('Error updating chapter:', error);
          },
        });
    }else{ this.courseService
      .addChapter(this.courseId, this.chapterProp)
      .subscribe({
        next: (res) => {
          console.log('Chapter added:', res);
          this.toastr.error("Chapter added successfully");
          this.refreshList.emit(res);
          this.closeModal.emit();
        },
        error: (error) => {
          this.toastr.error("Error adding chapter");
          console.error('Error adding chapter:', error);
        },
      });}
  }


}
