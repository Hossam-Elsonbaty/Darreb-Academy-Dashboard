import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { ICourse } from '../../models/i-course';
import { CoursesService } from '../../services/courses/courses.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Loader } from "../loader/loader";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-courses',
  imports: [RouterLink, CommonModule, Loader],
  templateUrl: './courses.html',
  styleUrls: ['./courses.css'],
})
export class Courses {
  isDeleteModalOpen: boolean = false;
  courseIdToDelete: string | null = null;
  allCourses !:ICourse[];
  constructor(@Inject(CoursesService) private courses: CoursesService, private cd: ChangeDetectorRef, private toastr:ToastrService){
    this.courses.getAllCourses().subscribe((data)=>{
      this.allCourses = data
      console.log(data);
      this.cd.detectChanges()
    })
  }
  isModalOpen: boolean = false;
  openModal(): void {
    this.isModalOpen = true;
    console.log("modal opened");
  }
  closeModalHandler(): void {
    this.isModalOpen = false;
  }
  onUserCreated(CourseData: any): void {
    console.log('New Cousre data:', CourseData);
    this.closeModalHandler();
  }
      openDeleteModal(id: string) {
    this.courseIdToDelete = id;
    this.isDeleteModalOpen = true;
  }
  cancelDelete() {
    this.courseIdToDelete = null;
    this.isDeleteModalOpen = false;
    this.cd.detectChanges();
  }
  confirmDeleteYes() {
  if (this.courseIdToDelete) {
    this.courses.deleteCourse(this.courseIdToDelete).subscribe({
      next: () => {
        this.allCourses = this.allCourses.filter(
          (course) => course._id !== this.courseIdToDelete
        );
        this.toastr.success("Course deleted and table updated");
        console.log('Course deleted and table updated!');
        this.cancelDelete();
      },
      error: (err) => {
        this.toastr.error("Error deleting course");
        console.error(err)
      }
    });
  }
}

}
