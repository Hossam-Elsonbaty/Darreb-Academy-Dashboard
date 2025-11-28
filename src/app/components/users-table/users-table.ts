import { ChangeDetectorRef, Component } from '@angular/core';
import { AddUserModalComponent } from "../add-user-modal-component/add-user-modal-component";
import { UsersService } from '../../services/users/users.service';
import { iUser } from '../../models/iUsers';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users-table',
  imports: [AddUserModalComponent,CommonModule],
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


  deleteUser(id:string):void{
    try{
      this.users.deleteUser(id).subscribe((data)=>{
        this.allUsers = this.allUsers.filter((user) => user.id !== id);
        console.log('User deleted successfully:',data);

    })
   }catch(error){
      console.error('Error deleting user:', error);
    } 
    }
  


}
