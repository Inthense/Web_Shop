import { CartItem } from "./cartItem.model";

export class Cart{
  items:CartItem[] = [];
  totalPrice:number = 0;
  countSum:number = 0;
}
