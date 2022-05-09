// import React, { useState, useEffect } from "react";
// import LoginForm from "../components/LoginForm";
// import "../style/form/form.css";
// import logins from "../data/dbLogin.json";
// import ChoiceGame from "../navUser/ChoiceGame";
// import { Navigate, useNavigate } from "react-router-dom";

// function Form() {
//   const [access, setAccess] = useState(logins);

//   //login diretta per amministratore
//   const [user, setUser] = useState({ name: "", email: "" });
//   const [error, setError] = useState("");
//   const [userLogged, setUserLogged] = useState(null);

//   const navigate = useNavigate();

//   useEffect(() => {}, []);

//   // console.log("access.login ", access);

//   //controllo dei dati inseriti
//   const Login = (details) => {
//     const cheked = access.logins.filter(filterUser);

//     function filterUser(item) {
//       if (item.email === details.email && item.password === details.password) {
//         setUser({
//           name: details.name,
//           email: details.email,
//         });
//         console.log("presente");
//         setUserLogged(true)
//         //variabile grobale per verificare se l utente si è loggto
//         // sessionStorage.setItem('email',userLogged)
//         // console.log('verifica loggato',sessionStorage.getItem('email'));

//         localStorage.setItem('userLogged', JSON.stringify(details));
        
//       } else {
//         setError("I dati inseriti non corrispondono");
//       }

      
//     }
//   };
//   const Logout = () => {
//     console.log("logout");
//     setUser({ name: "", email: "" });
//   };

//   return (
//     <>
   
    
//         <div className="form">

      
//           <LoginForm Login={Login} error={error}  onSubmit={()=>{
//             navigate('/choice')
//             console.log('inviato')
//           }}/>
        
//       </div>
        
   
      
//     </>
//   );
// }

// export default Form;


// <div className="form">
//         {/* Ternario, se viene inserita la mail allora da il benvenuto, altrimenti il form di registrazione */}
//         {user.email !== "" ? (
//           <ChoiceGame name ={user.name} logout={Logout}/>
//         ) : (
//           <LoginForm Login={Login} error={error} />
//         )}
//       </div>







// const [counter, setCounter] = useState(0);

// const doSomething = () => {
//   setCounter(123);
// };

// useEffect(() => {
//   console.log("Do something after counter has changed", counter);
// }, [counter]);






 //const cheked = access.logins.filter(filterUser);

    // function filterUser(item) {

    //   if (item.email === details.email && item.password === details.password) {
    //     console.log("ora setto l utente" , item);
    //     setUser({
    //       name: details.name,
    //       email: details.email,
    //       password:details.password,
    //       logged: item.logged,
    //       turn:  item.turn,
    //       score:  item.score,
    //     });
    //     setUserLogged(localStorage.setItem("user", JSON.stringify(details)))
    //     // SET user to local storage
    //     // console.log("• user from state is", user);
    //     // function delayedSetStorage() {
    //     //   console.log("• user from state in delayedSetStorage is", user);

    //     // }
    //     // setTimeout(delayedSetStorage, 5000);

    //     // storeUser(user)

    //   } else {
    //     setError("I dati inseriti non corrispondono");
    //   }

    // }