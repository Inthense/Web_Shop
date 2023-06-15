import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Items } from 'src/app/models/items.model';
import { User } from 'src/app/models/user';
import { ItemsService } from 'src/app/services/items.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-our-products',
  templateUrl: './our-products.component.html',
  styleUrls: ['./our-products.component.css']
})
export class OurProductsComponent {

  items:Items[] = [];
  user!:User;
  constructor(private itemsService:ItemsService, activatedRoute:ActivatedRoute, private userService:UserService) {
      let itemsObservable:Observable<Items[]>;
      activatedRoute.params.subscribe((params) => {
      if(params.searchTerm)
      itemsObservable = this.itemsService.getAllItemsSearchTerm(params.searchTerm)
      else
      itemsObservable=itemsService.getAll();

      itemsObservable.subscribe((serverItems) => {
        this.items = serverItems;

      userService.userObservable.subscribe((newUser) => {
        this.user = newUser;
        })

      })
    })
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
