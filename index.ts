import express, {Express} from "express";
import dotenv from "dotenv";
import cors from "cors";
import * as database  from "./config/database";

import mainV1Routes from "./api/v1/routes/index_routes";

dotenv.config();
database.connect();


const app:Express = express();
const port:number | string = process.env.PORT || 3000;

app.use(cors());

// parse body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mainV1Routes(app);

app.listen(port,()=>{
    console.log(`app listening on port ${port}`);
});