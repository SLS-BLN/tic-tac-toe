import { useState } from "react";

import Title from "./components/Title";
import Board from "./components/Board";
import Field from "./components/Field";
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
  const [history, setHistory] = useState(INITIAL_BOARD_GAME);
  const [isGameActive, setIsGameActive] = useState(false);
  const [activeSymbol, setActiveSymbol] = useState<"X" | "O">("X");
  const [players, setPlayers] = useState(INITIAL_PLAYERS);
  const [isGameOver, setGameOver] = useState(false);
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

    const index = parseInt(id);
    const newScore = history.map((item, i) => {
      if (index === i) {
        return activeSymbol;
      } else {
        return item;
      }
    });

    setHistory(newScore);
    checkWinOrDraw(newScore);
    setActiveSymbol((currentActiveSymbol) =>
      currentActiveSymbol === "X" ? "O" : "X"
    );
  }

  function checkWinOrDraw(score: (number | string | null)[]) {
    const hasWinner = calculateWinner(score, activeSymbol);
    const hasDraw = checkDraw(score);

    if (hasWinner) {
      getWinner(players, activeSymbol);
    }

    if (hasDraw || hasWinner) {
      setGameOver(true);
      setIsGameActive(false);
      return;
    }
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
            // all field components are destroyed when the game is over
            // this is neccessary to reset the isSeleceted state in every field component
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
      {!isGameActive && <Button onClick={handleStartClick} text="Start Game" />}
    </>
  );
}
