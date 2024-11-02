const express = require("express");
const router = express.Router();
const Journal = require("../models/Journal");

router.post("/", async (req, res) => {
  try {
    const journal = new Journal(req.body);
    await journal.save();
    res.status(201).json(mood);
  } catch (error) {
    res.status(500).json({ message: "Error creating journal log", error });
  }
});

router.get("/", async (req, res) => {
  try {
    const journals = await Journal.find();
    res.status(200).json(journals);
  } catch (error) {
    res.status(500).json({ message: "Error fetching journal logs", error });
  }
});

module.exports = router;
