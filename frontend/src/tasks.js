import React from "react";
import { CheckCircle, Trash2 } from "lucide-react";

const Tasks = () => {
  // Sample tasks data
  const tasks = [
    { id: 1, title: "Complete Project Proposal", status: "Pending", dueDate: "2023-10-15" },
    { id: 2, title: "Review Design Mockups", status: "In Progress", dueDate: "2023-10-17" },
    { id: 3, title: "Prepare Presentation Slides", status: "Completed", dueDate: "2023-10-20" },
    { id: 4, title: "Fix Bug in Login Module", status: "Pending", dueDate: "2023-10-18" },
  ];

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Your Tasks</h1>
      <p className="lead">Manage and track your tasks efficiently.</p>

      {/* Task Cards */}
      <div className="row">
        {tasks.map((task) => (
          <div className="col-md-6 col-lg-4 mb-4" key={task.id}>
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title">{task.title}</h5>
                <p className="card-text">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`badge px-3 py-2 ${
                      task.status === "Completed"
                        ? "bg-success"
                        : task.status === "In Progress"
                        ? "bg-warning text-dark"
                        : "bg-danger"
                    }`}
                  >
                    {task.status}
                  </span>
                </p>
                <p className="card-text">
                  <strong>Due Date:</strong> {task.dueDate}
                </p>
              </div>
              <div className="card-footer bg-transparent d-flex justify-content-between">
                <button
                  className="btn btn-sm btn-outline-success"
                  disabled={task.status === "Completed"}
                >
                  <CheckCircle size={16} className="me-1" /> Mark Complete
                </button>
                <button className="btn btn-sm btn-outline-danger">
                  <Trash2 size={16} className="me-1" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
