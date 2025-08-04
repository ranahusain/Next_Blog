import mongoose, { Schema } from "mongoose";

const CommentSchema = new Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" }, //on which post we are going to comment
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, //id of the person who is going to comment
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Comment ||
  mongoose.model("Comment", CommentSchema);
