import express from "express";
const Router = express.Router(); 
import { addnote , getnote , deletenote , updatenote , searchnote,searchdate} from "../controller/NoteController.js";
import {auth} from "../middlewares/userAuth.js"

Router.post("/",auth,addnote);
Router.get("/",auth,getnote);
Router.put("/:id",auth,updatenote)
Router.delete("/:id",auth,deletenote);
// <<<<<<< HEAD
// =======

Router.get("/search",auth,searchnote)
Router.get("/date",auth,searchdate)
// >>>>>>> 0dc9379 (google auth updatede)

Router.get("/search",auth,searchnote)
Router.get("/date",auth,searchdate)

export default Router;
