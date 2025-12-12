import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { ILecture } from '../../models/i-course';
import { CoursesService } from '../../services/courses/courses.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-lecture-modal',
  imports: [FormsModule, CommonModule],
  templateUrl: './add-lecture-modal.html',
  styleUrl: './add-lecture-modal.css',
})

export class AddLectureModal implements OnChanges {
  @Input() isOpen: boolean = false;
  @Input() lectureToEdit: ILecture | null = null;
  @Input() courseId!: string;
  @Output() refreshList = new EventEmitter<ILecture>();
  @Output() lectureUpdated  = new EventEmitter<ILecture>();
  @Output() closeModal = new EventEmitter<void>();
  onClose(): void {
    this.closeModal.emit();
    this.lectureProp = {} as ILecture;
  }
  lectureProp: ILecture = {} as ILecture;
  ngOnChanges() {
    if (this.lectureToEdit) {
      this.lectureProp = { ...this.lectureToEdit };
    } else {
      this.lectureProp = {} as ILecture;
    }
    console.log(this.lectureToEdit);
  }
  constructor(private courseService: CoursesService) {}
  handleLectureSubmit() {
    if (this.lectureToEdit && this.lectureToEdit._id) {
      this.courseService
        .updateLecture( this.lectureToEdit._id, this.lectureProp)
        .subscribe({
          next: (res) => {
            console.log('lecture updated:', res);
            this.lectureUpdated.emit(res);
            this.closeModal.emit();
          },
          error: (error) => {
            console.error('Error updating lecture:', error);
          },
        });
    }else{ this.courseService
      .addLecture(this.courseId, this.lectureProp)
      .subscribe({
        next: (res) => {
          console.log('lecture added:', res);
          this.refreshList.emit(res);
          this.closeModal.emit();
        },
        error: (error) => {
          console.error('Error adding lecture:', error);
        },
      });}
  }
}
