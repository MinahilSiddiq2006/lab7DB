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
  // Convert ISO date string to JavaScript Date object
  const hireDate = new Date(employeeData.hire_date);
  const email = employeeData.email.substring(
    0,
    employeeData.email.indexOf("@")
  );

  let conn;
  try {
    conn = await oracledb.getConnection();
    console.log(employeeData);
    await conn.execute(
      `INSERT INTO EMPLOYEES (employee_id, first_Name, last_name, email, phone_number, HIRE_DATE, JOB_ID, salary, manager_id, department_id) VALUES (:employee_id, :first_name, :last_name, :email, :phone_number, :hire_date , :job_id, :salary, 100, 90)`,
      {
        employee_id: employeeData.id,
        first_name: employeeData.firstName,
        last_name: employeeData.lastName,
        email: email,
        phone_number: employeeData.phone,
        hire_date: hireDate,
        job_id: employeeData.jobID,
        salary: employeeData.salary,
        // commission_pct: 0,
        // manager_id: 100,
        // department_id: 90,
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

// editEmployee

// deleteEmployee

module.exports = {
  listAllEmployees,
  getMaxID,
  newEmployee,
};
