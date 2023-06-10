import express from "express";
import cors from "cors";
import { sample_items, sample_users } from "./data";
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

app.get("/api/items", (req, res)=> {
    res.send(sample_items);
});

app.get("/api/items/search/:searchTerm", (req, res) => {
    const searchTerm = req.params.searchTerm;
    const items = sample_items.filter( items => items.name.toLowerCase().includes(searchTerm.toLowerCase()));
    res.send(items);
});

app.get("/api/items/:itemsId", (req, res) => {
    const itemsId = req.params.itemsId;
    const items = sample_items.find(items => items.id == itemsId);
    res.send(items);
})

app.post("/api/users/login", (req, res) => {
    const body = req.body;
    // Destructuring Assignment
    const {email, password} = req.body;
    const user = sample_users.find(user => user.email == email && user.password == password);

    if(user) {
        res.send(generateTokenResponse(user));
    }else{
        res.status(400).send("E-Mail oder Passwort nicht korrekt.")
    }
})

const generateTokenResponse = (user:any) => {
    const token = jwt.sign({
        email:user.email, isAdmin:user.isAdmin
    },"SampleText", {
        expiresIn: "30d"
    });
    user.token = token;
    return user;
}

const port = 5000;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
});