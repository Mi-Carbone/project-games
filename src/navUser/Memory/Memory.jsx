import React, { useEffect, useState } from "react";

import SingleCard from "./componentsCard/singleCard";
import "../../style/memory/memory.css";
import { useNavigate } from "react-router-dom";

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
  };

  // handleChoise prende l argomento card per verificare
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };
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
      newRecord();
      setTimeout(() => window.location.reload(), 5000);
    }
  }, [choiceOne, choiceTwo]);

  const newRecord = () => {
    // let date = new Date()
    let dates = new Date();
    let date = `${dates.getDay()}/${dates.getMonth()}/${dates.getFullYear()},  ${dates.getHours()}:${dates.getMinutes()}`;

    /**
     * Aggiornare un elemento in localStorage
     * prendo il localStorage e lo inserisco in una variabile
     * inizializzo la variabile pke se esiste gia la variabile deve prendermi quella se non esiste mi devi creare un oggetto
     * pushare immediatamente all interno della array creato comporta una rottura pke non è stato ancora creato un array
     * Effettuare prima una verifica della dell'esistenza dell'array e associarla un array vuoto
     * dopo dichè possiamo pushare all interno della array vuoto i nostri valori
     */

    var existing = localStorage.getItem("user");
    existing = existing ? JSON.parse(existing) : {};

    //controllo Array
    if (!existing.scores) {
      existing.scoresMemory = [];
    }
    //push elementi
    existing.scoresMemory.push({
      date: date,
      newScore: turns,
    });
    localStorage.setItem("user", JSON.stringify(existing));
  };

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
