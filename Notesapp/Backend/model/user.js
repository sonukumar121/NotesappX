import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },

    email: {
      type: String,
      required: false,
      unique:true
    },

     password: {
      type: String,
      required: false,
    },

  },

  {
    timestamps: true,
  },
);

export default mongoose.model("user", userSchema);
