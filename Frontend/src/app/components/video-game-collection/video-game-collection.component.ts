import { Component, Input, inject } from '@angular/core';
import { VideoGame } from 'src/app/shared/interfaces/video-game';
import { VideoGameReviewComponent } from '../video-game-review/video-game-review.component';
import { ReviewsService } from 'src/app/shared/services/reviews.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-game-collection',
  standalone: true,
  imports: [VideoGameReviewComponent],
  templateUrl: './video-game-collection.component.html',
  styleUrl: './video-game-collection.component.css'
})
export class VideoGameCollectionComponent {
  userService = inject(UserService)
  router = inject(Router)
  reviewsService = inject(ReviewsService)
  user = this.userService.user
  manyVideoGames 

  ngOnInit(): void {
    this.reviewsService.getVideoGames().subscribe((data) => {
      console.log(data)
      this.manyVideoGames = data
    })
  }

  onClick() {
    this.router.navigate(['create-game-review'])
  }
}
