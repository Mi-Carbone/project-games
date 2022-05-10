import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RoutesLogin } from "../Routes/index";
//import RoutesLogin from "./Routes/login";

function Navbar() {
  const [userLogged, setUserLogget] = useState(null);

  useEffect(() => {
    let user = localStorage.getItem("user");
    user && JSON.parse(user) ? setUserLogget(true) : setUserLogget(false);
  });

  return (
    <>
      <div className="">
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
                <li>Login</li>
              </Link>
            )}

            <Link className="links" to={RoutesLogin.about}>
              <li>About</li>
            </Link>
            <Link className="links" to={RoutesLogin.contacts}>
              <li>Contacts</li>
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;