import React from 'react';

const DepartmentTable = ({ departments, handleEdit, handleDelete }) => {

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>Department ID</th>
            <th>Department Name</th>
            <th>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {departments.length > 0 ? (
            departments.map((department, i) => (
              <tr key={department[0]}>
                <td>{department[0]}</td>
                <td>{department[1]}</td>
                <td>
                <button
                    onClick={() => handleEdit(department.id)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No Department</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentTable;