import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import "./App.css";

import Games from "./Pages/Games";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Navbar from "./components/Navbar";
import Memory from "./navUser/Memory/Memory";
import ChoiceGame from "./navUser/ChoiceGame";
import AuthPage from "./Pages/AuthPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RoutesLogin } from "./Routes/index";
import Minefield from "./navUser/Minefield/Minefield";
import ChoiceRegisterLogin from "./components/ChoiceRegisterLogin";
import AuthPageRegistration from "./Pages/AuthPageRegistration";
import ForgotPassword from "./components/ForgotPassword";
import ChangeImage from "./components/ChangeImage";

function App() {
  const RequireAuth = () => {
    if (localStorage.getItem("token")) {
      return <Outlet />;
    } else {
      return <Navigate to={RoutesLogin.authPage} />;
    }
  };

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<RequireAuth />}>
            <Route path={RoutesLogin.home} element={<Home />} />
            <Route path={RoutesLogin.about} element={<About />} />
            <Route path={RoutesLogin.games} element={<Games />} />
            <Route path={RoutesLogin.choice} element={<ChoiceGame />} />
            <Route path={RoutesLogin.memory} element={<Memory />} />
            <Route path={RoutesLogin.minefield} element={<Minefield />} />
            <Route path={RoutesLogin.changeImage} element={<ChangeImage />} />
          </Route>
          <Route path={RoutesLogin.authPageLogin} element={<AuthPage />} />
          <Route path={RoutesLogin.forgotPass} element={<ForgotPassword />} />
          <Route
            path={RoutesLogin.registrationForm}
            element={<AuthPageRegistration />}
          />
          <Route
            path={RoutesLogin.authPage}
            element={<ChoiceRegisterLogin />}
          />
        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;

/* <Route path='/login' element={<LoginPage />} />
            <Route path='/after-login' element={<AfterLoginPage />} />
            <Route path='/login' element={<FormLogin />} /> */

// function getSavedValue(userLogged) {
//   const savedValue = localStorage.setUserLogged(
//     "userLogged",
//     JSON.stringify(userLogged)
//   );
//   if (savedValue) {
//     console.log('salvato', save);
//     return savedValue;
//   }
// }

// localStorage()
// let userLogged = sessionStorage.getItem('userLogged')
// console.log('** userLogged ***', userLogged);
// if (userLogged !== true) {
//   return <Form to={RoutesLogin.login} replace />;
// }

/**
 * 
 * import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import "./App.css";

import Contacts from "./Pages/Contacts";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Navbar from "./components/Navbar";
import Memory from "./navUser/Memory/Memory";
import ChoiceGame from "./navUser/ChoiceGame";
import AuthPage from "./Pages/AuthPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RoutesLogin } from "./Routes/index";
import Minefield from "./navUser/Minefield/Minefield";
import RegistrationForm from "./components/RegistrationForm";
import ChoiceRegisterLogin from "./components/ChoiceRegisterLogin";
import AuthPageRegistration from "./Pages/AuthPageRegistration";
import { Auth } from "aws-amplify";
import LoginUser from "./components/LoginForm";

function App() {
  const RequireAuth = () => {
    if (localStorage.getItem('token')) {
      return <Outlet />;
    } else {
      return <Navigate to={RoutesLogin.authPage} />;
    }
  };

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<RequireAuth/>}>
            <Route path={RoutesLogin.home} element={<Home />} />
            <Route path={RoutesLogin.about} element={<About />} />

            {/* questa verifica può essere effettuata soltanto con Route non è possibile aggiungere <Routes></Routes> come tag al suo interno pke non lo legge *

            <Route path={RoutesLogin.contacts} element={<Contacts />} />

            <Route path={RoutesLogin.choice} element={<ChoiceGame />} />

            <Route path={RoutesLogin.memory} element={<Memory />} />
            <Route path={RoutesLogin.minefield} element={<Minefield />} />
            
          </Route>
          <Route path={RoutesLogin.authPageLogin} element={<AuthPage />} />
            <Route
              path={RoutesLogin.registrationForm}
              element={<AuthPageRegistration />}
            />
            <Route
              path={RoutesLogin.authPage}
              element={<ChoiceRegisterLogin />}
            />
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

 */
