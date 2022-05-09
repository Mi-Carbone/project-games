import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { RoutesLogin } from "../Routes/index";

function ChoiceGame() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate(RoutesLogin.authPage);
    localStorage.clear();
    window.location.reload();
  };

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
                <div>
                  Il tuo punteggio
                </div>
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

        
        <button onClick={handleLogout}>
          <h3>Logout</h3>
        </button>
      </div>
    </>
  );
}

export default ChoiceGame;
