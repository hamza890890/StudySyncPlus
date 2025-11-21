import { useState, useEffect } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [quote, setQuote] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        fetchTasks();
        fetchQuote();
    }, []);

    async function fetchTasks() {
        try {
            const res = await API.get("/tasks", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setTasks(res.data);
        } catch {
            console.error("Failed to load tasks");
        }
    }

    async function fetchQuote() {
        try {
            const res = await API.get("/quote"); // use your backend route
            const data = res.data;
            setQuote(`"${data.quote}" — ${data.author}`);
        } catch (err) {
            console.error("Error fetching quote:", err);
            setQuote("Keep pushing forward!");
        }
    }



    async function addTask(e) {
        e.preventDefault();
        try {
            const res = await API.post(
                "/tasks",
                { title, description },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            setTasks([res.data, ...tasks]);
            setTitle("");
            setDescription("");
        } catch {
            console.error("Error adding task");
        }
    }

    async function toggleTask(id, completed) {
        await API.put(
            `/tasks/${id}`,
            { completed: !completed },
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        fetchTasks();
    }

    async function deleteTask(id) {
        await API.delete(`/tasks/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        fetchTasks();
    }

    function logout() {
        localStorage.clear();
        navigate("/login");
    }

    return (
        <div className="container">
            <h2>Welcome, {localStorage.getItem("username")}!</h2>
            <blockquote style={{ fontStyle: "italic", margin: "1rem 0" }}>
                {quote}
            </blockquote>


            <form onSubmit={addTask}>
                <input
                    placeholder="Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button>Add Task</button>
            </form>

            <ul>
                {tasks.map((t) => (
                    <li key={t.id}>
                        <span
                            style={{
                                textDecoration: t.completed ? "line-through" : "none",
                            }}
                        >
                            {t.title} — {t.description}
                        </span>
                        <button onClick={() => toggleTask(t.id, t.completed)}>
                            {t.completed ? "Undo" : "Complete"}
                        </button>
                        <button onClick={() => deleteTask(t.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            <button onClick={logout}>Logout</button>
        </div>
    );
}
