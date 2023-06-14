import { Router } from "express";
import { sample_users } from "../data";
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { User, UserModel } from "../models/user.model";
import bcrypt from 'bcryptjs';

const router = Router();

router.get("/seed", asyncHandler(
    async(req, res) => {
        const usersCount = await UserModel.countDocuments();
        if(usersCount>0) {
            res.send("Seed is already done!");
            return;
        }
        await UserModel.create(sample_users);
        res.send("Seed is done");
    }
));

router.post("/login",asyncHandler(
        async (req, res) => {
        // Destructuring Assignment
        const {email, password} = req.body;
        const user = await UserModel.findOne({email, password});
    
        if(user) {
            res.send(generateTokenResponse(user));
        }else{
            res.status(400).send("E-Mail oder Passwort nicht korrekt.")
        }
    }
))

const generateTokenResponse = (user:any) => {
    const token = jwt.sign({
        email:user.email, isAdmin:user.isAdmin
    },"SampleText", {
        expiresIn: "30d"
    });
    user.token = token;
    return user;
}

router.post('/register', asyncHandler(
    async (req, res) => {
        const { name, email, password, address } = req.body;
        const user = await UserModel.findOne({email});
        if(user) {
            res.status(400).send("Ein Nutzer für diese E-Mail Adresse ist bereits vorhanden.");
            return
        }

        const encryptedPassword = await bcrypt.hash(password, 10);
        const newUser: User = {
            id: '',
            name,
            email: email.toLowerCase(),
            password: encryptedPassword,
            address,
            isAdmin: false,
            token: '',
        }

        const dbUser = await UserModel.create(newUser);
        res.send(generateTokenResponse(dbUser));
    }
))

router.get("/admin-page/user-search",asyncHandler(
    async (req, res)=> {
       const user = await UserModel.find();
       res.send(user);
   }
));

router.get("/admin-page/user-search/:searchTerm", asyncHandler(
    async (req, res) => {
        const searchRegExp = new RegExp(req.params.searchTerm, 'i');
        const users = await UserModel.find({name: {$regex: searchRegExp}});
        res.send(users);
    }
));

export default router;