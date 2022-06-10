import React from "react";
import { Link } from "react-router-dom";
import { RoutesLogin } from "../Routes/index";

function ChoiceGames() {
  return (
    <>
      <div className="welcome">
        <div className="body-choice">
          <h3>SELEZIONA IL GIOCO</h3>
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
    </>
  );
}

export default ChoiceGames;
