const express = require("express");
const router = express.Router();
const Mood = require("../models/Mood");

router.post("/", async (req, res) => {
  try {
    const mood = new Mood(req.body);
    await mood.save();
    res.status(201).json(mood);
  } catch (error) {
    res.status(500).json({ message: "Error creating mood log", error });
  }
});

router.get("/", async (req, res) => {
  try {
    const moods = await Mood.find();
    res.status(200).json(moods);
  } catch (error) {
    res.status(500).json({ message: "Error fetching mood logs", error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedMood = await Mood.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedMood);
  } catch (error) {
    res.status(500).json({ message: "Error updating mood log", error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Mood.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting mood log", error });
  }
});

module.exports = router;
