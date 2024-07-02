import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Add({ onAdd }) {
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("Basic");
  const [person, setPerson] = useState("Alkis");

  const handleAdd = () => {
    if (task.trim() !== "") {
      onAdd(task, category, person); // Only basic task details are passed
      setTask(""); // Clear the input field after adding a task
    }
  };

  // Function to handle the Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div className="add-container">
      <input
        className="task-input"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="type your task here"
      />
      <select value={person} onChange={(e) => setPerson(e.target.value)}>
        <option value="Alkis">Alkis</option>
        <option value="Alena">Alena</option>
        <option value="Joao">Joao</option>
        <option value="Monika">Monika</option>
        <option value="Rebekka">Rebekka</option>
        <option value="Tayfun">Tayfun</option>
      </select>

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Basic">Basic</option>
        <option value="Feature">Feature</option>
      </select>

      <button className="add-button" type="button" onClick={handleAdd}>
        <i className="bi bi-plus-square-fill"> Add</i>
      </button>
    </div>
  );
}
