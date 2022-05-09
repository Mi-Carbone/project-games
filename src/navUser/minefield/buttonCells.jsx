import React, { useState } from "react";

import "../../style/minfield/button.css";

const Button = (props) => {
  // console.log("button props", props);
  const [cell, setCell] = useState("");

  const handleClick = (value) => {
    if (value === -1) {
      setCell("💣");
      props.handleGameOver();
      //voglio terminare il gioco
    } else {
      setCell(value);
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