import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import { RoutesLogin } from "../Routes";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [token, setToken] = useState("");
  const [CheckForm, setCheckForm] = useState(false);
  const [code, setCode] = useState("");
  const [userScore, setUserScore] = useState({
    name: "",
    scoresMine: [],
    scoresMemory: [],
  });

  const handleChange = (event) => {
    if (event.target.name === "username") {
      setUsername(event.target.value);
    } else if (event.target.name === "newPassword") {
        setNewPassword(event.target.value);
      } else if (event.target.name === "verifyPassword") {
        setVerifyPassword(event.target.value);
      }
  };

  const handleClick = (event) => {
    event.preventDefault();
    //verifica del campo vuoto
    if (username === "") {
      alert("Compila tutti i campi");
    }
    Auth.forgotPassword(username)
      .then((data) => {
        console.log(data, "data ");
        setCheckForm(true);
      })
      .catch((err) => console.log(err, "errore"));
  };

  const confirmForgotPass = async () => {
    if (code.length !== 6 || code === "") {
      alert("Il codice da inserire deve essere di almeno 6 caratteri");
      confirmForgotPass();
    }
    if (newPassword === "") {
      alert("Compila tutti i campi");
    }
    //verifica della lunghezza della password minimo 8 caratteri
    if (newPassword.length >= 8) {
      //la verifica del doppio campo della password
      if (newPassword === verifyPassword) {
        try {
          await Auth.forgotPasswordSubmit(
            username.trim(),
            code.trim(),
            newPassword.trim()
          ).then((data) => {
            console.log("dataConferma", data);
            
            if (data === "SUCCESS") {
                navigate(RoutesLogin.authPageLogin);
              };
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
  
  return (
    <>
      {!CheckForm ? (
        <>
          <div className="form">
            <form className="form-login">
              <div className="form-inner">
                <div className=" form-group">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="username"
                    name="username"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-button">
                  <button className="btn btn-primary" onClick={handleClick}>
                    Invia
                  </button>
                </div>
              </div>
            </form>
          </div>
        </>
      ) : (
        <>
          <div className="form">
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
                  <div className="mb-3 form-group">
                    <label className="form-label">
                      Inserisci la nuova Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="password"
                      minLength={8}
                      name="newPassword"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {/**Provare a inserire la doppia conferma dell email */}
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
                  <div className="mb-3  input-button">
                    <button
                      className="btn btn-primary"
                      onClick={confirmForgotPass}
                    >
                      Conferma Codice
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default ForgotPassword;
