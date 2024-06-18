import { Component, afterNextRender, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Credentials, loggedInUser} from 'src/app/shared/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import { RegisterComponent } from '../register/register.component';
import { jwtDecode } from 'jwt-decode';
import { MatIconModule } from '@angular/material/icon'
import { Router } from '@angular/router';
import { UpdateUserDetailsComponent } from 'src/app/components/crud/update-user-details/update-user-details.component';
import { DeleteUserComponent } from 'src/app/components/crud/delete-user/delete-user.component';
import { DeleteAnyUserComponent } from 'src/app/components/crud/delete-any-user/delete-any-user.component';
import { UserListComponent } from '../user-list/user-list.component';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule,
            MatInputModule,
            MatButtonModule,
            ReactiveFormsModule,
            RegisterComponent,
            MatIconModule,
            UpdateUserDetailsComponent,
            DeleteUserComponent,
            DeleteAnyUserComponent,
            UserListComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })
  
  userService = inject(UserService)
  invalidLogin = false
  router = inject(Router)
  user = this.userService.user

  logout() {
    this.userService.logoutUser()
  }

  onSubmit() {
    const credentials = this.form.value as Credentials
    console.log("my credentials: ", credentials)
    this.userService.loginUser(credentials).subscribe({
      next: (response) => {
        const access_token = response.token
        console.log(access_token)
        localStorage.setItem('access_token', access_token)
        //const decodedTokenSubject = jwtDecode(access_token).sub as unknown as object
        const decodedTokenSubject = jwtDecode(access_token) as unknown as loggedInUser
        console.log(decodedTokenSubject)
        this.userService.user.set({
          Username: decodedTokenSubject.Username,
          User_Email: decodedTokenSubject.User_Email,
          User_ID: decodedTokenSubject.User_ID,
          User_Role: decodedTokenSubject.User_Role
        })
        //this.userService.user.set({
          //username: decodedTokenSubject.username,
          //email: decodedTokenSubject.email
        //})
      },
      error: (response) => {
        console.error('Login Error', response)
        this.invalidLogin = true
      }
    })
  }

}
