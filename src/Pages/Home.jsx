import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { Table } from "react-bootstrap";
import moment from "moment";
import "../style/chat.css";
import { listMessages } from "../graphql/queries";
import { newMessage } from "../graphql/mutations";
import { onCreateMessage } from "../graphql/subscriptions";




function App() {
  const [message, setMessage] = useState("");
  const [createSubMsg, setCreateSubMsg] = useState([]);
  const [listCreateChat, setListCreateChat] = useState('');
  const [userChatFirst, setUserChatFirst] = useState(null);
  const [userChatSecond, setUserChatSecond] = useState(null);
  const imagesUser = [
    { src: "/img/anime7-1.png", first: false },
    { src: "/img/image-avatar.png", second: false },
  ];
  let listmessages = [];
  
  //useEffet chiamata ListMessage per tutti i messaggi salvati
  useEffect(() => {
    //const token = localStorage.getItem("token");
    API.graphql({
      query: listMessages,
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })
      .then((data) => {
        //console.log(data, 'data listMessages');
        listmessages.push(data);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  }, []);

  //funzione che richiama la mutation createMessage
  function newCreateMessage() {
    return API.graphql({
      query: newMessage,
      variables: {
        message: message,
      },
    });
  }

  // funzione input
  const handleChange = (event) => {
    event.preventDefault()
    if (event.target.name === "chat") {
      setMessage(event.target.value);
    }
  };

  const handleClick = () => {
    if (message === "") {
      return;
    } else {
      newCreateMessage()
        .then((data) => {
          console.log(data, "data ");
          listmessages.push(data);
          setMessage('')
          // window.location.reload();
        })
        .catch((err) => {
          console.log(err, "err");
        });
    }
  };

//funzione che richiama la subscription
    API.graphql(
      graphqlOperation(onCreateMessage, {
        authMode: "AMAZON_COGNITO_USER_POOLS",
      })
    ).subscribe({
      next: (rest) => {
        console.log(rest, "data sub");
        setListCreateChat(rest.value.data.onCreateMessage);
        listmessages.push(listCreateChat)
      },
    });


  console.log(listmessages, "listmessages");

  const handleClickFirst = () =>{
    setUserChatSecond(false)
    setUserChatFirst(true)
    
  }
  console.log(userChatSecond, 'userChatSecond');
  console.log(userChatFirst, 'userChatFirst');
  const handleClickSecond = () =>{
    setUserChatFirst(false)
    setUserChatSecond(true)
  }
  return (
    <>
      <div
        id="app"
        className="d-flex align-items-center justify-content-center h-100 mt-4"
      >
        <div className="container rounded shadow bg-white">
          <div className="row h-100">
            <section
              id="contacts"
              className="col-4 bg-gray h-100 p-0 d-flex flex-column"
            >
              <section className="user-section flex-shrink-0 d-flex justify-content-between">
                <div className="user-name">
                  <figure>
                    <img />
                  </figure>

                  <div className="h6 user-name-text">{}</div>
                </div>

                <div className="w-25 text-muted d-flex justify-content-around align-items-center">
                  {/* <i className="fas fa-circle-notch clickable"></i>
                  <i className="fas fa-comment-alt clickable"></i>
                  <i className="fas fa-ellipsis-v clickable"></i> */}
                </div>
              </section>

              <section className="notifications flex-shrink-0">
                <div className="user-name">
                  <div className="user-name-icon flex-shrink-0">
                    {/* <i className="fas fa-bell-slash"></i> */}
                  </div>

                  <div className="user-name-text">
                    <div>Ricevi notifiche di nuovi messaggi</div>
                    <div className="fs-6 clickable text-decoration-underline">
                      <small>Attiva le notifiche desktop</small>
                    </div>
                  </div>
                </div>
              </section>

              <section className="search p-2">
                {/* <i className="fas fa-search text-muted"></i> */}
                <input
                  type="text"
                  className="w-100"
                  placeholder="Cerca o inizia una nuova chat..."
                />
              </section>

              <section className="flex-grow-1 overflow-auto bg-white">
                <ul className="m-0 p-0">
                  <li>
                    {/* <figure>
                      <img />
                    </figure> */}
                    <section className="notifications flex-shrink-0">
                <div className="user-name">
                  <div className="user-name-icon flex-shrink-0">
                    {/* <i className="fas fa-bell-slash"></i> */}
                    <img src="/img/anime7-1.png" alt="" />
                  </div>

                  <div className="user-name-text">
                    <div className="fs-6 clickable text-decoration-underline">
                     Utente A
                    </div>
                  </div>
                </div>
              </section>
                    <div className="h6 user-name-text">
                      <div>{}</div>
                    </div>
                  </li>
                  <li>
                    {/* <figure>
                      <img />
                    </figure> */}
                    <section className="notifications flex-shrink-0">
                <div className="user-name">
                  <div className="user-name-icon flex-shrink-0">
                    {/* <i className="fas fa-bell-slash"></i> */}
                    <img src="/img/image-avatar.png" alt="" />
                  </div>

                  <div className="user-name-text">
                    <div className="fs-6 clickable text-decoration-underline">
                     Utente B
                    </div>
                  </div>
                </div>
              </section>
                    <div className="h6 user-name-text">
                      <div>{}</div>
                    </div>
                  </li>
                </ul>
              </section>
            </section>

            <section
              id="chat"
              className="col-8 rounded-end d-flex flex-column bg-chat p-0 h-100"
            >
              <header className="bg-gray flex-shrink-0 d-flex justify-content-between">
                <div className="user-name">
                  {/* <figure>
                    <img />
                  </figure>
                  <div className="h6 user-name-text">
                    <div>{}</div>
                    <div className="user-name-secondary-text fw-light">
                      <small>Ultimo accesso oggi alle {}</small>
                    </div>
                  </div> */}
                </div>
                <div className="me-3 d-flex text-muted align-items-center justify-content-around">
                  {/* <i className="fas fa-search ms-3 clickable"></i>
                  <i className="fas fa-paperclip ms-3 clickable"></i>
                  <i className="fas fa-ellipsis-v ms-3 clickable"></i> */}
                </div>
              </header>

              <main className="flex-grow-1 overflow-auto bg-chat-image">
                <ul>
                  <li className="message-container p-3 sent">
                    <div className="message p-2 rounded-3">
                      <p>{listCreateChat.message}</p>
                      <time>{}</time>
                    </div>
                  </li>
                  
                </ul>
              </main>

              <footer className="flex-shrink-0 container-fluid">
                <div className="row h-100 align-items-center">
                  <div className="col-1">
                    {/* <i className="far fa-smile fa-2x text-muted clickable"></i> */}
                    <button onClick={handleClickFirst}>A</button>
                    <button onClick={handleClickSecond}>B</button>
                  </div>
                  <div className="col-10">
                    <input
                      type="text"
                      name="chat"
                      value={message}
                      className="form-control"
                      placeholder="Scrivi un messaggio"
                      onChange={handleChange}
                    />
                    <button onClick={handleClick}>invia</button>
                  </div>
                  <div className="col-1">
                    {/* <i className="fas fa-chevron-circle-right fa-2x text-muted clickable"></i> */}
                  </div>
                </div>
              </footer>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;








































// useEffect(() => {
//   const subscription = API.graphql(
//     graphqlOperation(onCreateScores, {
//       authMode: "AMAZON_COGNITO_USER_POOLS",
//     })
//   ).subscribe({
//     next: (data) => {
//       console.log(data.value.data.onCreateScores);
//       const newScore = data.value.data.onCreateScores;
//       const newScoreData = data.value.data.onCreateScores.date;
//       setDate(newScoreData);
//       setCreateScore(newScore);
//     },
//     // error: error => {
//     //   console.warn(error);
//     // }
//   });
// }, [createScore]);

// console.log(createScore, "createScore");

//   <div className="homepage">
//         <Table striped bordered hover variant="dark">
//           <thead>
//             <tr>
//               <th>Name: </th>
//               <th>Game: </th>
//               <th>Date: </th>
//               <th>Score: </th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>{createScore.owner}</td>
//               <td>{createScore.game}</td>
//               <td>
//                 {date ? moment(date).format("MMMM Do YYYY, h:mm:ss a") : ""}
//               </td>
//               <td>{createScore.score}</td>
//             </tr>
//           </tbody>
//         </Table>
//       </div>

// const scores = API.graphql(graphqlOperation(onCreateScores, {owner: owner})).subscribe({
//     next: (score) => {
//       console.log(score);
//     },
//     error: error => console.error(error)
// })
// const subscription = API.graphql(graphqlOperation(onCreateScores))

//   .subscribe({
//     next: (score) => {
//       console.log(score);
//     },
//     error: (error) => {
//       console.error(error);
//       subscription.unsubscribe();

//     }
// })
// console.log(subscription, 'subscription');

// const score = API.graphql({
//   query: onCreateScores,
//   variables: {
//     owner: owner,
//   },
// })
// console.log(createScore,'createScore');

// Subscribe to creation of Todo
// const subscription = API.graphql(
//     graphqlOperation(subscriptions.onCreateScores, {variables: {owner:owner}})
// ).subscribe({
//     next: ({ variables}) => console.log({ variables}),
//     error: error => console.error(error)
// });

// // Stop receiving data updates from the subscription
// //subscription.unsubscribe();
// console.log(subscription, 'subscription');

// const subscription = API.graphql(graphqlOperation(subscriptions.onCreateScores, {owner: owner})).subscribe({
//     next: data => {
//       console.log(data);
//     },
//     error: error => {
//       console.warn(error);
//     }
//   });

// import React, { useEffect, useState } from "react";
// function App() {

//   const [posts, setPosts] = useState([]);
//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     const rawData = await fetch("https://jsonplaceholder.typicode.com/posts/");
//     //trasformare i dati in un json
//     const data = await rawData.json();

//     const posts = data.slice(0, 10);
//     setPosts(posts);
//   };

//   return (
//     <>
//       <div classNameName="homepage">
//         <h2>HOME</h2>
//         <div>
//           {posts.map((post) => (
//             <h3 key={post.id}>{post.title}</h3>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;
