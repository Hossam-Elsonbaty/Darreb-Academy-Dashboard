
import { Component,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup  } from '@angular/forms';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loading = false;
  errorMsg = '';
  loginForm!:FormGroup ;
  constructor(
    private fb: FormBuilder,
    private UsersService: UsersService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  submit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    const { email, password } = this.loginForm.value;
    this.UsersService.signIn(email!, password!).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.success) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data));
          this.router.navigate(['/home/dashboard'], {
            replaceUrl: true
          });
          console.log(res.data);
        }
      },
      error: (err) => {
        this.errorMsg = err.error?.message || 'Login failed';
        console.log(err.error.message);
        this.cd.detectChanges()
        this.loading = false;
      },
    });
  }
}
