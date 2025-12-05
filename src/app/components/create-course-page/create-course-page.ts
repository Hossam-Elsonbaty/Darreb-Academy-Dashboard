import { CoursesService } from './../../services/courses/courses.service';
import { Courses } from './../courses/courses';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { AddCourse } from '../../services/courses/add-course';
import { Router } from '@angular/router';
import { ICourse } from '../../models/i-course';
import { CategoriesService } from '../../services/categories/categories.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-create-course-page',
  imports: [CommonModule,ɵInternalFormsSharedModule,ReactiveFormsModule],
  templateUrl: './create-course-page.html',
  styleUrl: './create-course-page.css',
})
export class CreateCoursePage  {
  courseprop : FormGroup;
  courses: ICourse[] = [];
  categories: { id: string; name: string }[] = [];
    constructor(private addcourseservice: AddCourse,
      private categoriesService:CategoriesService,
    private  coursesService:CoursesService, private fb: FormBuilder,private router: Router) {
    this.courseprop = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      title_ar: ['', [Validators.required]],
      description: ['', [Validators.required]],
      description_ar: ['', [Validators.required]],
      price: ['', [Validators.required]],
      level: ['', [Validators.required]],
      category: ['', [Validators.required]]
    });
    this.coursesService.getAllCourses().subscribe((data)=>{
      this.courses = data;
    })


    this.categoriesService.getAllCategories().subscribe((data) => {
      this.categories = data;
    });


  }
  addCourse(){
      // @Input() isOpen: boolean = false;
    if(this.courseprop.valid){
      this.addcourseservice.addCourse(this.courseprop.value).subscribe({
        next: (data) => {
        console.log('Product added successfully:', data);
        alert('Product added successfully!');

          this.courses.push(data);
          this.courseprop.reset();

      },
      error: (err) => {
        console.error('Error adding product:', err);
      }
      })

    console.log(this.courseprop.value);
    console.log(this.courseprop.get('title')?.value);
    }

  }
}
