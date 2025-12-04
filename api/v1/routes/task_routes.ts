import  {Router} from "express";
const router :Router= Router();
import Task from "../model/task_model";
import * as controller from "../controller/task_controller"


router.get("/",controller.index);
router.get("/detail/:id",controller.detail);
router.patch("/change-status/:id", controller.changeStatus)
router.patch("/change-multi", controller.changeMulti)
router.post("/create", controller.create);



export const taskRoutes:Router = router;