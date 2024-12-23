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

const NUMBER_OF_FIELDS = 9;
const initialGameBoard = Array(NUMBER_OF_FIELDS).fill(null);

export default function App() {
  const [history, setHistory] = useState(initialGameBoard);
  const [isGameActive, setIsGameActive] = useState(false);
  const [activePlayer, setActivePlayer] = useState("X");
  const [isGameOver, setGameOver] = useState(false);

  const disabled = !isGameActive;

  function handleStartClick() {
    setIsGameActive((state) => !state);
  }

  function handleSelectClick(event) {
    // 1. get index of clicked button
    const index = event.target.id;

    // 2a. create new array
    const newScore = [...history];

    // 2b. mutate new array at index - add value "X" or "O"
    newScore[index] = activePlayer;

    // 3. set new score
    setHistory(newScore);

    // 4. check if a player wins - use newScore instead of history (history is not updated yet)
    if (calculateWinner(newScore, activePlayer)) setGameOver(true);

    // 5. switch players
    setActivePlayer(activePlayer === "X" ? "O" : "X");
  }

  return (
    <>
      <Title text="Tic Tac Toe" />
      <PlayerList>
        <Player initialName="Player 1" symbol="X" />
        <Player initialName="Player 2" symbol="O" />
      </PlayerList>

      <Board>
        {history.map((value, index) => {
          return (
            <Field
              disabled={disabled}
              key={index}
              id={index}
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
