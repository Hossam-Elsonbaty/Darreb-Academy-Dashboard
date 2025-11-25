import { Component } from '@angular/core';
import { SideBar } from "../side-bar/side-bar";
import { Navbar } from "../navbar/navbar";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [SideBar, Navbar, RouterOutlet],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
