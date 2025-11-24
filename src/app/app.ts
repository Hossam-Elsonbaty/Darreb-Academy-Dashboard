import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { SideBar } from "./components/side-bar/side-bar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SideBar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('Darreb-Academy');
  ngOnInit(): void {
    initFlowbite();
  }

}
