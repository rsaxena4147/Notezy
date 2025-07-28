import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  notes: [

    {
      type: Schema.Types.ObjectId,
      ref: "Note"
    }
  ]


}, { timestamps: true })

const User = mongoose.models.user || mongoose.model('User', userSchema);

export default User;
