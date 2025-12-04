import paginationHelpers from "../../../helper/helper/paganiton";
import searchHelpers from "../../../helper/helper/search";
import Task from "../model/task_model";
import { Request, Response } from "express";


export const index = async (req: Request, res: Response) => {
    interface Find {
        deleted: boolean,
        status?: string,
        title?: RegExp,

    }
    const find: Find = {
        deleted: false,
    }
    if (req.query.status) {
        find.status = req.query.status.toString();
    }
    //search
    // lọc tìm kiếm keyword
    const objectSearch = searchHelpers(req.query);
    // console.log(objectSearch);
    if (req.query.keyword) {
        find.title = objectSearch.regex;
    }
    // pagination
    const countTasks = await Task.countDocuments(find); // đếm số lượng object dữ liệu được gọi đến
    let objectPagination = paginationHelpers({
        currentPage: 1, // truyền object
        limitItems: 2,
    },
        req.query,
        countTasks
    );
    //end pagination
    const sort = {};
    if (req.query.sortKey && req.query.sortValue) {
        const sortKey = req.query.sortKey.toString();
        const sortValue = req.query.sortValue.toString();
        sort[sortKey] = sortValue;

    }
    const task = await Task.find(find)
        .sort(sort)
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip);
    console.log(task);

    res.json(task)
}

export const detail = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const task = await Task.findOne({
        _id: id,
        deleted: false,
    })
    console.log(task);

    res.json(task)
}

export const changeStatus = async (req: Request, res: Response) => {
    try {
        const id:string = req.params.id;
        const status:string = req.body.status;

        await Task.updateOne({
            _id: id,
        }, {
            status: status
        })
        res.json({
            id: id,
            code: 200,
            messeage: "cập nhật thành công"
        })
    } catch (error) {
        res.json({

            code: 400,
            messeage: "không tồn tại"
        })
    }
} 