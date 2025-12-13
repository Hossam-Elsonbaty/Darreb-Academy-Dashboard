import { Routes } from '@angular/router';
import { SignUp } from './components/sign-up/sign-up';
import { Login } from './components/login/login';
import { PageNotFound } from './components/page-not-found/page-not-found';
import { Home } from './components/home/home';
import { UsersTable } from './components/users-table/users-table';
import { Dashboard } from './components/dashboard/dashboard';
import { Courses } from './components/courses/courses';
import { Categories } from './components/categories/categories';
import { CreateCoursePage } from './components/create-course-page/create-course-page';
import { UpdateCoursePage } from './components/update-course-page/update-course-page';
import { CourseChapters } from './components/course-chapters/course-chapters';
import { ChapterLectures } from './components/chapter-lectures/chapter-lectures';
import { Inbox } from './components/inbox/inbox';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: Home,
    title: 'Home',
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard, title: 'Dashboard' },
      { path: 'users', component: UsersTable, title: 'Users' },
      { path: 'courses', component: Courses, title: 'Courses' },
      { path: 'course-chapters/:id', component: CourseChapters, title: 'Course Chapters' },
      { path: 'chapter-lectures/:id', component: ChapterLectures, title: 'Chapter Lectures' },
      { path: 'create-course', component: CreateCoursePage, title: 'Create course' },
      { path: 'update-course/:id', component: CreateCoursePage, title: 'Update course' },
      { path: 'update-course', component: UpdateCoursePage, title: 'Update course' },
      { path: 'categories', component: Categories, title: 'categories' },
      { path: 'inbox', component: Inbox, title: 'inbox' },
    ],
  },
  { path: 'home/users', component: UsersTable, title: 'home/users' },
  { path: 'login', component: Login, title: 'login' },
  { path: 'register', component: SignUp, title: 'register' },
  { path: '**', component: PageNotFound, title: 'Page not found' },
];
