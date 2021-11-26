import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema({
    user: {  // by this your notes is visible to only you, no one else can see your notes
        type: mongoose.Schema.Types.ObjectId, // it means we are using other schema material, this is called foreign material
        ref: 'user' // put the value of 'ref' from the other schema which you want to use inside it
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        default: "General",
    },
    date: {
        type: Date,
        default: Date.now  // this fn runs or called when actual document is inserted
    },
  });

const notes = mongoose.model("note", NotesSchema);

export default notes; 