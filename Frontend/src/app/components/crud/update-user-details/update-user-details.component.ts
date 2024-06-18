import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { LoginComponent } from 'src/app/components/login/login.component';
import { User, loggedInUser, updateUser } from 'src/app/shared/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-update-user-details',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule],
  templateUrl: './update-user-details.component.html',
  styleUrl: './update-user-details.component.css'
})
export class UpdateUserDetailsComponent {
  userService = inject(UserService)
  
  updateStatus: {success: boolean, message: string} = {
    success: false,
    message: 'Not attempted yet'
  }

  //Update Form
  form = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(4)])
  }, this.passwordConfirmValidator)

  passwordConfirmValidator(form: FormGroup) {
    if (form.get('password').value !== form.get('confirmPassword').value) {
      form.get('confirmPassword').setErrors({ passwordMismatch: true})
      return { passwordMismatch: true}
    }
    return {}
  }

  onSubmit(value: any) {
    console.log(value)
    const user = this.form.value as updateUser
    const currentUserToken = localStorage.getItem("access_token")
    const decodedToken = jwtDecode(currentUserToken) as unknown as loggedInUser
    user.id = decodedToken.User_ID
    user.userRole = decodedToken.User_Role
    delete user['confirmPassword']
    this.userService.updateUser(user).subscribe({
      next: (response) => {
        console.log("Your profile was updated!")
        this.updateStatus = {success:true, message: "Successful Update"}
      },
      error: (response) => {
        const message = response.error.msg
        console.log('Error updating profile details', message)
        this.updateStatus = {success:false, message}
      }
    })
  }

  check_duplicate_username() {
    const username = this.form.get('username').value
    this.userService.check_duplicate_username(username).subscribe({
      next: (response) => {
        console.log(response.msg)
        this.form.get('username').setErrors(null)
      },
      error: (response) => {
        const message = response.error.msg
        console.log(message)
        this.form.get('username').setErrors({duplicateUsername: true})
      }
    })
  }

  check_duplicate_email() {
    const email = this.form.get('email').value
    this.userService.check_duplicate_email(email).subscribe({
      next: (response) => {
        console.log(response.msg)
        this.form.get('email').setErrors(null)
      },
      error: (response) => {
        const message = response.error.msg
        console.log(message)
        this.form.get('email').setErrors({duplicateEmail: true})
      }
    })
  }

}
