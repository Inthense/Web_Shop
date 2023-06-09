import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Items } from 'src/app/models/items.model';
import { CartService } from 'src/app/services/cart.service';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-items-page',
  templateUrl: './items-page.component.html',
  styleUrls: ['./items-page.component.css']
})
export class ItemsPageComponent {
  items!: Items;
  constructor(activatedRoute:ActivatedRoute, itemsService:ItemsService,private cartService:CartService, private router: Router) {
    activatedRoute.params.subscribe((params) => {
      if(params.id)
      this.items = itemsService.getItemsById(params.id);
    })
  }

  addToCart() {
    this.cartService.addtoCart(this.items);
    // switch to the cart page
    this.router.navigateByUrl('/cart');
  }
}
