import express from "express";
const Router = express.Router(); 
import { addnote , getnote , deletenote , updatenote , searchnote} from "../controller/NoteController.js";
import {auth} from "../middlewares/userAuth.js"

Router.post("/",auth,addnote);
Router.get("/",auth,getnote);
Router.put("/:id",auth,updatenote)
Router.delete("/:id",auth,deletenote);
Router.post("/",auth,searchnote)


export default Router;
