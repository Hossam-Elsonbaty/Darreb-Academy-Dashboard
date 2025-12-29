import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  imports: [RouterLink,CommonModule],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.css',
})
export class SideBar {
  isInstructor:boolean=false;
  isToken:string='';
  ngOnInit() {
    this.isInstructor = JSON.parse(localStorage.getItem("user")|| '{}').role === "instructor";
    this.isToken = localStorage.getItem("token")||'';
  }
}
