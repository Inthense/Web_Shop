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
    // activatedRoute.params.subscribe((params) => {
    //   if(params.id) {
    //   itemsObservable = itemsService.getItemsById(params.id);

    //   itemsObservable.subscribe((serverItems) => {
    //     this.item = serverItems;
    //   })
    // }
    // })
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


    // removeFromCart(cartItem:CartItem) {
  //   this.items.quantity += 1;
  //   this.itemsService.updateItem(this.items.id, this.items).subscribe((response: any) => {
  //     console.log('Item updated:', this.items);
  //     this.cartService.removeFromCart(cartItem.item.id);
  //   }, (error) => {
  //     console.error('Item konnte nicht entfernt werden', error);
  //   });
  // }


  // removeFromCart(cartItem: CartItem) {
  //   // Reduziere die Quantity des Artikels um 1
  //   cartItem.item.quantity -= 1;

  //   // Wenn die Quantity 0 erreicht, entferne den Artikel aus dem Einkaufswagen
  //   if (cartItem.item.quantity === 0) {
  //     this.cartService.removeFromCart(cartItem.item.id).subscribe({
  //       next: () => {
  //         console.log('Artikel aus dem Einkaufswagen entfernt.');
  //       },
  //       error: (error) => {
  //         console.error('Fehler beim Entfernen des Artikels aus dem Einkaufswagen:', error);
  //       }
  //     });
  //   } else {
  //     // Aktualisiere die Quantity des Artikels in der Datenbank
  //     this.cartService.changeQuantity(cartItem.item.id, cartItem.item.quantity).subscribe({
  //       next: () => {
  //         console.log('Quantity aktualisiert.');
  //       },
  //       error: (error) => {
  //         console.error('Fehler beim Aktualisieren der Quantity:', error);
  //       }
  //     });
  //   }
  // }


  // changeQuantity(cartItem: CartItem, quantityString: string) {
  //   // Konvertiere in Int
  //   const quantity = parseInt(quantityString);

  //   // Aktualisiere die Quantity des Artikels in der Datenbank
  //   this.cartService.changeQuantity(cartItem.item.id, quantity).subscribe({
  //     next: () => {
  //       console.log('Quantity aktualisiert.');
  //     },
  //     error: (error) => {
  //       console.error('Fehler beim Aktualisieren der Quantity:', error);
  //     }
  //   });
  // }

}
