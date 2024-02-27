import React, { Fragment, useState } from "react";
import { FaEdit } from 'react-icons/fa';

const EditEmployee = ({ worker }) => {
  const [firstName, setFirstName] = useState(worker.first_name);
  const [email, setEmail] = useState(worker.email);
  const [phoneNumber, setPhoneNumber] = useState(worker.phone_number);
  const [hireDate, setHireDate] = useState(worker.hire_date);
  const [departmentId, setDepartmentId] = useState(worker.department_id);
  const [managerId, setManagerId] = useState(worker.manager_id);
  const [salary, setSalary] = useState(worker.salary);

  const updateWorker = async (e) => {
    e.preventDefault();
    try {
      const body = {
        first_name: firstName,
        email,
        phone_number: phoneNumber,
        hire_date: hireDate,
        department_id: departmentId,
        manager_id: managerId,
        salary,
      };
      const response = await fetch(
        `http://localhost:5000/worker/${worker.employee_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <button
  type="button"
  className="btn btn-primary"
  data-toggle="modal"
  data-target={`#id${worker.employee_id}`}
>
  <FaEdit />
</button>

      <div className="modal" id={`id${worker.employee_id}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Employee</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <input
                type="date"
                className="form-control"
                value={hireDate}
                onChange={(e) => setHireDate(e.target.value)}
              />
              <input
                type="number"
                className="form-control"
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
              />
              <input
                type="number"
                className="form-control"
                value={managerId}
                onChange={(e) => setManagerId(e.target.value)}
              />
              <input
                type="number"
                className="form-control"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                onClick={updateWorker}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditEmployee;
