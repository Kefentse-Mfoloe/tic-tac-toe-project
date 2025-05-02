import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";

function DeriveActivePayer(turns) {
  let currentPlayer = "X";

  if (turns.length > 0 && turns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = DeriveActivePayer(gameTurns);

  function handleSelectSquare(rowIndex, columnIndex) {
    setGameTurns((prevGameTurns) => {
      let currentPlayer = DeriveActivePayer(prevGameTurns);

      let currentTurn = [
        { square: { row: rowIndex, col: columnIndex }, player: currentPlayer },
        ...prevGameTurns,
      ];

      return currentTurn;
    });
  }
  
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activePlayer === "X"} />
          <Player name="Player 2" symbol="O" isActive={activePlayer === "O"} />
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App
