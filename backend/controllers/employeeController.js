const {
  listAllEmployees,
  newEmployee,
  getMaxID,
  updateEmployeeByID,
  deleteEmployeeByID,
} = require("../models/EmployeeModel");
const db = require("../config/db");

async function getAllEmployees(req, res) {
  try {
    const employees = await listAllEmployees();
    res.json({ data: employees });
  } catch (err) {
    res.status(500).json({ message: "Error fetching employees", error: err });
  }
}

async function getIDMax(req, res) {
  try {
    const employees = await getMaxID();
    res.json({ data: employees });
  } catch (err) {
    res.status(500).json({ message: "Error fetching the max ID", error: err });
  }
}

async function addEmployee(req, res) {
  try {
    await newEmployee(req.body);
    res.status(201).json({ message: "Employee added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error adding employee", error: err });
  }
}

// updateEmployee
async function updateEmployee(req, res) {
  try {
    const employeeID = req.params.id;
    const updatedData = req.body;

    const result = await updateEmployeeByID(employeeID, updatedData);

    if (result.rowsAffected > 0) {
      res.json({ message: "Employee updated successfully" });
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error updating employee", error: err });
  }
}
// deleteEmployee
async function deleteEmployee(req, res) {
  try {
    const employeeID = req.params.id; // Employee ID from the URL parameter
    const result = await deleteEmployeeByID(employeeID);

    if (result.rowsAffected > 0) {
      res.json({ message: "Employee deleted successfully" });
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error deleting employee", error: err });
  }
}

module.exports = {
  getAllEmployees,
  getIDMax,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};
