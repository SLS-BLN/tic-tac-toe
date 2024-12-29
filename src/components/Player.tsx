import { ChangeEvent, FormEvent, useState } from "react";

interface PlayerProps {
  initialName: string;
  symbol: "X" | "O";
  isActive: boolean;
  getPlayerNames: (arg1: string, arg2: string) => void;
}

export default function Player({
  initialName,
  symbol,
  isActive,
  getPlayerNames,
}: PlayerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    getPlayerNames(symbol, playerName);
    setIsEditing(false);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setPlayerName(value);
  }

  function handleEditClick() {
    setIsEditing((wasEditing) => !wasEditing);
  }

  return (
    <li className={`list-item ${isActive ? "active" : undefined}`}>
      {!isEditing && <p className="player-name">{playerName}</p>}
      {isEditing && (
        <form onSubmit={handleSubmit} id="name-submit">
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
      {isEditing && (
        <button className="edit-btn" type="submit" form="name-submit">
          {isEditing ? "Save" : "Edit"}
        </button>
      )}
      {!isEditing && (
        <button className="edit-btn" onClick={handleEditClick} type="button">
          {isEditing ? "Save" : "Edit"}
        </button>
      )}
    </li>
  );
}
