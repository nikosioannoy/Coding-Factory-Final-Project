import { Component, Input, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Album, AlbumAddition } from 'src/app/shared/interfaces/album';
import { ReviewsService } from 'src/app/shared/services/reviews.service';
import { UserService } from 'src/app/shared/services/user.service';
@Component({
  selector: 'app-update-album-review',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule],
  templateUrl: './update-album-review.component.html',
  styleUrl: './update-album-review.component.css'
})
export class UpdateAlbumReviewComponent {
  @Input() mediaID: number
  reviewsService = inject(ReviewsService)
  userService = inject(UserService)
  albumForReview
  albumToUpdate
  liveImage
  livePlayer

  registrationStatus: {success: boolean; message: string} = {
    success: false,
    message: 'Not attempted yet'
  }

  form = new FormGroup({
    mediaID: new FormControl(0),
    albumName: new FormControl('', Validators.required),
    releaseDate: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    runtime: new FormControl('', [Validators.required]),
    numberOfTracks: new FormControl(0, [Validators.required]),
    coverImg: new FormControl('', [Validators.required]),
    genre: new FormControl('', [Validators.required]),
    review: new FormControl('', [Validators.required]),
    artist: new FormControl('', [Validators.required]),
    spotifyLink: new FormControl('', [Validators.required]),
    trackList: new FormControl('', [Validators.required])
  })

  initializeForm() {
    this.form.setValue({
      mediaID: this.albumToUpdate.mediaID,
      albumName: this.albumToUpdate.albumName,
      releaseDate: this.albumToUpdate.releaseDate,
      description: this.albumToUpdate.description,
      runtime: this.albumToUpdate.runtime,
      numberOfTracks: this.albumToUpdate.numberOfTracks,
      coverImg: this.albumToUpdate.coverImg,
      genre: this.albumToUpdate.genre,
      review: this.albumToUpdate.review,
      artist: this.albumToUpdate.artist,
      spotifyLink: this.albumToUpdate.spotifyLink,
      trackList: this.albumToUpdate.trackList
    })
  }
  
  fetchImage() {
    this.liveImage = this.form.value.coverImg
  }

  fetchSpotifyPlayer() {
    this.livePlayer = this.form.value.spotifyLink
    const spotifyContainer = document.getElementById('spotifyPlayer');
    spotifyContainer.innerHTML = this.livePlayer
  }

  ngOnInit() {
    console.log(this.mediaID)
    this.reviewsService.getAlbumById(this.mediaID).subscribe((data) => {
      this.albumToUpdate = data
      console.log(this.albumToUpdate)
      //To be in string form when fetched from Backend
      this.albumToUpdate.genre = this.albumToUpdate.genre.join(", ")
      this.albumToUpdate.trackList = this.albumToUpdate.trackList.join(", ")
      console.log(this.albumToUpdate)
      this.initializeForm()
      this.fetchImage()
      //this.fetchAlbumForReview()
      this.fetchSpotifyPlayer()
      
    })
  }

  formatSpotifyLink(str: string): string {
    str = str.replace(/\\/g, '')
    //console.log(str)
    return str
  }

  // fetchAlbumForReview() {
  //   //this.albumForReview = (ManyAlbums.find(m => m.mediaID == this.mediaID))
  //   this.reviewsService.getAlbumById(this.mediaID).subscribe((data) => {
  //     console.log(data)
  //     this.albumForReview = data
  //     //this.albumForReview.spotifyLink = this.formatSpotifyLink(this.albumForReview.spotifyLink)
  //     //this.formattedSpotifyLink = this.formatSpotifyLink(this.albumForReview.spotifyLink)
  //     //const spotifyContainer = document.getElementById('spotifyPlayer');
  //     //spotifyContainer.innerHTML = this.formattedSpotifyLink
  //   })
  // }

  onSubmit(value: any) {
    const album = this.form.value as unknown as AlbumAddition
    this.albumToUpdate = album
    console.log("ti mas erxetai apo front prin: ", this.albumToUpdate)

    this.albumToUpdate.genre = album.genre.split(',').map((s:string) => s.trim())
    this.albumToUpdate.trackList = album.trackList.split(',').map((s:string) => s.trim())
    console.log("ti mas erxetai apo front meta: ", this.albumToUpdate)
    this.reviewsService.updateAlbum(this.albumToUpdate).subscribe({
      next: (response) => {
        console.log("Album review updated", response)
        this.registrationStatus = {success:true, message: ""}
      },
      error: (response) => {
        const message = response.error.msg
        console.log('Error updating album review', message)
        this.registrationStatus = {success:false, message}
      }
    })
  }

}
