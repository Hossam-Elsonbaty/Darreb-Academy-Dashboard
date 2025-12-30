import { Component,OnInit, HostListener } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { iUser } from '../../models/iUsers';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit{
  // userData: iUser | null = null;
  constructor(private router:Router) {}
  // ngOnInit(): void {
  //   const userJson = localStorage.getItem('user');
  //   if (userJson) {
  //     try {
  //       this.userData = JSON.parse(userJson) as iUser;
  //     } catch (error) {
  //       console.error('Failed to parse user from localStorage', error);
  //       this.userData = null;
  //       localStorage.removeItem('user');
  //       localStorage.removeItem('token');
  //     }
  //   }
  // }
  // logout(){
  //   localStorage.removeItem('user');
  //   localStorage.removeItem('token');
  //   this.router.navigate(['/login'], {
  //     replaceUrl: true
  //   });
  // }
    userData: any;
  isDropdownOpen = false;

  ngOnInit() {
    // Load user data
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      this.userData = JSON.parse(storedUser);
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  // Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const dropdown = document.getElementById('user-dropdown');
    const button = document.getElementById('user-menu-button');

    if (dropdown && button && !dropdown.contains(target) && !button.contains(target)) {
      this.closeDropdown();
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    this.router.navigate(['/login'], {
     replaceUrl: true
   });
    // Navigate to login or home
    // this.router.navigate(['/login']);
  }
}
