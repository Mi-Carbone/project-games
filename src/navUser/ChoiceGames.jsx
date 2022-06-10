import React from "react";
import { Link } from "react-router-dom";
import { RoutesLogin } from "../Routes/index";

function ChoiceGames() {
  return (
    <>
        <div className="form">
    <div className="form-login">
    <div className="form-inner">
          <h3>SELEZIONA IL GIOCO</h3>
          <div className="welcome">
          <div className="choice-button">
            <ul>
              <li>
                <button>
                  <Link className="links" to={RoutesLogin.memory}>
                    Memory
                  </Link>
                </button>
              </li>
              <li>
                <button>
                  <Link className="links" to={RoutesLogin.minefield}>
                    Campo Minato
                  </Link>
                </button>
              </li>
            </ul>
          </div>

          </div>
        </div>
      </div>
    </div>
    
    </>
  );
}

export default ChoiceGames;
