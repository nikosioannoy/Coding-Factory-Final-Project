import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Album } from 'src/app/shared/interfaces/album';
import { Movie } from 'src/app/shared/interfaces/movie';
import { VideoGame } from 'src/app/shared/interfaces/video-game';
import { ReviewsService } from 'src/app/shared/services/reviews.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  reviewsService = inject(ReviewsService)
  router = inject(Router)
  randomEntry
  movieToShow: Movie
  GameToShow : VideoGame
  AlbumToShow : Album
  allMovies
  allGames
  allAlbums

  ngOnInit() {
    //get all movies
    this.reviewsService.getMovies().subscribe((data) => {
      console.log(data)
      this.allMovies = data
      this.randomEntry = this.getRandomEntry(this.allMovies)
      console.log(this.randomEntry)
      this.movieToShow = this.allMovies[this.randomEntry]
      console.log(this.movieToShow)
    })

    //get all Albums
    this.reviewsService.getAlbums().subscribe((data) => {
      console.log(data)
      this.allAlbums = data
      this.randomEntry= this.getRandomEntry(this.allAlbums)
      console.log(this.randomEntry)
      this.AlbumToShow = this.allAlbums[this.randomEntry]
    })

    //get all Games
    this.reviewsService.getVideoGames().subscribe((data) => {
      console.log(data)
      this.allGames = data
      this.randomEntry = this.getRandomEntry(this.allGames)
      console.log(this.randomEntry)
      this.GameToShow = this.allGames[this.randomEntry]
    })
  }

  getRandomEntry(listOfMedia: any) {
    const entries = Object.keys(listOfMedia)
    const randomIndex = Math.floor(Math.random() * entries.length)
    const randomEntry = entries[randomIndex]
    return randomEntry
  }


    //thelw na pairnei random ena apo to kathena  
    // console.log(Object.keys(this.allMovies).length)
    // console.log(Object.keys(this.allAlbums).length)
    // console.log(Object.keys(this.allGames).length)
 
    onMovieClick() {
      this.router.navigate(['movie-collection'])
    }

    onAlbumClick() {
      this.router.navigate(['music-collection'])
    }

    onGameClick() {
      this.router.navigate(['video-game-collection'])
    }

}
