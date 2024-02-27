import React, { Fragment, useEffect, useState } from "react";
import EditEmployee from "./EditEmployee";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa"; 
import SearchBar from "./SearchBar";

const ListEmployees = () => {
  const [workers, setWorkers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const [workersPerPage] = useState(10);

  const deleteWorker = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/worker/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setWorkers(workers.filter((worker) => worker.employee_id !== id));
      } else {
        console.error("Failed to delete worker");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const getWorkers = async () => {
    try {
      const response = await fetch("http://localhost:5000/worker");
      if (response.ok) {
        const jsonData = await response.json();
        setWorkers(jsonData);
      } else {
        console.error("Failed to fetch workers");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getWorkers();
  }, []);

  const indexOfLastWorker = currentPage * workersPerPage;
  const indexOfFirstWorker = indexOfLastWorker - workersPerPage;

  const filteredWorkers = workers.filter((worker) =>
    Object.values(worker)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Fragment>
      <div className="container-fluid  text-black py-4">
        <h1 className="text-center">Worker List</h1>
      </div>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <SearchBar onSearch={setSearchTerm} />
          </div>
          <div className="col-md-6 text-right">
            <Link to="/InputEmployee" className="btn btn-success">Add Employee</Link>
          </div>
        </div>
      </div>
      <div className="container mt-4">
        <table className="table table-bordered table-primary">
          <thead className="thead-dark">
            <tr>
              <th>First Name</th>
              <th>Designation</th>
              <th>Department</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Hire Date</th>
              <th>Department ID</th>
              <th>Manager ID</th>
              <th>Salary</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredWorkers
              .slice(indexOfFirstWorker, indexOfLastWorker)
              .map((worker) => (
                <tr key={worker.employee_id}>
                  <td>{worker.first_name}</td>
                  <td>{worker.designation}</td>
                  <td>{worker.department}</td>
                  <td>{worker.email}</td>
                  <td>{worker.phone_number}</td>
                  <td>{worker.hire_date}</td>
                  <td>{worker.department_id}</td>
                  <td>{worker.manager_id}</td>
                  <td>{worker.salary}</td>
                  <td>
                    <EditEmployee worker={worker} />
                  </td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    <FaTrash
                      className="text-danger"
                      onClick={() => deleteWorker(worker.employee_id)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <nav aria-label="Page navigation">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => paginate(currentPage - 1)}
              >
                Previous
              </button>
            </li>
            <li className="page-item disabled">
              <span className="page-link">Page {currentPage}</span>
            </li>
            <li
              className={`page-item ${
                workers.length <= indexOfLastWorker ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => paginate(currentPage + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </Fragment>
  );
};

export default ListEmployees;
