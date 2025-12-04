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
    const sort = {};
    if(req.query.sortKey && req.query.sortValue){
        const sortKey=req.query.sortKey.toString();
        const sortValue=req.query.sortValue.toString();
        sort[sortKey]=sortValue;

    }
    const task = await Task.find(find).sort(sort)
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