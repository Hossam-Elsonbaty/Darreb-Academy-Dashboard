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
      { path: 'create-course', component: CreateCoursePage, title: 'Create course' },
      { path: 'categories', component: Categories, title: 'categories' },
    ],
  },
  { path: 'home/users', component: UsersTable, title: 'home/users' },
  { path: 'login', component: Login, title: 'login' },
  { path: 'register', component: SignUp, title: 'register' },
  { path: '**', component: PageNotFound, title: 'Page not found' },
];
