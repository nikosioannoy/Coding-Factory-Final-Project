import { Component, Input, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Album } from 'src/app/shared/interfaces/album';
import { MusicReviewComponent } from '../music-review/music-review.component';
import { ReviewsService } from 'src/app/shared/services/reviews.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-music-collection',
  standalone: true,
  imports: [RouterLinkActive, RouterLink, MusicReviewComponent],
  templateUrl: './music-collection.component.html',
  styleUrl: './music-collection.component.css'
})
export class MusicCollectionComponent {
  userService = inject(UserService)
  reviewsService = inject(ReviewsService)
  manyAlbums
  user = this.userService.user
  router = inject(Router)

  ngOnInit(): void {
    this.reviewsService.getAlbums().subscribe((data) => {
      console.log(data)
      this.manyAlbums = data
    })
  }

  onClick() {
    this.router.navigate(['create-album-review'])
  }
}
