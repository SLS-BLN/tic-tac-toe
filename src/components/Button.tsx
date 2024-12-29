interface ButtonProps {
  onClick: () => void;
  text: string;
}

export default function Button({ onClick, text }: ButtonProps) {
  function handleClick() {
    onClick();
  }

  return <button onClick={handleClick}>{text}</button>;
}
