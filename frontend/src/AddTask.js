import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddTask = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: "",
    description: "",
    assignedTo: "",
    dueDate: "",
    status: "pending", // Default value from enum
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const statusOptions = ["pending", "in-progress", "completed"]; // Enum values

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleStatusChange = (status) => {
    if (statusOptions.includes(status)) {
      setTask({ ...task, status });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formattedTask = {
        ...task,
        dueDate: new Date(task.dueDate).toISOString().split("T")[0], // Ensure YYYY-MM-DD format
      };

      const response = await axios.post("http://localhost:5000/api/tasks", formattedTask);
      console.log("✅ Task Added:", response.data);
      setSuccess("Task successfully added!");
      setTimeout(() => navigate("/tasks"), 1500);
      // Redirect after success
    } catch (err) {
      console.error("❌ Error adding task:", err);
      setError("Failed to add task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#f8f9fa", padding: "20px" }}>
      <div className="card shadow-lg border-0 p-4" style={{ width: "600px", backgroundColor: "#fff" }}>
        <div className="fw-bold text-uppercase p-3 text-white text-center rounded" style={{ backgroundColor: "#007bff", fontSize: "24px", width: "100%" }}>
          New Task
        </div>

        <div className="p-3">
          {error && <p className="text-danger text-center">{error}</p>}
          {success && <p className="text-success text-center">{success}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Title</label>
              <input type="text" className="form-control p-2" name="title" value={task.title} onChange={handleChange} placeholder="Enter task title" required />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Description</label>
              <textarea className="form-control p-2" name="description" value={task.description} onChange={handleChange} rows="3" placeholder="Enter task details" required></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Assigned To</label>
              <input type="text" className="form-control p-2" name="assignedTo" value={task.assignedTo} onChange={handleChange} placeholder="Enter assignee's ID" required />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Due Date</label>
              <input type="date" className="form-control p-2" name="dueDate" value={task.dueDate} onChange={handleChange} required />
            </div>

            {/* Status Selection with Enum Values */}
            <div className="mb-3">
              <label className="form-label fw-semibold d-block">Status</label>
              <div className="d-flex gap-2">
                {statusOptions.map((status) => (
                  <button
                    key={status}
                    type="button"
                    className={`btn w-100 ${
                      task.status === status
                        ? status === "pending"
                          ? "btn-danger text-white"
                          : status === "in-progress"
                          ? "btn-warning text-dark"
                          : "btn-success text-white"
                        : `btn-outline-${status === "pending" ? "danger" : status === "in-progress" ? "warning text-dark" : "success"}`
                    }`}
                    onClick={() => handleStatusChange(status)}
                  >
                    {status.replace("-", " ")}
                  </button>
                ))}
              </div>
            </div>

            <div className="d-flex justify-content-between mt-4">
              <button type="submit" className="btn btn-primary px-4" disabled={loading}>
                {loading ? "Submitting..." : "Submit Task"}
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
