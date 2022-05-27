import React, { useState } from "react";
import "../../style/minfield/button.css";

const Button = (props) => {
  // console.log("button props", props);
  const [cell, setCell] = useState("");
  const [disabled, setDisabled] = useState(props.disabled);
  

  // const [winner, setWinner] = useState(false)
  const [gameOver, setGameOver] = useState(false);

 
  const handleClick = (value) => {
    console.log(disabled);
    if (value === -1) {
      setCell("💣");
      
      throw props.handleGameOver();
      //voglio terminare il gioco
    } else{
      
      if(!disabled){
        setCell(value);
        props.winnerCells.push(value)
        console.log(props.winnerCells);
        if( props.winnerCells.length === props.totalNumberCellsWinner){
          props.handleWinner()
        }
        setDisabled(true)

      }

     
    }
  };



  return (
    <div>
      <div
        className="Button"
        onClick={() => {
          handleClick(props.value)
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




if (value === -1) {
      setCell("💣");
      return props.handleGameOver(setGameOver(true));
      //voglio terminare il gioco
    } else {
      setCell(value);
      winnerCells.push(cell)
      if (winnerCells.length == totalNumberCellsWinner) {
        props.handleWinner(setWinner(true));
        console.log('vittoria');
      }
    }
*/