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

async function newEmployee(employeeData) {
  const {
    employee_id,
    first_name,
    last_name,
    email,
    phone_number,
    hire_date,
    job_id,
    salary,
    commission_pct,
    manager_id,
    department_id,
  } = employeeData;

  // Convert ISO date string to JavaScript Date object
  const hireDate = new Date(hire_date);

  let conn;
  try {
    conn = await oracledb.getConnection();
    await conn.execute(
      `INSERT INTO employees 
            (employee_id, first_name, last_name, email, phone_number, hire_date, job_id, salary, commission_pct, manager_id, department_id) 
          VALUES 
            (:employee_id,:first_name, :last_name, :email, :phone_number, :hire_date, :job_id, :salary, :commission_pct, :manager_id, :department_id)`,
      {
        employee_id,
        first_name,
        last_name,
        email,
        phone_number,
        hire_date: hireDate,
        job_id,
        salary,
        commission_pct,
        manager_id,
        department_id,
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

// deleteEmployee

module.exports = {
  listAllEmployees,
  newEmployee,
};
