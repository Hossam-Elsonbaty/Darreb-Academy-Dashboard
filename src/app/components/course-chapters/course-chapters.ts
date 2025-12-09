import { ChangeDetectorRef, Component } from '@angular/core';
import { ICourse } from '../../models/i-course';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../services/courses/courses.service';

@Component({
  selector: 'app-course-chapters',
  imports: [],
  templateUrl: './course-chapters.html',
  styleUrl: './course-chapters.css',
})
export class CourseChapters {

  isLoading: boolean = true;
  course: ICourse | null = null;
  chapters: any[] = [];


  constructor(private route: ActivatedRoute,
              private coursesService: CoursesService,private cd :ChangeDetectorRef) {}

  ngOnInit() {
    const courseId = this.route.snapshot.paramMap.get('id');
    if (courseId) {
      this.coursesService.getCourseById(courseId).subscribe({
        next: (res ) => {
          console.log('API Response:', res);
          this.course = res;
          this.chapters = res.chapters?.map((c: any) => c.chapter) ?? [];
          console.log('Processed Chapters:', this.chapters);
          this.isLoading = false;
          this.cd.detectChanges();
        },
        error: (err) => {
          console.error('Error fetching course details:', err);
          this.isLoading = false;
        },
      });
    } else {
       console.warn('Course ID not found in route parameters.');
       this.isLoading = false;
    }
  }
}

