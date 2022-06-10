import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RoutesLogin } from "../Routes/index";

const logo = "/logo.png";
function Navbar() {
  const [userLogged, setUserLogget] = useState(null);
  const location = useLocation()

  useEffect(() => {
    let user = localStorage.getItem("sidebarUsername");
    user && JSON.parse(user) ? setUserLogget(true) : setUserLogget(false);
  },[location]);

  const navigate = useNavigate();
  const handleLogout = () => {
    navigate(RoutesLogin.authPage);
    localStorage.clear();
    Auth.signOut();
    window.location.reload();

  };

  return (
    <>
      <div className="navigation">
        <span className="logo"/>
        <ul className="navigation-links">
          <Link className="links" to={RoutesLogin.home}>
            <li>Home</li>
          </Link>
          {!userLogged == "" ? (
            <>
            <Link className="links" to={RoutesLogin.choices}>
              <li>Games</li>
            </Link>
            <Link className="links" to={RoutesLogin.profile}>
              <li>Profilo personale</li>
            </Link>
            </>
          ) : (
            <Link className="links" to={RoutesLogin.authPage}>
              <li>Accedi</li>
            </Link>
          )}
          <Link className="links" to={RoutesLogin.scores}>
            <li>Score</li>
          </Link>
          <span 
          className="btn-logout"
          onClick={handleLogout}>Logout</span>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
