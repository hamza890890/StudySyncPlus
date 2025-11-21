import { useState } from "react";
import API from "../api";

export default function TaskForm({ refresh }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const token = localStorage.getItem("token");

  async function addTask(e) {
    e.preventDefault();
    await API.post("/tasks", { title, description }, { headers: { Authorization: `Bearer ${token}` } });
    setTitle("");
    setDescription("");
    refresh();
  }

  return (
    <form onSubmit={addTask}>
      <input placeholder="Task title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <button>Add Task</button>
    </form>
  );
}
