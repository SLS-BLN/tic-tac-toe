interface StartButtonProps {
  onClick: () => void;
}

export default function StartButton({ onClick }: StartButtonProps) {
  function handleClick() {
    onClick();
  }

  return <button onClick={handleClick}>Start Game</button>;
}
