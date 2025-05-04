export default function GameOver({ winner, onRestartGame }) {
    return (
        <div id="game-over">
            <h2>Game Over!</h2>
            <p>{winner ? `${winner} won!` : 'It\'s a Draw!'}</p>
            <button onClick={onRestartGame}>Restart Game</button>
        </div>
    );
}