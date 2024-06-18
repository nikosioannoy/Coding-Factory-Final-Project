import { Component, inject } from '@angular/core';
import { User } from 'src/app/shared/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import { UserListRecordComponent } from '../user-list-record/user-list-record.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [UserListRecordComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  userService = inject(UserService)
  manyUsers

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.manyUsers = data
      }
    )
  }


}
