import { Component, DefaultIterableDiffer, InjectionToken, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faL, faTrash } from '@fortawesome/free-solid-svg-icons';
import { User, loggedInUser, updateUser } from 'src/app/shared/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import { LoginComponent } from '../login/login.component';
import { MovieCollectionComponent } from '../movie-collection/movie-collection.component';
import { UserListComponent } from '../user-list/user-list.component';

@Component({
  selector: 'app-user-list-record',
  standalone: true,
  imports: [FontAwesomeModule, UserListComponent],
  templateUrl: './user-list-record.component.html',
  styleUrl: './user-list-record.component.css'
})
export class UserListRecordComponent {
  @Input() users: updateUser[]
  faTrash = faTrash
  userService = inject(UserService)
  router = inject(Router)
  deleteStatus: {success: boolean, message: string} = {
    success: false,
    message: 'Not attempted yet'
  }
  usersUpd
  
//used for updating list after deleting a user
  updateList() {
    this.userService.getUsers().subscribe(
      (data) => {
        this.usersUpd = data
        this.users = this.usersUpd
        console.log("User list updated")
      }
    )
  }

  onClick(user: updateUser) {
    const idToDelete = user.id    
    this.userService.deleteUser(idToDelete).subscribe({
      next: (response) => {
        console.log(response.msg)
        this.deleteStatus = {success:true, message: response.msg}
        this.updateList()
        //window.location.reload()
        //this.router.navigate(['login'])
      },
      error: (response) => {
        const message = response.error.msg
        console.log("Error deleting user", message)
        this.deleteStatus = {success:false, message}
        //this.router.navigate(['login'])
      }
      
    })
  //this.userService.deleteUser(id)

  }
  
}
