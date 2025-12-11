// import { CoursesService } from './../../services/courses/courses.service';
// import { ChangeDetectorRef, Component } from '@angular/core';
// import {
//   FormBuilder,
//   FormGroup,
//   ReactiveFormsModule,
//   Validators,
//   ɵInternalFormsSharedModule,
// } from '@angular/forms';
// import { ICourse } from '../../models/i-course';
// import { CategoriesService } from '../../services/categories/categories.service';
// import { CommonModule } from '@angular/common';
// import { ICategory } from '../../models/i-category';
// @Component({
//   selector: 'app-create-course-page',
//   imports: [CommonModule, ɵInternalFormsSharedModule, ReactiveFormsModule],
//   templateUrl: './create-course-page.html',
//   styleUrl: './create-course-page.css',
// })
// export class CreateCoursePage {
//   selectedFile: File | null = null;
//   courseProp: FormGroup;
//   courses: ICourse[] = [];
//   categories: ICategory[] = [];
//   constructor(
//     private addCourseService: CoursesService,
//     private categoriesService: CategoriesService,
//     private coursesService: CoursesService,
//     private fb: FormBuilder,
//     private cd : ChangeDetectorRef
//   ) {
//     this.courseProp = this.fb.group({
//       title: ['', [Validators.required, Validators.minLength(3)]],
//       title_ar: ['', [Validators.required]],
//       description: ['', [Validators.required]],
//       description_ar: ['', [Validators.required]],
//       price: ['', [Validators.required]],
//       level: ['', [Validators.required]],
//       category: ['', [Validators.required]],
//       isPublished: [false],
//     });
//     this.coursesService.getAllCourses().subscribe((data) => {
//       this.courses = data;
//     });
//     this.categoriesService.getAllCategories().subscribe((data) => {
//       this.categories = data;
//     });
//   }
//   imagePreview: string | null = null;
//   onFileSelect(event: any) {
//     const file = event.target.files[0];
//     console.log(file);
//     if (!file) return;
//     if (!file.type.startsWith('image/')) {
//       alert('Please select an image');
//       return;
//     }
//     if (file.size > 2 * 1024 * 1024) {
//       alert('Image size must be less than 2MB');
//       return;
//     }
//     this.selectedFile = file;
//     const reader = new FileReader();
//     reader.onload = () => {
//       this.imagePreview = reader.result as string;
//       this.cd.detectChanges()
//     };
//     reader.readAsDataURL(file);
//   }
// addCourse() {
//   if (!this.courseProp.valid) {
//     console.log("Form not valid", this.courseProp.errors);
//     return;
//   }

//   if (!this.selectedFile) {
//     console.log("Thumbnail is required");
//     return;
//   }

//   const formData = new FormData();

//   Object.entries(this.courseProp.value).forEach(([key, value]) => {
//     formData.append(key, value as string);
//   });

//   formData.append("thumbnail", this.selectedFile);
//   console.log(formData);


//   this.addCourseService.addCourse(formData).subscribe({
//     next: (data) => {
//       alert("Course added successfully!");
//       this.courses.push(data);
//       this.courseProp.reset();
//       this.selectedFile = undefined!;
//     },
//     error: (err) => console.error(err),
//   });
// }

//   // addCourse() {
//   //   if (this.courseProp.valid) {
//   //     this.addCourseService.addCourse(this.courseProp.value).subscribe({
//   //       next: (data) => {
//   //         console.log('Product added successfully:', data);
//   //         alert('Product added successfully!');
//   //         this.courses.push(data);
//   //         this.courseProp.reset();
//   //       },
//   //       error: (err) => {
//   //         console.error('Error adding product:', err);
//   //       },
//   //     });
//   //     console.log(this.courseProp.value);
//   //     console.log(this.courseProp.get('title')?.value);
//   //   }
//   // }
// }
import { CoursesService } from './../../services/courses/courses.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ICourse } from '../../models/i-course';
import { CategoriesService } from '../../services/categories/categories.service';
import { ICategory } from '../../models/i-category';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-course-page',
  templateUrl: './create-course-page.html',
  styleUrls: ['./create-course-page.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class CreateCoursePage implements OnInit {
  selectedFile: File | null = null;
  courseProp: FormGroup;
  categories: ICategory[] = [];
  imagePreview: string | null = null;
  isUpdateMode: boolean = false;
  courseId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private addCourseService: CoursesService,
    private categoriesService: CategoriesService,
    private cd: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.courseProp = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      title_ar: ['', [Validators.required]],
      description: ['', [Validators.required]],
      description_ar: ['', [Validators.required]],
      price: ['', [Validators.required]],
      level: ['', [Validators.required]],
      category: ['', [Validators.required]],
      isPublished: [false],
    });
  }

  ngOnInit(): void {
    this.categoriesService.getAllCategories().subscribe((data) => {
      this.categories = data;
    });
    // Check if we are in update mode
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.courseId = params['id'];
        this.isUpdateMode = true;
        if(this.courseId){
          this.getCourseDetails(this.courseId);
        }
      }
    });
  }
  // Get course details if updating
  getCourseDetails(courseId: string): void {
    this.addCourseService.getCourseById(courseId).subscribe((course) => {
      this.courseProp.patchValue({
        title: course.title,
        title_ar: course.title_ar,
        description: course.description,
        description_ar: course.description_ar,
        price: course.price,
        level: course.level,
        category: course.category._id,
        isPublished: course.isPublished,
      });
      this.imagePreview = course.thumbnail; // Show the existing thumbnail preview
    });
    console.log(this.courseProp);
  }
  // Handle file select for the image
  onFileSelect(event: any): void {
    const file = event.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select an image');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert('Image size must be less than 2MB');
      return;
    }
    this.selectedFile = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      this.cd.detectChanges();
    };
    reader.readAsDataURL(file);
  }

  // Submit form to either add or update the course
  addCourse(): void {
    if (!this.courseProp.valid) {
      console.log('Form not valid', this.courseProp.errors);
      return;
    }

    if (!this.selectedFile && !this.imagePreview) {
      console.log('Thumbnail is required');
      return;
    }

    const formData = new FormData();
    Object.entries(this.courseProp.value).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    if (this.selectedFile) {
      formData.append('thumbnail', this.selectedFile);
    }

    if (this.isUpdateMode && this.courseId) {
      // If updating, use the updateCourse service
      this.addCourseService.updateCourse(this.courseId, formData).subscribe({
        next: (data) => {
          alert('Course updated successfully!');
          this.router.navigate(['/home/courses']);
          console.log(data);
        },
        error: (err) => console.error(err),
      });
    } else {
      // If adding a new course, use the addCourse service
      this.addCourseService.addCourse(formData).subscribe({
        next: (data) => {
          alert('Course added successfully!');
          this.router.navigate(['/home/courses']);
        },
        error: (err) => console.error(err),
      });
    }
  }
}

