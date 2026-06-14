import mongoose from "mongoose";


const connectDB = async () => 
{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/notesapp");
        console.log("MongoDB Connected");
    }
    catch(err)
    {
    console.log("MongoDB Connection failed");
    }
  

  
};

export default connectDB;
   
