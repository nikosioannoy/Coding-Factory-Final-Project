import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { last } from 'rxjs';
import { VideoGame } from 'src/app/shared/interfaces/video-game';
import { ReviewsService } from 'src/app/shared/services/reviews.service';
import { UserService } from 'src/app/shared/services/user.service';
import { CommentsComponent } from '../comments/comments.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { isFakeMousedownFromScreenReader } from '@angular/cdk/a11y';
import { faL } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-video-game-review-detailed',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  CommentsComponent],
  templateUrl: './video-game-review-detailed.component.html',
  styleUrl: './video-game-review-detailed.component.css'
})
export class VideoGameReviewDetailedComponent {
  @Input() mediaID: number
  reviewsService = inject(ReviewsService)
  userService = inject(UserService)
  videoGameForReview : VideoGame
  user = this.userService.user
  router = inject(Router)
  lastPlatform 
  comments
  mediaType = "Video Game"
  emptyComments : Boolean

  fetchVideoGameForReview() {
    this.reviewsService.getVideoGameById(this.mediaID).subscribe((data) => {
      console.log(data)
      this.videoGameForReview = data
      this.lastPlatform = this.videoGameForReview.platforms[this.videoGameForReview.platforms.length - 1]
    })
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

  fetchCommentsForMovieReview() {
    this.reviewsService.getCommentsForMovieReview("Video Game", this.mediaID).subscribe((data) => {
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

  submitComment(username: any, comment:any) {
    comment = comment.comment
    if (comment) {
    let dateTime = new Date()
    const date = this.formatDate(dateTime)
    console.log(username, "Says:", comment, "At:", date, "in review with id:", this.mediaID)
    const mediaID = this.mediaID
    const mediaType = "Video Game"
    const id = 0
    const commentDictionary = {id, username, comment, date, mediaID, mediaType}
    console.log("What will go on backend:", commentDictionary)
    //console.log(typeof(commentDictionary.reviewID))
    this.reviewsService.postCommentForMovieReview(commentDictionary).subscribe({
      next: (response) => {
        console.log("Comment posted!", commentDictionary)
        this.commentStatus.success = true, this.commentStatus.message = 
        "Comment successfully posted! Thank you for interacting with us."
        this.fetchCommentsForMovieReview()
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

  ngOnInit() {
    this.fetchVideoGameForReview()
    this.fetchCommentsForMovieReview()
    console.log(this.videoGameForReview)
  }

  onClickUpdate() {
    this.router.navigate([`update-game-review/${this.mediaID}`])
  }

  onClickDelete() {
    this.reviewsService.deleteVideoGame(this.mediaID).subscribe({
      next: (response) => {
        console.log("Video Game review deleted successfully")
        this.router.navigate(['video-game-collection'])
      },
      error: (response) => {
        console.log("Error while deleting Video Game review")
      }
    })
  }
}
