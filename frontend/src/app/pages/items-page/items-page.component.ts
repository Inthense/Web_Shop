import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Items } from 'src/app/models/items.model';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-items-page',
  templateUrl: './items-page.component.html',
  styleUrls: ['./items-page.component.css']
})
export class ItemsPageComponent {
  items!: Items;
  constructor(activatedRoute:ActivatedRoute, itemsService:ItemsService) {
    activatedRoute.params.subscribe((params) => {
      if(params.id)
      this.items = itemsService.getItemsById(params.id);
    })
  }
}
