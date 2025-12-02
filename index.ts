import express, {Express,Request,Response} from "express";
import dotenv from "dotenv";
import * as database  from "./config/database";
import Task from "./model/task_model";

dotenv.config();
database.connect();


const app:Express = express();
const port:number | string = process.env.PORT || 3000;

app.get("/tasks",async (req:Request,res:Response)=>{
    const task = await Task.find({
        deleted:false,
    })
    console.log(task);

    res.json(task)
});

app.listen(port,()=>{
    console.log(`app listening on port ${port}`);
});