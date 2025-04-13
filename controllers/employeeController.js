const Employee = require("../models/employeeModel");

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employees", error });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employee", error });
  }
};

const updateEmployee = async (req, res) => {
  try {
    // console.log("req.body.id", req.body._id)
    // console.log("req.body", req.body)
    const updatedEmployee = await Employee.findById(req.body._id,  { new: true });
    // console.log("emp:",updatedEmployee)
    if (!updatedEmployee) return res.status(404).json({ message: "Employee not found" });
    // Assuming you want to update the employee with the data in req.body
    updatedEmployee.name = req.body.name || updatedEmployee.name;
    updatedEmployee.email = req.body.email || updatedEmployee.email;
    updatedEmployee.phone = req.body.phone || updatedEmployee.phone;
    updatedEmployee.position = req.body.position || updatedEmployee.position;
    updatedEmployee.department = req.body.department || updatedEmployee.department;
    updatedEmployee.joiningDate = req.body.joiningDate || updatedEmployee.joiningDate;
    updatedEmployee.save(); // Save the updated employee to the database
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ message: "Error updating employee", error });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.body.id);
    if (!deletedEmployee) return res.status(404).json({ message: "Employee not found" });
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting employee", error });
  }
};

module.exports = { getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee };
