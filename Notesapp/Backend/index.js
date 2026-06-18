import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import authGoogle from "./auth/google.js"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/Db.js";
import NoteRoutes from "./route/NoteRoutes.js";
import userRoutes from "./route/userRoutes.js";
import dns from "dns";
dns.setServers(["1.1.1.1" , "8.8.8.8"])
dotenv.config();

const app = express();

// ---------------- DB CONNECT ----------------
connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("Server running on port", process.env.PORT);
  });
});

// ---------------- MIDDLEWARE ----------------
app.use(cors({
  origin: "https://notesappx.onrender.com",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
// app.use(passport.session());
// ---------------- ROUTES ----------------
app.use("/api/note", NoteRoutes);
app.use("/api/users", userRoutes);



app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));
 

  app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/",
  }),
  async (req, res) => {
    const token = jwt.sign(
      { id: req.user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.redirect("https://notesappx.onrender.com");
  }
);

app.get("/",(req,res)=>{
  return res.send("backend is running");
})
