import { Schema, model } from "mongoose";

export interface Comment {
  id: string;
  name: string;
  comment: string;
}

export const CommentSchema = new Schema<Comment>({
    name: {type: String, required: true},
    comment: {type: String, required: true},
    },{
        toJSON: {
            virtuals: true
        },
        toObject: {
            virtuals: true
        },
        timestamps: true
    });

export const CommentModel = model<Comment>('comment', CommentSchema);