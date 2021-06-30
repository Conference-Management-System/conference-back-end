const router = require("express").Router();
const User = require("../model/user");
const Workshop = require("../model/workshop");

//Create new Workshop

const createWorkshop = async (req, res) => {
  const newWorkshop = new Workshop(req.body);
  try {
    const savedWorkshop = await newWorkshop.save();
    res.status(200).json(savedWorkshop);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Update Workshop
const updateWorkshop = async (req, res) => {
  try {
    const updatedWorkshop = await Workshop.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedWorkshop);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Delete Workshop
const deleteWorkshop = async (req, res) => {
  try {
    const workshop = await Workshop.findById(req.params.id);
    try {
      await workshop.delete();
      res.status(200).json("workshop has been deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//Get workshop by id

const getWorkshopById = async (req, res) => {
  try {
    const workshop = await Workshop.findById(req.params.id);
    res.status(200).json(workshop);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Get all Workshops
const getAllWorkshop = async (req, res) => {
  const status = req.query.workshop;

  try {
    let workshops;
    if (status) {
      workshops = await Workshop.find({ status });
    } else {
      workshops = await Workshop.find();
    }

    res.status(200).json(workshops);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAllWorkshop,
  getWorkshopById,
  deleteWorkshop,
  updateWorkshop,
  createWorkshop,
};
