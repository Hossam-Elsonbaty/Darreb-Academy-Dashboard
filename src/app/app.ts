import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { SideBar } from "./components/side-bar/side-bar";
import { SignUp } from "./components/sign-up/sign-up";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SideBar, SignUp],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('Darreb-Academy');
  ngOnInit(): void {
    initFlowbite();
  }

}
