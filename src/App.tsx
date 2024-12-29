import { useState } from "react";

import Title from "./components/Title";
import Board from "./components/Board";
import Field from "./components/Field";
import StartButton from "./components/StartButton";
import PlayerList from "./components/PlayerList";
import Player from "./components/Player";
import Message from "./components/Message";

import "./App.css";
import { calculateWinner, checkDraw } from "./utils/winner";
import Button from "./components/Button";

const NUMBER_OF_FIELDS = 9;
const START_SYMBOL = "@";
const INITIAL_BOARD_GAME = Array(NUMBER_OF_FIELDS).fill(null);
const INITIAL_PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

export default function App() {
  // TODO: derive state where possible
  // set up new branch - use Context API or Redux for state
  const [history, setHistory] = useState(INITIAL_BOARD_GAME);
  const [isGameActive, setIsGameActive] = useState(false);
  const [activeSymbol, setActiveSymbol] = useState<"X" | "O">("X");
  const [isGameOver, setGameOver] = useState(false);
  const [players, setPlayers] = useState(INITIAL_PLAYERS);
  const [winner, setWinner] = useState("");

  const disabled = !isGameActive;

  function handleStartClick() {
    setIsGameActive(true);
  }

  function handleResetClick() {
    setIsGameActive(true);
    setGameOver(false);
    setActiveSymbol("X");
    setWinner("");
    const reset = [...history.map(() => null)];
    setHistory(reset);
  }

  function handleSelectClick(id: string) {
    if (isGameOver) {
      return;
    }

    // 1. get index of clicked button
    // note: convert to number is neccesary - id is a string
    const index = parseInt(id);

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
    // TODO: handle draw
    // what condition must be met?
    // no winner & no null in history

    if (calculateWinner(newScore, activeSymbol)) {
      setGameOver(true);
      setIsGameActive(false);
      getWinner(players, activeSymbol);
      return;
    }

    if (checkDraw(newScore)) {
      setGameOver(true);
      setIsGameActive(false);
      return;
    }

    // 5. switch player symbol
    setActiveSymbol((currentActiveSymbol) =>
      currentActiveSymbol === "X" ? "O" : "X"
    );
  }

  function getWinner(players: { X: string; O: string }, symbol: "X" | "O") {
    setWinner(players[symbol]);
    return;
  }

  function getPlayerNames(symbol: string, playerName: string) {
    setPlayers({
      ...players,
      [symbol]: playerName,
    });
  }

  return (
    <>
      <Title text="Tic Tac Toe" />
      <PlayerList>
        <Player
          initialName={players.X}
          symbol="X"
          isActive={!disabled && activeSymbol === "X"}
          getPlayerNames={getPlayerNames}
        />
        <Player
          initialName={players.O}
          symbol="O"
          isActive={!disabled && activeSymbol === "O"}
          getPlayerNames={getPlayerNames}
        />
      </PlayerList>

      <Board>
        {isGameOver && winner !== "" && (
          <Message title="You win" winner={winner}>
            <Button onClick={handleResetClick} text="Reset" />
          </Message>
        )}
        {isGameOver && !isGameActive && winner === "" && (
          <Message title="It's a draw">
            <Button onClick={handleResetClick} text="Try again" />
          </Message>
        )}
        {history.map((value, index) => {
          return (
            // component is destroyed when the game is over
            // this is neccessary to reset the isSeleceted state
            // https://react.dev/learn/preserving-and-resetting-state
            !isGameOver && (
              <Field
                disabled={disabled}
                key={index}
                id={index}
                onClick={handleSelectClick}
                value={value}
              >
                {START_SYMBOL}
              </Field>
            )
          );
        })}
      </Board>

      {!isGameActive && <StartButton onClick={handleStartClick} />}
    </>
  );
}
