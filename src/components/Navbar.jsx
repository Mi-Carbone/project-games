import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { RoutesLogin } from "../Routes/index";
//import RoutesLogin from "./Routes/login";

function Navbar() {
  const [userLogged, setUserLogget] = useState(null);
  const location = useLocation()

  useEffect(() => {
    let user = localStorage.getItem("sidebarUsername");
    user && JSON.parse(user) ? setUserLogget(true) : setUserLogget(false);
  },[location]);

  return (
    <>
      <div className="navigation">
        <h3>Logo</h3>
        <ul className="navigation-links">
          <Link className="links" to={RoutesLogin.home}>
            <li>Home</li>
          </Link>
          {!userLogged == "" ? (
            <Link className="links" to={RoutesLogin.choice}>
              <li>Profilo personale</li>
            </Link>
          ) : (
            <Link className="links" to={RoutesLogin.authPage}>
              <li>Accedi</li>
            </Link>
          )}

          <Link className="links" to={RoutesLogin.about}>
            <li>About</li>
          </Link>
          <Link className="links" to={RoutesLogin.games}>
            <li>Games</li>
          </Link>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
