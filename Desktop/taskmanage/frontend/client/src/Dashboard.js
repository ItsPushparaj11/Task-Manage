import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!title.trim()) return;
    try {
      await axios.post("http://localhost:5000/api/tasks", {
        title,
        completed: false
      });
      setTitle("");
      fetchTasks();
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "20px auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2>My Tasks</h2>
        <button 
          onClick={handleLogout}
          style={{ padding: "8px 16px", backgroundColor: "#dc3545", color: "white", border: "none", cursor: "pointer" }}
        >
          Logout
        </button>
      </div>

      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <input 
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)} 
          placeholder="Add a new task..." 
          style={{ flex: 1, padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
          onKeyPress={(e) => e.key === "Enter" && addTask()}
        />
        <button 
          onClick={addTask}
          style={{ padding: "10px 20px", backgroundColor: "#007bff", color: "white", border: "none", cursor: "pointer", borderRadius: "4px" }}
        >
          Add
        </button>
      </div>

      <div style={{ listStyle: "none", padding: 0 }}>
        {tasks.length === 0 ? (
          <p style={{ color: "#999" }}>No tasks yet. Add one above!</p>
        ) : (
          tasks.map(task => (
            <div 
              key={task._id}
              style={{ 
                padding: "12px", 
                marginBottom: "10px", 
                backgroundColor: "#f5f5f5", 
                borderRadius: "4px", 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center" 
              }}
            >
              <span>{task.title}</span>
              <button 
                onClick={() => deleteTask(task._id)}
                style={{ padding: "5px 10px", backgroundColor: "#dc3545", color: "white", border: "none", cursor: "pointer", borderRadius: "3px" }}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
