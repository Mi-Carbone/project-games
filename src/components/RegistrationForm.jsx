import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API, Auth} from "aws-amplify";
import { RoutesLogin } from "../Routes";
import { registerUser } from "../graphql/mutations";


const RegistrationForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [CheckForm, setCheckForm] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [userScore, setUserScore] = useState({
    name: "",
    scoresMine: [],
    scoresMemory: [],
    chat: []
  });
  
  const handleChange = (event) => {
    if (event.target.name === "name") {
      setName(event.target.value);
    } else if (event.target.name === "surname") {
      setSurname(event.target.value);
    } else if (event.target.name === "username") {
      setUsername(event.target.value);
    } else if (event.target.name === "email") {
      setEmail(event.target.value);
    } else if (event.target.name === "password") {
      setPassword(event.target.value);
    } else if (event.target.name === "verifyPassword") {
      setVerifyPassword(event.target.value);
    }
  };

  //cattura evento del click per la gestione dei dati in entrata
  const handleClick = (event) => {
    
    event.preventDefault();
    console.log(event, "event");
    //verifica del campo vuoto
    if (
      name === "" ||
      surname === "" ||
      username === "" ||
      email === "" ||
      password === "" ||
      verifyPassword === ""
    ) {
      alert("Compila tutti i campi");
    }
    //verifica della lunghezza della password minimo 8 caratteri
    if (password.length >= 8) {
      //la verifica del doppio campo della password
      if (password === verifyPassword) {
        try {
          const user = Auth.signUp(
            username.trim(),
            password.trim(),
            email.trim()
          );
          console.log(user, "user");
          user.then((data) => {
            console.log(data, "data");
            setCheckForm(true);
          });
        } catch (error) {
          console.log(error, " error");
        }
      } else {
        alert("Le password inserite non corrispondono");
      }
    } else {
      alert("La lunghezza della password deve essere di almeno 8 caratteri");
    }
  };

  //copia i dati del utente che si sta registrando su Dynamo passando i dati richiesti dalla query
  function createUser() {
    return API.graphql({
      query: registerUser,
      authMode: 'AMAZON_COGNITO_USER_POOLS',
      variables: {
        name: name,
        surname: surname,
        email: email,
        username: username,
        password: password
      },
      
    });
  }
  // async function createUser() {
  //     const apiData = API.graphql({
  //       query: gql(registerUser),
  //       variables: {
  //         name: name,
  //         surname: surname,
  //         email: email,
  //         username: username.toLowerCase(),
  //         password: password,
  //       },
  //       authMode: "AMAZON_COGNITO_USER_POOLS",
  //     });
  //   return apiData;
  // }
  // async function createUser() {
  //   const apiData = await API.graphql({
  //     query: gql(registerUser),
  //     variables: {
  //       name: name,
  //       surname: surname,
  //       email: email,
  //       username: username.toLowerCase(),
  //       password: password,
  //     },
  //     authMode: "AMAZON_COGNITO_USER_POOLS",
  //   });
  //   return apiData;
  // 



  //funzione per la gestione del codice di verifica OTP
  const confirm = async () => {
    setLoading(true)
    //Controllo sul numero dei caratteri che devono essere soltanto 6
    if (code.length !== 6 || code === "") {
      alert("Il codice da inserire deve essere di almeno 6 caratteri");
      confirm();
    }
    //richiamiamo la funzione di AWS con all'interno username(dato salvato nel primo form) e code(proveniente dal forma del codice OTP)
    await Auth.confirmSignUp(username.trim(), code.trim()).then((data) => {
      console.log("dataConferma", data);
      if (data === "SUCCESS") {
        Auth.signIn(username, password).then((data) => {
          setUserScore({
            name: data.username.toLowerCase(),
            scoresMine: [],
            scoresMemory: [],
            chat: []
          });
          userScore.name = data.username;
          localStorage.setItem("sidebarUsername", JSON.stringify(userScore));
          localStorage.setItem(
            "token",
            data.signInUserSession.accessToken.jwtToken
          );

          console.log(data, "data okay");
          // createUser() funzione che crea una copia dei dati dell utente su Dynamo sfruttando la funzione scritta sopra
          // console.log(createUser(), "function");
          createUser()
            .then((res) => {
              console.log("registrazione avvenuta e creazione su Dynamo ", res);
              console.log("registrazione avvenuta e registerUser", res.data.registerUser);
              localStorage.setItem('userId', res.data.registerUser.id);
              navigate(RoutesLogin.choices);
              window.location.reload();
            })
            .catch((err) => {
              console.log("Errore nella registrazione su Dynamo", err);
              alert("Errore nella registrazione");
              Auth.deleteUser();
              navigate(RoutesLogin.registrationForm);
            });
        });
      }
    });
  };



  if (loading) {
    return (
      <>
        <div className="form">
          <div className="spinner"></div>
        </div>
      </>
    );
  }

  return (
    <>
      {!CheckForm ? (
        <>
          <div>
            <form className="form-login">
              <div className="form-inner">
                <div className=" form-group">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="name"
                    name="name"
                    onChange={handleChange}
                    minLength={3}
                    required
                  />
                </div>
                <div className=" form-group">
                  <label className="form-label">Surname</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="surname"
                    name="surname"
                    onChange={handleChange}
                    minLength={3}
                    required
                  />
                </div>
                <div className=" form-group">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="username"
                    name="username"
                    onChange={handleChange}
                    minLength={3}
                    required
                  />
                </div>
                <div className="mb-3 form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="email"
                    name="email"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3 form-group">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="password"
                    minLength={8}
                    name="password"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3 form-group">
                  <label className="form-label">Conferma Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="verifica password"
                    minLength={8}
                    name="verifyPassword"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-button">
                  <button className="btn btn-primary" onClick={handleClick}>
                    Registrati
                  </button>
                </div>
              </div>
            </form>
          </div>
        </>
      ) : (
        <>
          <div className="form-login">
            <div className="form-inner">
              <div className="form-group">
                <label>Inserisci codice OTP</label>
                <input
                  type="text"
                  name="code"
                  className="form-control mb-3 "
                  placeholder="012345"
                  onChange={(event) => setCode(event.target.value)}
                  required
                />
                <div className="mb-3  input-button">
                  <button className="btn btn-primary" onClick={confirm}>
                    Conferma Codice
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default RegistrationForm;

/**
 *  // const handleClick = async (event) => {
  //   if (username === "" ||email === "" || password === "") {
  //     alert("Compile all the fields");
  //   } else {
  //     event.preventDefault();
  //     await Auth.signIn(username.trim().toLowerCase(), password.trim())
  //       .then((data) => {
  //         setUserScore({
  //           name: data.username.toLowerCase(),
  //           score: "",
  //         });
  //         userScore.name = data.username;
  //         localStorage.setItem("sidebarUsername", JSON.stringify(userScore));
  //         setToken(data.signInUserSession.accessToken.jwtToken);
  //       })
  //       .catch((err) => {
  //         if (err) {
  //           alert("Username o password not correct");
  //         }
  //       });
  //   }
  // };
  // useEffect(() => {
  //   if (token !== "" && token !== "error") {
  //     localStorage.setItem("token", token);
  //     navigate(RoutesLogin.choice);
  //   }
  // }, [token, navigate]);

  //cattura evento del click per la gestione dei dati in entrata
  const handleClick = (event) =>{
    event.preventDefault();
    //verifica del campo vuoto
    if (username === "" ||email === "" || password === "") {
      alert("Compile all the fields");
    }
    //verifica della lunghezza della password minimo 8 caratteri
    if (password.length >= 8) {
      //la verifica del doppio campo della password
      if (password === verifyPassword) {
        let user = Auth.signUp(username.trim(), password.trim(), email.trim());
        console.log(user, 'user');
        user.then((data)=>{
          console.log(data, 'data');
          setOpenForm(true)
        }).catch((error)=>{
          console.log(error,' error');
          if (error.message === 'User already exist') {
            alert('Username already exists')
          } else if(error.mail === 'Invalid email address format.'){
            alert('Email not valid')
          }
        })
      }else{
        alert('The E-mails entered do not match')
      }
    }else{
      alert('Password length must be greater than 8 characters')
    }
  }
 */

/**
 * TUTTO QUESTO SENZA IL COLLEGAMENTO CON IL BACK DI LUCA


import React, { useState } from "react";

function RegistrationForm({ Registration, error }) {
  const [details, setDetails] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    //qui richiamiamo la funzione dove al suo interno verranno passati i dettagli degli input
    //per passare i dati bisogna aggiungere la funzione onChange a ogni input inserendo anche il cambiamento dello setState in base al suo value
    Registration(details);
  };

  return (
    <>
      <form onSubmit={submitHandler} className="form-login">
        <div className="form-inner">
          <h2>Registrazione</h2>
          {/* inserimenro ERRORE nella compilazione del form *
          {error !== "" ? <div className="error">{error}</div> : ""}
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              className="input-button"
              type="text"
              name="name"
              id="name"
              onChange={(e) => setDetails({ ...details, name: e.target.value })}
              value={details.name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              className="input-button"
              type="email"
              name="email"
              id="email"
              onChange={(e) =>
                setDetails({ ...details, email: e.target.value })
              }
              value={details.email}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              className="input-button"
              type="password"
              name="password"
              id="password"
              onChange={(e) =>
                setDetails({ ...details, password: e.target.value })
              }
              value={details.password}
            />
          </div>
          <input className="input-button" type="submit" value="INVIA" />
        </div>
      </form>
    </>
  );
}

export default RegistrationForm;

 */
