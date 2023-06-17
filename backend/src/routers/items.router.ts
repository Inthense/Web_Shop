import { Router } from "express";
import { sample_items } from "../data";
import asyncHandler from 'express-async-handler';
import { Items, ItemsModel } from "../models/items.model";

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

router.post('/add-item', asyncHandler (
    async(req, res) => {
        const {imageUrl, name, price, quantity} = req.body
        const item = await ItemsModel.findOne({name});
        if(item) {
            res.status(400).send('Artikel schon vorhanden.');
            return;
        }

        const newItem:Items = {
            id:'',
            imageUrl,
            name,
            price,
            quantity,
            rating: 0
        }

        const dbItem = await ItemsModel.create(newItem);
    }
))

router.delete("/search/:name", asyncHandler(
    async (req, res) => {
      const name = req.params.name;
      await ItemsModel.deleteOne({ name: name });
    }
  ));
  
  router.put("/:itemsId", asyncHandler(
    async (req, res) => {
      const itemsId = req.params.itemsId;
      const itemUpdate: Items = req.body;
      const updatedItem = await ItemsModel.findByIdAndUpdate(itemsId, itemUpdate, { new: true });
      res.send(updatedItem);
    }
  ));


export default router;