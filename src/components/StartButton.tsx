export default function StartButton({ onClick }) {
  function handleClick() {
    onClick();
  }

  return <button onClick={handleClick}>Start Game</button>;
}
