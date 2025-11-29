import { ChangeDetectorRef, Component } from '@angular/core';
import { ICourse } from '../../models/i-course';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-courses',
  imports: [],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export class Courses {
    allCourses !:ICourse[];
  constructor(private courses:CoursesService,private cd:ChangeDetectorRef){
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

}
