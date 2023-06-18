import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Items } from 'src/app/models/items.model';
import { User } from 'src/app/models/user.model';
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
  constructor(private itemsService:ItemsService, activatedRoute:ActivatedRoute) {
      let itemsObservable:Observable<Items[]>;
      activatedRoute.params.subscribe((params) => {
      if(params.searchTerm)
      itemsObservable = this.itemsService.getAllItemsSearchTerm(params.searchTerm)
      else
      itemsObservable=itemsService.getAll();

      itemsObservable.subscribe((serverItems) => {
        this.items = serverItems;
      })
    })
  }
}
