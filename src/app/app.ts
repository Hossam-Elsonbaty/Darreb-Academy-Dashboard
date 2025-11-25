import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { SideBar } from "./components/side-bar/side-bar";
import { Login } from "./components/login/login";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SideBar, Login],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('Darreb-Academy');
  ngOnInit(): void {
    initFlowbite();
  }

}
