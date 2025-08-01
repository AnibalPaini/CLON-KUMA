import mongoose from "mongoose";

const tagSchema = mongoose.Schema({
  name:{type:String, requiered:true},
  color:{type:String,enum:["gris", "rojo", "verde", "naranja", "violeta", "rosa", "azul"], requiered:true},
}, { timestamps: true });

const tagModel= mongoose.model("tags", tagSchema)

export default tagModel;