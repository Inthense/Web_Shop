import { Injectable } from '@angular/core';
import { Cart } from '../models/Cart';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Items } from '../models/items.model';
import { CartItem } from '../models/CartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart:Cart = this.getCartFromLocalStorage();
  private cartSubject:BehaviorSubject<Cart> = new BehaviorSubject(this.cart);
  constructor() { }

  addtoCart(item:Items):void {
    let cartItem = this.cart.items.find(cItem => cItem.item.id == item.id);
    // If the PRoduct is already inside
    if(cartItem) {
      return;
    }else{
    this.cart.items.push(new CartItem(item));
    }
    // set cart to local Storage
    this.setCartToLocalStorage();
  }

  removeFromCart(itemId:string):void {
    // Remove id from the list of Items
    this.cart.items = this.cart.items.filter(cItem => cItem.item.id !=itemId);
    this.setCartToLocalStorage();
  }

  // removeFromCart(itemId: string): Observable<any> {
  //   // Remove id from the list of Items
  //   this.cart.items = this.cart.items.filter(cItem => cItem.item.id !== itemId);
  //   this.setCartToLocalStorage();
  //   // Return an observable to allow subscription
  //   return of(null);
  // }


  changeQuantity(itemId:string, quantity:number) {
    let cartItem = this.cart.items.find(cItem => cItem.item.id == itemId);
    if(!cartItem) {
      return;
    }
    // Setting the price in the matter of quantity
    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.item.price;
    this.setCartToLocalStorage();
  }

  // changeQuantity(itemId: string, quantity: number): Observable<any> {
  //   let cartItem = this.cart.items.find(cItem => cItem.item.id == itemId);
  //   if (!cartItem) {
  //     return of(null);
  //   }
  //   // Setting the price in the matter of quantity
  //   cartItem.quantity = quantity;
  //   cartItem.price = quantity * cartItem.item.price;
  //   this.setCartToLocalStorage();
  //   // Return an observable to allow subscription
  //   return of(null);
  // }

  clearCart() {
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  getCartObservable():Observable<Cart>{
    // To avoid changes to cartSubject
    return this.cartSubject.asObservable();
  }

  private setCartToLocalStorage():void {
    // saving Total Price on totalPrice
    this.cart.totalPrice = this.cart.items.reduce((previousSum, currentItem) => previousSum + currentItem.price, 0);
    // saving amount of items on countSum
    this.cart.countSum = this.cart.items.reduce((previousSum, currentItem) => previousSum + currentItem.quantity, 0);
    // save cart local
    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage():Cart {
    // get Item with the Key 'Cart'
    const cartJson = localStorage.getItem('Cart');
    // check if cart is not empty and convert else output an empty cart
    return cartJson? JSON.parse(cartJson): new Cart();
  }
}
