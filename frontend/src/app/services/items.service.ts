import { Injectable } from '@angular/core';
import { Items } from '../models/items.model';
import { HttpClient } from '@angular/common/http';
import { ITEMS_URL, ITEMS_BY_SEARCH_URL, ITEMS_BY_ID_URL, ITEMS_ADD_URL } from '../urls';
import { Observable, tap } from 'rxjs';
import { InterfaceItemAdd } from '../interfaces/InterfaceItemAdd';

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

  deleteItem(name: string):Observable<Items> {
    return this.http.delete<Items>(ITEMS_BY_SEARCH_URL + name);
  }

  // addItem(itemAdd:InterfaceItemAdd):Observable<Items> {
  //   return this.http.post<Items>(ITEMS_ADD_URL, itemAdd);
  // }

  updateItem(itemsId:string, itemUpdate:InterfaceItemAdd):Observable<Items> {
    return this.http.put<Items>(ITEMS_URL + '/' + itemsId, itemUpdate);
  }

  addItem(itemAdd:InterfaceItemAdd): Observable<Items> {
    return this.http.post<Items>(ITEMS_ADD_URL, itemAdd).pipe(
      tap({
        next: (item) => {
          console.log("Artikel hinzugefügt")
        },
        error: (errorResponse) => {
          console.log("Hinzufügen fehlgeschlagen")
        }
      })
    )
  }

}
