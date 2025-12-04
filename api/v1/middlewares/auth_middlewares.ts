import User from "../model/user_model";
import { Request,Response,NextFunction} from "express";
export const requireAuth = async (req:Request ,res:Response, next:NextFunction) :Promise<void>=> {
    if (req.headers.authorization)  { //lấy token thông qua header
        const token:string = req.headers.authorization.split(" ")[1]
        const user = await User.findOne({
            token: token,
            deleted: false
        }).select("-password");
        if (!user) {
            res.json({
                code: 400,
                message: "token không hợp lệ"
            })
            return;
        }
        req["user"]= user;
        console.log(req["user"])

        next();
    } else {
        res.json({
            code: 400,
            message: "vui lòng gửi token"
        })
    }

}