CREATE TABLE users (
    email VARCHAR2(255) PRIMARY KEY,
    password VARCHAR2(255) NOT NULL
);

select * from users;

select * from EMPLOYEES where email = 'shehzadaslamoza@gmail.com';

INSERT INTO EMPLOYEES (employee_id, last_name, email, HIRE_DATE, JOB_ID) VALUES (1, 'Lakhani', 'SAAKHANI', '24-JUN-24', 10);

DELETE FROM EMPLOYEES WHERE EMPLOYEE_ID = 1;

SELECT * FROM EMPLOYEES ORDER BY EMPLOYEE_ID;