import { Component, Input, Output, EventEmitter } from '@angular/core';
import { iUser } from '../../models/iUsers';
import { UsersService } from '../../services/users/users.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-add-user-modal-component',
  imports: [FormsModule,CommonModule],
  templateUrl: './add-user-modal-component.html',
  styleUrl: './add-user-modal-component.css',
})
export class AddUserModalComponent {
  @Input() isOpen: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
  onClose(): void {
    this.closeModal.emit();
  }
  userprop: iUser = {} as iUser;
constructor(private userService: UsersService) {}
addnewuser(){
  this.userService.addNewUser(this.userprop).subscribe((data)=>{
    console.log('User added successfully:',data);
});
}
}
