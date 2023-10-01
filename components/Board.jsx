"use client";
import { useEffect, useState } from "react";
import Scoreboard from "./ScoreBoard";
import Square from "./Square";

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [rounds, setRounds] = useState(0);
  const [xIsNext, setXisNext] = useState(rounds % 2 === 0);
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);
  const [winner, setWinner] = useState(null);

  /**
   * Calculates if there is a winner after a move
   * @param {*} squares
   * @returns
   */
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  useEffect(() => {
    if (winner) {
      if (winner === "X") {
        setXWins(xWins + 1);
      } else if (winner === "O") {
        setOWins(oWins + 1);
      }
    }
  }, [winner]);

  /**
   * Handles a click on a square of the board
   * @param {*} i
   * @returns
   */
  const handleClick = (i) => {
    const squaresCopy = squares.slice();
    if (squaresCopy[i] || calculateWinner(squaresCopy)) {
      return;
    }
    squaresCopy[i] = xIsNext ? "X" : "O";
    setSquares(squaresCopy);
    setXisNext(!xIsNext);
    setRounds(rounds + 1);
  };

  /**
   * Resets a new game with empty squares
   */
  function reset() {
    setSquares(Array(9).fill(null));
    setXisNext(rounds % 2 === 0);
    setWinner(null);
  }

  if (!winner && !squares.includes(null)) {
    setWinner("None");
  } else if (!winner) {
    const newWinner = calculateWinner(squares);
    if (newWinner) {
      setWinner(newWinner);
    }
  }

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div>
      <div className="status">{status}</div>
      {[0, 1, 2].map((row) => (
        <div className="board-row" key={row}>
          {[0, 1, 2].map((col) => {
            const index = 3 * row + col;
            return (
              <Square
                value={squares[index]}
                onClick={() => handleClick(index)}
                key={index}
              />
            );
          })}
        </div>
      ))}
      <Scoreboard xWins={xWins} oWins={oWins} />
      <div className="reset-container">
        {(winner || !squares.includes(null)) && (
          <button className="reset" onClick={reset}>
            Reset
          </button>
        )}
      </div>
    </div>
  );
}

export default Board;
