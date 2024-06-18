import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from 'src/app/shared/services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-delete-any-user',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule
    ],
  templateUrl: './delete-any-user.component.html',
  styleUrl: './delete-any-user.component.css'
})
export class DeleteAnyUserComponent {
  userService = inject(UserService)

  deleteStatus: {success: boolean, message: string} = {
    success: false, message: "Not attempted yet"
  }

  form = new FormGroup({
    id: new FormControl('', Validators.required)
  })

  deleteUser(id: any) {
    console.log(id)
    this.userService.deleteUser(id.id).subscribe({
      next: (response) => {
        console.log(`User with id ${{id}} was deleted`, response.msg)
        this.deleteStatus = {success:true, message: response.msg}
      },
      error: (response) => {
        const message = response.error.msg
        console.log('Error deleting user', message)
        this.deleteStatus = {success:false, message}
      }
    })
  }

  deleteAnotherUser() {
    this.form.reset()
    this.deleteStatus = {
      success: false,
      message: 'Not attempted yet'
    }
  }

}

  
