import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ListGroupMenuComponent } from './components/list-group-menu/list-group-menu.component';
import { UserService } from './shared/services/user.service';
import { loggedInUser } from './shared/interfaces/user';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ListGroupMenuComponent, RouterLink, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'The correct opinion';
  userService = inject(UserService)
  user = this.userService.user;

  logout() {
    this.userService.logoutUser()
  }
}
