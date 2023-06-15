import { Schema, model } from "mongoose";

export interface Items {
  imageUrl: string;
  name: string;
  rating: number;
  price: number;
  quantity: number;
  id: string;
}

export const ItemsSchema = new Schema<Items>({
    imageUrl: {type: String, required: true},
    name: {type: String, required: true},
    rating: {type: Number, required: false},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true},
    },{
        toJSON: {
            virtuals: true
        },
        toObject: {
            virtuals: true
        },
        timestamps: true
    });

export const ItemsModel = model<Items>('items', ItemsSchema);