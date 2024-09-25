const oracledb = require("oracledb");

async function listAllEmployees() {
  let conn;
  try {
    conn = await oracledb.getConnection();
    const result = await conn.execute(`SELECT * FROM employees`);
    return result.rows;
  } catch (err) {
    throw err;
  } finally {
    if (conn) {
      await conn.close();
    }
  }
}

async function getMaxID() {
  let conn;
  try {
    conn = await oracledb.getConnection();
    const result = await conn.execute(`SELECT MAX(EMPLOYEE_ID) FROM EMPLOYEES`);
    return result.rows;
  } catch (err) {
    throw err;
  } finally {
    if (conn) {
      await conn.close();
    }
  }
}

async function newEmployee(employeeData) {
  const {
    id,
    first_name,
    last_name,
    email,
    // phone_number,
    salary,
    hire_date,
    // job_id,
    // commission_pct,
    // manager_id,
    // department_id,
  } = employeeData;

  // Convert ISO date string to JavaScript Date object
  const hireDate = new Date(hire_date);

  let conn;
  try {
    conn = await oracledb.getConnection();
    await conn.execute(
      // `INSERT INTO employees
      //       (employee_id, first_name, last_name, email, phone_number, hire_date, job_id, salary, commission_pct, manager_id, department_id)
      //     VALUES
      //       (:employee_id,:first_name, :last_name, :email, :phone_number, :hire_date, :job_id, :salary, :commission_pct, :manager_id, :department_id)`,
      //   `INSERT INTO employees
      //   (employee_id, first_name, last_name, email, phone_number, hire_date, job_id, salary, commission_pct, manager_id, department_id)
      // VALUES
      //   (:employee_id,:first_name, :last_name, :email, :phone_number, :hire_date, :job_id, :salary, :commission_pct, :manager_id, :department_id)`,
      `INSERT INTO EMPLOYEES (employee_id, last_name, email, HIRE_DATE, JOB_ID) VALUES (:employee_id, 'Lakhani', 'SAAKHANI', '24-JUN-24', 10)`,
      {
        employee_id: employeeData.id,
        // first_name:"Saad",
        // last_name:"Lakhani",
        // email:"saad@saad.com",
        // phone_number: "000 000 000",
        // hire_date: "24-JUN-24",
        // job_id: 10,
        // salary:"100000",
        // commission_pct: 0,
        // manager_id: 100,
        // department_id: 10,
      },
      { autoCommit: true }
    );
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    if (conn) {
      await conn.close();
    }
  }
}

// updateEmployee
async function updateEmployee(id, updatedData) {
  let conn;
  try {
    conn = await oracledb.getConnection();

    let fieldsToUpdate = [];
    let values = { employee_id: id };

    if (updatedData.first_name) {
      fieldsToUpdate.push("first_name = :first_name");
      values.first_name = updatedData.first_name;
    }
    if (updatedData.last_name) {
      fieldsToUpdate.push("last_name = :last_name");
      values.last_name = updatedData.last_name;
    }
    if (updatedData.email) {
      fieldsToUpdate.push("email = :email");
      values.email = updatedData.email;
    }
    if (updatedData.salary) {
      fieldsToUpdate.push("salary = :salary");
      values.salary = updatedData.salary;
    }
    if (updatedData.hire_date) {
      fieldsToUpdate.push("hire_date = :hire_date");
      values.hire_date = new Date(updatedData.hire_date);
    }

    // If no fields to update, return
    if (fieldsToUpdate.length === 0) {
      throw new Error("No fields provided to update");
    }

    const sql = `UPDATE employees SET ${fieldsToUpdate.join(
      ", "
    )} WHERE employee_id = :employee_id`;

    const result = await conn.execute(sql, values, { autoCommit: true });
    return result;
  } catch (err) {
    throw err;
  } finally {
    if (conn) {
      await conn.close();
    }
  }
}

// deleteEmployee
async function deleteEmployee(id) {
  let conn;
  try {
    conn = await oracledb.getConnection();

    // Execute the DELETE query
    const result = await conn.execute(
      `DELETE FROM employees WHERE employee_id = :employee_id`,
      { employee_id: id },
      { autoCommit: true }
    );

    return result;
  } catch (err) {
    throw err;
  } finally {
    if (conn) {
      await conn.close();
    }
  }
}

module.exports = {
  listAllEmployees,
  getMaxID,
  newEmployee,
  updateEmployee,
  deleteEmployee,
};
