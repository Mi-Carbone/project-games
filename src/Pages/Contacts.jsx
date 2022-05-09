import React, { useState } from "react";
import "../style/contact.css";


function Contacts() {
  const [items, setItems] = useState(JSON.parse(localStorage.getItem("user")));
  const [counter, setCounter] = useState(0);
  const [listItems, setListItems] = useState([]);

  const handleClick = () => {
    console.log(items, 'array salvati');
    const myNewItems = [];
    // const myNewItems = items.score;
    myNewItems.push(items.scores)
    console.log('nuovo array', myNewItems);
    
    // // listItems.push({score:items})
    // console.log(listItems, "pa");
    setListItems(myNewItems);
  };
  console.log("pass Araay", listItems);
  console.log("pass Araay date", listItems.date);
  return (
    <>
      <div className="contact">
        <h1>Contacts</h1>
        <button className="contact-button" onClick={handleClick}>Aggiorna Punteggio</button>
        {listItems.map((date, i) =>(
          <ul className="contact-table" key={"data_"+i}>
            {date.map((newScore, j)=>(
              <li className="contact-element" key={"score_" + j}>
                Data: {newScore.date}
                <span>Punteggio: {newScore.newScore}</span>
                
              </li>
              
            ))}
          </ul>
          
        ))}
      </div>
    </>
  );
}

export default Contacts;



{/**
 /*
  const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setAndSaveItems(listItems);
 */}





















































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
