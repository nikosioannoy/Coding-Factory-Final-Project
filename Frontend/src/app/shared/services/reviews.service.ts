import { HttpClient } from '@angular/common/http';
import { APP_ID, Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Movie, MovieAddition } from '../interfaces/movie';
import { Album, AlbumAddition } from '../interfaces/album';
import { VideoGame } from '../interfaces/video-game';
import { Comment } from '../interfaces/comment';

const API_URL = 'http://localhost:5109/api/'
//               http://localhost:5109/api/Albums/20
@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  http: HttpClient = inject(HttpClient)
  
  //Movies API Calls
  getMovies() {
    return this.http.get<Movie>(API_URL + 'Movies', {
      headers: {
        
        Accept: 'application/json',
      },
    })
  }

  getMovieById(mediaID : number) {
    return this.http.get<Movie>(API_URL + `Movies/${mediaID}`)
  }

  deleteMovieById(mediaID: number) {
    return this.http.delete<Movie>(API_URL + `Movies/${mediaID}`)
  }

  updateMovie(movie: Movie) {
    return this.http.put<MovieAddition>(API_URL + `Movies/${movie.mediaID}`, movie)
  }

  // Albums API Calls
  getAlbums() {
    return this.http.get<Album>(API_URL + 'Albums', {
      headers: {
        Accept: 'application/json'
      },
    })
  }

  getAlbumById(mediaID: number) {
    return this.http.get<Album>(API_URL + `Albums/${mediaID}`)
  }

  addAlbum(album: AlbumAddition) {
    return this.http.post<AlbumAddition>(API_URL + `Albums`, album)
  }

  updateAlbum(album: Album) {
    //console.log(album.mediaID)
    //console.log("Target link: " + `${API_URL}Albums/${album.mediaID}`)
    return this.http.put<AlbumAddition>(`${API_URL}Albums/${album.mediaID}`, album)
  }

  deleteAlbumById(mediaID: number) {
    return this.http.delete<Album>(`${API_URL}Albums/${mediaID}`)
  }

  // VideoGames API Calls
  getVideoGames() {
    return this.http.get<VideoGame>(API_URL + `VideoGames`, {
      headers: {
        Accept: 'application/json'
      },
    })
  }

  getVideoGameById(mediaID: number) {
    return this.http.get<VideoGame>(API_URL + `VideoGames/${mediaID}`)
  }

  addVideoGame(videoGame: VideoGame) {
    return this.http.post<VideoGame>(`${API_URL}VideoGames`, videoGame)
  }

  updateVideoGame(videoGame: VideoGame) {
    return this.http.put<VideoGame>(`${API_URL}VideoGames/${videoGame.mediaID}`, videoGame)
  }

  deleteVideoGame(mediaID: number) {
    return this.http.delete<VideoGame>(`${API_URL}VideoGames/${mediaID}`)
  }

  //Comments in reviews
  //Movies

  getCommentsForMovieReview(mediaType: string, mediaID: number) {
    return this.http.get<Comment>(`${API_URL}Comments/${mediaType}/${mediaID}`, {
      headers: {
        Accept: 'application/json'
      }, 
    })
  }

  postCommentForMovieReview(comment: Comment) {
    return this.http.post<Comment>(`${API_URL}Comments`, comment)
  }

  deleteComment(commentID: number) {
    return this.http.delete<Comment>(`${API_URL}Comments/${commentID}`)
  }



 
}
