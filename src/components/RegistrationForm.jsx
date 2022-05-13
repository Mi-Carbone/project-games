


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
          {/* inserimenro ERRORE nella compilazione del form */}
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
