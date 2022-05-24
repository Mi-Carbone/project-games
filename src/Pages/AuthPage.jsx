import React from "react";
import "../style/form/form.css";
import LoginUser from "../components/LoginForm";


function AuthPage() {

  return (
    <>
      <div className="form"> 
          <LoginUser />
      </div>
    </>
  );
}

export default AuthPage;






/*
TUTTO QUESTO SENZA IL COLLEGAMENTO CON IL BACK DI LUCA

import React, { useState, useEffect } from "react";
import LoginForm from "../components/LoginForm";
import "../style/form/form.css";
import logins from "../data/dbLogin.json";
import { useNavigate } from "react-router-dom";
import { RoutesLogin } from "../Routes/index";
import RegistrationForm from "../components/RegistrationForm";
import ChoiceRegisterLogin from "../components/ChoiceRegisterLogin";
import LoginUser from "../components/LoginForm";




function AuthPage() {
  //const API_URL = "http://localhost:35500/logins";
  //const [access, setAccess] = useState(logins);
  const [user, setUser] = useState({
    name: null,
    email: null,
  });
  const [error, setError] = useState(true);
  const [userLogged, setUserLogged] = useState(false);
  const navigate = useNavigate();

  /*
    useEffect(() => {
  
                // GET user from local storage (if exist)
                let userLocalStorage = localStorage.getItem("user");
                console.log('🟠 utenza recuperata da localStorage', userLocalStorage)
                // 1 - SE trovo già utenza il localstorage...
                if (user.logged) {
                    // 1A (SI) - aggiorno il mio state con i dati recuperati da local.
                    // setUser(userLocalStorage);

                } else {
                    // 1B (NO) - inizializzo l'utenza?
                    // localStorage.setItem("user", JSON.stringify(user));
                }


                console.log("ottieniUtenzaInLocale", userLocalStorage);

                /!*
                * if (user) {
                localStorage.setItem("user", JSON.stringify(user));
                * localStorage.setItem("user", JSON.stringify(user));
                }
                * *!/
                //Se io non ho un utenza in localStorage
        
  }, []);*

  const [items, setItems] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // useEffect(() => {
  //   const fetchItems = async () => {
  //     try {
  //       const response = await fetch(API_URL);

  //       if (!response.ok) {
  //         //console.log("response.ok", !response.ok);
  //         throw Error("Non ho ricevuto i dati che mi aspetto");
  //       }
  //       const ListItems = await response.json();
  //       //console.log(ListItems, "file json");
  //       setItems(ListItems);
  //       setFetchError(null);
  //     } catch (err) {
  //       setFetchError(err.message);
  //     } finally {
  //       //L' finally istruzione che definisce un blocco di codice da eseguire indipendentemente dal risultato.
  //       setIsLoading(false);
  //     }
  //   };
  //   (async () => await fetchItems())();
  // }, []);

  //controllo dei dati inseriti

  // const Login = (details) => {
  //   const chekedUser = access.logins.map((login) => {
  //     console.log("dettagli", details);
  //     if (
  //       login.email === details.email &&
  //       login.password === details.password
  //     ) {
  //       console.log("esiste");
  //       setUser({
  //         name: details.name,
  //         email: details.email,
  //         password: details.password,
  //       });
  //       localStorage.setItem("user", JSON.stringify(details));
  //     } else {
  //       setError("I dati inseriti non sono corretti");
  //     }
  //   });
  // };
  
  
  
  // const onClick = () => {
  //   navigate(RoutesLogin.choice);
  //   window.location.reload();
  // };

  return (
    <>
      {/* •
            {JSON.stringify(user, null, 2)}
             {!error ? (
          <div>
            <h2>Benvenuto {user.name}</h2>
            <p>la tua registrazione è avvenuta correttamente</p>
            <button onClick={onClick}>Avanti</button>
          </div>
        ) : (
                    <LoginUser error={error}/>
        )}
            • *
      <div className="form">
       
          <LoginUser />
      </div>
    </>
  );
}

export default AuthPage;
*/