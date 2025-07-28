import mongoose from "mongoose";
const { Schema } = mongoose;

const noteSchema = new Schema({
  title: String,
  content: String,
}, { timestamps: true });

const Note = mongoose.models.user || mongoose.model('Note', noteSchema);

export default Note;

