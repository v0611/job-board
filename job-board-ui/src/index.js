import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, NavLink } from "react-router";
import { HomePage } from "./page/home";
import "bootstrap/dist/css/bootstrap.min.css";
import { EditJob } from "./page/edit-job";
import { AddJob } from "./page/add-job";
import { ApplyPage } from "./page/apply-job";

const root = ReactDOM.createRoot(document.getElementById("root"));

const App = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul
            className="navbar-nav"
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <li className="nav-item">
              <NavLink to={"/"} className={"navbar-brand"}>
                {" "}
                Home
              </NavLink>
            </li>
            <li className={`nav-item`}>
              <NavLink className={"nav-link"} to="add-job" end>
                Add Job
              </NavLink>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route index path="/" element={<HomePage />} />
          <Route path="edit-job/:jobId" element={<EditJob />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="apply/:jobId" element={<ApplyPage />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};
root.render(<App />);
