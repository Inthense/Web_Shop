import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { InterfaceItemAdd } from 'src/app/interfaces/InterfaceItemAdd';
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

  items!:Items;
  user!:User;

  constructor(activatedRoute:ActivatedRoute,private itemsService:ItemsService,private cartService:CartService, private router: Router, private userService:UserService) {
    let itemsObservable:Observable<Items>;
    activatedRoute.params.subscribe((params) => {
      if(params.id) {
      itemsObservable = itemsService.getItemsById(params.id);

      itemsObservable.subscribe((serverItems) => {
        this.items = serverItems;
      })
    }
    })
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
      })
  }


  addToCart() {
    if (this.items.quantity <= 0) {
      alert('Dieser Artikel is gerade nicht Verfügbar');
      return;
    }
    this.items.quantity -= 1;
    this.itemsService.updateItem(this.items.id, this.items).subscribe((response: any) => {
      console.log('Item updated:', this.items);
      this.cartService.addtoCart(this.items);
      this.router.navigateByUrl('/cart');
    }, (error) => {
      console.error('Item konnte nicht hinzugefügt werden', error);
    });
  }

  deleteItem(name: string): void {
    this.itemsService.deleteItem(name).subscribe((response: any) =>{
      }, (error) => {
        console.error('Fehler beim Löschen des Artikels:', error);
    });
    location.reload();
  }



  editItem(itemId: string) {
    const updatedItem: InterfaceItemAdd = {
      imageUrl: 'assets/img/products/product1.png',
      name: '',
      price: 0,
      quantity: 0
    };

    // Wenn nötig noch das image mit updaten
    // updatedItem.imageUrl = (document.getElementById(itemId +'-imageUrl') as HTMLInputElement).value;
    updatedItem.name = (document.getElementById(itemId + '-name') as HTMLInputElement).value;
    updatedItem.price = parseFloat((document.getElementById(itemId + '-price') as HTMLInputElement).value);
    updatedItem.quantity = parseInt((document.getElementById(itemId + '-quantity') as HTMLInputElement).value, 10);

    this.itemsService.updateItem(itemId, updatedItem).subscribe((response: any) => {
      console.log('Item updated:', updatedItem);
      location.reload();
    }, (error) => {
      console.error('Fehler beim Editieren des Artikels:', error);
    });
  }


  get isAdmin() {
    return this.user.isAdmin;
    }
}
