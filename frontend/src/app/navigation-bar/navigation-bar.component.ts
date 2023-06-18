import { Component, OnInit } from "@angular/core";
import { CartService } from "../services/cart.service";
import { UserService } from "../services/user.service";
import { User } from "../models/user.model";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent {

  cartQuantity=0;
  user!:User;
  menuCollapsed = false;

  constructor(cartService:CartService,private userService:UserService) {
    cartService.getCartObservable().subscribe((newCart)=> {
      this.cartQuantity=newCart.countSum;
    })
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    })
  }

  toggleMenu() {
    this.menuCollapsed = !this.menuCollapsed;
  }

  logout() {
    this.userService.logout();
  }

  get isAuth() {
  return this.user.token;
  }
  get isAdmin() {
    return this.user.isAdmin;
    }
}
