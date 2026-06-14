import user from "../model/user.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const userd = await user.findOne({ email });
    console.log(userd);
    if (!userd) {
      return res.status(404).json({ message: "email doesnot exist" });
    }

    const checkpass = await bcrypt.compare(password, userd.password);
    if (checkpass)
   {
     const token = jwt.sign(
      { id: userd._id },      //header+payload
      process.env.JWT_SECRET, //signature
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
    httpOnly: true,
    secure: false, 
    maxAge: 24 * 60 * 60 * 1000,
  });
      console.log("Cookie set:", userd._id);
      return res.status(200).json({ message: "login successfully" });
    }
    res.json({ message: "Wrong Password" });
  } catch (err) {
    res.json({ message: "error", err });
  }
};





export const Signup = async (req, res) => {
  const { name, email, password } = req.body;
  // console.log(data);

  try {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    const hpassword = await bcrypt.hash(password, 10);
    await user.create({ name, email, password: hpassword });
    res.json({ message: "signup successfully" });
  } catch (err) {
    res.json({ message: "something error in signup" });
  }
};
