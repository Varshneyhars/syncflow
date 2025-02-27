import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: "",
    description: "",
    assignedTo: "",
    dueDate: "",
    status: "Pending",
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleStatusChange = (status) => {
    setTask({ ...task, status });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Task:", task);
    navigate("/"); // Redirect back to tasks page after submission
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#f8f9fa", padding: "20px" }}
    >
      {/* Main Box */}
      <div className="card shadow-lg border-0 p-4" style={{ width: "600px", backgroundColor: "#fff" }}>
        {/* Broad Header */}
        <div
          className="fw-bold text-uppercase p-3 text-white text-center rounded"
          style={{ backgroundColor: "#007bff", fontSize: "24px", width: "100%" }}
        >
          New Task
        </div>

        {/* Task Form */}
        <div className="p-3">
          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Title</label>
              <input
                type="text"
                className="form-control p-2"
                name="title"
                value={task.title}
                onChange={handleChange}
                placeholder="Enter task title"
                required
              />
            </div>

            {/* Description */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Description</label>
              <textarea
                className="form-control p-2"
                name="description"
                value={task.description}
                onChange={handleChange}
                rows="3"
                placeholder="Enter task details"
                required
              ></textarea>
            </div>

            {/* Assigned To */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Assigned To</label>
              <input
                type="text"
                className="form-control p-2"
                name="assignedTo"
                value={task.assignedTo}
                onChange={handleChange}
                placeholder="Enter assignee's name"
                required
              />
            </div>

            {/* Due Date */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Due Date</label>
              <input
                type="date"
                className="form-control p-2"
                name="dueDate"
                value={task.dueDate}
                onChange={handleChange}
                required
              />
            </div>

            {/* Status Selection */}
            <div className="mb-3">
              <label className="form-label fw-semibold d-block">Status</label>
              <div className="d-flex gap-2">
                <button
                  type="button"
                  className={`btn w-100 ${task.status === "Pending" ? "btn-danger text-white" : "btn-outline-danger"}`}
                  onClick={() => handleStatusChange("Pending")}
                >
                  Pending
                </button>
                <button
                  type="button"
                  className={`btn w-100 ${task.status === "In Progress" ? "btn-warning text-dark" : "btn-outline-warning text-dark"}`}
                  onClick={() => handleStatusChange("In Progress")}
                >
                  In Progress
                </button>
                <button
                  type="button"
                  className={`btn w-100 ${task.status === "Completed" ? "btn-success text-white" : "btn-outline-success"}`}
                  onClick={() => handleStatusChange("Completed")}
                >
                  Completed
                </button>
              </div>
            </div>

            {/* Submit & Cancel Buttons */}
            <div className="d-flex justify-content-between mt-4">
              <button type="submit" className="btn btn-primary px-4">
                Submit Task
              </button>
              <button type="button" className="btn btn-secondary px-4" onClick={() => navigate("/")}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
