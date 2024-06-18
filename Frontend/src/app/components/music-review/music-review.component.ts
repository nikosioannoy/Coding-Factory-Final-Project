import { Component, Input } from '@angular/core';
import { Album } from 'src/app/shared/interfaces/album';
import { MusicReviewDetailedComponent } from '../music-review-detailed/music-review-detailed.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-music-review',
  standalone: true,
  imports: [MusicReviewDetailedComponent, RouterLink, RouterLinkActive],
  templateUrl: './music-review.component.html',
  styleUrl: './music-review.component.css'
})
export class MusicReviewComponent {
  @Input() albums: Album[]
}
