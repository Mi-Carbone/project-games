import React, { useState } from "react";
import Grid from "./grid";
import { useNavigate } from "react-router-dom";

const Minefield = () => {
  const [number, setNumber] = useState();
  const [numberCells, setNumberCells] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [winnerCells, setWinnerCells] = useState([]);
  const [winner, setWinner] = useState(false)
  const [scoreMine, setScoreMine] = useState([])
  const navigate = useNavigate();
  // seconda parte del form
  const handleSubmit = (evt) => {
    evt.preventDefault();
    // alert(`Submitting Name ${numberCells}`)
  };
  const InportNumber = (value) => {
    // console.log(value);
    setNumber({ ...number, row: value });
  };
  const handleGameOver = () => {
    console.log("handleGameOver init:");

    setGameOver(true);
  };


  const handleWinner = () => {
    let numbers = number.row;
   
    setWinner(true);
    let dates = new Date();
    let date = `${dates.getDay()}/${dates.getMonth()}/${dates.getFullYear()},  ${dates.getHours()}:${dates.getMinutes()}`;
    var existing = localStorage.getItem("user");
    existing = existing ? JSON.parse(existing) : {};

    //controllo Array
    if (!existing.scoreMine) {
      existing.scoreMine = [];
    }
    //push elementi
    existing.scoreMine.push({
      date: date,
      newScore: numbers,
    });
    localStorage.setItem("user", JSON.stringify(existing));
  };

 
  return (
    <>
      <div className="minefield">
        <div className="d-flex justify-content-around">
          <h2 className="d-inline mar pad">Minefield</h2>
          <button className=" mr-button"  onClick={() => navigate(-1)}>go back</button>
        </div>

        <div className="mar pad">
          <form onSubmit={handleSubmit} className="space">
            <label htmlFor="">inserisci numero righe</label>
            <input
              className="pad-rl mar-rl"
              type="number"
              onChange={(e) => setNumberCells(parseInt(e.target.value))}
              value={numberCells}
              min="4"
            />
            <button
              className="mar-rl"
              type="submit"
              onClick={() => InportNumber(numberCells)}
            >
              Invia
            </button>
          </form>
        </div>

        {/* condizione se appari o no con true o false */}
        {/* {gameOver && <h1>Game Over</h1>} */}
        {/* <button onClick={() => handleGameOver()}>Imponi Game Over</button> */}
        
        
        {!winner ? (
          <>
            <h1 className="mt-4 pt-4 mb-4 pb-4">Inizia il gioco</h1>
            <div className="container mx-5 mb-5 pb-5">
              {number ? (
                <Grid 
                value={number.row} 
                handleGameOver={handleGameOver} 
                winnerCells={winnerCells}
                handleWinner={handleWinner}
                winner={winner}
                />
              ) : (
                ""
              )}
            </div>
          </>
        ) : (
          <>
          {!gameOver ? (
            <h1>Vittoria</h1>
          ):(
          <h1 className="mx-5 mb-5 pb-5">Game Over</h1>) 

          }
            
          </>
        )}
      </div>
    </>
  );
};

export default Minefield;

