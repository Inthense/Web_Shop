import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Items } from 'src/app/models/items.model';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-our-products',
  templateUrl: './our-products.component.html',
  styleUrls: ['./our-products.component.css']
})
export class OurProductsComponent {

  items:Items[] = [];
  constructor(private itemsService:ItemsService, activatedRoute:ActivatedRoute) {
      activatedRoute.params.subscribe((params) => {
      if(params.searchTerm)
      this.items = this.itemsService.getAllItemsSearchTerm(params.searchTerm)
      else
      this.items=itemsService.getAll();
    })
  }

  ngOnInit(): void {

  }

}
