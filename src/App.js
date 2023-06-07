import "./App.css";
import "./style.css";
import React, { useState } from "react"

function Title()
{
  return <h1><a href="">Tic Tac Toe</a></h1>
}

function Cell({ value, onCellClick })
{
  return <div className="cell" onClick={onCellClick}>{value}</div>
}

function Grid()
{
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function calculateWinner(squares)
  {
    const lines = [
      [0, 1, 2], // horizontal
      [3, 4, 5], // horizontal
      [6, 7, 8], // horizontal
      [0, 3, 6], // vertical
      [1, 4, 7], // vertical
      [2, 5, 8], // vertical
      [0, 4, 8], // diagonal
      [2, 4, 6], // diagonal
    ];

    for (let i = 0; i < lines.length; i++)
    {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
        return squares[a];
    }

    return null;
  }

  function handleClick(i)
  {
    if (calculateWinner(squares) || squares[i]) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  const status = winner ? "Winner: " + winner : "Next player: " + (xIsNext ? "X" : "O");

  return <>
    <div className="status">{status}</div>
    <div className="grid">
      <div className="row">
        <Cell value={squares[0]} onCellClick={() => handleClick(0)} />
        <Cell value={squares[1]} onCellClick={() => handleClick(1)} />
        <Cell value={squares[2]} onCellClick={() => handleClick(2)} />
      </div>
      <div className="row">
        <Cell value={squares[3]} onCellClick={() => handleClick(3)} />
        <Cell value={squares[4]} onCellClick={() => handleClick(4)} />
        <Cell value={squares[5]} onCellClick={() => handleClick(5)} />
      </div>
      <div className="row">
        <Cell value={squares[6]} onCellClick={() => handleClick(6)} />
        <Cell value={squares[7]} onCellClick={() => handleClick(7)} />
        <Cell value={squares[8]} onCellClick={() => handleClick(8)} />
      </div>
    </div>
  </>
}

function Copyright({n, c=0}) {
  return <p className="copyright">Marco Carletti &copy; 2023</p>
}

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Title />
        <Grid />
        <Copyright />
      </header>
    </div>
  );
}

export default App;