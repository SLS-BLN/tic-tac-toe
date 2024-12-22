import { useState } from "react";
import { calculateWinner } from "./utils/winner";

import Title from "./components/Title";
import Board from "./components/Board";
import Field from "./components/Field";
import StartButton from "./components/StartButton";
import Message from "./components/Message";

import "./App.css";
import PlayerList from "./components/PlayerList";
import Player from "./components/Player";

// TODO: use empty array
// const btnValues = Array(9).fill(null);
const initialGameBoard: (number | string)[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function App() {
  const [isGameActive, setIsGameActive] = useState(false);
  const [activePlayer, setActivePlayer] = useState("X");
  const [isGameOver, setGameOver] = useState(false);

  const disabled = !isGameActive;

  function handleStartClick() {
    setIsGameActive((state) => !state);
  }

  function handleSelectClick(event) {
    const currentValue = event.target.value;
    const index = initialGameBoard.indexOf(+currentValue);

    if (activePlayer === "X") {
      initialGameBoard[index] = "X";
      if (calculateWinner(initialGameBoard, activePlayer)) setGameOver(true);
      setActivePlayer("O");
    } else {
      initialGameBoard[index] = "O";
      if (calculateWinner(initialGameBoard, activePlayer)) setGameOver(true);
      setActivePlayer("X");
    }
  }

  return (
    <>
      <Title text="Tic Tac Toe" />
      <PlayerList>
        <Player initialName="Player 1" symbol="X" />
        <Player initialName="Player 2" symbol="O" />
      </PlayerList>

      <Board>
        {initialGameBoard.flat().map((value, index) => {
          return (
            <Field
              disabled={disabled}
              key={index}
              onClick={handleSelectClick}
              value={value}
            >
              @
            </Field>
          );
        })}
      </Board>
      {isGameOver && <Message title="You win" />}
      {!isGameActive && <StartButton onClick={handleStartClick} />}
    </>
  );
}
