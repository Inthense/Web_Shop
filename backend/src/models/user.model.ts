import { Schema, model } from "mongoose";

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  address: string;
  token:string;
  isAdmin: boolean;
}

export const UserSchema = new Schema<User>({
    name: {type: String, required:true},
    email: {type: String, required:true, unique:true},
    password: {type: String, required:true},
    address: {type: String, required:true},
    token: {type: String, required:false},
    isAdmin: {type: Boolean, required:true},
},{
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
  });

  export const UserModel = model<User>('user', UserSchema);