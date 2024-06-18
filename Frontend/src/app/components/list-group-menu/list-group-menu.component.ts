import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItem } from 'src/app/shared/interfaces/menu-item';

@Component({
  selector: 'app-list-group-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './list-group-menu.component.html',
  styleUrl: './list-group-menu.component.css'
})
export class ListGroupMenuComponent {
  menu: MenuItem[] = [
    { text: 'Login / Register', routerLink: 'login'},
    { text: 'Home', routerLink: 'home'},
    { text: 'Movies', routerLink: 'movie-collection'},
    { text: 'Music', routerLink: 'music-collection'},
    { text: 'Video Games', routerLink: 'video-game-collection'},
  ]
}
