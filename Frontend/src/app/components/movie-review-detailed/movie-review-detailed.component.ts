import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Movie } from 'src/app/shared/interfaces/movie';
import { ReviewsService } from 'src/app/shared/services/reviews.service';
import { UserService } from 'src/app/shared/services/user.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { Comment } from 'src/app/shared/interfaces/comment';
import { CommentsComponent } from '../comments/comments.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-movie-review-detailed',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  CommentsComponent],
  templateUrl: './movie-review-detailed.component.html',
  styleUrl: './movie-review-detailed.component.css'
})
export class MovieReviewDetailedComponent{
  @Input() mediaID: number
  mediaIDforUpdate
  movieForReview : Movie
  userService = inject(UserService)
  user = this.userService.user
  reviewsService = inject(ReviewsService)
  router = inject(Router)
  lastCastActor
  comments
  //for child component call
  mediaType = "Movie"
  emptyComments: boolean

  fetchMovieForReview() {
    // this.movieForReview = (ManyMovies.find(m => m.mediaID == this.mediaID))
      this.reviewsService.getMovieById(this.mediaID).subscribe((data) => {
        console.log(data)
        this.movieForReview = data
        this.lastCastActor = this.movieForReview.cast[this.movieForReview.cast.length - 1]
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

  submitComment(username: any, comment:any) {
    comment = comment.comment
    if (comment) {
    let dateTime = new Date()
    const date = this.formatDate(dateTime)
    console.log(username, "Says:", comment, "At:", date, "in review with id:", this.mediaID)
    const mediaID = this.mediaID
    const mediaType = "Movie"
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

  fetchCommentsForMovieReview() {
    this.reviewsService.getCommentsForMovieReview("Movie", this.mediaID).subscribe((data) => {
      //var commentList : Comment[]
      this.comments = data
      console.log(this.comments)
      if (this.comments.length == 0) {
        this.emptyComments = true
      } else {
        this.emptyComments = false
      }
      
    })
  }

  ngOnInit() {
    //console.log(this.mediaID)
    this.fetchMovieForReview()
    this.fetchCommentsForMovieReview()
    console.log(this.movieForReview)
    //this.mediaIDforUpdate = this.mediaID
  }

  onClickUpdate() {
    this.router.navigate([`update-movie-review/${this.mediaID}`])
  }

  onClickDelete() {
    this.reviewsService.deleteMovieById(this.mediaID).subscribe({
      next: (response) => {
        console.log(`Movie review deleted succesfully`)
        this.router.navigate(['movie-collection'])
      },
      error: (response) => {
        console.log("Error while deleting movie")
      }
    })
  }

  //get all comments again on comment deletion
  handleCommentDeletion() {
    console.log("Event works")
    this.fetchCommentsForMovieReview()
  }

  

}
