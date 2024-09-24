const {
  listAllDepartments,
  newDepartment,
  modifyDepartment,
} = require("../models/DepartmentModel");
const db = require("../config/db");

async function getAllDepartments(req, res) {
  try {
    const employees = await listAllDepartments();
    res.json({ data: employees });
  } catch (err) {
    res.status(500).json({ message: "Error fetching departments", error: err });
  }
}

async function addDepartment(req, res) {
  try {
    await newDepartment(req.body);
    res.status(201).json({ message: "Department added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error adding department", error: err });
  }
}

async function updateDepartment(req, res) {
  try {
    await modifyDepartment(req.body);
    res.status(201).json({ message: "Department updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error updating department", error: err });
  }
}

module.exports = { getAllDepartments, addDepartment, updateDepartment };
