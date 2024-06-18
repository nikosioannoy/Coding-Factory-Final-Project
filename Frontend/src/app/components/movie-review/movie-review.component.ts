import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from 'src/app/shared/interfaces/movie';
import { MovieReviewDetailedComponent } from '../movie-review-detailed/movie-review-detailed.component';
import { NavigationExtras, Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-movie-review',
  standalone: true,
  imports: [MovieReviewDetailedComponent, RouterLink, RouterLinkActive],
  templateUrl: './movie-review.component.html',
  styleUrl: './movie-review.component.css'
})
export class MovieReviewComponent {
  @Input() movies: Movie[]

}
