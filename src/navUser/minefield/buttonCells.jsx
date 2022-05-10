import React, { useState } from "react";

import "../../style/minfield/button.css";

const Button = (props) => {
  // console.log("button props", props);
  const [cell, setCell] = useState("");
  const [winner, setWinner] = useState(false)
  const handleClick = (value) => {
    const winnerCells = props.winnerCells
    const totalNumberCellsWinner = props.totalNumberCellsWinner;
    if (value === -1) {
      setCell("💣");
      props.handleGameOver();
      //voglio terminare il gioco
    } else {
      setCell(value);
      winnerCells.push(cell)
      if (winnerCells.length == totalNumberCellsWinner) {
        props.handleWinner(setWinner(true));
        console.log('vittoria');
      }
    }
  };
// console.log(`color= red`+props.value);

  return (
    <div>
      <div
        className="Button"
        onClick={() => {
          handleClick(props.value);
        }}
      >
        {cell}
      </div>
    </div>
  );
};

export default Button;











/*
className={`Button value-${value} ${state === 1 ? "visible" : ""} 
${red ? "red" : ""}`}
*/