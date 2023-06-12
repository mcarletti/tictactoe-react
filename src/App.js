import "./App.css";
import "./style.css";
import React, { useState } from "react"

function Title()
{
  // this is the simplest React component
  // which returns a title with a link;
  // each component must return a single element
  return <h1><a href="">Tic Tac Toe</a></h1>
}

function Cell({ value, onCellClick })
{
  // the tic-tac-toe grid is made of 9 cells
  // each cell is a component that can be clicked
  // to mark it with an X or an O
  return <div className="cell" onClick={onCellClick}>{value}</div>
}

function Grid()
{
  // the grid component is the actual game;
  // it keeps track of the game state and it renders the cells

  // 'useState' is a React hook that allows to use state in a functional component
  // its argument is the initial state of the component; it returns an array with
  // the current state and a function to update it

  // who is the next player?
  const [xIsNext, setXIsNext] = useState(true);
  // state of the grid (9 cells)
  const [squares, setSquares] = useState(Array(9).fill(null));

  function calculateWinner(squares)
  {
    // check if there is a winner
    // if so, return the winner (X or O)
    // otherwise, return null

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
    // when a cell is clicked, update the grid state
    // and change the next player

    if (calculateWinner(squares) || squares[i]) return;

    // to avoid mutating the state directly, we create a copy of the array;
    // this is useful to implement the 'undo' feature
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  // every time the grid is rendered, check if there is a winner
  const winner = calculateWinner(squares);
  const status = winner ? "Winner: " + winner : "Next player: " + (xIsNext ? "X" : "O");

  // render the grid
  return <>
    <div className="status">{status}</div>
    <div className="grid">
      <div className="row">
        {/* we pass a cell its own state; if clicked, the handler is triggered with the cell id */}
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

function Copyright()
{
  // return a paragraph with the current year
  return <p className="copyright">Marco Carletti &copy; 2023</p>
}

function App()
{
  // build the app interface by composing components

  return (
    // 'className' is like class in HTML, but it's used in JSX
    // 'class' is not used because it's a reserved word in JS
    <div className="App">
      <header className="App-header">
        <Title />
        <Grid />
        <Copyright />
      </header>
    </div>
  );
}

// make this component available to external world
export default App;