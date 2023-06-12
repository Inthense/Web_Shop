import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/user';
import { InterfaceUserLogin } from '../interfaces/InterfaceUserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL } from '../urls';
import { ToastrService } from 'ngx-toastr';

// For setItem()
const USER_KEY = 'User';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable:Observable<User>;

  constructor(private http:HttpClient, private toastrService:ToastrService) {
    this.userObservable = this.userSubject.asObservable();
  }

  login(userLogin:InterfaceUserLogin):Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Wilkommen zum Web Shop ${user.name}.`,
            'Erfolgreich eingeloggt.'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Login Fehlgeschlagen');
        }
      })
    );
  }

  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  private setUserToLocalStorage(user:User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage():User {
    const userJson = localStorage.getItem(USER_KEY);
    if(userJson) return JSON.parse(userJson) as User;
    return new User();
  }
}
