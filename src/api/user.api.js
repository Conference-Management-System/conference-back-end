const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");

module.exports = function () {
  router.get("/:id", userController.getUserById);
  router.put("/:id", userController.updateUsers);
  router.delete("/:id", userController.deleteUser);
  return router;
};
