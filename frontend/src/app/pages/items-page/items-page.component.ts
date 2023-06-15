import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Items } from 'src/app/models/items.model';
import { User } from 'src/app/models/user';
import { CartService } from 'src/app/services/cart.service';
import { ItemsService } from 'src/app/services/items.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-items-page',
  templateUrl: './items-page.component.html',
  styleUrls: ['./items-page.component.css']
})
export class ItemsPageComponent {
  items!: Items;
  user!:User;
  constructor(activatedRoute:ActivatedRoute,private itemsService:ItemsService,private cartService:CartService, private router: Router, private userService:UserService) {
    let itemsObservable:Observable<Items>;
    activatedRoute.params.subscribe((params) => {
      if(params.id)
      itemsObservable = itemsService.getItemsById(params.id);

      itemsObservable.subscribe((serverItems) => {
        this.items = serverItems;

      userService.userObservable.subscribe((newUser) => {
        this.user = newUser;
        })
      })
    })

  }

  addToCart() {
    this.cartService.addtoCart(this.items);
    // switch to the cart page
    this.router.navigateByUrl('/cart');
  }

  deleteItem(itemsId: string): void {
    this.itemsService.deleteItem(itemsId).subscribe({
      next: () => {
        console.log('Nutzer erfolgreich gelöscht.');
      },
      error: (error) => {
        console.error('Fehler beim Löschen des Nutzers:', error);
      },
      complete: () => {
      }
    });
    location.reload();
  }

  get isAdmin() {
    return this.user.isAdmin;
    }
}
