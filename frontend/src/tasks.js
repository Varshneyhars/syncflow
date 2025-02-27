import React, { useEffect, useState } from "react";
import { CheckCircle, Trash2, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks");
      setTasks(response.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError("Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkComplete = async (taskId) => {
    const confirmAction = window.confirm("Are you sure you want to mark this task as complete?");
    if (confirmAction) {
      try {
        await axios.put(`http://localhost:5000/api/tasks/${taskId}`, { status: "completed" });
        fetchTasks(); // Refresh the task list
      } catch (err) {
        console.error("Error marking task as complete:", err);
        setError("Failed to update task status.");
      }
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!taskId) {
      console.error("Error: Task ID is undefined");
      return;
    }

    console.log("Deleting Task ID:", taskId); // Debugging: Ensure ID is correct

    const confirmAction = window.confirm("Are you sure you want to delete this task?");
    if (confirmAction) {
      try {
        await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
        setTasks(tasks.filter(task => task._id !== taskId)); // Update UI after deletion
      } catch (err) {
        console.error("Error deleting task:", err);
        setError("Failed to delete task.");
      }
    }
  };




  return (
    <div className="container mt-4">
      <h1 className="mb-4">Your Tasks</h1>
      <p className="lead">Manage and track your tasks efficiently.</p>

      <div className="text-center mt-4">
        <Link to="/add-task" className="btn btn-primary">
          <PlusCircle size={18} className="me-2" /> Add Task
        </Link>
      </div>

      {loading ? (
        <p>Loading tasks...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <div className="row">
          {tasks.map((task) => (
            <div className="col-md-6 col-lg-4 mb-4" key={task.id}>
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title">{task.title}</h5>
                  <p className="card-text">
                    <strong>Status:</strong>{" "}
                    <span
                      className={`badge px-3 py-2 ${task.status === "completed"
                          ? "bg-success"
                          : task.status === "in-progress"
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
                    disabled={task.status === "completed"}
                    onClick={() => handleMarkComplete(task.id)}
                  >
                    <CheckCircle size={16} className="me-1" /> Mark Complete
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDeleteTask(task._id)} // Use `_id` instead of `id`
                  >
                    <Trash2 size={16} className="me-1" /> Delete
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tasks;