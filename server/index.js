const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// Middleware
app.use(cors());
app.use(express.json());


// Create an employee
app.post("/worker", async (req, res) => {
  try {
    const { first_name,designation,department, email, phone_number, hire_date, department_id, manager_id, salary } = req.body;
    const newEmployee = await pool.query(
      "INSERT INTO worker (first_name,designation,department, email, phone_number, hire_date, department_id, manager_id, salary) VALUES($1, $2, $3, $4, $5, $6, $7,$8,$9) RETURNING *",
      [first_name,designation,department, email, phone_number, hire_date, department_id, manager_id, salary]
    );

    res.json(newEmployee.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all employees
app.get("/worker", async (req, res) => {
  try {
    const allEmployees = await pool.query("SELECT * FROM worker");
    res.json(allEmployees.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get an employee
app.get("/worker/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await pool.query("SELECT * FROM worker WHERE employee_id = $1", [id]);
    if (employee.rows.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json(employee.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update an employee
app.put("/worker/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name,designation,department, email, phone_number, hire_date, department_id, manager_id, salary } = req.body;
    const updateEmployee = await pool.query(
      "UPDATE worker SET first_name = $1,designation = $2, department=$3, email = $4, phone_number = $5, hire_date = $6, department_id = $7, manager_id = $8, salary = $9 WHERE employee_id = $8",
      [first_name, email, phone_number, hire_date, department_id, manager_id, salary, id]
    );

    res.json("Employee was updated!");
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete an employee
app.delete("/worker/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteEmployee = await pool.query("DELETE FROM worker WHERE employee_id = $1", [id]);
    if (deleteEmployee.rowCount === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json("Employee was deleted!");
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(5000, () => {
  console.log("Server has started on port 5000");
});
