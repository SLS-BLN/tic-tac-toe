import { useState } from "react";

interface PlayerProps {
  initialName: string;
  symbol: string;
  isActive: boolean;
}

export default function Player({ initialName, symbol, isActive }: PlayerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);

  function handleSubmit(event) {
    event.preventDefault();
    console.log("SUBMITTED");
    setIsEditing(false);
  }

  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  function handleEditClick() {
    setIsEditing((wasEditing) => !wasEditing);
  }

  return (
    <li className={`list-item ${isActive ? "active" : undefined}`}>
      {!isEditing && <p className="player-name">{playerName}</p>}
      {isEditing && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">
            <input
              type="text"
              id="name"
              value={playerName}
              onChange={handleChange}
            />
          </label>
        </form>
      )}

      <p>{symbol}</p>
      <button className="edit-btn" onClick={handleEditClick}>
        {isEditing ? "Save" : "Edit"}
      </button>
    </li>
  );
}
