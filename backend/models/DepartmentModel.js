const oracledb = require("oracledb");

async function listAllDepartments() {
  let conn;
  try {
    conn = await oracledb.getConnection();
    const result = await conn.execute(`SELECT * FROM departments`);
    return result.rows;
  } catch (err) {
    throw err;
  } finally {
    if (conn) {
      await conn.close();
    }
  }
}

async function newDepartment(departmentData) {
  const { department_id, department_name, manager_id, location_id } =
    departmentData;

  // Error handling if data is missing with a message
  if (!department_id || !department_name || !manager_id || !location_id) {
    throw new Error("Missing required data");
  }

  let conn;
  try {
    conn = await oracledb.getConnection();
    await conn.execute(
      `INSERT INTO DEPARTMENTS (DEPARTMENT_ID, DEPARTMENT_NAME, MANAGER_ID, LOCATION_ID) VALUES (:department_id, :department_name, :manager_id, :location_id)`,
      {
        department_id,
        department_name,
        manager_id,
        location_id,
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

// Modify an existing department
async function modifyDepartment(departmentData) {
  const { department_id, department_name, manager_id, location_id } =
    departmentData;
  let conn;
  try {
    conn = await oracledb.getConnection();
    await conn.execute(
      `UPDATE DEPARTMENTS SET DEPARTMENT_NAME = :department_name, MANAGER_ID = :manager_id, LOCATION_ID = :location_id WHERE DEPARTMENT_ID = :department_id`,
      {
        department_id,
        department_name,
        manager_id,
        location_id,
      },
      { autoCommit: true }
    );
  } catch (err) {
    throw err;
  } finally {
    if (conn) {
      await conn.close();
    }
  }
}

module.exports = {
  listAllDepartments,
  newDepartment,
  modifyDepartment,
};
