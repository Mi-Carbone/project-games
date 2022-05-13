import React, {useEffect, useState} from "react";
import "./App.css";

import Contacts from "./Pages/Contacts";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Navbar from "./components/Navbar";
import Memory from "./navUser/Memory/Memory";
import ChoiceGame from "./navUser/ChoiceGame";
import AuthPage from "./Pages/AuthPage";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {RoutesLogin} from "./Routes/index";
import Minefield from "./navUser/Minefield/Minefield";
import RegistrationForm from "./components/RegistrationForm";
import ChoiceRegisterLogin from "./components/ChoiceRegisterLogin";
import AuthPageRegistration from "./Pages/AuthPageRegistration";


function App() {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        let user = localStorage.getItem("user");
        user && JSON.parse(user) ? setAuth(true) : setAuth(false);
    });
    return (
        <>
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route path={RoutesLogin.home} element={<Home/>}/>
                    <Route path={RoutesLogin.about} element={<About/>}/>
                    
                    {/* questa verifica può essere effettuata soltanto con Route non è possibile aggiungere <Routes></Routes> come tag al suo interno pke non lo legge */}
                    {!auth && (
                        <>
                        <Route
                            path={RoutesLogin.authPageLogin}
                            element={<AuthPage authenticate={() => setAuth(false)}/>}
                        />
                        <Route path={RoutesLogin.registrationForm} element={<AuthPageRegistration/>}/>
                        <Route path={RoutesLogin.authPage} element={<ChoiceRegisterLogin/>}/>
                        </>
                        
                    )}
                    {auth && (
                        <>
                            <Route
                                path={RoutesLogin.choice}
                                element={<ChoiceGame authenticate={() => setAuth(true)}/>}
                            />
                            
                            <Route path={RoutesLogin.memory} element={<Memory/>}/>
                            <Route path={RoutesLogin.minefield} element={<Minefield/>}/>
                            <Route path={RoutesLogin.contacts} element={<Contacts/>}/>
                        </>
                    )}
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;

{
    /* <Route path='/login' element={<LoginPage />} />
            <Route path='/after-login' element={<AfterLoginPage />} />
            <Route path='/login' element={<FormLogin />} /> */
}

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
