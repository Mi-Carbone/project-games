// import React from 'react'

// function userDashboard() {
//   return (
//     <div>userDashboard</div>
//   )
// }

// export default userDashboard



// import React, { useEffect, useState } from "react";

// import SingleCard from "./componentsCard/singleCard";
// import "../../style/memory/memory.css";
// import { Link, useNavigate } from "react-router-dom";
// import { RoutesLogin } from "../../Routes/index";

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
//   // const [items, setItems] = useState(JSON.parse(localStorage.getItem("user")));
//   // const [score, setScore] = useState([{ id: "", score: "" }]);

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
//     setGameOver(false);
//     setCounterId(counterId + 1);
//   };

//   // handleChoise prende l argomento card per verificare
//   const handleChoice = (card) => {
//     choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
//   };

//   const [counterId, setCounterId] = useState(0);
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
//         // se non corrispondo ricopro le carte scelte
//         setTimeout(() => resetTurn(), 1000);
//       }
//     }

//     if (counter === cardImages.length) {
//       // setScore({ ...score, id: startGame, turn: turns });
//       setGameOver(true);
//       // addScore();
//     }
//     // localStorage.setItem("list", JSON.stringify(turns));
//   }, [choiceOne, choiceTwo]);

//   // const addScore = () => {
//   //   setItems(turns);
//   //   const myNewItem = { id: counterId, score: turns };

//   //   console.log("fine partita");
//   //   setScore(myNewItem);
//   // };
//   console.log("turni ", turns);
//   // console.log("score ", score);

//   // Azzero le scelte e incremento di uno per passare alla selezione sucessiva
//   const resetTurn = () => {
//     setChoiceOne(null);
//     setChoiceTwo(null);
//     setTurns((prevTurns) => prevTurns + 1);
//     setDisabled(false);
//   };

//   // inizio automatico del gioco oppure anche senza
//   // useEffect(() => {
//   //   shuffleCards();
//   // }, []);

//   return (
//     <div className="memory">
//       <h1>Memory Game</h1>
//       <div className="d-flex justify-content-around">
//         <button onClick={shuffleCards}>New Game</button>
//         <button onClick={() => navigate(-1)}>go back</button>
//       </div>

//       {!gameOver == "" ? (
//         <div>
//           <h2>Winner</h2>
//         </div>
//       ) : (
//         <div>
//           <h3>Partita in corso</h3>
//         </div>
//       )}
//       <p> Turn : {turns}</p>
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
//     </div>
//   );
// }

// export default Memory;

// // if (counter === cardImages.length) {
// //   // setScore({ ...score, id: startGame, turn: turns });
// //   setGameOver(true);
// //   setItems(turns);
// //   const myNewItem = { id: counterId, score:turns };

// //   console.log('fine partita');
// //   setScore(myNewItem)
// // }
// // const [counterId, setCounterId] = useState(0);
// // useEffect(() => {
// //   setCounterId(counterId + 1);
// //   const myNewItem = { id: counterId, score:turns };
// //   if (!gameOver) {
// //     console.log("fine partita");
// //     setScore(myNewItem)
// //   }
// // }, [gameOver]);









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


 // const newRecordWinner = () => {
  //   setScore(score + 1);
  //   var existing = localStorage.getItem("user");

  //   // If no existing data, create an array
  //   // Otherwise, convert the localStorage string to an array
  //   existing = existing ? JSON.parse(existing) : {};

  //   // Add new data to localStorage Array
  //   existing["score"] = { id: score, score: turns };

  //   // Save back to localStorage
  //   localStorage.setItem("user", JSON.stringify(existing));
  // };

  // const addItem = (item) => {
  //   console.log("item", item);
  //   const id = items.length ? items[items.length - 1].id + 1 : 1;
  //   const myNewItem = { id, checked: false, item };
  //   const listItems = [...items, myNewItem];
  //   setItems(listItems);
  //   localStorage.setItem("user", JSON.stringify(listItems));
  // };
  // const addScore = () => {

  //   var existing = localStorage.getItem("user");

  //   console.log(score, 'score');
  //   // If no existing data, create an array
  //   // Otherwise, convert the localStorage string to an array
  //   existing = existing ? JSON.parse(existing) : {};

  //   // Add new data to localStorage Array
  //   existing['id'] = score;
  //   existing["score"] = turns;

  //   // Save back to localStorage
  //   localStorage.setItem("user", JSON.stringify(existing));

  //   {
  //    console.log('evento' , e);
  //   setScore(score + 1);
  //   const myNewItems = [];
  //   myNewItems.push({id:score, score:turns})
  //   console.log('nuovo record', myNewItems);
  //   var existing = localStorage.getItem("user");

  //   // If no existing data, create an array
  //   // Otherwise, convert the localStorage string to an array
  //   existing = existing ? JSON.parse(existing) : {};

  //   // Add new data to localStorage Array
  //   existing['score'] = myNewItems;

  //   // Save back to localStorage
  //   localStorage.setItem("user", JSON.stringify(existing));
  //   }
  // };
