import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Remove({ onRemoveConfirm, onRemoveCancel }) {
  return (
    <div className="remove-container">
      <button className="remove-button" onClick={onRemoveConfirm}>
        <i className="bi bi-x-square-fill"> Remove</i>
      </button>
      <button
        className="cancel-button"
        onClick={onRemoveCancel}
        style={{ fontSize: "12px" }}
      >
        Cancel
      </button>
    </div>
  );
}
