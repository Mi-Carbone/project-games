import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import "../style/chat.css";
import { listMessages } from "../graphql/queries";
import { newMessage } from "../graphql/mutations";
import { onCreateMessage } from "../graphql/subscriptions";
import moment from "moment";

function App() {
  const [message, setMessage] = useState("");
  const [listSubMessage, setListSubMessage] = useState([]);
  const [listCreateChat, setListCreateChat] = useState("");
  const [userName, setUserName] = useState(JSON.parse(localStorage.getItem("sidebarUsername")))
  //useEffet chiamata ListMessage per tutti i messaggi salvati
  useEffect(() => {
    //const token = localStorage.getItem("token");
    API.graphql({
      query: listMessages,
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })
      .then((data) => {
        console.log(data.data.listMessages.items, "data listMessages");
        setListSubMessage(data.data.listMessages.items);
        //console.log(listSubMessage, "DOPPIo");
      })
      .catch((err) => {
        console.log(err, "err");
      });
  }, []);
  // console.log(listSubMessage, "DOPPIO ARRAY");
  //console.log(meChat, "meChat");

  listSubMessage.sort(function (a, b) {
    var dateA = new Date(a.createdAt),
      dateB = new Date(b.createdAt);
    return dateA - dateB;
  });

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
    event.preventDefault();
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
          console.log(data.data.newMessage, "data nuovo messaggio");
          listSubMessage.push(data.data.newMessage);
          setMessage("");
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
      console.log(rest.value.data.onCreateMessage, "data sub");
      setListCreateChat(rest.value.data.onCreateMessage);
    },
  });

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
              className="col-4 bg-dark h-100 p-0 d-flex flex-column"
            >
              <section className="user-section flex-shrink-0 d-flex justify-content-between text-white">
                <div className="user-name">
                  <div className="user-name-icon flex-shrink-0">
                    {/* <i className="fas fa-bell-slash"></i> */}
                    <img src="/img/anime7-1.png" alt="" />
                  </div>
                  <div className="user-name-text">
                    <div className="fs-3 clickable"
                    style={{
                      margin: "0px 20px",
                      fontWeight: 800
                    }}>
                      {userName.name}
                    </div>
                  </div>

                  <div className="h6 user-name-text">{}</div>
                </div>

                <div className="w-25 text-muted d-flex justify-content-around align-items-center"></div>
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
              className="bg-chat-image col-8 rounded-end d-flex flex-column bg-chat p-0 h-100"
            >
              <header className="flex-shrink-0 d-flex justify-content-between">
                <div className="user-name"></div>
                <div className="me-3 d-flex text-muted align-items-center justify-content-around"></div>
              </header>

              <main className="flex-grow-1 overflow-auto">
                <Row
                  style={{
                    margin: "0px 2px",
                  }}
                >
                  <Col></Col>
                  <Col md="auto"></Col>
                  <Col>
                    {listSubMessage.map((item, i) => (
                      <ul
                        className="bg-success rounded-3 text-white d-flex align-items-start flex-column p-3"
                        key={"arr" + i}
                      >
                        <li className="bg-success text-white text-start">
                          {item.message}
                          <br />
                          <time>
                            {moment(item.createdAt).format(
                              "MMMM Do YYYY, h:mm:ss a"
                            )}
                          </time>
                        </li>
                      </ul>
                    ))}
                  </Col>
                </Row>

                {/* <li className="message-container p-3 sent">
                    <div className="message p-2 rounded-3">
                      <ul>
                {listSubMessage.map((items, i) => (
                          <ul className="d-flex align-items-end flex-column p-3" key={"arr" + i}>
                            {items.map((element, q) => (
                              <li className="message p-2 rounded-3" key={"arr" + q}>
                                {element.message}
                                <time>{}</time>
                              </li>
                            ))}
                          </ul>
                        ))} */}
              </main>

              <footer className="flex-shrink-0 container-fluid">
                <div className="row h-100 align-items-center">
                  <div className="col-1">
                    {/* <i className="far fa-smile fa-2x text-muted clickable"></i> */}
                    <button>A</button>
                    <button>B</button>
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

// handleClick
//listSubMessage.push(listCreateChat);
// const res = rest.value.data.onCreateMessage;
// setMeChat(res);
// const arrMesage = [];
// arrMesage.push(res);
// setListSubMessage(arrMesage);
// for (let index = 0; index < arrMesage.length; index++) {
//   const res = [];
//   const element = arrMesage[index];
//   res.push({
//     ...element,
//     userFirst: userChatFirst,
//     userSecond: userChatSecond,
//   });
//   console.log(res[0], "ELEMENT");
//   setUserSubMsg(res[0].message);
//   setUserSubFirst(res[0].userFirst);
//   setUserSubSecond(res[0].userSecond);
//   setUserSubId(res[0].id);
//   setUserSubDate(res[0].updatedAt);
//   setUserSubOwner(res[0].owner);
//   setMeChat(res);
// }

// useEffect(() => {
//   setAccess(true)
//   if (access === true) {
//     newRecord();
//   }
// }, [meChat]);
// //localStorage.setItem("userChat", JSON.stringify(meChat));
// function newRecord() {
//   var existing = localStorage.getItem("sidebarUsername");
//   existing = existing ? JSON.parse(existing) : {};
//   console.log(existing, "existing");
//   //controllo Array
//   if (!existing) {
//     existing.chat = [];
//     console.log(existing.chat, "existing.chat");
//   }
//   //push elementi
//   existing.chat.push({
//     id: userSubId,
//     message: userSubMsg,
//     owner: userSubOwner,
//     updatedAt: userSubDate,
//     userFirst: userSubFirst,
//     userSecond: userSubSecond,
//   });
//   localStorage.setItem("sidebarUsername", JSON.stringify(existing));
// }
// const handleClickFirst = () => {
//   setUserChatSecond(false);
//   setUserChatFirst(true);
// };

// const handleClickSecond = () => {
//   setUserChatFirst(false);
//   setUserChatSecond(true);
// };

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
