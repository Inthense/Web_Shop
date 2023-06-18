import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/models/cart.model';
import { CartItem } from 'src/app/models/cartItem.model';
import { Items } from 'src/app/models/items.model';
import { CartService } from 'src/app/services/cart.service';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cart!:Cart;
  items!:Items;

  constructor(private itemsService:ItemsService, activatedRoute:ActivatedRoute, private cartService:CartService) {
    let itemsObservable:Observable<Items>;
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    })
  }

  removeFromCart(cartItem:CartItem) {
    this.cartService.removeFromCart(cartItem.item.id);
  }

  changeQuantity(cartItem:CartItem, quantityString:string) {
    // convert to Int
    const quantity = parseInt(quantityString);
    this.cartService.changeQuantity(cartItem.item.id, quantity);
  }

}
