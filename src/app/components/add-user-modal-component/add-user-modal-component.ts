import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { iUser } from '../../models/iUsers';
import { UsersService } from '../../services/users/users.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-user-modal-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './add-user-modal-component.html',
  styleUrl: './add-user-modal-component.css',
})
export class AddUserModalComponent implements OnChanges {
  @Input() isOpen: boolean = false;
  @Input() userToEdit: iUser | null = null;
  @Output() refreshList = new EventEmitter<iUser>();
  @Output() userUpdated  = new EventEmitter<iUser>();
  @Output() closeModal = new EventEmitter<void>();
  onClose(): void {
    this.closeModal.emit();
    this.userProp = {} as iUser;
  }
  userProp: iUser = {} as iUser;
  ngOnChanges() {
    if (this.userToEdit) {
      this.userProp = { ...this.userToEdit };
    } else {
      this.userProp = {} as iUser;
    }
  }
  constructor(private userService: UsersService, private toastr : ToastrService) {}
  handleSubmit() {
    console.log("clicked");
    if (this.userToEdit && this.userToEdit._id) {
      this.userService.updateUser(this.userToEdit._id, this.userProp).subscribe({
        next: (res) => {
          this.toastr.success("User updated successfully");
          console.log('User updated successfully:', res.data);
          this.userUpdated.emit(res.data);
          this.closeModal.emit();
        },
        error: (error) => {
          this.toastr.error("Error updating user");
          console.error('Error updating user:', error);
        },
      });
    } else {
      this.userService.addNewUser(this.userProp).subscribe({
        next: (userAdded) => {
          this.toastr.success("User added successfully");
          console.log('User added successfully:', userAdded);
          this.refreshList.emit(userAdded);
          this.closeModal.emit();
        },
        error: (error) => {
          this.toastr.error("Error updating user");
          console.error('Error updating user:', error);
        },
      });
    }
  }
}
