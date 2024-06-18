import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Comment } from 'src/app/shared/interfaces/comment';
import { ReviewsService } from 'src/app/shared/services/reviews.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent {
  //@Input() comments: Comment[]
  @Input() mediaType: string
  @Input() mediaID: number
  userService = inject(UserService)
  reviewService = inject(ReviewsService)
  user = this.userService.user
  allComments
  comments: Comment[]

  // fetchComments() {
  //   this.reviewService.getCommentsForMovieReview(this.mediaType, this.mediaID).subscribe((data) => {
  //     console.log(data)
  //     this.comments = data
  //   })
  // }

  //NA KALW TA COMMENTS ME MEDIATYPE KAI MEDIAID POU ERXONTAI SWSTA APO PARENT
  ngOnInit() {
    //console.log(this.mediaType, this.mediaID)
    this.fetchComments()
  }

  deleteComment(id: number) {
    this.reviewService.deleteComment(id).subscribe({
      next: (comment) => {
        console.log("Comment deleted")
        this.fetchComments()
      }
    })
  }

  fetchComments() {
    this.reviewService.getCommentsForMovieReview(this.mediaType, this.mediaID).subscribe((data) => {
      console.log(data)
      this.allComments = data
    })
  }
  
}
