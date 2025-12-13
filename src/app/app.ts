import { Component, OnInit, signal } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Home } from "./components/home/home";
import { RouterOutlet } from '@angular/router';
import { Loader } from "./components/loader/loader";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Loader],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('Darreb-Academy');
  ngOnInit(): void {
    initFlowbite();
  }

}
