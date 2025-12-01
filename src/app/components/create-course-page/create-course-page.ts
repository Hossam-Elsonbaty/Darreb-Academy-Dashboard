import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../services/courses/courses.service';
import { v4 as uuid } from 'uuid';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ICategory } from '../../models/i-category';
import { IInstructor } from '../../models/i-course';
@Component({
  selector: 'app-create-course-page',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-course-page.html',
  styleUrl: './create-course-page.css',
})
export class CreateCoursePage implements OnInit {
  constructor(
    private fb: FormBuilder,
    private service: CoursesService,
    private route: ActivatedRoute
  ){}
  categories! :ICategory[] ;
  instructors! :IInstructor[];
  isEdit = false;
  courseId!: string;
  form! :any;
  ngOnInit() {
    this.form = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      title_ar: [''],
      description: [''],
      description_ar: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      thumbnail: [''],
      category: [null, Validators.required],
      instructor: [null, Validators.required],
      level: ['beginner'],
      isPublished: [false],
      duration: [0],
      chapters: this.fb.array([])
    });
    this.service.getCategories().subscribe(data => this.categories = data);
    this.service.getInstructors().subscribe(data => this.instructors = data);
    // this.categories = this.service.getCategories();
    // this.instructors = this.service.getInstructors();
    this.courseId = this.route.snapshot.params['id'];
    this.isEdit = !!this.courseId;
    this.form.get('id')?.setValue(this.courseId || uuid());

    if (this.isEdit) this.loadCourse();
    else this.addChapter();
  }

  get chapters() {
    return this.form.get('chapters') as FormArray;
  }

  lectures(i:number):FormArray {
    return this.chapters.at(i).get('lectures') as FormArray;
  }

  addChapter() {
    this.chapters.push(this.fb.group({
      id: uuid(),
      title: ['', Validators.required],
      title_ar: [''],
      duration: [0],
      order: [this.chapters.length + 1],
      lectures: this.fb.array([])
    }));
    this.addLecture(this.chapters.length - 1);
  }

  removeChapter(i:number){
    this.chapters.removeAt(i);
    this.calcTotal();
  }

  addLecture(ci:number){
    this.lectures(ci).push(this.fb.group({
      id: uuid(),
      title: ['', Validators.required],
      title_ar: [''],
      videoUrl: [''],
      duration: [0],
      order: [this.lectures(ci).length + 1]
    }));
    this.calcChapter(ci);
  }

  removeLecture(ci:number, li:number){
    this.lectures(ci).removeAt(li);
    this.calcChapter(ci);
  }

  calcChapter(i:number){
    const sum = this.lectures(i).value.reduce((t:any,l:any)=>t+Number(l.duration||0),0);
    this.chapters.at(i).get('duration')?.setValue(sum);
    this.calcTotal();
  }

  calcTotal(){
    const total = this.chapters.value.reduce((sum:any,c:any)=>sum+Number(c.duration||0),0);
    this.form.get('duration')?.setValue(total);
  }

  handleFile(e:any){
    const file = e.target.files[0];
    const r = new FileReader();
    r.onload = ()=> this.form.patchValue({thumbnail: r.result});
    r.readAsDataURL(file);
  }

  loadCourse(){
    this.service.getCourse(this.courseId).subscribe(course=>{
      this.form.patchValue(course);
      course.chapters.forEach((ch:any)=>{
        const group = this.fb.group({
          id: ch.id,
          title: ch.title,
          title_ar: ch.title_ar,
          duration: ch.duration,
          order: ch.order,
          lectures: this.fb.array([])
        });
        ch.lectures.forEach((lec:any)=>
          (group.get('lectures') as FormArray).push(this.fb.group(lec))
        );
        this.chapters.push(group);
      });
    });
  }

  submit(){
    if(this.form.invalid) return this.form.markAllAsTouched();

    const req = this.isEdit
      ? this.service.updateCourse(this.courseId, this.form.value)
      : this.service.createCourse(this.form.value);

    req.subscribe({
      next:()=>alert('Saved successfully'),
      error:()=>alert('Error occurred')
    });
  }

}
