const { listAllEmployees, newEmployee, getMaxID } = require("../models/EmployeeModel");
const db = require("../config/db");

async function getAllEmployees(req, res) {
  try {
    const employees = await listAllEmployees();
    res.json({ data: employees });
  } catch (err) {
    res.status(500).json({ message: "Error fetching employees", error: err });
  }
}

async function getIDMax(req, res){
  try {
    const employees = await getMaxID();
    res.json({data:employees});
  } catch (err) {
    res.status(500).json({message: "Error fetching the max ID", error: err})
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
// deleteEmployee

module.exports = { getAllEmployees, getIDMax, addEmployee };
