import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Movie, MovieAddition } from 'src/app/shared/interfaces/movie';
import { ReviewsService } from 'src/app/shared/services/reviews.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from 'src/app/shared/services/user.service';
import { MovieCollectionComponent } from '../../movie-collection/movie-collection.component';


@Component({
  selector: 'app-update-movie-review',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule],
  templateUrl: './update-movie-review.component.html',
  styleUrl: './update-movie-review.component.css'
})
export class UpdateMovieReviewComponent{
  @Input() mediaID: number
  reviewsService = inject(ReviewsService)
  userService = inject(UserService)
  movieForReview : Movie
  movieToUpdate
  liveImage

  registrationStatus: {success: boolean; message: string} = {
    success: false,
    message: 'Not attempted yet'
  }

  form = new FormGroup({
    mediaID: new FormControl(0),
    movieName: new FormControl('', Validators.required),
    releaseDate: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    runtime: new FormControl('', [Validators.required]),
    coverImg: new FormControl('', [Validators.required]),
    genre: new FormControl('', [Validators.required]),
    review: new FormControl('', [Validators.required]),
    director: new FormControl('', [Validators.required]),
    cast: new FormControl('', [Validators.required])
  })

  initializeForm() {
    this.form.setValue({
      mediaID: this.movieToUpdate.mediaID,
      movieName: this.movieToUpdate.movieName,
      releaseDate: this.movieToUpdate.releaseDate,
      description: this.movieToUpdate.description,
      runtime: this.movieToUpdate.runtime,
      coverImg: this.movieToUpdate.coverImg,
      genre: this.movieToUpdate.genre,
      review: this.movieToUpdate.review,
      director: this.movieToUpdate.director,
      cast: this.movieToUpdate.cast
    })
  }

  ngOnInit() {
    console.log(this.mediaID)
    //this.fetchMovieForReview()
    this.reviewsService.getMovieById(this.mediaID).subscribe((data) => {
      this.movieToUpdate = data
      this.movieToUpdate.cast = this.movieToUpdate.cast.join(", ")
      console.log(this.movieToUpdate)
      this.initializeForm()
      this.fetchImage()

      //this.lastCastActor = this.movieForReview.cast[this.movieForReview.cast.length - 1]
    })
  }

  // fetchMovieForReview() {
  //   // this.movieForReview = (ManyMovies.find(m => m.mediaID == this.mediaID))
  //     this.reviewsService.getMovieById(this.mediaID).subscribe((data) => {
  //       console.log(data)
  //       this.movieForReview = data
  //       //this.lastCastActor = this.movieForReview.cast[this.movieForReview.cast.length - 1]
  //     })
  // }

  fetchImage() {
      this.liveImage = this.form.value.coverImg
  }


//this.movieToUpdate = movie
//this.movieToUpdate.cast = movie.cast.split(',').map((s: string) => s.trim());
//movie.cast = movieCast.split(",").map((s:string) => s.trim())
  onSubmit(value: any) {
    const movie = this.form.value as unknown as MovieAddition
    this.movieToUpdate = movie
    this.movieToUpdate.cast = movie.cast.split(',').map((s: string) => s.trim());
    console.log("Movie for update: ", this.movieToUpdate)
    
    this.reviewsService.updateMovie(this.movieToUpdate).subscribe({
      next: (response) => {
        console.log("Movie review updated", response)
        this.registrationStatus = {success:true, message:""}
      },
      error: (response) => {
        const message = response.error.msg
        console.log('Error updating movie review', message)
        this.registrationStatus = {success:false, message}
      }
    })
  }

  

}
