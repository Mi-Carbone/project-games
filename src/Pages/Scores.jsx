import { API } from "aws-amplify";
import React, { useState } from "react";
import { userScores, getS3url } from "../graphql/queries";
import "../style/contact.css";
import moment from "moment";



// const cardImages = "/img/image-avatar.png";

function Scores() {
  // const [items, setItems] = useState(
  //   JSON.parse(localStorage.getItem("sidebarUsername"))
  // );

  const [msgMemory, setMsgMemory] = useState();
  const [msgMinefield, setMsgMinefield] = useState();
  const [listItems, setListItems] = useState([]);
  const [listItemsMine, setListItemsMine] = useState([]);
  


  const handleClick = () => {
    userScoreGame("Memory")
      .then((data) => {
        console.log("result: ", data);
        if (data.data.userScores.length === 0) {
          setMsgMemory("Non ci sono dati salvati");
        }
        setListItems(data.data.userScores);
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  };

  const handleClickMine = () => {
    userScoreGame("Minefield")
      .then((data) => {
        console.log("result: ", data);
        if (data.data.userScores.length === 0) {
          setMsgMinefield("Non ci sono dati salvati");
        }
        setListItemsMine(data.data.userScores);
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  };

  const id = localStorage.getItem("userId");
  function userScoreGame(gameName) {
    return API.graphql({
      query: userScores,
      variables: {
        userId: id,
        game: gameName,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  }

  return (
    <>
    <div className="contact">
      <div>
        <h1>Punteggio Memory</h1>
        <button className="contact-button" onClick={handleClick}>
          Aggiorna Punteggio
        </button>
        <h3>{msgMemory}</h3>
        {listItems.map((date, i) => (
          <ul className="contact-table" key={"data_" + i}>
            <li className="contact-element" key={"score_"}>
              Data: {moment(date.date).format("MMMM Do YYYY, h:mm:ss a")}
              <span>Punteggio: {date.score}</span>
            </li>
          </ul>
        ))}
      </div>
      <div>
        <h1>Punteggio Campo Minato</h1>
        <button className="contact-button" onClick={handleClickMine}>
          Aggiorna Punteggio
        </button>
        <h3>{msgMinefield}</h3>
        {listItemsMine.map((date, j) => (
          <ul className="contact-table" key={"data_" + j}>
            <li className="contact-element" key={"score_"}>
              Data: {moment(date.date).format("MMMM Do YYYY, h:mm:ss a")}
              <span>Numero colonne: {date.score}</span>
            </li>
          </ul>
        ))}
      </div>

    </div>
    </>
  );
}

export default Scores;

// {
//   /**
//  /*
//   const id = items.length ? items[items.length - 1].id + 1 : 1;
//     const myNewItem = { id, checked: false, item };
//     const listItems = [...items, myNewItem];
//     setAndSaveItems(listItems);
//  */
// }

// if (!gameOver) {
//   score.push({score:turns})
//   localStorage.setItem("list", JSON.stringify(score));
// }

// import React, { useEffect, useState } from "react";

// import SingleCard from "./componentsCard/singleCard";
// import "../../style/memory/memory.css";
// import { useNavigate } from "react-router-dom";

// // PLUS
// // conteggio numero turno (ok),
// // Timer,
// // sfondo,
// // Animazione del titolo,
// // animazione sul match

// const cardImages = [
//   { src: "/img/anime7-1.png", matched: false },
//   { src: "/img/anime-1.png", matched: false },
//   // { src: "/img/anime2-1.png", matched: false },
//   // { src: "/img/anime3-1.png", matched: false },
//   // { src: "/img/anime5-1.png", matched: false },
//   // { src: "/img/anime6-1.png", matched: false },
//   // { src: "/img/anime4-1.png", matched: false },
//   // { src: "/img/gloves-1.png", matched: false },
// ];

// function Memory() {
//   const [cards, setCards] = useState([]);
//   const [turns, setTurns] = useState(0);
//   const [choiceOne, setChoiceOne] = useState(null);
//   const [choiceTwo, setChoiceTwo] = useState(null);
//   const [disabled, setDisabled] = useState(false);
//   const [counter, setCounter] = useState(0);
//   const [gameOver, setGameOver] = useState(false);
//   const [score, setScore] = useState([]);
//  const [item,setItem] = useState(JSON.parse(localStorage.getItem('list')));

//   const navigate = useNavigate();

//   //shuffleCards cards
//   const shuffleCards = () => {
//     //creo un array unico dov inserisco due volte le immagini per effettuare la corrispondenza
//     const shuffleCards = [...cardImages, ...cardImages]
//       //sort per mettere in ordine gli elementi all interno dell array
//       .sort(() => Math.random() - 0.5)
//       //mappando inserisco un id per ogni elemento all interno dell array randomizzato
//       .map((card) => ({ ...card, id: Math.random() }));

//     setChoiceOne(null);
//     setChoiceTwo(null);
//     setCards(shuffleCards); //al click mi deve generare l array
//     setTurns(0);
//     setGameOver(false)
//   };

//   // handleChoise prende l argomento card per verificare
//   const handleChoice = (card) => {
//     console.log(card);
//     choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
//   };

//   //Comparazione delle due scelte fatte
//   useEffect(() => {
//     if (choiceOne && choiceTwo) {
//       setDisabled(true);
//       if (choiceOne.src === choiceTwo.src) {
//         console.log("corrispondenza avvenuta");
//         setCounter(counter + 1);
//         setCards((prevCards) => {
//           return prevCards.map((card) => {
//             if (card.src === choiceOne.src) {
//               //cambio il valore da false a true
//               return { ...card, matched: true };
//             } else {
//               return card;
//             }
//           });
//         });
//         resetTurn();
//       } else {
//         console.log("non corrispondono le carte");
//         // se non corrispondo ricopro le carte scelte
//         setTimeout(() => resetTurn(), 1000);
//       }
//     }
//     if (counter === cardImages.length) {
//       // setScore({ ...score, id: startGame, turn: turns });
//       setGameOver(true);
//     }

//   }, [choiceOne, choiceTwo]);

//   console.log(cards);
//   console.log("conteggio", counter);
//   console.log("turni passati", turns);
//   console.log("score", score);

//   // Azzero le scelte e incremento di uno per passare alla selezione sucessiva
//   const resetTurn = () => {
//     setChoiceOne(null);
//     setChoiceTwo(null);
//     setTurns((prevTurns) => prevTurns + 1);
//     setDisabled(false);

//   };

// console.log(score);
//   return (
//     <div className="memory">
//       <h1>Memory Game</h1>
//       <div className="d-flex justify-content-around">
//         <button onClick={shuffleCards}>New Game</button>
//         <button onClick={() => navigate(-1)}>go back</button>
//       </div>

//       {!gameOver == "" ? (
//         <div>
//           <h2>Game Over</h2>

//         </div>
//       ) : (
//         <>
//         <p> Turn : {turns}</p>
//       <div className="card-grid">
//         {cards.map((card) => (
//           <SingleCard
//             key={card.id}
//             card={card}
//             handleChoice={handleChoice}
//             flipped={card === choiceOne || card === choiceTwo || card.matched}
//             disabled={disabled}
//           />
//         ))}
//       </div>
//         </>
//       )}

//     </div>
//   );
// }

// export default Memory;
