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
  const [activeSymbol, setActiveSymbol] = useState("X");
  const [isGameOver, setGameOver] = useState(false);

  const disabled = !isGameActive;

  function handleStartClick() {
    setIsGameActive((state) => !state);
  }

  function handleSelectClick(event) {
    if (isGameOver) {
      return;
    }

    // 1. get index of clicked button
    // note: convert to number is neccesary - id is a string
    const index = parseInt(event.target.id);

    // *********************************************
    // WARNING: step 2b is not recommend
    // is does work here because it is a flat array
    // problems can occur when updating objects in an array
    // https://react.dev/learn/updating-arrays-in-state#updating-objects-inside-arrays:~:text=Updating%20objects%20inside%20arrays

    // 2a. create new array
    // const newScore = [...history];

    // 2b. mutate new array at index - add value "X" or "O"
    // newScore[index] = activeSymbol;
    // *********************************************

    // mutate new array at index i
    const newScore = history.map((item, i) => {
      if (index === i) {
        return activeSymbol;
      } else {
        return item;
      }
    });

    console.log(newScore);

    // 3. set new score
    setHistory(newScore);

    // 4. check if a player wins - use newScore instead of history (history is not updated yet)
    if (calculateWinner(newScore, activeSymbol)) {
      setGameOver(true);
      return;
    }

    // 5. switch player symbol
    setActiveSymbol((currentActiveSymbol) =>
      currentActiveSymbol === "X" ? "O" : "X"
    );

    // 6. switch player
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
      {isGameOver && <Message title="You win" />}
      {!isGameActive && <StartButton onClick={handleStartClick} />}
    </>
  );
}
