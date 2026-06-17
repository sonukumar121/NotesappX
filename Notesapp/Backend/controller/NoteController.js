
import Note from "../model/Note.js";
import jwt from "jsonwebtoken";

export const addnote=async(req,res)=>{
    try{
        const {title,description}=req.body;
        const notes=await Note.create({title,description,userid:req.user.id});
        res.json({message: "notes created successfully", note: notes});
    }
    catch(err)
    {
        console.log(err);
    }
}



export const getnote = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const notes = await Note.find({
      userid: req.user.id,
      createdAt: {
        $gte: start,
        $lte: end,
      },
    });

    res.json({ notes });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};



export const deletenote=async(req,res)=>{
    try{
        const id = req.params.id;
        const deleted = await Note.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({message: 'note not found'});
        res.json({message: 'note deleted successfully', note: deleted});
    }
    catch(err)
    {
        console.log(err);
    }
}


export const updatenote=async(req,res)=>{
    try{
        const id = req.params.id;
        const update = await Note.findByIdAndUpdate(id);
        if (!update) return res.status(404).json({message: 'not updated'});
        res.json({message: 'note updated successfully', note: update});
    }
    catch(err)
    {
        console.log(err);
    }
}



export const searchnote=async(req,res)=>{
    try
    {
        const {search} = req.body;
        console.log("backend",search);
        const datas = await Note.find({title:{$regex:search,$options:"i"}});
        if (!datas) return res.status(404).json({message: 'no data find'});
        res.json({note: datas});
    }

    catch(err)
    {
        console.log(err);
    }
}