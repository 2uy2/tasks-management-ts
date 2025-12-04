import {Express} from 'express'
import {taskRoutes} from "./task_routes";
import{userRoutes} from "./user_router"


const mainV1Routes = (app:Express):void  => {
    const version = "/api/v1"
    app.use(version+"/tasks",taskRoutes);
    app.use(version+"/users",userRoutes);
};

export default mainV1Routes;