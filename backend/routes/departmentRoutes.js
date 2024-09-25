const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/departmentController");

router.get("/department", departmentController.getAllDepartments);
router.post("/department", departmentController.addDepartment);
router.put("/department", departmentController.updateDepartment);

module.exports = router;
