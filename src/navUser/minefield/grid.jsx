import React,{useState} from "react";
import "../../style/minfield/grid.css";
import 'bootstrap/dist/css/bootstrap.css';
import Button from "./buttonCells";

const Grid = (props) => {


  const rowst = props.value;

  const totalNumberCellsWinner = (rowst * rowst) - rowst;
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



  // console.log("button props", props);
  

  // const handleClick = (value) => {
  //   const winnerCells = props.winnerCells
  //   const totalNumberCellsWinner = props.totalNumberCellsWinner;
  //   console.log(totalNumberCellsWinner, 'numero celle');
  //   if (value === -1) {
  //     setCell("💣");
  //     props.handleGameOver();
  //     //voglio terminare il gioco
  //   } else {
  //     setCell(value);
  //     winnerCells.push(cell)
  //     if (winnerCells.length == totalNumberCellsWinner) {
  //       console.log('vittoria');
  //     }
  //   }
  // };
  console.log(cells);
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
                handleGameOver={props.handleGameOver}
                winnerCells={props.winnerCells}
                totalNumberCellsWinner={totalNumberCellsWinner}
                handleWinner={props.handleWinner}
                winner={props.winner}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Grid;
