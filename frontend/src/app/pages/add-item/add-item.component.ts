import { Component, NgModule } from '@angular/core';
import { InterfaceItemAdd } from 'src/app/interfaces/InterfaceItemAdd';
import { ItemsService } from 'src/app/services/items.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent {

  item: InterfaceItemAdd = {
    imageUrl: '',
    name: '',
    price: 0,
    quantity: 0
  };

  constructor(private itemService:ItemsService, private router:Router) {}


  submit() {
    this.itemService.addItem(this.item).subscribe(
      next => {
        console.log('Artikel erfolgreich hinzugefügt:');
      },
      error => {
        console.error('Fehler beim Hinzufügen des Artikels:', error);
      }
    );
    location.reload();
  }

}
