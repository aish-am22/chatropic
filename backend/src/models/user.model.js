import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
email:{
type: string,
required: true,
unique: true,
},
name:{
    type: string,
    require: true,

},
image:{
    type: string,
    required: true,
},
clerkId: {
    type: string,
    required: true,
    unique: true,
}
}, {timestamps: true})

export const User = mongoose.model("User", userSchema)