import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, NavLink } from "react-router";
import { HomePage } from "./page/home";
import "bootstrap/dist/css/bootstrap.min.css";
import { EditJob } from "./page/edit-job";
import { AddJob } from "./page/add-job";

const root = ReactDOM.createRoot(document.getElementById("root"));

const App = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <NavLink to={"/"} className={"navbar-brand"}>
            {" "}
            Home
          </NavLink>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className={`nav-item active`}>
                <NavLink className={"nav-link"} to="add-job" end>
                  Add Job
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={"nav-link"} to="edit-job" end>
                  Edit Job
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
        <Routes>
          <Route index path="/" element={<HomePage />} />
          <Route path="edit-job" element={<EditJob />} />
          <Route path="add-job" element={<AddJob />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};
root.render(<App />);
