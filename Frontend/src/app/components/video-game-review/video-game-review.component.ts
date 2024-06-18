import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { VideoGame } from 'src/app/shared/interfaces/video-game';
import { VideoGameReviewDetailedComponent } from '../video-game-review-detailed/video-game-review-detailed.component';

@Component({
  selector: 'app-video-game-review',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, VideoGameReviewDetailedComponent],
  templateUrl: './video-game-review.component.html',
  styleUrl: './video-game-review.component.css'
})
export class VideoGameReviewComponent {
  @Input() videoGames: VideoGame[]
}
