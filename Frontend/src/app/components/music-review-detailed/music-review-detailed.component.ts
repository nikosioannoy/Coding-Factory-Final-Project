import { HtmlParser } from '@angular/compiler';
import { Component, Input, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Album } from 'src/app/shared/interfaces/album';
import { ReviewsService } from 'src/app/shared/services/reviews.service';
import { UserService } from 'src/app/shared/services/user.service';
import { CommentsComponent } from '../comments/comments.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { faL } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-music-review-detailed',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  CommentsComponent],
  templateUrl: './music-review-detailed.component.html',
  styleUrl: './music-review-detailed.component.css'
})
export class MusicReviewDetailedComponent {
  @Input() mediaID: number
  albumForReview: Album
  formattedSpotifyLink: string
  reviewsService = inject(ReviewsService)
  userService = inject(UserService)
  router = inject(Router)
  user = this.userService.user
  lastSong
  comments
  mediaType = "Album"
  emptyComments : Boolean

  fetchAlbumForReview() {
    //this.albumForReview = (ManyAlbums.find(m => m.mediaID == this.mediaID))
    this.reviewsService.getAlbumById(this.mediaID).subscribe((data) => {
      console.log(data)
      this.albumForReview = data
      this.lastSong = this.albumForReview.trackList[this.albumForReview.trackList.length - 1]
      this.albumForReview.spotifyLink = this.formatSpotifyLink(this.albumForReview.spotifyLink)
      this.formattedSpotifyLink = this.formatSpotifyLink(this.albumForReview.spotifyLink)
      const spotifyContainer = document.getElementById('spotifyPlayer');
      spotifyContainer.innerHTML = this.formattedSpotifyLink
    })
  }

  formatSpotifyLink(str: string): string {
    str = str.replace(/\\/g, '')
    //console.log(str)
    return str
  }

  commentStatus: {success: boolean; message: string} = {
    success: false,
    message: 'Not attempted yet'
  }

  commentForm = new FormGroup({
    comment: new FormControl('', Validators.required)
  })

  formatDate(date: Date): string {
    const day = date.getDate()
    const month = date.getMonth() + 1 //Zero-based
    const year = date.getFullYear()

    const dayString = day < 10 ? '0' + day : day.toString()
    const monthString = month < 10 ? '0' + month : month.toString()

    return `${dayString}/${monthString}/${year}`
  }

  submitComment(username: any, comment:any) {
    comment = comment.comment
    if (comment) {
    let dateTime = new Date()
    const date = this.formatDate(dateTime)
    console.log(username, "Says:", comment, "At:", date, "in review with id:", this.mediaID)
    const mediaID = this.mediaID
    const mediaType = "Album"
    const id = 0
    const commentDictionary = {id, username, comment, date, mediaID, mediaType}
    console.log("What will go on backend:", commentDictionary)
    //console.log(typeof(commentDictionary.reviewID))
    this.reviewsService.postCommentForMovieReview(commentDictionary).subscribe({
      next: (response) => {
        console.log("Comment posted!", commentDictionary)
        this.commentStatus.success = true, this.commentStatus.message = 
        "Comment successfully posted! Thank you for interacting with us."
        this.fetchCommentsForMusicReview()
      },
      error: (response) => {
        const message = response.error.msg
        console.log("Error posting comment", message)
        this.commentStatus = {success:false, message}
      }
    })
    //this.commentStatus.success = false, this.commentStatus.message = "There was a problem while posting your comment..."
    } else {
      console.log("Please insert comment")
    }
  }

  fetchCommentsForMusicReview() {
    this.reviewsService.getCommentsForMovieReview("Album", this.mediaID).subscribe((data) => {
      //var commentList : Comment[]
      this.comments = data
      if (this.comments.length == 0) {
        this.emptyComments = true
      } else {
        this.emptyComments = false
      }
      console.log(this.comments)
    })
  }

  ngOnInit() {
    console.log(this.mediaID)
    this.fetchAlbumForReview()
    this.fetchCommentsForMusicReview()
    
  }

  onClickUpdate() {
    this.router.navigate([`update-album-review/${this.mediaID}`])
  }

  onClickDelete() {
    this.reviewsService.deleteAlbumById(this.mediaID).subscribe({
      next: (response) => {
        console.log("Album review deleted successfully")
        this.router.navigate(['music-collection'])
      },
      error: (response) => {
        console.log("Error while deleting Album")
      }
    })
  }

}
