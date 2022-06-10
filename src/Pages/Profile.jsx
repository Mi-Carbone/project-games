import { API } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { getUser } from "../graphql/queries";
import "../style/profile/profile.css";
import { FaCamera } from "react-icons/fa";
import { RoutesLogin } from "../Routes";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const id = localStorage.getItem("userId");

  useEffect(() => {
    API.graphql({
      query: getUser,
      variables: {
        id: id,
      },
    })
      .then((data) => {
        setUser(data.data.getUser);
      })
      .catch((err) => {
        console.log("Nessun file trovato", err);
      });
  }, []);

  const handlChangeImage = () => {
    navigate(RoutesLogin.changeImage);
  };

  return (
    <>
      <div className="form">
        <div className="personal-profile">
          <div
            style={{
              width: "25%",
              margin: "50px 100px",
            }}
          >
            <div className="ct-main-circular-image">
              <div
                className="ct-main-circular-image-child"
                style={{
                  backgroundImage: "url(" + user.image + ")",
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              ></div>
              <span onClick={handlChangeImage}>
                <FaCamera className="icon-camera" />
              </span>
            </div>
          </div>
          <div className="profile">
            <h2>Welcome: {user.username}</h2>
            <ul className="ul-profile">
              <li>Name: {user.name}</li>
              <li>Surname: {user.surname}</li>
              <li>Email: {user.email}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;

// import React,{useState} from 'react'
// function About() {
//   // const [items, setItems] = useState(
//   //   [
//   //   {
//   //     id: 1,
//   //     checked: false,
//   //     item: "Uno ci sarà per tutti",
//   //   },
//   //   {
//   //     id: 2,
//   //     checked: false,
//   //     item: "item 2",
//   //   },
//   //   {
//   //     id: 3,
//   //     checked: false,
//   //     item: "Item 3",
//   //   },
//   // ]
//   // );

//   // const handleClick = (id) => {
//   //   //nuovo array creato da elementi di stato
//   //   const listItems = items.map((item) =>
//   //     item.id === id ? { ...item, checked: !item.checked } : item
//   //   );
//   //   setItems(listItems);
//   //   localStorage.setItem('list', JSON.stringify(listItems));
//   //   console.log(`key: ${id}`);
//   // };

//   //  const handleDelete = (id) => {
//   //   const listItems = items.filter((item) => item.id !== id);
//   //   setItems(listItems);
//   //   //Cancellazione dei dati salvati precedentemente in locale
//   //   localStorage.setItem("list", JSON.stringify(listItems));
//   // };

//   return (
//     <>
//       <main>
//         <h1>TO DO LIST</h1>
//       {/* {items.length ? (
//         <ul>
//           {items.map((item) => (
//             <li className="item" key={item.id}>
//               <input
//                 type="checkbox"
//                 onChange={() => handleClick(item.id)}
//                 checked={item.checked}
//               />
//               <label
//               style={(item.checked) ? {textDecoration: 'line-through'} : null}
//               onDoubleClick={() => handleClick(item.id)}>{item.item}</label>
//               <button style={{background:'red'}} onClick={() => handleDelete(item.id)}>Delete</button>
//             </li>
//           ))}
//         </ul>
//         ) : (
//             <p style={{ marginTop: "2rem", color: "red", fontSize: "30px" }}>
//               La tua lista è vuota
//             </p>
//           )} */}
//       </main>
//     </>
//   );
// }

// export default About
