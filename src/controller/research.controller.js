const router = require("express").Router();
const User = require("../model/user");
const Research = require("../model/research");

//Create new Research

const createResearch = async (req, res) => {
  const newResearch = new Research(req.body);
  try {
    const savedResearch = await newResearch.save();
    res.status(200).json(savedResearch);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Update Research
const updateResearch = async (req, res) => {
  try {
    const updatedResearch = await Research.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedResearch);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Delete Post
const deleteResearch = async (req, res) => {
  try {
    const research = await Research.findById(req.params.id);
    try {
      await research.delete();
      res.status(200).json("Post has been deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//Get post

const getResearchById = async (req, res) => {
  try {
    const research = await Research.findById(req.params.id);
    res.status(200).json(research);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Get all researches
const getAllResearch = async (req, res) => {
  const status = req.query.research;

  try {
    let researches;
    if (status) {
      researches = await Research.find({ status });
    } else {
      researches = await Research.find();
    }

    res.status(200).json(researches);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getResearchById,
  deleteResearch,
  updateResearch,
  getAllResearch,
  createResearch,
};
