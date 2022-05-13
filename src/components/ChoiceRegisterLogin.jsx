import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RoutesLogin } from "../Routes/index";

const ChoiceRegisterLogin = () => {
  return (
    <>
      <div className="form">
        <div className="form-login">
          <div className="form-inner">
            <h1>Benvenuto, sei già in possesso di un Account?</h1>
            <br />
            <br />
            <div >
              <Link className="links" to={RoutesLogin.authPageLogin}>
                {/* <button>Login</button> */}
                <input className="input-button" type="submit" value="LOGIN" />
              </Link>
              <Link className="links" to={RoutesLogin.registrationForm}>
                {/* <button>Registrazione</button> */}
                <input
                  className="input-button"
                  type="submit"
                  value="REGISTRAZIONE"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChoiceRegisterLogin;
