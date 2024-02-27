CREATE DATABASE perntodo;

CREATE TABLE todo(
  todo_id SERIAL PRIMARY KEY,
  description VARCHAR(255)
);
CREATE TABLE worker (
  employee_id SERIAL PRIMARY KEY,
  first_name VARCHAR(50),
  email VARCHAR(100),
  phone_number VARCHAR(20),
  hire_date DATE,
  department_id INT, 
  manager_id INT, 
  salary NUMERIC(10, 2)
);

