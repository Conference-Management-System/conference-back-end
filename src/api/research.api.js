const express = require("express");
const router = express.Router();
const researchController = require("../controller/research.controller");

module.exports = function () {
  router.post("/", researchController.createResearch);
  router.get("/", researchController.getAllResearch);
  router.delete("/:id", researchController.deleteResearch);
  router.get("/:id", researchController.getResearchById);
  router.put("/:id", researchController.updateResearch);

  return router;
};
