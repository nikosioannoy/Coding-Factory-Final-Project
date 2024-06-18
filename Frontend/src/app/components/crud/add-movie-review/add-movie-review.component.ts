import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Movie, MovieAddition } from 'src/app/shared/interfaces/movie';
import { UserService } from 'src/app/shared/services/user.service';
@Component({
  selector: 'app-add-movie-review',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './add-movie-review.component.html',
  styleUrl: './add-movie-review.component.css'
})
export class AddMovieReviewComponent {
  registrationStatus: {success: boolean; message: string} = {
    success: false,
    message: 'Not attempted yet'
  }
  userService = inject(UserService)
  movieToAdd 
  liveImage

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

  fetchImage() {
    this.liveImage = this.form.value.coverImg
  }

  onSubmit(value: any) {
    const movie = this.form.value as MovieAddition
    this.movieToAdd = movie
    this.movieToAdd.cast = movie.cast.split(',').map((s: string) => s.trim());
    console.log("Movie added: ", this.movieToAdd)
    this.userService.addMovie(this.movieToAdd).subscribe({
      next: (response) => {
        console.log("Movie review added", response.msg)
        this.registrationStatus = {success:true, message: response.msg}
      },
      error: (response) => {
        const message = response.error.msg
        console.log('Error adding movie review', message)
        this.registrationStatus = {success:false, message}
      }
    })
  }
}
