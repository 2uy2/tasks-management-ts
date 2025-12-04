import { Request, Response } from "express";
import md5 from "md5";
import User from "../model/user_model";
import { generateRandomString } from "../../../helper/generate"

export const register = async (req: Request, res: Response) => {
    req.body.password = md5(req.body.password);
    console.log(req.body);
    const existEmail = await User.findOne({
        email: req.body.email,
        deleted: false
    })
    if (existEmail) {
        res.json({
            code: 400,
            message: "email đã tồn tại"
        })
    } else {
        const user = new User({
            fullName: req.body.fullName,
            email: req.body.email,
            password: req.body.password,
            token: generateRandomString(30)
        })


        user.save();
        const token = user.token;
        res.cookie("token", token); //tạo cookie cho fe, vì cookie lưu được cả trên server và fe  
        res.json({
            code: 200,
            message: "tạo tài khoản thành công",
            token: token
        })
    }
}

export const login = async (req: Request, res: Response) => {
    const email: string = req.body.email;
    const password: string = req.body.password;
    const user = await User.findOne({
        email: email,
        deleted: false
    })
    if (!user) {
        res.json({
            code: 400,
            message: "email không tồn tại"
        })
        return;
    }
    if (md5(password) != user.password) {
        res.json({
            code: 400,
            message: "sai mật khẩu"
        });
        return;
    }
    const token = user.token;
    res.cookie("token", token)
    res.json({
        code: 200,
        message: "đăng nhập thành công",
        token: token
    })
}