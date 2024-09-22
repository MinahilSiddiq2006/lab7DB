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

async function getMaxID(){
  let conn;
  try{
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

// deleteEmployee

module.exports = {
  listAllEmployees,
  getMaxID,
  newEmployee,
};
