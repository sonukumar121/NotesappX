import express from "express";
const Router = express.Router(); 
import{login,Signup} from "../controller/userController.js"
import {signupValidation,loginValidation} from "../middlewares/validation.js";
import {auth} from "../middlewares/userAuth.js"


Router.post("/login",loginValidation,login)

Router.post("/signup",signupValidation,Signup)

Router.get("/islogin", auth , (req,res)=>
{
    res.json({message:"already login"});
})


Router.get("/islogout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  return res.json({ message: "logout successfully" });
});


export default  Router;
