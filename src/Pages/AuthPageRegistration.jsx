import React from "react";
import "../style/form/form.css";
import RegistrationForm from "../components/RegistrationForm";

function AuthPageRegistration() {




  return (
    <>
      <div className="form">
        <RegistrationForm/>
      </div>
    </>
  );
}

export default AuthPageRegistration;

/**
 * import React, { useState, useEffect } from "react";
import LoginForm from "../components/LoginForm";
import "../style/form/form.css";
import logins from "../data/dbLogin.json";
import { useNavigate } from "react-router-dom";
import { RoutesLogin } from "../Routes/index";
import RegisterForm from "../components/RegistrationForm";
import RegistrationForm from "../components/RegistrationForm";
import apiRequest from "../components/ApiRequest";

function AuthPageRegistration() {
  const [access, setAccess] = useState(logins);
  const [user, setUser] = useState([]);
  const [error, setError] = useState("");
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

  const API_URL = "http://localhost:35500/logins";
  const [items, setItems] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          //console.log("response.ok", !response.ok);
          throw Error("Non ho ricevuto i dati che mi aspetto");
        }
        const ListItems = await response.json();
        //console.log(ListItems, "file json");
        setUser(ListItems);
        //console.log(items,'items');
        setFetchError(null);
      } catch (err) {
        // console.log(err.message, 'err.message');
        setFetchError(err.message);
      } finally {
        //L' finally istruzione che definisce un blocco di codice da eseguire indipendentemente dal risultato.
        setIsLoading(false);
      }
    };
    setTimeout(() => {
      (async () => await fetchItems())();
    }, 1000);
  }, []);

  //   console.log(items,'items dopo');

  //controllo dei dati inseriti
  const Registration = async (details) => {
    const chekedUser = access.logins.map((login) => {
      if (
        login.email === details.email &&
        login.password === details.password
      ) {
        console.log("I dati inseriti sono già presenti");

        setError("I dati inseriti sono già presenti");
      } else {
        const id = user.length ? user[user.length - 1].id + 1 : 1;
        const myNewItem = {
          id,
          userName: details.name,
          email: details.email,
          password: details.password,
        };

        //aggiorniamo l array con i nuovi dati e con quei vecchi
        const listItems = [...user, myNewItem];

        setUser(listItems);
        // logins.logins.push(user)
      }
    });

    const postOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    };
    const result = await apiRequest(API_URL, postOptions);

    if (result) {
      setFetchError(result);
    }
  };

  // console.log(user, "user Array");

  const onClick = () => {
    navigate(RoutesLogin.choice);
    window.location.reload();
  };

  return (
    <>
      {/* •
            {JSON.stringify(user, null, 2)}
            • *
      <div className="form">
        {user.email ? (
          <div>
            <h2>Benvenuto {user.name}</h2>
            <p>la tua registrazione è avvenuta correttamente</p>
            <button onClick={onClick}>Avanti</button>
          </div>
        ) : (
          <>
            <RegistrationForm Registration={Registration} error={error} />
          </>
        )}
      </div>
    </>
  );
}

export default AuthPageRegistration;

 */
