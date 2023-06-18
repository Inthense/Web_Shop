import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from "cors";
import itemsRouter from './routers/items.router';
import userRouter from './routers/user.router';
import commentRouter from './routers/comment.router';
import { dbConnect } from './configs/database.config';
dbConnect();

const app = express();
app.use(express.json());
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

app.use("/api/items", itemsRouter);
app.use("/api/users", userRouter);
app.use("/api/comments", commentRouter);

const port = 5000;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
});