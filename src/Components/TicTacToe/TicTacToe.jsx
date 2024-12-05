//Importy:
import React, { useState } from "react";
import "./TicTacToe.css";
import circle_icon from "../Assets/Images/circle.png";
import cross_icon from "../Assets/Images/cross.png";

//Zmienne globalne:
//data: to tablica ze stanem planszy. Każdy element tablicy odpowiada jednemu polu planszy gry.
//Pusty string jest stanem początkowym gry i oznacza, że pole jest puste.
let data = ["", "", "", "", "", "", "", "", ""];

//Deklaracja komponentu funkcyjnego TicTacToe, w którym zawiera się logika gry.
const TicTacToe = () => {
  //Hooki i zmienne stanu:
  //count - zmienna przechowująca liczbę wykonanych ruchów, używana też do określenia, czyj ruch w danym momencie (O czy X).
  //setCount - funkcja zmieniająca stan count.
  //lock - zmienna blokująca planszę po zakończeniu gry.
  //setLock - funkcja zmieniająca stan lock.
  let [count, setCount] = useState(0);
  let [lock, setLock] = useState(false);

  //Funkcja toggle() to "przełącznik" sprawdzający aktualny stan gry.
  const toggle = (e, num) => {
    //lock: warunek sprawdzający, czy gra jest zablokowana, jeśli ktoś już wygrał
    if (lock) return;
    //data[num] sprawdza, czy kliknięte pole jest puste
    if (data[num] !== "") return;
    //count % 2 === 0 określa, czy ruch należy do X (parzyste count), czy O (nieparzyste).
    //e.target.innerHTML ustawia wewnętrzny HTML klikniętego pola, aby wyświetlić odpowiedni obrazek.
    //data[num] zapisuje w tablicy data symbol ("x" lub "o") gracza.
    if (count % 2 === 0) {
      e.target.innerHTML = `<img src='${cross_icon}' alt="X" />`;
      data[num] = "x";
    } else {
      e.target.innerHTML = `<img src='${circle_icon}' alt="O" />`;
      data[num] = "o";
    }
    //setCount(count + 1): zwiększa licznik ruchów.
    setCount(count + 1);
    //checkWin(): po każdym ruchu sprawdza, czy ktoś wygrał.
    checkWin();
  };

  //Funkcja checkWin() sprawdza po każdym ruchu, czy ktoś wygrał,
  //czyli sprawdza wszystkie możliwe kombinacje wygranych (wiersze, kolumny, przekątne),
  //jeśli warunek wygranej jest spełniony (trzy takie same symbole w linii), wywołuje funkcję won().
  const checkWin = () => {
    if (data[0] === data[1] && data[1] === data[2] && data[2] !== "") {
      won(data);
    } else if (data[3] === data[4] && data[4] === data[5] && data[5] !== "") {
      won(data);
    } else if (data[6] === data[7] && data[7] === data[8] && data[8] !== "") {
      won(data);
    } else if (data[3] === data[0] && data[3] === data[6] && data[6] !== "") {
      won(data);
    } else if (data[1] === data[4] && data[4] === data[7] && data[7] !== "") {
      won(data);
    } else if (data[2] === data[5] && data[5] === data[8] && data[8] !== "") {
      won(data);
    } else if (data[0] === data[4] && data[4] === data[8] && data[8] !== "") {
      won(data);
    } else if (data[0] === data[1] && data[1] === data[2] && data[2] !== "") {
      won(data);
    } else if (data[2] === data[4] && data[4] === data[6] && data[6] !== "") {
      won(data);
    }
  };

  //Funkcja won():
  //setLock(true): Blokuje dalsze ruchy po zakończeniu gry.
  //board: główny kontener planszy,
  //row1, row2, row3: reprezentują trzy wiersze planszy,
  //boxes: pola, które gracz klika, by wykonać ruch,
  //onClick: wywołuje funkcję toggle z parametrami zdarzenia (e) i numerem pola (num).
  //<button className="reset">Reset</button> tworzy przycisk resetujący grę.
  const won = (winner) => {
    setLock(true);
  };

  return (
    <div className="container">
      <h1 className="title">
        Tic-Tac-Toe Game in <span>React</span>
      </h1>
      <div className="board">
        <div className="row1">
          <div
            className="boxes"
            onClick={(e) => {
              toggle(e, 0);
            }}
          ></div>
          <div
            className="boxes"
            onClick={(e) => {
              toggle(e, 1);
            }}
          ></div>
          <div
            className="boxes"
            onClick={(e) => {
              toggle(e, 2);
            }}
          ></div>
        </div>
        <div className="row2">
          <div
            className="boxes"
            onClick={(e) => {
              toggle(e, 3);
            }}
          ></div>
          <div
            className="boxes"
            onClick={(e) => {
              toggle(e, 4);
            }}
          ></div>
          <div
            className="boxes"
            onClick={(e) => {
              toggle(e, 5);
            }}
          ></div>
        </div>
        <div className="row3">
          <div
            className="boxes"
            onClick={(e) => {
              toggle(e, 6);
            }}
          ></div>
          <div
            className="boxes"
            onClick={(e) => {
              toggle(e, 7);
            }}
          ></div>
          <div
            className="boxes"
            onClick={(e) => {
              toggle(e, 8);
            }}
          ></div>
        </div>
      </div>
      <button className="reset">Reset</button>
    </div>
  );
};

//export umożliwia użycie komponentu TicTacToe w innych plikach.
export default TicTacToe;
