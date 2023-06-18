import { Component, NgModule } from '@angular/core';
import { InterfaceItemAdd } from 'src/app/interfaces/InterfaceItemAdd';
import { ItemsService } from 'src/app/services/items.service';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Items } from 'src/app/models/items.model';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent {


  itemForm!: FormGroup;
  isSubmitted = false;
  items:Items[] = [];
  user!:User;

  constructor(private itemService:ItemsService, private router:Router, private formBuilder:FormBuilder,
    private itemsService:ItemsService, activatedRoute:ActivatedRoute, private userService:UserService) {
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
  userService.userObservable.subscribe((newUser) => {
    this.user = newUser;
  })
}


  ngOnInit():void {
    this.itemForm = this.formBuilder.group({
      imageUrl: ['/assets/img/products/sample.jpg', [Validators.required]],
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
    });
  }

  get fc() {
    return this.itemForm.controls;
  }

  submit() {
    this.isSubmitted = true;
    if(this,this.itemForm.invalid)
    return;
    const fv = this.itemForm.value;
    const item:InterfaceItemAdd = {
      imageUrl: fv.imageUrl,
      name: fv.name,
      price: fv.price,
      quantity: fv.quantity
    };
    this.itemService.addItem(item).subscribe(_ => {
    })
    location.reload();
  }

  get isAdmin() {
    return this.user.isAdmin;
    }
}
