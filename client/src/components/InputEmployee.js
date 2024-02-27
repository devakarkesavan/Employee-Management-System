import React, { Fragment, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InputEmployee = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [hireDate, setHireDate] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [managerId, setManagerId] = useState("");
  const [salary, setSalary] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");

  const validateEmailFormat = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhoneNumber = (phoneNumber) => {
    const re = /^\d{10}$/;
    return re.test(String(phoneNumber));
  };

  const validateManagerId = (managerId) => {
    const existingManagerIds = Array.from({ length: 100 }, (_, i) => i + 1);
    return existingManagerIds.includes(Number(managerId));
  };

  const validateDepartmentId = (departmentId) => {
    const existingDepartmentIds = Array.from({ length: 3 }, (_, i) => i + 1);
    return existingDepartmentIds.includes(Number(departmentId));
  };

  const validateDate = (dateString) => {
    const today = new Date();
    const inputDate = new Date(dateString);
    return inputDate <= today;
  };

  const validateSalary = (designation, salary) => {
    switch (designation) {
      case "Manager":
        return salary >= 50000;
      case "Engineer":
        return salary >= 30000;
      case "Supervisor":
        return salary >= 40000;
      default:
        return false;
    }
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (!firstName || !email || !phoneNumber || !hireDate || !departmentId || !managerId || !salary || !designation || !department) {
      toast.error("Please fill in all fields");
      return;
    }
    if (!validateEmailFormat(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!validatePhoneNumber(phoneNumber)) {
      toast.error("Please enter a valid phone number");
      return;
    }
    if (!validateDate(hireDate)) {
      toast.error("Hire date cannot be in the future");
      return;
    }
    if (!validateSalary(designation, salary)) {
      toast.error("Salary is not reasonable for the position");
      return;
    }
    if (!validateManagerId(managerId)) {
      toast.error("Please enter a valid Manager ID");
      return;
    }
    if (!validateDepartmentId(departmentId)) {
      toast.error("Please enter a valid Department ID");
      return;
    }
    try {
      const body = {
        first_name: firstName,
        designation,
        department,
        email,
        phone_number: phoneNumber,
        hire_date: hireDate,
        department_id: departmentId,
        manager_id: managerId,
        salary,
      };
      const response = await fetch("http://localhost:5000/worker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        window.location.reload();
      } else {
        console.error("Failed to add employee");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <ToastContainer />
      <form className="container mt-5" onSubmit={onSubmitForm}>
        <div className="form-group row">
          <div className="col-md-6">
            <label className="text-primary">Name:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label className="text-primary">Email:</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-md-6">
            <label className="text-primary">Phone Number:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label className="text-primary">Hire Date:</label>
            <input
              type="date"
              className="form-control"
              placeholder="Hire Date"
              value={hireDate}
              onChange={(e) => setHireDate(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-md-6">
            <label className="text-primary">Department ID:</label>
            <input
              type="number"
              className="form-control"
              placeholder="Department ID"
              value={departmentId}
              onChange={(e) => setDepartmentId(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label className="text-primary">Manager ID:</label>
            <input
              type="number"
              className="form-control"
              placeholder="Manager ID"
              value={managerId}
              onChange={(e) => setManagerId(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-md-6">
            <label className="text-primary">Salary:</label>
            <input
              type="number"
              className="form-control"
              placeholder="Salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label className="text-primary">Designation:</label>
            <select
              className="form-control"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            >
              <option value="">Select Designation</option>
              <option value="Manager">Manager</option>
              <option value="Engineer">Engineer</option>
              <option value="Supervisor">Supervisor</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label className="text-primary">Department:</label>
          <select
            className="form-control"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="">Select Department</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="IT">IT</option>
          </select>
        </div>
        <button className="btn btn-success btn-block">Add Employee</button>
      </form>
    </Fragment>
  );
};

export default InputEmployee;
