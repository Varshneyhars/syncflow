import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, Trash2, PlusCircle, Edit } from "lucide-react";
import { Link } from "react-router-dom";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Function to format date to IST
  const formatDateToIST = (dateString) => {
    return new Intl.DateTimeFormat("en-IN", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Asia/Kolkata",
    }).format(new Date(dateString));
  };

  // Fetch tasks from API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tasks");
        setTasks(response.data);
      } catch (err) {
        console.error("❌ Error fetching tasks:", err);
        setError("Failed to load tasks. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  // Handle Task Completion
  const markTaskComplete = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}`, { status: "completed" });
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === id ? { ...task, status: "completed" } : task))
      );
    } catch (err) {
      console.error("❌ Error updating task:", err);
    }
  };

  // Handle Task Deletion
  const deleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error("❌ Error deleting task:", err);
    }
  };

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

      {/* Loading & Error Handling */}
      {loading && <p className="text-center mt-4">Loading tasks...</p>}
      {error && <p className="text-danger text-center">{error}</p>}

      {/* Task Cards */}
      <div className="row">
        {tasks.map((task) => (
          <div className="col-md-6 col-lg-4 mb-4" key={task._id}>
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title">{task.title}</h5>
                <p className="card-text">{task.description}</p>
                <p className="card-text">
                  <strong>Status:</strong>{" "}
                  <span className={`badge px-3 py-2 ${task.status === "completed" ? "bg-success" : "bg-warning text-dark"}`}>
                    {task.status}
                  </span>
                </p>
                <p className="card-text">
                  <strong>Due Date:</strong> {formatDateToIST(task.dueDate)}
                </p>
              </div>
              <div className="card-footer bg-transparent d-flex justify-content-between">
                <button
                  className="btn btn-outline-success w-100 d-flex align-items-center justify-content-center"
                  disabled={task.status === "completed"}
                  onClick={() => markTaskComplete(task._id)}
                >
                  <CheckCircle size={16} className="me-1" /> Mark Complete
                </button>

                <Link to={`/update-task/${task._id}`} className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center mx-2">
                  <Edit size={16} className="me-1" /> Update Task
                </Link>

                <button
                  className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center"
                  onClick={() => deleteTask(task._id)}
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
