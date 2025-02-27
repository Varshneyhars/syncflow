import React, { useEffect, useState } from "react";
import { CheckCircle, Trash2, PlusCircle, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [summaries, setSummaries] = useState({});

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
        await axios.put(`http://localhost:5000/api/tasks/${taskId}/status`, { status: "Completed" });
        fetchTasks();
      } catch (err) {
        console.error("Error marking task as complete:", err);
        setError("Failed to update task status.");
      }
    }
  };

  const handleDeleteTask = async (taskId) => {
    const confirmAction = window.confirm("Are you sure you want to delete this task?");
    if (confirmAction) {
      try {
        await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
        setTasks(tasks.filter(task => task._id !== taskId));
      } catch (err) {
        console.error("Error deleting task:", err);
        setError("Failed to delete task.");
      }
    }
  };

  const handleGenerateSummary = async (taskId, taskTitle) => {
    try {
      const response = await axios.post("http://localhost:5000/api/ai/summary", {
        taskDescription: taskTitle,
      });

      setSummaries((prevSummaries) => ({
        ...prevSummaries,
        [taskId]: response.data.summary,
      }));
    } catch (err) {
      console.error("Error generating summary:", err);
      setError("Failed to generate summary.");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center text-primary">Your Tasks</h1>
      <p className="lead text-center text-secondary">Manage and track your tasks efficiently.</p>

      {/* Add Task Button */}
      <div className="text-center my-4">
        <Link to="/add-task" className="btn btn-lg btn-primary shadow-sm">
          <PlusCircle size={20} className="me-2" /> Add Task
        </Link>
      </div>

      {/* Task List */}
      {loading ? (
        <p className="text-center">Loading tasks...</p>
      ) : error ? (
        <p className="text-danger text-center">{error}</p>
      ) : (
        <div className="row">
          {tasks.map((task) => (
            <div className="col-md-6 col-lg-4 mb-4" key={task._id}>
              <div className="card shadow-sm border-0 rounded p-3 task-card">
                <div className="card-body">
                  <h5 className="card-title fw-bold">{task.title}</h5>
                  <p className="card-text">
                    <strong>Status:</strong>{" "}
                    <span
                      className={`badge px-3 py-2 ${task.status === "completed"
                          ? "bg-success"
                          : task.status === "in-progress"
                            ? "bg-info text-white"
                            : "bg-warning text-dark"
                        }`}
                    >
                      {task.status}
                    </span>

                  </p>
                  <p className="card-text">
                    <strong>Due Date:</strong> {task.dueDate}
                  </p>

                  {/* AI-generated summary */}
                  {summaries[task._id] && (
                    <div className="alert alert-info mt-2">
                      <strong>Summary:</strong> {summaries[task._id]}
                    </div>
                  )}
                </div>

                {/* Buttons Section */}
                <div className="card-footer bg-transparent d-flex flex-column gap-2">
                  <button
                    className="btn btn-sm btn-outline-info w-100"
                    onClick={() => handleGenerateSummary(task._id, task.title)}
                  >
                    <FileText size={16} className="me-1" /> Generate Summary
                  </button>
                  <button
                    className="btn btn-sm btn-outline-success w-100"
                    disabled={task.status === "completed"}
                    onClick={() => handleMarkComplete(task._id)}
                  >
                    <CheckCircle size={16} className="me-1" /> Mark Complete
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger w-100"
                    onClick={() => handleDeleteTask(task._id)}
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