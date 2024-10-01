import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

import Header from "./Header";
import Table from "./EmployeeTable";
import Add from "./EmployeeAdd";
import Edit from "./EmployeeEdit";

const Dashboard = () => {
  const [employees, setEmployees] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  //LAB DEMO: Add call to fetch employees here:

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then(async (result) => {
      if (result.value) {
        try {
          const response = await fetch(
            `http://localhost:3001/api/employees/${id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.ok) {
            Swal.fire({
              icon: "success",
              title: "Employee deleted successfully",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Failed to delete employee",
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "An error occurred",
            text: error.message,
          });
        }
      }
    });
  };

  return (
    <div>
      <Header />
      <div className="container">
        {!isAdding && !isEditing && (
          <>
            <div
              style={{
                display: "flex",
                marginTop: "30px",
                marginBottom: "18px",
              }}
            >
              <h3 style={{ marginRight: "36px" }}>Employee View</h3>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <button
                  onClick={() => setIsAdding(true)}
                  style={{
                    color: "#404040",
                    border: "3px solid #404040",
                    backgroundColor: "transparent",
                    borderRadius: "12px",
                  }}
                >
                  Add Employee
                </button>
              </div>
            </div>
            <Table
              employees={employees}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </>
        )}
        {isAdding && (
          <Add
            employees={employees}
            setEmployees={setEmployees}
            setIsAdding={setIsAdding}
          />
        )}
        {isEditing && (
          <Edit
            selectedEmployee={selectedEmployee}
            setIsEditing={setIsEditing}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
