import React, { useState, useEffect } from "react";
import Grid from "./grid";
import { useNavigate } from "react-router-dom";
import { API} from "aws-amplify";
import { newScore } from "../../graphql/mutations";


const Minefield = () => {
  const [number, setNumber] = useState();
  const [numberCells, setNumberCells] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [winnerCells, setWinnerCells] = useState([]);
  const [winner, setWinner] = useState(false);
  const [msgGameOver, setMsgGameOver] = useState("");
  const [msgWinner, setMsgWinner] = useState("");
  const [time, setTime] = useState(0);
  const nameGame = 'Minefield'
  const [start, setStart] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (start === true) {
  //   setTimeout(() => {
  //     setTime(time + 1);
  //   }, 1000);
  // }
  // }, [time, start]);
  //seconda parte del form
  const handleSubmit = (evt) => {
    evt.preventDefault();
    setStart(true);
  };
  const InportNumber = (value) => {
    if (value <= 3) {
      alert("Il numero inserito è troppo piccolo");
      return window.location.reload();
    }
    setNumber({ ...number, row: value });
  };
  const handleGameOver = () => {

    setGameOver(true);
    setStart(false);
    setMsgGameOver("Hai perso");
    alert("HAI PERSO");
    return window.location.reload();
  };

  const id = localStorage.getItem('userId')
  function newRecordScore(){
    let numbers = number.row;
    return API.graphql({
      query: newScore,
      authMode: 'AMAZON_COGNITO_USER_POOLS',
      variables:{
        game: nameGame,
        score: numbers,
        userId: id
      }
    })
  }

  const handleWinner = () => {
    let numbers = number.row;
    setWinner(true);
    setMsgWinner("Hai vinto");
    let dates = new Date();
    let date = `${dates.getDay()}/${dates.getMonth()}/${dates.getFullYear()},  ${dates.getHours()}:${dates.getMinutes()}`;
    var existing = localStorage.getItem("sidebarUsername");
    existing = existing ? JSON.parse(existing) : {};

    //controllo Array
    if (!existing) {
      existing.scoresMine = [];
    }
    //push elementi
    existing.scoresMine.push({
      date: date,
      newScore: numbers,
    });
    localStorage.setItem("sidebarUsername", JSON.stringify(existing));
    
    newRecordScore()
    .then((data) => {
      console.log(data);
      console.log(data.data.newScore.userId, 'io');
      // console.log('login', );
    })
    .catch((err) => {
      console.log(err);
    })
    alert("HAI VINTO");
    //return window.location.reload();
  };

  return (
    <>
      <div className="minefield">
        <div className="d-flex justify-content-around">
          <h2 className="d-inline mar pad">Minefield</h2>
          <button className=" mr-button" onClick={() => navigate(-1)}>
            go back
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

        <div>
          <>
            <h1 className="mt-4 pt-4 mb-4 pb-4">Inizia il gioco</h1>
            <span>Time: {time}</span>
            {!gameOver ? <h3>{msgWinner}</h3> : <h3>{msgGameOver}</h3>}
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
        </div>
      </div>
    </>
  );
};

export default Minefield;
