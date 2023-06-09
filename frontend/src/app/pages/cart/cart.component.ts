import { Component } from '@angular/core';
import { Cart } from 'src/app/models/Cart';
import { CartItem } from 'src/app/models/CartItem';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cart!:Cart;

  constructor(private cartService:CartService) {
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
