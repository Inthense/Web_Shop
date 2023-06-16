import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent {

  user!:User;

  constructor(private userService:UserService) {
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    })
  }

  get isAdmin() {
    return this.user.isAdmin;
    }

}
