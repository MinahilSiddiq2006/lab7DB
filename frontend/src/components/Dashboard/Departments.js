import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

import Header from "./Header";
import Edit from "./Edit";
import DepartmentTable from "./DepartmentTable";
import AddDepartment from "./AddDepartment";

const DepartmentsDashboard = ({ setIsAuthenticated }) => {
  const [departments, setDepartments] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3001/api/department/`, {
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

        setDepartments(sortedData);
      })
      .catch((error) => console.error("Error fetching search results:", error));
  }, []);

  const handleEdit = (id) => {
    const [department] = departments.filter((department) => department.id === id);

    setSelectedDepartment(department);
    setIsEditing(true);
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
              <h3 style={{ marginRight: "36px" }}>Department View</h3>
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
                  Add Department
                </button>
              </div>
            </div>
            <DepartmentTable
              departments={departments}
              handleEdit={handleEdit}
            />
          </>
        )}
        {isAdding && (
          <AddDepartment
            departments={departments}
            setEmployees={setDepartments}
            setIsAdding={setIsAdding}
          />
        )}
        {isEditing && (
          <Edit
            departments={departments}
            selectedDepartment={selectedDepartment}
            setEmployees={setDepartments}
            setIsEditing={setIsEditing}
          />
        )}
      </div>
    </div>
  );
};

export default DepartmentsDashboard;
