import { Component, OnInit } from "@angular/core";
import { CartService } from "../services/cart.service";
import { UserService } from "../services/user.service";
import { User } from "../models/user";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  cartQuantity=0;
  user!:User;
  constructor(cartService:CartService,private userService:UserService) {
    cartService.getCartObservable().subscribe((newCart)=> {
      this.cartQuantity=newCart.countSum;
    })
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    })
  }

  ngOnInit(): void {
  }

  logout() {
    this.userService.logout();
  }

  get isAuth() {
  return this.user.token;
  }
}
