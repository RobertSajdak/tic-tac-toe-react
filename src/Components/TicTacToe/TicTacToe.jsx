import React, { useState } from "react";
import "./TicTacToe.css";
import circle_icon from "../Assets/Images/circle.png";
import cross_icon from "../Assets/Images/cross.png";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill("")); // Stan planszy
  const [isXNext, setIsXNext] = useState(true); // Kolejność graczy
  const [winner, setWinner] = useState(null); // Zwycięzca

  const handleClick = (index) => {
    if (board[index] !== "" || winner) return;

    const updatedBoard = [...board];
    updatedBoard[index] = isXNext ? "x" : "o";
    setBoard(updatedBoard);
    checkWinner(updatedBoard);
    setIsXNext(!isXNext);
  };

  const checkWinner = (currentBoard) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let [a, b, c] of winningCombinations) {
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        setWinner(currentBoard[a]);
        return;
      }
    }

    if (!currentBoard.includes("")) {
      setWinner("draw");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div className="container">
      <h1 className="title">
        Tic-Tac-Toe Game in <span>React</span>
      </h1>
      <div className="status">
        {winner
          ? winner === "draw"
            ? "It's a draw!"
            : `Winner: ${winner.toUpperCase()}`
          : `Next Player: ${isXNext ? "X" : "O"}`}
      </div>
      <div className="board">
        {board.map((value, index) => (
          <div key={index} className="box" onClick={() => handleClick(index)}>
            {value === "x" && <img src={cross_icon} alt="X" />}
            {value === "o" && <img src={circle_icon} alt="O" />}
          </div>
        ))}
      </div>
      <button className="reset" onClick={resetGame}>
        Reset
      </button>
    </div>
  );
};

export default TicTacToe;
