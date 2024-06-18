import { HttpClient } from '@angular/common/http';
import { Injectable, effect, inject, signal } from '@angular/core';
import { Credentials, User, loggedInUser, updateUser } from '../interfaces/user';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { mergeScan } from 'rxjs';
import { Movie } from '../interfaces/movie';


const API_URL = 'http://localhost:5109/api/'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http: HttpClient = inject(HttpClient)
  router: Router = inject(Router)
  user = signal<loggedInUser | null>(null)

  constructor() {
    const access_token = localStorage.getItem('access_token')
    if (access_token) {
      const decodedTokenSubject = jwtDecode(access_token) as unknown as loggedInUser
      this.user.set({
        Username: decodedTokenSubject.Username,
        User_Email: decodedTokenSubject.User_Email,
        User_Role: decodedTokenSubject.User_Role,
        User_ID: decodedTokenSubject.User_ID
      })
    }
    effect(()=>{
      if (this.user()) {
        console.log('User logged in',)
      } else {
        console.log("No user logged in")
      }
    })
  }

  registerUser(user: User) {
    return this.http.post<{msg: string}>(`${API_URL}Users`, user)
  }

  updateUser(user: updateUser) {
    return this.http.put<{msg: string}>(`${API_URL}Users/${user.id}`, user)
  }


  check_duplicate_email(email: string) {
    return this.http.get<{msg: string}>(`${API_URL}Users/check_duplicate_email/${email}`)
  }

  check_duplicate_username(username: string) {
    return this.http.get<{msg: String}>(`${API_URL}Users/check_duplicate_username/${username}`)
  }

  loginUser(credentials: Credentials) {
    return this.http.post<{ token: string }>
    (`${API_URL}Users/login`, credentials)
  }

  logoutUser() {
    this.user.set(null) //Setaroume to signal tou user se null gia logout
    localStorage.removeItem('access_token') //Svinoume to access token
    this.router.navigate(['login']) //na mas paei sto login
  }

  deleteThisUser(id: string) {
    this.logoutUser()
    return this.http.delete<{msg: string}>(`${API_URL}Users/${id}`)
  }

  deleteUser(id: string) {
    return this.http.delete<{msg: string}>(`${API_URL}Users/${id}`)
  }

  getUsers() {
    return this.http.get<{msg: string}>(`${API_URL}Users`)
  }

  addMovie(movie: Movie) {
    return this.http.post<{msg: string}>(`${API_URL}Movies`, movie)
  }

}
