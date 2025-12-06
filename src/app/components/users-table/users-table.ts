import { ChangeDetectorRef, Component } from '@angular/core';
import { AddUserModalComponent } from "../add-user-modal-component/add-user-modal-component";
import { UsersService } from '../../services/users/users.service';
import { iUser } from '../../models/iUsers';
import { CommonModule } from '@angular/common';
import { PopDeleteComponent } from '../pop-delete/pop-delete';

@Component({
  selector: 'app-users-table',
  imports: [AddUserModalComponent,CommonModule,PopDeleteComponent],
  templateUrl: './users-table.html',
  styleUrl: './users-table.css',
})
export class UsersTable {
  allUsers !:iUser[];
  constructor(private users:UsersService,private cd:ChangeDetectorRef){
    this.users.getAllUsers().subscribe((data)=>{
      this.allUsers = data
      console.log(data);
      this.cd.detectChanges()
    })
  }
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
  // deleteUser(id:string):void{
  //   try{
  //     this.users.deleteUser(id).subscribe((data)=>{
  //       this.allUsers = this.allUsers.filter((user) => user.id !== id);
  //       console.log('User deleted successfully:',data);
  //   })}

  //   catch(error){
  //     console.error('Error deleting user:', error);
  //   }
  // }
  deleteModalOpen: boolean = false;
  itemToDelete: string | null = null;
  isDeleting: boolean = false; 
 successMessage: string = '';
  errorMessage: string = '';
openDeleteModal(id: string): void {
    this.itemToDelete = id;
    this.deleteModalOpen = true;
    // مسح الرسائل السابقة
    this.successMessage = '';
    this.errorMessage = '';
  }

 closeDeleteModal(): void {
    this.deleteModalOpen = false;
    this.itemToDelete = null;
  }


confirmDeleteHandler(id: string): void {
  this.isDeleting = true;
  this.errorMessage = '';

  this.users.deleteUser(id).subscribe({
    next: () => {
      this.allUsers = this.allUsers.filter(user => user.id !== id);
      this.closeDeleteModal();
      this.isDeleting = false;
    },
    error: (err) => {
      this.errorMessage = 'Failed to delete user.';
      console.error(err);
      this.isDeleting = false;
    }
  });
}


}

