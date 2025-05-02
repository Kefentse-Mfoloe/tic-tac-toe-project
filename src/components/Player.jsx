import { useState } from "react";

function Player({ name, symbol, isActive }) {
  const [playerName, setPlayerName] = useState(name);
  const [isEditing, setIsEditing] = useState(false); 
  
  function handleIsEditing() {
    setIsEditing(editing => !editing);
  }

  function handleChange(event) {
    setPlayerName(event.target.value);
  }
  
  let playerNameLabel = isEditing ? (
    <input type="text" required defaultValue={playerName} value={playerName} onChange={handleChange} />
  ) : (
    <span className="player-name">{playerName}</span>
  );
  
  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {playerNameLabel}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleIsEditing}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}

export default Player;