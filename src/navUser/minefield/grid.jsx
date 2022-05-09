import React from "react";
import "../../style/minfield/grid.css";
import 'bootstrap/dist/css/bootstrap.css';
import Button from "./buttonCells";

const Grid = (props) => {
  // console.log('Grid props',props);

  const rowst = props.value;

  const cells = [];

  //creazione matrice
  for (let row = 0; row < rowst; row++) {
    cells.push([]);
    for (let col = 0; col < rowst; col++) {
      //console.log(cells[row]);
      cells[row].push({ bombe: false });
    }
  }
  

  //Randomizzatore di bombe
  cells.forEach((element, index) => {
    let placedBomb = false;
    while (!placedBomb) {
      let col = Math.floor(Math.random() * element.length);
      let row = Math.floor(Math.random() * index);
      // console.log("row " + row);
      if (!cells[row][col].bombe) {
        cells[row][col] = { bombe: true };
        placedBomb = true;
      }
    }
  });

  


  for (let row = 0; row < rowst; row++) {
    for (let col = 0; col < rowst; col++) {
      const myArra = cells[row][col];
      if (myArra.bombe) {
        myArra.value = -1;

        continue;
      }
      let counter = 0;
      if (row > 0 && col > 0 && cells[row - 1][col - 1].bombe) {
        counter++;
      }
      if (row > 0 && cells[row - 1][col].bombe) {
        counter++;
      }
      if (row > 0 && col < 3 && cells[row - 1][col + 1].bombe) {
        counter++;
      }
      if (col > 0 && cells[row][col - 1].bombe) {
        counter++;
      }
      if (col < 3 && cells[row][col + 1].bombe) {
        counter++;
      }
      if (row < 3 && col > 0 && cells[row + 1][col - 1].bombe) {
        counter++;
      }

      if (row < 3 && cells[row + 1][col].bombe) {
        counter++;
      }
      if (row < 3 && col < 3 && cells[row + 1][col + 1].bombe) {
        counter++;
      }
      myArra.value = counter;
    }
  }
  
  return (
    <>
      <div className="container row mt-4 pb-4 ml-5 mx-5">
        {cells.map((row, i) => (
          <div key={"row_" + i}>
            {row.map((element, j) => (
              <div key={"col_" + j} className="square covered">
                
                <Button 
                value={element.value} 
                bomb={element.bomb}
                handleGameOver={props.handleGameOver}/>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Grid;
