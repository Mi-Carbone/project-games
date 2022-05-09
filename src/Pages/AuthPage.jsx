import React, { useState, useEffect } from "react";
import LoginForm from "../components/LoginForm";
import "../style/form/form.css";
import logins from "../data/dbLogin.json";
import { useNavigate } from "react-router-dom";
import { RoutesLogin } from "../Routes/index";

function AuthPage() {
  const [access, setAccess] = useState(logins);
  const [user, setUser] = useState({
    name: null,
    email: null,
    logged: false,
    turn: 0,
    score: 0,
  });
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
        
  }, []);*/

  useEffect(() => {}, []);
  //controllo dei dati inseriti
  const Login = (details) => {
   
    const chekedUser = access.logins.map((login) => {
      console.log("login", login);
      console.log("dettagli", details);
      if (login.email === details.email && login.password === details.password) {
        console.log("esiste");
        setUser({
          name: details.name,
          email: details.email,
          password: details.password,
          logged: true,
          turn: 0,
          score: 0,
        });
        localStorage.setItem("user", JSON.stringify(details));
      }
    });
  };

  //   useEffect(()=>{

  //     //   let checked = localStorage.setItem("user", JSON.stringify(user));
  //     //   if (!userLogged) {
  //     //       setUser(checked)
  //     //   }
  //   },[])
  //   const storeUser = (user)=>{
  // console.log(user,'utente');
  //   }
  const onClick = () => {
    navigate(RoutesLogin.choice);
    window.location.reload();
  };

  return (
    <>
      {/* •
            {JSON.stringify(user, null, 2)}
            • */}
      <div className="form">
        {user.email ? (
          <div>
            <h2>Benvenuto {user.name}</h2>
            <p>la tua registrazione è avvenuta correttamente</p>
            <button onClick={onClick}>Avanti</button>
          </div>
        ) : (
          <LoginForm Login={Login} error={error} />
        )}
      </div>
    </>
  );
}

export default AuthPage;

