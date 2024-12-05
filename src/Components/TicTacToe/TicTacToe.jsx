import React, { useState } from "react";
import "./TicTacToe.css";
import circle_icon from "../Assets/Images/circle.png";
import cross_icon from "../Assets/Images/cross.png";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill("")); // Stan planszy
  const [isXNext, setIsXNext] = useState(true); // Kolejność graczy
  const [winner, setWinner] = useState(null); // Zwycięzca
  const [xMoves, setXMoves] = useState(0); // Licznik ruchów gracza X
  const [oMoves, setOMoves] = useState(0); // Licznik ruchów gracza O

  const handleClick = (index) => {
    if (board[index] !== "" || winner) return;

    const updatedBoard = [...board];
    updatedBoard[index] = isXNext ? "x" : "o";

    setBoard(updatedBoard);
    checkWinner(updatedBoard, index); // Przekazanie planszy i aktualnego indeksu
    setIsXNext(!isXNext);
  };

  const checkWinner = (currentBoard, index) => {
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

    // Zwiększ licznik ruchów odpowiedniego gracza
    if (isXNext) {
      setXMoves(xMoves + 1);
    } else {
      setOMoves(oMoves + 1);
    }

    for (let [a, b, c] of winningCombinations) {
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        const player = currentBoard[a];
        const moves = player === "x" ? xMoves + 1 : oMoves + 1; // Uwzględnij bieżący ruch
        setWinner({ player, moves });
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
    setXMoves(0); // Zresetuj licznik ruchów X
    setOMoves(0); // Zresetuj licznik ruchów O
  };

  return (
    <div className="container">
      <h1 className="title">
        Tic-Tac-Toe game in <span>React</span>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
          alt="React Logo"
          className="react-logo"
        />
      </h1>

      <div className="status">
        {winner ? (
          winner === "draw" ? (
            "It's a draw!"
          ) : (
            <span>
              <img
                src={winner.player === "x" ? cross_icon : circle_icon}
                alt={winner.player.toUpperCase()}
                className="winner-icon"
              />{" "}
              won in {winner.moves} moves. Congratulations!
            </span>
          )
        ) : (
          `Next Player: ${isXNext ? "X" : "O"}`
        )}
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
