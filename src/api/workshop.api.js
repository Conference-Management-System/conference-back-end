const express = require("express");
const router = express.Router();
const workshopController = require("../controller/workshop.controller");

module.exports = function () {
  router.post("/", workshopController.createWorkshop);
  router.get("/", workshopController.getAllWorkshop);
  router.delete("/:id", workshopController.deleteWorkshop);
  router.get("/:id", workshopController.getWorkshopById);
  router.put("/:id", workshopController.updateWorkshop);

  return router;
};
