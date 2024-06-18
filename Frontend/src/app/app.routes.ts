import { Routes } from '@angular/router';
import { MovieCollectionComponent } from './components/movie-collection/movie-collection.component';
import { MusicCollectionComponent } from './components/music-collection/music-collection.component';
import { VideoGameCollectionComponent } from './components/video-game-collection/video-game-collection.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MovieReviewDetailedComponent } from './components/movie-review-detailed/movie-review-detailed.component';
import { MovieReviewComponent } from './components/movie-review/movie-review.component';
import { VideoGameReviewComponent } from './components/video-game-review/video-game-review.component';
import { VideoGameReviewDetailedComponent } from './components/video-game-review-detailed/video-game-review-detailed.component';
import { MusicReviewComponent } from './components/music-review/music-review.component';
import { MusicReviewDetailedComponent } from './components/music-review-detailed/music-review-detailed.component';
import { AddMovieReviewComponent } from './components/crud/add-movie-review/add-movie-review.component';
import { AddAlbumReviewComponent } from './components/crud/add-album-review/add-album-review.component';
import { AddGameReviewComponent } from './components/crud/add-game-review/add-game-review.component';
import { UserListRecordComponent } from './components/user-list-record/user-list-record.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UpdateMovieReviewComponent } from './components/crud/update-movie-review/update-movie-review.component';
import { UpdateAlbumReviewComponent } from './components/crud/update-album-review/update-album-review.component';
import { UpdateGameReviewComponent } from './components/crud/update-game-review/update-game-review.component';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'movie-collection', 
        component: MovieCollectionComponent
    },
    {
        path: 'music-collection',
        component: MusicCollectionComponent
    },
    {
        path: 'video-game-collection',
        component: VideoGameCollectionComponent
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'home', component: HomeComponent
    },
    {
        path: 'movie-review', component: MovieReviewComponent
    },
    {
        path: 'movie-review-detailed', component: MovieReviewDetailedComponent
    },
    {
        path: `movie-review-detailed/:mediaID`, component: MovieReviewDetailedComponent
    },
    {
        path: 'video-game-review', component: VideoGameReviewComponent
    },
    {
        path: 'video-game-review-detailed', component: VideoGameReviewDetailedComponent
    },
    {
        path: `video-game-review-detailed/:mediaID`, component: VideoGameReviewDetailedComponent
    },
    {
        path: 'album-review', component: MusicReviewComponent
    },
    {
        path: 'album-review-detailed', component: MusicReviewDetailedComponent
    },
    {
        path: `album-review-detailed/:mediaID`, component: MusicReviewDetailedComponent
    },
    {
        path: 'create-movie-review', component: AddMovieReviewComponent, canActivate: [authGuard]
    },
    {
        path: 'create-album-review', component: AddAlbumReviewComponent, canActivate: [authGuard]
    },
    {
        path: 'create-game-review', component: AddGameReviewComponent, canActivate: [authGuard]
    },
    {
        path: 'user-list', component: UserListComponent, canActivate: [authGuard]
    },
    {
        path: 'update-movie-review/:mediaID', component: UpdateMovieReviewComponent, canActivate: [authGuard]
    },
    {
        path: 'update-album-review/:mediaID', component: UpdateAlbumReviewComponent, canActivate: [authGuard]
    },
    {
        path: 'update-game-review/:mediaID', component: UpdateGameReviewComponent, canActivate: [authGuard]
    }
];
