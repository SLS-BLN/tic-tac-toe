import { useState } from "react";

import Title from "./components/Title";
import Board from "./components/Board";
import Field from "./components/Field";
import StartButton from "./components/StartButton";
import PlayerList from "./components/PlayerList";
import Player from "./components/Player";
import Message from "./components/Message";

import "./App.css";
import { calculateWinner } from "./utils/winner";

const NUMBER_OF_FIELDS = 9;
const initialGameBoard = Array(NUMBER_OF_FIELDS).fill(null);

export default function App() {
  const [history, setHistory] = useState(initialGameBoard);
  const [isGameActive, setIsGameActive] = useState(false);
  const [activeSymbol, setActiveSymbol] = useState("X");
  const [isGameOver, setGameOver] = useState(false);

  const disabled = !isGameActive;
  const winnerName = activeSymbol;

  function handleStartClick() {
    setIsGameActive((state) => !state);
  }

  function handleSelectClick(event: { target: { id: string } }) {
    if (isGameOver) {
      return;
    }

    // 1. get index of clicked button
    // note: convert to number is neccesary - id is a string
    const index = parseInt(event.target.id);

    // *********************************************
    // WARNING: step 2b is not recommended
    // problems occur when mutating objects in an array
    // https://react.dev/learn/updating-arrays-in-state#updating-objects-inside-arrays:~:text=Updating%20objects%20inside%20arrays

    // 2a. create new array
    // const newScore = [...history];

    // 2b. mutate new array at index - add value "X" or "O"
    // newScore[index] = activeSymbol;
    // *********************************************

    // 2. creat new array, add value at index i
    const newScore = history.map((item, i) => {
      if (index === i) {
        return activeSymbol;
      } else {
        return item;
      }
    });

    // 3. set new score
    setHistory(newScore);

    // 4. check if a player wins - use newScore instead of history (history is not updated yet)
    if (calculateWinner(newScore, activeSymbol)) {
      setGameOver(true);
      getWinner();
      return;
    }

    // 5. switch player symbol
    setActiveSymbol((currentActiveSymbol) =>
      currentActiveSymbol === "X" ? "O" : "X"
    );
  }

  function getWinner() {
    // get active Symbol - "X"
    // const player = activeSymbol;
    // look into Player component - symbol="X"
    // take the value (playerName)
  }

  return (
    <>
      <Title text="Tic Tac Toe" />
      <PlayerList>
        <Player
          initialName="Player 1"
          symbol="X"
          isActive={!disabled && activeSymbol === "X"}
        />
        <Player
          initialName="Player 2"
          symbol="O"
          isActive={!disabled && activeSymbol === "O"}
        />
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
      {isGameOver && <Message title="You win" winnerName={winnerName} />}
      {!isGameActive && <StartButton onClick={handleStartClick} />}
    </>
  );
}
