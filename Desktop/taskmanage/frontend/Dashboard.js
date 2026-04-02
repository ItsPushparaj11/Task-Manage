import axios from "axios";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    await axios.post("http://localhost:5000/api/tasks", {
      title,
      completed: false
    });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div>
      <h2>Dashboard</h2>

      <input onChange={e => setTitle(e.target.value)} placeholder="New Task" />
      <button onClick={addTask}>Add</button>

      {tasks.map(task => (
        <div key={task._id}>
          {task.title}
          <button onClick={() => deleteTask(task._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}