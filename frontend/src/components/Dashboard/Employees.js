import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

import Header from "./Header";
import Table from "./Table";
import Add from "./Add";
import Edit from "./Edit";

const Dashboard = ({ setIsAuthenticated }) => {
  const [employees, setEmployees] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3001/api/employees/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        // Assuming data.data is an array of arrays and you want to sort by the first item of each sub-array
        const sortedData = data.data.sort((a, b) => {
          if (a[0] < b[0]) return -1;
          if (a[0] > b[0]) return 1;
          return 0;
        });

        setEmployees(sortedData);
      })
      .catch((error) => console.error("Error fetching search results:", error));
  }, []);

  const handleEdit = (id) => {
    const [employee] = employees.filter((employee) => employee.id === id);

    setSelectedEmployee(employee);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    console.log(id);
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then( async (result) => {
      if (result.value) {
    
        // Make a DELETE request to the backend API to delete the employee
        try {
            const response = await fetch(`http://localhost:3001/api/employees/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Employee deleted successfully',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Failed to delete employee',
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'An error occurred',
                text: error.message,
            });
        }
    }
    });
  };

  return (
    <div>
      <Header
        setIsAdding={setIsAdding}
        setIsAuthenticated={setIsAuthenticated}
      />
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
            departments={employees}
            selectedDepartment={selectedEmployee}
            setEmployees={setEmployees}
            setIsEditing={setIsEditing}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
