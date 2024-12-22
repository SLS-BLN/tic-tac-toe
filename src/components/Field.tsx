import { useState } from "react";

export default function Field({ disabled, onClick, value, children }) {
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
      type="button"
    >
      {children}
    </button>
  );
}
