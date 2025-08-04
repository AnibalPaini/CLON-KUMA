import mongoose from "mongoose";

const tagSchema = mongoose.Schema({
  name:{type:String, requiered:true},
  color:{type:String,enum:["gray", "red", "green", "orange", "purple", "pink", "blue", "yellow"], requiered:true},
}, { timestamps: true });

const tagModel= mongoose.model("tags", tagSchema)

export default tagModel;