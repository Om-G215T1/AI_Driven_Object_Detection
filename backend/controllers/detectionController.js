import Detection from "../models/Detection.js";

export const detectImage = async (req, res) => {
  const result = {
    objects: ["person", "car"],
    confidence: [0.9, 0.85]
  };

  const detection = await Detection.create(result);
  res.json(detection);
};

export const detectVideo = async (req, res) => {
  const result = {
    objects: ["dog", "bike"],
    confidence: [0.88, 0.76]
  };

  const detection = await Detection.create(result);
  res.json(detection);
};