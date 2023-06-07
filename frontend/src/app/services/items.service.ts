import { Injectable } from '@angular/core';
import { Items } from '../models/items.model';
import { sample_items } from 'src/data';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor() { }

  getAll():Items[] {
    return sample_items;
  }
  getAllItemsSearchTerm(searchTerm:string) {
    return this.getAll().filter( items => items.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }
  getItemsById(itemsId:string):Items {
    return this.getAll().find(items => items.id == itemsId) ?? new Items();
  }
}
