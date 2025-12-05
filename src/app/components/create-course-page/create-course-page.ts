import { CoursesService } from './../../services/courses/courses.service';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import { ICourse } from '../../models/i-course';
import { CategoriesService } from '../../services/categories/categories.service';
import { CommonModule } from '@angular/common';
import { ICategory } from '../../models/i-category';
@Component({
  selector: 'app-create-course-page',
  imports: [CommonModule, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './create-course-page.html',
  styleUrl: './create-course-page.css',
})
export class CreateCoursePage {
  selectedFile: File | null = null;
  courseProp: FormGroup;
  courses: ICourse[] = [];
  categories: ICategory[] = [];
  constructor(
    private addCourseService: CoursesService,
    private categoriesService: CategoriesService,
    private coursesService: CoursesService,
    private fb: FormBuilder,
  ) {
    this.courseProp = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      title_ar: ['', [Validators.required]],
      description: ['', [Validators.required]],
      description_ar: ['', [Validators.required]],
      price: ['', [Validators.required]],
      level: ['', [Validators.required]],
      thumbnail: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });
    this.coursesService.getAllCourses().subscribe((data) => {
      this.courses = data;
    });
    this.categoriesService.getAllCategories().subscribe((data) => {
      this.categories = data;
    });
  }
  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.courseProp.patchValue({
          thumbnail: reader.result
        });
      };
    }
  }
  addCourse() {
    if (this.courseProp.valid) {
      this.addCourseService.addCourse(this.courseProp.value).subscribe({
        next: (data) => {
          console.log('Product added successfully:', data);
          alert('Product added successfully!');
          this.courses.push(data);
          this.courseProp.reset();
        },
        error: (err) => {
          console.error('Error adding product:', err);
        },
      });
      console.log(this.courseProp.value);
      console.log(this.courseProp.get('title')?.value);
    }
  }
}
