import { ReactNode, useState } from "react";

interface FieldProps {
  disabled: boolean;
  onClick: (id: string) => void;
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

  function handleClick(id: string) {
    setIsSelected(true);
    onClick(id);
  }

  if (isSelected)
    return (
      <button disabled className="selected" type="button" id={buttonId}>
        {value}
      </button>
    );

  return (
    <button
      disabled={disabled}
      onClick={() => handleClick(buttonId)}
      value={value}
      id={buttonId}
      type="button"
    >
      {children}
    </button>
  );
}
