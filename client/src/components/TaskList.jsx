import API from "../api";

export default function TaskList({ tasks, refresh }) {
  const token = localStorage.getItem("token");

  async function toggleComplete(id, completed) {
    await API.put(`/tasks/${id}`, { completed: !completed }, { headers: { Authorization: `Bearer ${token}` } });
    refresh();
  }

  async function deleteTask(id) {
    await API.delete(`/tasks/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    refresh();
  }

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <input type="checkbox" checked={task.completed} onChange={() => toggleComplete(task.id, task.completed)} />
          {task.title} - {task.description}
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
