import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { User } from 'src/app/shared/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  userService = inject(UserService)

  registrationStatus: {success: boolean; message: string} = {
    success: false,
    message: 'Not attempted yet'
  }

  //Register form
  form = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(4)])
  }, this.passwordConfirmValidator)

  //Checks if Password == ConfirmPassword
  passwordConfirmValidator(form: FormGroup) {
    if (form.get('password').value !== form.get('confirmPassword').value) {
      form.get('confirmPassword').setErrors({ passwordMismatch: true})
      return { passwordMismatch: true}
    }
    return {}
  }



  onSubmit(value: any) {
    console.log(value)
    const user = this.form.value as User
    delete user['confirmPassword']
    user['userRole'] = 'Simple User'

    this.userService.registerUser(user).subscribe({
      next: (response) => {
        console.log('User registered', response.msg)
        this.registrationStatus = {success:true, message: response.msg}
      },
      error: (response) => {
        const message = response.error.msg
        console.log('Error registering user', message)
        this.registrationStatus = {success:false, message}
      }
    })
  }

  registerAnotherUser() {
    this.form.reset()
    this.registrationStatus = {
      success: false,
      message: 'Not attempted yet'
    }
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
