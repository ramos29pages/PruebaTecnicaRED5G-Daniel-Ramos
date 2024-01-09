import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): boolean {
    let state = false;
    this.http.post('http://127.0.0.1:8000/login', {username, password}).subscribe(
      data => {
        this.router.navigate(['/dash']);
        state = true;
      },
      (error: HttpErrorResponse) => {
        state = false;
      }
    );

    return state;
  }
}
