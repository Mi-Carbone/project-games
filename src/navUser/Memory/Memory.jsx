import React, { useEffect, useState } from "react";

import SingleCard from "./componentsCard/singleCard";
import "../../style/memory/memory.css";
import { Link, useNavigate } from "react-router-dom";
import { RoutesLogin } from "../../Routes/index";

// PLUS
// conteggio numero turno (ok),
// Timer,
// sfondo,
// Animazione del titolo,
// animazione sul match

const cardImages = [
  { src: "/img/anime7-1.png", matched: false },
  { src: "/img/anime-1.png", matched: false },
  // { src: "/img/anime2-1.png", matched: false },
  // { src: "/img/anime3-1.png", matched: false },
  // { src: "/img/anime5-1.png", matched: false },
  // { src: "/img/anime6-1.png", matched: false },
  // { src: "/img/anime4-1.png", matched: false },
  // { src: "/img/gloves-1.png", matched: false },
];

function Memory() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [counter, setCounter] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [items, setItems] = useState(JSON.parse(localStorage.getItem("user")));
  const [score, setScore] = useState([{ id: "", score: "" }]);

  const navigate = useNavigate();

  //shuffleCards cards
  const shuffleCards = () => {
    //creo un array unico dov inserisco due volte le immagini per effettuare la corrispondenza
    const shuffleCards = [...cardImages, ...cardImages]
      //sort per mettere in ordine gli elementi all interno dell array
      .sort(() => Math.random() - 0.5)
      //mappando inserisco un id per ogni elemento all interno dell array randomizzato
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffleCards); //al click mi deve generare l array
    setTurns(0);
    setGameOver(false);
    
    setCounterId(counterId + 1);
    console.log(gameOver, 'controllo reset');
  };

  // handleChoise prende l argomento card per verificare
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const [counterId, setCounterId] = useState(0);
  //Comparazione delle due scelte fatte
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        console.log("corrispondenza avvenuta");
        setCounter(counter + 1);
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              //cambio il valore da false a true
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        // se non corrispondo ricopro le carte scelte
        setTimeout(() => resetTurn(), 1000);
      }
    }
    if (counter === cardImages.length) {
      setGameOver(true);
      addScore(turns)
      setTimeout(() => window.location.reload(), 5000);
    }
  }, [choiceOne, choiceTwo]);


  console.log("turni ", turns);

  // Azzero le scelte e incremento di uno per passare alla selezione sucessiva
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  // inizio automatico del gioco oppure anche senza
  useEffect(() => {
    shuffleCards();
  }, []);

  const addScore = () => {
    setItems({
      turn: turns,
    });
    localStorage.setItem("user", JSON.stringify(turns));

    console.log("fine partita");
    console.log("fine partita turni", turns);
    
  };


  return (
    <div className="memory">
      <h1>Memory Game</h1>
      <div className="d-flex justify-content-around">
        <button onClick={shuffleCards}>New Game</button>
        <button onClick={() => navigate(-1)}>go back</button>
      </div>

      {!gameOver == "" ? (
        <div>
          <h2>Winner</h2>
        </div>
      ) : (
        <div>
          <h3>Partita in corso</h3>
        </div>
      )}
      <p> Turn : {turns}</p>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default Memory;

// if (counter === cardImages.length) {
//   // setScore({ ...score, id: startGame, turn: turns });
//   setGameOver(true);
//   setItems(turns);
//   const myNewItem = { id: counterId, score:turns };

//   console.log('fine partita');
//   setScore(myNewItem)
// }
// const [counterId, setCounterId] = useState(0);
// useEffect(() => {
//   setCounterId(counterId + 1);
//   const myNewItem = { id: counterId, score:turns };
//   if (!gameOver) {
//     console.log("fine partita");
//     setScore(myNewItem)
//   }
// }, [gameOver]);
