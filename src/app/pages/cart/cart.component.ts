import { Component } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cart: Cart = { items: [{
    product: 'https://via.placeholder.com/150',
    name: 'super',
    price: 100,
    quantity: 1,
    id: 111,
}]};

dataSource: Array<CartItem> = [];
displayedColumns: Array<string> = [
  'a',
]

constructor() { }

ngOnInit(): void {
  this.dataSource = this.cart.items;
}

}
