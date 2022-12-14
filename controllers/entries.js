const express = require("express");

const waterRouter = express.Router();
const WaterEntry = require("../models/entry.js");

waterRouter.get("/", async (req, res) => {
  const waterEntries = await WaterEntry.find({
    date: { $gte: req.query.startDate, $lt: req.query.endDate },
    user_id: req.session.currentUser._id,
  }).exec();
  console.log("query", req.query);
  res.status(200).json(waterEntries);
});

// adding water to entry
waterRouter.post("/", async (req, res) => {
  console.log(req.body);
  const waterEntry = await WaterEntry.create({
    ...req.body,
    user_id: req.session.currentUser._id,
  });
  res.status(200).json(waterEntry);
});

// WaterEntry.create({});

waterRouter.delete("/", async (req, res) => {
  const deleteWaterEntry = await WaterEntry.findByIdAndDelete(
    req.body.id
  ).exec();
  res.status(200).json(deleteWaterEntry);
});

module.exports = waterRouter;
