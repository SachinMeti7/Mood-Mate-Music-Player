import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  likedSongs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }]
});

export default mongoose.model("User", userSchema);