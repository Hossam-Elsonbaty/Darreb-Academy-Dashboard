import { Component } from '@angular/core';
import { AddUserModalComponent } from "../add-user-modal-component/add-user-modal-component";

@Component({
  selector: 'app-users-table',
  imports: [AddUserModalComponent],
  templateUrl: './users-table.html',
  styleUrl: './users-table.css',
})
export class UsersTable {
  isModalOpen: boolean = false;
  openModal(): void {
    this.isModalOpen = true;
    console.log("modal opened");
  }
  closeModalHandler(): void {
    this.isModalOpen = false;
  }
  onUserCreated(userData: any): void {
    console.log('New user data:', userData);
    this.closeModalHandler();
  }
}
