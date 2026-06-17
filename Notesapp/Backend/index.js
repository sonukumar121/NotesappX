import express from "express";
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
  origin: "https://NotesappX.onrender.com",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ---------------- ROUTES ----------------
app.use("/api/note", NoteRoutes);
app.use("/api/users", userRoutes);

app.get("/",(req,res)=>{
  return res.send("backend is running");
})