import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { iUser } from '../../models/iUsers';
import { UsersService } from '../../services/users/users.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-add-user-modal-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './add-user-modal-component.html',
  styleUrl: './add-user-modal-component.css',
})
export class AddUserModalComponent implements OnChanges {
@Input() isOpen: boolean = false;
@Input() userToEdit: iUser | null = null;
@Output() refreshList = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();
  onClose(): void {

    this.closeModal.emit();
    this.userProp = {} as iUser;
  }
  userProp: iUser = {} as iUser;
  ngOnChanges() {
  if (this.userToEdit) {
    this.userProp = { ...this.userToEdit };
  }
   else {
    this.userProp = {} as iUser;
  }
}

  constructor(private userService: UsersService ) {}

  handleSubmit() {
  if (this.userToEdit && this.userToEdit.id) {



    this.userService.updateUser(this.userToEdit.id, this.userProp).subscribe({
      next: (updatedUser) => {
        console.log('User updated successfully:', updatedUser);
        this.refreshList.emit();
         this.onClose();
      },
      error: (error) => {
        console.error('Error updating user:', error);
      }
    });
  } else {
     this.userService.addNewUser(this.userProp).subscribe((data) => {
      console.log('User added successfully:', data);
      this.refreshList.emit();
      this.onClose();
    });
  }}
}
