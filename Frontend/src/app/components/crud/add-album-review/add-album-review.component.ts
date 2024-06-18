import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Album, AlbumAddition } from 'src/app/shared/interfaces/album';
import { ReviewsService } from 'src/app/shared/services/reviews.service';


@Component({
  selector: 'app-add-album-review',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule],
  templateUrl: './add-album-review.component.html',
  styleUrl: './add-album-review.component.css'
})
export class AddAlbumReviewComponent {
  registrationStatus: {success: boolean; message: string} = {
    success: false,
    message: 'Not attempted yet'
  }
  reviewService = inject(ReviewsService)
  userService = inject(UserService)
  albumToAdd 
  liveImage
  livePlayer
  formatedLink

  form = new FormGroup({
    mediaID: new FormControl(0),
    albumName: new FormControl('', Validators.required),
    releaseDate: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    runtime: new FormControl('', [Validators.required]),
    numberOfTracks: new FormControl('', [Validators.required]),
    coverImg: new FormControl('', [Validators.required]),
    genre: new FormControl('', [Validators.required]),
    review: new FormControl('', [Validators.required]),
    artist: new FormControl('', [Validators.required]),
    spotifyLink: new FormControl('', [Validators.required]),
    trackList: new FormControl('', [Validators.required])
  })

  fetchImage() {
    this.liveImage = this.form.value.coverImg
  }

  fetchSpotifyPlayer() {
    this.livePlayer = this.form.value.spotifyLink
  }

  // formatSpotifyLink(url: string): string {
  //   return url.split('').map(char => {
  //     if (!/[a-zA-Z ]/.test(char) || char === "'" || char === '"') {
  //       return '\\' + char;
  //     }
  //     return char;
  //   }).join('');
  // }

  onSubmit(value: any) {
    const album = this.form.value as unknown as AlbumAddition
    this.albumToAdd = album
    this.albumToAdd.genre = album.genre.split(',').map((s: string) => s.trim());
    this.albumToAdd.trackList = album.trackList.split(',').map((s: string) => s.trim());
    console.log("Album was: ", this.albumToAdd)
    //this.formatedLink = this.formatSpotifyLink(this.albumToAdd.spotifyLink)
    //this.albumToAdd.spotifyLink = this.formatedLink
    //this.albumToAdd.spotifyLink
    this.reviewService.addAlbum(this.albumToAdd).subscribe({
      next: (response) => {
        console.log("Album review added", response.albumName)
        this.registrationStatus = {success:true, message: response.albumName}
      },
      error: (response) => {
        const message = response.error.msg
        console.log('Error adding album review', message)
        this.registrationStatus = {success:false, message}
      }
    })
  }
}
