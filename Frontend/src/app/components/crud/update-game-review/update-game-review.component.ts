import { Component, Input, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VideoGameAddition } from 'src/app/shared/interfaces/video-game';
import { ReviewsService } from 'src/app/shared/services/reviews.service';
import { UserService } from 'src/app/shared/services/user.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-update-game-review',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule],
  templateUrl: './update-game-review.component.html',
  styleUrl: './update-game-review.component.css'
})
export class UpdateGameReviewComponent {
  @Input() mediaID:number
  reviewsService = inject(ReviewsService)
  userService = inject(UserService)
  gameForReview
  gameToUpdate
  liveImage

  registrationStatus: {success: boolean; message: string} = {
    success: false,
    message: 'Not attempted yet'
  }

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

  initializeForm() {
    this.form.setValue({
      mediaID: this.gameToUpdate.mediaID,
      gameName: this.gameToUpdate.gameName,
      releaseDate: this.gameToUpdate.releaseDate,
      description: this.gameToUpdate.description,
      coverImg: this.gameToUpdate.coverImg,
      genre: this.gameToUpdate.genre,
      review: this.gameToUpdate.review,
      publisher: this.gameToUpdate.publisher,
      platforms: this.gameToUpdate.platforms
    })
  }

  fetchImage() {
    this.liveImage = this.form.value.coverImg
  }

  ngOnInit() {
    this.reviewsService.getVideoGameById(this.mediaID).subscribe((data) => {
      this.gameToUpdate = data
      console.log("Backend: ", this.gameToUpdate)
      this.gameToUpdate.platforms = this.gameToUpdate.platforms.join(", ")
      console.log("After join: ", this.gameToUpdate)
      this.initializeForm()
      this.fetchImage()
    })
  }

  onSubmit(value: any) {
    const videoGame = this.form.value as VideoGameAddition
    this.gameToUpdate = videoGame
    console.log("Front end: ", this.gameToUpdate)
    this.gameToUpdate.platforms = videoGame.platforms.split(',').map((s:string) => s.trim())
    console.log("Front end editted platforms: ", this.gameToUpdate)
    this.reviewsService.updateVideoGame(this.gameToUpdate).subscribe({
      next: (response) => {
        console.log("Video Game review updated", response)
        this.registrationStatus = {success:true, message: ""}
      },
      error: (response) => {
        const message = response.error.msg
        console.log("Error updating album review", message)
        this.registrationStatus = {success:false, message}
      }
    })
  }

}
