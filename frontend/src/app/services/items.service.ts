import { Injectable } from '@angular/core';
import { Items } from '../models/items.model';
import { HttpClient } from '@angular/common/http';
import { ITEMS_URL, ITEMS_BY_SEARCH_URL, ITEMS_BY_ID_URL } from '../urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http:HttpClient) { }

  getAll(): Observable<Items[]> {
    return this.http.get<Items[]>(ITEMS_URL);
  }
  getAllItemsSearchTerm(searchTerm:string) {
    return this.http.get<Items[]>(ITEMS_BY_SEARCH_URL + searchTerm);
  }
  getItemsById(itemsId:string):Observable<Items> {
    return this.http.get<Items>(ITEMS_BY_ID_URL + itemsId);
  }
}
