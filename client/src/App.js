import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListEmployees from "./components/ListEmployees";
import InputEmployee from "./components/InputEmployee";


function App() {
  return (
    <Router>
      <Fragment>
        <div className='container'>
        <h2 className="text-center text-primary">Employee Management System</h2>
          <Routes>
            <Route exact path="/" element={<ListEmployees />} />
            <Route path="/InputEmployee" element={<InputEmployee />} />
          </Routes>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;