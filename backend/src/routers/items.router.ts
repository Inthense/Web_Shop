import { Router } from "express";
import { sample_items } from "../data";
import asyncHandler from 'express-async-handler';
import { ItemsModel } from "../models/items.model";

const router = Router();

router.get("/seed", asyncHandler(
    async(req, res) => {
        const itemsCount = await ItemsModel.countDocuments();
        if(itemsCount>0) {
            res.send("Seed is already done!");
            return;
        }
        await ItemsModel.create(sample_items);
        res.send("Seed is done");
    }
));

router.get("/",asyncHandler(
     async (req, res)=> {
        const items = await ItemsModel.find();
        res.send(items);
    }
));

router.get("/search/:searchTerm", asyncHandler(
    async (req, res) => {
        const searchRegExp = new RegExp(req.params.searchTerm, 'i');
        const items = await ItemsModel.find({name: {$regex: searchRegExp}});
        res.send(items);
    }
));

router.get("/:itemsId",asyncHandler(
    async (req, res) => {
        const items = await ItemsModel.findById(req.params.itemsId);
        res.send(items);
    }
))

export default router;