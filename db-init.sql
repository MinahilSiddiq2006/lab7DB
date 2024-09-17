CREATE TABLE users (
    email VARCHAR2(255) PRIMARY KEY,
    password VARCHAR2(255) NOT NULL
);

select * from users;

select * from EMPLOYEES where email = 'shehzadaslamoza@gmail.com';