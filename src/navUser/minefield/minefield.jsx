import React, { useState } from "react";
import Grid from "./grid";
import { Link } from "react-router-dom";
import { RoutesLogin } from "../../Routes/index";

const Minefield = () => {
  const [number, setNumber] = useState();
  const [numberCells, setNumberCells] = useState("");
  const [gameOver, setGameOver] = useState(false);

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

  return (
    <>
      <div className="minefield">
        <div className="d-flex justify-content-around">
          <h2 className="d-inline mar pad">Minefield</h2>
          <button className=" mr-button ">
            <Link className="link" to={RoutesLogin.login}>
              Indietro
            </Link>
          </button>
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
        {!gameOver ? (
          <>
            <h1 className="mt-4 pt-4 mb-4 pb-4">Inizia il gioco</h1>
            <div className="container mx-5 mb-5 pb-5">
              {number ? (
                <Grid value={number.row} handleGameOver={handleGameOver} />
              ) : (
                ""
              )}
            </div>
          </>
        ) : (
          <>
            <h1 className="mx-5 mb-5 pb-5">Game Over</h1>
          </>
        )}
      </div>
    </>
  );
};

export default Minefield;

