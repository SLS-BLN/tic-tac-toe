import { ReactNode, useState } from "react";

interface FieldProps {
  disabled: boolean;
  onClick: (event: { target: { id: string } }) => void;
  value: string;
  id: number;
  children: ReactNode;
}

export default function Field({
  disabled,
  onClick,
  value,
  id,
  children,
}: FieldProps) {
  const [isSelected, setIsSelected] = useState(false);

  const buttonId = id.toString();

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
      id={buttonId}
      type="button"
    >
      {children}
    </button>
  );
}
