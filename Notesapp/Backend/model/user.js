import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },

    email: {
      type: String,
      required: true,
      unique:true
    },

     password: {
<<<<<<< HEAD
      type: String,
      required: false,
    },
=======
  type: String,
  required: function () {
    return !this.googleId;
  }

    
    googleId: {
  type: String,
   }
>>>>>>> 0dc9379 (google auth updatede)

    
    googleId: {
  type: String,
   }

  },

  {
    timestamps: true,
  },
);

export default mongoose.model("user", userSchema);
