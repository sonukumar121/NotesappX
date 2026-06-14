import express from "express";
import dotenv from "dotenv";

dotenv.config();
import cookieParser from "cookie-parser";
// import session from "express-session";
import cors from "cors";
const app = express();   
import NoteRoutes from "./route/NoteRoutes.js"
import userRoutes from "./route/userRoutes.js"
import connectDB from "./config/Db.js"; //database connection
connectDB();





// -------------------- Middleware --------------------
app.set("view engine", "ejs");
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// -------------------- Cookie Management --------------------
app.use(cookieParser());

// -------------------- API Routes --------------------
app.use("/api/note", NoteRoutes);
app.use("/api/users", userRoutes);




// -------------------- Server --------------------
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
