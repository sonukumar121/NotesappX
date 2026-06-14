// middlewares/validation.js
import { body } from "express-validator";


export const signupValidation = [
  body("name").isAlpha(),         
  body("email").isEmail(),        
  body("password").isLength({ min: 6 })
  
];


export const loginValidation = [
  body("email").isEmail(),
  body("password").notEmpty()
];


