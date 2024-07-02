// TodoList.jsx
import React, { useState, useEffect } from "react";
import Add from "./Add";
import Remove from "./Remove";
import Edit from "./Edit";
import AudioPlayer from "./AudioPlayer";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../App.css";

export default function TodoList() {
  // State variables
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [editIndex, setEditIndex] = useState(null);
  const [removeIndex, setRemoveIndex] = useState(null);
  const [checkedTasks, setCheckedTasks] = useState(() => {
    const savedCheckedTodos = localStorage.getItem("checkedTasks");
    return savedCheckedTodos ? JSON.parse(savedCheckedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("checkedTasks", JSON.stringify(checkedTasks));
  }, [todos, checkedTasks]);

  const [filterCategory, setFilterCategory] = useState("All");
  const [filterPerson, setFilterPerson] = useState("All");
  const [selectedTask, setSelectedTask] = useState(null);

  const handleAdd = (task, category, person) => {
    const newTask = {
      id: Date.now(), // Unique identifier using timestamp
      task,
      category,
      person,
      dueDate: null,
      priority: null,
      notes: "",
    };
    setTodos([newTask, ...todos]);
  };

  const handleRemove = (taskId) => {
    const taskIndex = todos.findIndex((task) => task.id === taskId);
    setRemoveIndex(taskIndex);
  };

  const handleRemoveConfirm = () => {
    const filteredTodos = todos.filter((_, index) => index !== removeIndex);
    setTodos(filteredTodos);

    setCheckedTasks((prevCheckedTasks) =>
      prevCheckedTasks.filter((checkedIndex) => checkedIndex !== removeIndex)
    );

    if (
      selectedTask &&
      todos[removeIndex] &&
      selectedTask.id === todos[removeIndex].id
    ) {
      setSelectedTask(null);
    }

    setRemoveIndex(null);
  };

  const handleRemoveCancel = () => {
    setRemoveIndex(null);
  };

  const handleEdit = (taskId) => {
    const taskIndex = todos.findIndex((task) => task.id === taskId);
    setEditIndex(taskIndex);
  };

  const handleEditSave = (editedTask, index) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = editedTask;
    setTodos(updatedTodos);
    setEditIndex(null);
  };

  const handleEditCancel = () => {
    setEditIndex(null);
  };

  const handleCheckboxChange = (index) => {
    setCheckedTasks((prevCheckedTasks) =>
      prevCheckedTasks.includes(index)
        ? prevCheckedTasks.filter((checkedIndex) => checkedIndex !== index)
        : [...prevCheckedTasks, index]
    );
  };

  const categoryColors = {
    Basic: "#DBDBDB",
    Feature: "#FFC95F",
  };

  // Task Detail (Container)

  function TaskDetails({ task, onSave, onClose }) {
    const [dueDate, setDueDate] = useState(task.dueDate);
    const [priority, setPriority] = useState(task.priority);
    const [notes, setNotes] = useState(task.notes);

    const handleSave = () => {
      onSave({ ...task, dueDate, priority, notes });
    };

    return (
      <div className="task-details">
        <h4> Task Details</h4>

        <input
          type="date"
          value={dueDate || ""}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes"
        ></textarea>

        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Close</button>
      </div>
    );
  }

  const handleSaveTaskDetails = (updatedTask) => {
    const updatedTodos = todos.map((task) =>
      task.id === selectedTask.id ? updatedTask : task
    );
    setTodos(updatedTodos);
    setSelectedTask(updatedTask);
  };

  // State for the audio element
  const [audio] = useState(new Audio("../assest2/Theme-2.mp4"));
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // JSX rendering
  return (
    <div className="todo-list-page">
      <div className="todo-list-container">
        <div className="clip">DO YOUR STUFF</div>
        <div className="category-legend">
          {Object.entries(categoryColors).map(([category, color]) => (
            <div
              key={category}
              style={{ display: "flex", alignItems: "center", margin: "5px" }}
            >
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: color,
                  marginRight: "10px",
                  borderRadius: "5px",
                  boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.2)",
                }}
              ></div>
              {category}
            </div>
          ))}
        </div>
        <div className="filter-container">
          <div id="filter-category">
            <label htmlFor="categoryFilter">Filter by Category: </label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Basic">Basic</option>
              <option value="Feature">Feature</option>
            </select>
          </div>
          <div id="filter-person">
            <label htmlFor="personFilter">Filter by Person: </label>
            <select
              value={filterPerson}
              onChange={(e) => setFilterPerson(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Alkis">Alkis</option>
              <option value="Alena">Alena</option>
              <option value="Joao">Joao</option>
              <option value="Monika">Monika</option>
              <option value="Rebekka">Rebekka</option>
              <option value="Tayfun">Tayfun</option>
            </select>
          </div>
        </div>

        <Add onAdd={handleAdd} />
        <hr />
        <div className="item-wrapper">
          <ul className="tasks-list">
            {todos
              .filter(
                (item) =>
                  (filterCategory === "All" ||
                    item.category === filterCategory) &&
                  (filterPerson === "All" || item.person === filterPerson)
              )
              .map((item, index) => (
                <li key={item.id} className="task-item">
                  <div className="task-content">
                    <div className="checkbox-container">
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={checkedTasks.includes(index)}
                        onChange={() => handleCheckboxChange(index)}
                      />
                    </div>
                    <div
                      className={`task-text ${
                        checkedTasks.includes(index) ? "completed" : ""
                      }`}
                      style={{
                        border: "none",
                        minWidth: "350px",
                        minHeight: "30px",
                        background: categoryColors[item.category] || "beige",
                        cursor: "pointer",
                      }}
                      onClick={() => setSelectedTask(item)}
                    >
                      {item.task} _ {item.category}: {item.person}
                    </div>
                    {index === editIndex ? (
                      <Edit
                        value={item}
                        onSave={(editedTask) =>
                          handleEditSave(editedTask, index)
                        }
                        onCancel={handleEditCancel}
                        onChange={(value) =>
                          setTodos((prevTodos) => {
                            const updatedTodos = [...prevTodos];
                            updatedTodos[index] = value;
                            return updatedTodos;
                          })
                        }
                      />
                    ) : (
                      <>
                        <button
                          className="edit-button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(item.id);
                          }}
                        >
                          <i className="bi bi-pencil-fill"> Edit</i>
                        </button>
                      </>
                    )}
                    {index === removeIndex ? (
                      <Remove
                        onRemoveConfirm={handleRemoveConfirm}
                        onRemoveCancel={handleRemoveCancel}
                      />
                    ) : (
                      <button
                        className="remove-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemove(item.id);
                        }}
                      >
                        <i className="bi bi-x-square-fill"> Remove</i>
                      </button>
                    )}
                  </div>
                </li>
              ))}
          </ul>

          {selectedTask && (
            <div className="task-details-container">
              <TaskDetails
                task={selectedTask}
                onSave={handleSaveTaskDetails}
                onClose={() => setSelectedTask(null)}
              />
            </div>
          )}
        </div>

        <AudioPlayer />
      </div>
    </div>
  );
}
