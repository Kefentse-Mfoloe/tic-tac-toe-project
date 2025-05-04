import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const INITIAL_PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

function DeriveActivePayer(turns) {
  let currentPlayer = "X";

  if (turns.length > 0 && turns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function DeriveGameBoard(turns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  for (const turn of turns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function DeriveWinner({gameBoard, players}) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState({
    ...INITIAL_PLAYERS
  });
  
  const activePlayer = DeriveActivePayer(gameTurns);
  let gameBoard = DeriveGameBoard(gameTurns);
  let winner = DeriveWinner({ gameBoard, players });

  let isDraw = gameTurns.length === 9 && !winner;

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

  function handleRestartGame(){
    setGameTurns([]);
  }

  function handleChangePlayerName(playerSymbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [playerSymbol]: newName,
      };
    });
  }
  
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={INITIAL_PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangePlayerName={handleChangePlayerName}
          />
          <Player
            name={INITIAL_PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangePlayerName={handleChangePlayerName}
          />
        </ol>
        {(winner || isDraw) && (
          <GameOver winner={winner} onRestartGame={handleRestartGame} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App
