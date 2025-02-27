import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/tasks").then((res) => setTasks(res.data));
    }, []);

    return (
        <div className="container">
            <h2>Project Dashboard</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task._id}>{task.title} - {task.status}</li>
                ))}
            </ul>
        </div>
    );
}
