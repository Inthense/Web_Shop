import { Component, NgModule } from '@angular/core';
import { InterfaceItemAdd } from 'src/app/interfaces/InterfaceItemAdd';
import { ItemsService } from 'src/app/services/items.service';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent {


  itemForm!: FormGroup;
  isSubmitted = false;


  constructor(private itemService:ItemsService, private router:Router, private formBuilder:FormBuilder) {}


  ngOnInit():void {
    this.itemForm = this.formBuilder.group({
      imageUrl: ['', [Validators.required]],
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

}
