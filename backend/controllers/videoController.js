import Video from "../models/Video.js";

export const uploadVideo = async (req, res) => {
  const video = await Video.create({
    filename: req.file.filename,
    path: req.file.path,
    uploadedBy: req.user.id
  });

  res.json(video);
};

export const getVideos = async (req, res) => {
  const videos = await Video.find();
  res.json(videos);
};

export const deleteVideo = async (req, res) => {
  await Video.findByIdAndDelete(req.params.id);
  res.send("Deleted");
};
