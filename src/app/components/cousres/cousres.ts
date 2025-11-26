import { Component } from '@angular/core';

@Component({
  selector: 'app-cousres',
  imports: [],
  templateUrl: './cousres.html',
  styleUrl: './cousres.css',
})
export class Cousres {

   isModalOpen: boolean = false;
  openModal(): void {
    this.isModalOpen = true;
    console.log("modal opened");
  }
  closeModalHandler(): void {
    this.isModalOpen = false;
  }
  onUserCreated(CourseData: any): void {
    console.log('New Cousre data:', CourseData);
    this.closeModalHandler();
  }

}
