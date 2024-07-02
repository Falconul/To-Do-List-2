import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Edit({ value, onSave, onCancel }) {
  const [task, setTask] = useState(value.task);
  const [category, setCategory] = useState(value.category);
  const [person, setPerson] = useState(value.person);

  const handleSave = () => {
    onSave({ task: task, category: category, person: person });
  };

  return (
    <div className="edit-container">
      <input
        className="edit-input"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        style={{
          border: "none",
          background: "beige",
        }}
      />
      <div className="edit-dropdown-container">
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
      </div>
      <button
        className="save-button"
        onClick={handleSave}
        style={{ fontSize: "12px" }}
      >
        <i className="bi bi-check2-square"> Save</i>
      </button>
      <button
        className="cancel-button"
        onClick={onCancel}
        style={{ fontSize: "12px" }}
      >
        Cancel
      </button>
    </div>
  );
}
