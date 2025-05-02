const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

export default function GameBoard({ onSelectSquare, turns }) {
  // const [gameBoard, setGameBoard] = useState(initialGameBoard);

  // function handleSelectSquare(rowIndex, columnIndex) {
  //     setGameBoard((prevGameBoard) => {
  //         const newGameBoard = [...prevGameBoard].map(row => [...row]);
  //         newGameBoard[rowIndex][columnIndex] = activePlayerSymbol;
  //         return newGameBoard;
  //     });

  //     onSelectActivePlayer();
  // }
  let gameBoard = initialGameBoard;

  for (const turn of turns) {
    const { square, player } = turn;
    const [rowIndex, columnIndex] = square;
    gameBoard[rowIndex][columnIndex] = player;
  }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, columnIndex) => (
              <li key={columnIndex}>
                <button onClick={() => onSelectSquare(rowIndex, columnIndex)}>
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}