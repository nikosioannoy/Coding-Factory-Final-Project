import { Component, inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { loggedInUser, updateUser } from 'src/app/shared/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import { DeleteAnyUserComponent } from '../delete-any-user/delete-any-user.component';

@Component({
  selector: 'app-delete-user',
  standalone: true,
  imports: [DeleteAnyUserComponent],
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.css'
})
export class DeleteUserComponent {
  userService = inject(UserService)
  user = this.userService.user
  deleteStatus = {success:false, message: ""}

  deleteThisUser() {
    const currentUserToken = localStorage.getItem("access_token")
    const decodedToken = jwtDecode(currentUserToken) as unknown as loggedInUser 
    this.userService.deleteThisUser(decodedToken.User_ID).subscribe({
      next: (response) => {
        console.log("Account deleted")
        this.deleteStatus = {success:true, message: response.msg}
        this.user.set(null)
      },
      error: (response) => {
        const message = response.error.msg
        console.log('Error updating profile details', message)
        this.deleteStatus = {success:false, message}
      }
    })
  }
}
