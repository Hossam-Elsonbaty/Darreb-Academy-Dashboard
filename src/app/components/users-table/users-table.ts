import { ChangeDetectorRef, Component } from '@angular/core';
import { AddUserModalComponent } from '../add-user-modal-component/add-user-modal-component';
import { UsersService } from '../../services/users/users.service';
import { iUser } from '../../models/iUsers';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users-table',
  imports: [AddUserModalComponent, CommonModule],
  templateUrl: './users-table.html',
  styleUrl: './users-table.css',
})
export class UsersTable {
  allUsers!: iUser[];
  isDeleteModalOpen: boolean = false;
  userIdToDelete: string | null = null;

  constructor(private users: UsersService, private cd: ChangeDetectorRef,private router: Router, private toastr:ToastrService) {
    this.users.getAllUsers().subscribe( {
      next: (res) => {
        if (res) {
          this.allUsers = res;
          console.log(res);
        }
        this.cd.detectChanges()
      },
      error: (err) => {
        if (err.status == 401){
          window.location.href = 'login';
        }
        console.log(err.error.message);
      },
    });
  }
  isModalOpen: boolean = false;
  openModal(user?: iUser): void {
    this.selectedUser = user ?? null;
    this.isModalOpen = true;
  }
  closeModalHandler(): void {
    this.isModalOpen = false;
  }
  onUserCreated(userData: iUser): void {
    console.log('New user data:', userData);
    this.allUsers.push(userData)
    this.closeModalHandler();
  }
  onUserUpdate(userData: iUser): void {
    console.log('New user data:', userData);
    const updatedUserIndex = this.allUsers.findIndex(ele=>ele._id == userData._id)
    this.allUsers[updatedUserIndex] = userData;
    this.closeModalHandler();
  }
  // deleteUser(id: string): void {
  //   try {
  //     this.users.deleteUser(id).subscribe({
  //       next: ()=> {
  //         this.allUsers = this.allUsers.filter((user) => user._id !== id);
  //         console.log('User deleted successfully:', data);
  //         this.toastr.success("User deleted and table updated!");
  //       },
  //       error: (error)=>{
  //         this.toastr.error("Error deleting user");
  //         console.error('Error deleting user:', error);
  //       }
  //     });
  //   } catch (error) {
  //     console.error('Error deleting user:', error);
  //   }
  // }
  selectedUser: iUser | null = null;
  updateUser(id: string): void {
    const userToEdit = this.allUsers.find((u) => u._id === id);
    if (userToEdit) {
      console.log(userToEdit);
      this.openModal(userToEdit);
    }
  }
    openDeleteModal(id: string) {
    this.userIdToDelete = id;
    this.isDeleteModalOpen = true;
  }
  cancelDelete() {
    this.userIdToDelete = null;
    this.isDeleteModalOpen = false;
    this.cd.detectChanges();
  }
  confirmDeleteYes() {
  if (this.userIdToDelete) {
    this.users.deleteUser(this.userIdToDelete).subscribe({
      next: () => {
        this.allUsers = this.allUsers.filter(
          (user) => user._id !== this.userIdToDelete
        );
        this.toastr.success("User deleted and table updated!");
        console.log('User deleted and table updated!');
        this.cancelDelete();
      },
      error: (err) => {
        this.toastr.error("Error deleting user");
        console.error(err)
      },
    });
  }
}
}
