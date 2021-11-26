import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({ // you can write 'new Schema({})' also but you have to import 'Schema' then.
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now  // this fn runs or called when actual document is inserted
    },
  });

const user = mongoose.model("user", UserSchema); // u can use 'user' in other schema like in NotesSchema.js

export default user; 