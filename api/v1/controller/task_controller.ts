import Task from "../model/task_model";
import  {Router,Request,Response} from "express";

export const index =async (req:Request,res:Response)=>{
    interface Find {
        deleted: boolean,
        status? : string,

    }
    const find: Find={
        deleted:false,
    }
    if(req.query.status){
        find.status=req.query.status.toString();
    }
    const task = await Task.find(find)
    console.log(task);

    res.json(task)
}

export const detail = async (req:Request,res:Response)=>{
    const id:string = req.params.id;
    const task = await Task.findOne({
        _id:id,
        deleted:false,
    })
    console.log(task);

    res.json(task)
}