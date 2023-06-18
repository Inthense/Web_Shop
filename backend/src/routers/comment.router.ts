import { Router } from "express";
import asyncHandler from 'express-async-handler';
import { CommentModel } from "../models/comments.model";
import { sample_comments } from "../data";

const router = Router();

router.get("/seed", asyncHandler(
    async(req, res) => {
        const usersCount = await CommentModel.countDocuments();
        if(usersCount>0) {
            res.send("Seed is already done!");
            return;
        }
        await CommentModel.create(sample_comments);
        res.send("Seed is done");
    }
));

router.get("/",asyncHandler(
    async (req, res)=> {
       const comments = await CommentModel.find();
       res.send(comments);
   }
));

router.post('/add-comment', asyncHandler (
    async(req, res) => {
        const {name, comment} = req.body
        const com = await CommentModel.findOne({name});
        if(com) {
            res.status(400).send('Artikel schon vorhanden.');
            return;
        }

        const newComment = {
            name,
            comment
        }

        const dbItem = await CommentModel.create(newComment);
    }
))

export default router;