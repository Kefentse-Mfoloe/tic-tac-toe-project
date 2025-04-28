import { useState } from "react";

function Player({ name, symbol }) {
  const [isEditing, setIsEditing] = useState(false); 
  
  function handleIsEditing() {
    setIsEditing(!isEditing);
  }
  
  let playerName = isEditing ? (
    <input type="text" required defaultValue="SomeName" />
  ) : (
    <span className="player-name">{name}</span>
  );
  
  return (
      <li>
        <span className="player">
          {playerName}
          <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleIsEditing}>{isEditing ? "Save" : "Edit"}</button>
      </li>
    );
}

export default Player;