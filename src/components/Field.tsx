import { useState } from "react";

export default function Field({ disabled, onClick, value, id, children }) {
  const [isSelected, setIsSelected] = useState(false);

  function handleSelectClick(event) {
    setIsSelected(true);
    onClick(event);
  }

  if (isSelected)
    return (
      <button disabled className="selected" type="button">
        {value}
      </button>
    );

  return (
    <button
      disabled={disabled}
      onClick={handleSelectClick}
      value={value}
      id={id}
      type="button"
    >
      {children}
    </button>
  );
}
