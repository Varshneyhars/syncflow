import React from "react";
import { CheckCircle, Trash2, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom"; // Ensure React Router is installed

const Tasks = () => {
  // Sample tasks data
  const tasks = [
    { id: 1, title: "Complete Project Proposal", status: "Pending", dueDate: "2023-10-15" },
    { id: 2, title: "Review Design Mockups", status: "In Progress", dueDate: "2023-10-17" },
    { id: 3, title: "Prepare Presentation Slides", status: "Completed", dueDate: "2023-10-20" },
    { id: 4, title: "Fix Bug in Login Module", status: "Pending", dueDate: "2023-10-18" },
  ];

  // Handle Mark Complete with Confirmation
  const handleMarkComplete = (taskId) => {
    const confirmAction = window.confirm("Are you sure you want to mark this task as complete?");
    if (confirmAction) {
      console.log(`Task ${taskId} marked as complete`);
      // Add logic here to update task status
    }
  };

  // Handle Delete with Confirmation
  const handleDeleteTask = (taskId) => {
    const confirmAction = window.confirm("Are you sure you want to delete this task?");
    if (confirmAction) {
      console.log(`Task ${taskId} deleted`);
      // Add logic here to delete task
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Your Tasks</h1>
      <p className="lead">Manage and track your tasks efficiently.</p>

      {/* Add Task Button */}
      <div className="text-center mt-4">
        <Link to="/add-task" className="btn btn-primary">
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
                  className="btn btn-sm btn-outline-success"
                  disabled={task.status === "Completed"}
                  onClick={() => handleMarkComplete(task.id)}
                >
                  <CheckCircle size={16} className="me-1" /> Mark Complete
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDeleteTask(task.id)}
                >
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
