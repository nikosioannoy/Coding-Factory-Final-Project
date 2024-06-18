import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { VideoGame, VideoGameAddition } from 'src/app/shared/interfaces/video-game';
import { ReviewsService } from 'src/app/shared/services/reviews.service';
import { UserService } from 'src/app/shared/services/user.service';


@Component({
  selector: 'app-add-game-review',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule],
  templateUrl: './add-game-review.component.html',
  styleUrl: './add-game-review.component.css'
})
export class AddGameReviewComponent {
  registrationStatus: {success: boolean; message: string} = {
    success: false,
    message: 'Not attempted yet'
  }
  reviewsService = inject(ReviewsService)
  userService = inject(UserService)
  videoGameToAdd
  liveImage
  
  form = new FormGroup({
    mediaID: new FormControl(0),
    gameName: new FormControl('', Validators.required),
    releaseDate: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    coverImg: new FormControl('', [Validators.required]),
    genre: new FormControl('', [Validators.required]),
    review: new FormControl('', [Validators.required]),
    publisher: new FormControl('', [Validators.required]),
    platforms: new FormControl('', [Validators.required])
  })

  fetchImage() {
    this.liveImage = this.form.value.coverImg
  }

  onSubmit(value: any) {
    const videoGame = this.form.value as VideoGameAddition
    this.videoGameToAdd = videoGame
    this.videoGameToAdd.platforms = videoGame.platforms.split(',').map((s: string) => s.trim());
    console.log("Videogame to add is: ", this.videoGameToAdd)
    this.reviewsService.addVideoGame(this.videoGameToAdd).subscribe({
      next: (response) => {
        console.log("Video Game added: ", response.gameName)
        this.registrationStatus = {success:true, message: response.gameName}
      },
      error: (response) => {
        const message = response.error.msg
        console.log("Error in adding Video Game review", message)
        this.registrationStatus = {success:false, message}
      }
    })
  }
}

