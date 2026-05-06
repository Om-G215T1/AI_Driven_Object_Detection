import mongoose from "mongoose";

const detectionSchema = new mongoose.Schema({
  objects: [String],
  confidence: [Number],
  video: { type: mongoose.Schema.Types.ObjectId, ref: "Video" }
});

export default mongoose.model("Detection", detectionSchema);