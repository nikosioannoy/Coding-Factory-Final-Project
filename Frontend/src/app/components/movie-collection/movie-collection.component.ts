import { Component, Input, inject } from '@angular/core';
import { Movie } from 'src/app/shared/interfaces/movie';
import { MovieReviewComponent } from '../movie-review/movie-review.component';
import { MovieReviewDetailedComponent } from '../movie-review-detailed/movie-review-detailed.component';
import { environment } from 'src/environments/environment.development';
import { ReviewsService } from 'src/app/shared/services/reviews.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';
import { AddMovieReviewComponent } from '../crud/add-movie-review/add-movie-review.component';
@Component({
  selector: 'app-movie-collection',
  standalone: true,
  imports: [MovieReviewComponent, AddMovieReviewComponent],
  templateUrl: './movie-collection.component.html',
  styleUrl: './movie-collection.component.css'
})
export class MovieCollectionComponent {
  reviewsService = inject(ReviewsService)
  manyMovies
  userService = inject(UserService)
  router = inject(Router)
  user = this.userService.user

  //On click "Movies" fetces all Movies from DataBase
  ngOnInit(): void {
    this.reviewsService.getMovies().subscribe((data) => {
      console.log(data)
      this.manyMovies = data
    })
  }

  onClick() {
    this.router.navigate(['create-movie-review'])
  }

  


}
