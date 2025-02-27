import React from "react";
import { CheckCircle, Trash2, PlusCircle, Edit } from "lucide-react";
import { Link } from "react-router-dom"; // Ensure React Router is installed

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

      {/* Add Task Button */}
      <div className="text-center mt-4">
        <Link to="/add-task" className="btn btn-primary btn-lg d-flex align-items-center justify-content-center">
          <PlusCircle size={18} className="me-2" /> Add Task
        </Link>
      </div>

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
                  className="btn btn-outline-success w-100 d-flex align-items-center justify-content-center"
                  disabled={task.status === "Completed"}
                >
                  <CheckCircle size={16} className="me-1" /> Mark Complete
                </button>

                {/* Update Task Button */}
                <Link to={`/update-task/${task.id}`} className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center mx-2">
                  <Edit size={16} className="me-1" /> Update Task
                </Link>

                <button className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center">
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
