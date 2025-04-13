const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const { protect } = require("../middlewares/authMiddleware");

// console.log("getAllEmployees is:", typeof employeeController.getAllEmployees);

router.get("/", protect, employeeController.getAllEmployees);
router.get("/:id", protect, employeeController.getEmployeeById);
router.put("/", protect, employeeController.updateEmployee);
router.delete("/", protect, employeeController.deleteEmployee);

module.exports = router;
