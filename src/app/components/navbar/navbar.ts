import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { iUser } from '../../models/iUsers';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  userData: iUser | null = null;
  constructor(private router:Router, private cd: ChangeDetectorRef) {}
  ngOnInit(): void {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      try {
        this.userData = JSON.parse(userJson) as iUser;
        this.cd.detectChanges();
      } catch (error) {
        console.error('Failed to parse user from localStorage', error);
        this.userData = null;
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
  }
  logout(){
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/login'], {
      replaceUrl: true
    });
  }
}
