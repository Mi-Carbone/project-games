import React, {useEffect, useState} from "react";
import "./App.css";

import Contacts from "./Pages/Contacts";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Navbar from "./components/Navbar";
import Memory from "./navUser/Memory/Memory";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {RoutesLogin} from "./Routes/index";
import Minefield from "./navUser/minefield/minefield";
import ChoiceGame from "./navUser/ChoiceGame";
import AuthPage from "./Pages/AuthPage";
import Test from "./Pages/Test";
import TestSetStateCallBack from "./Pages/TestSetStateCallBack";

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
                    <Route path={RoutesLogin.contacts} element={<Contacts/>}/>
                    <Route path={RoutesLogin.test} element={<Test/>}/>
                    <Route path={RoutesLogin.testSetStateCallBack} element={<TestSetStateCallBack/>}/>

                    {/* questa verifica può essere effettuata soltanto con Route non è possibile aggiungere <Routes></Routes> come tag al suo interno pke non lo legge */}
                    {!auth && (
                        <Route
                            path={RoutesLogin.authPage}
                            element={<AuthPage authenticate={() => setAuth(false)}/>}
                        />
                    )}
                    {auth && (
                        <>
                            <Route
                                path={RoutesLogin.choice}
                                element={<ChoiceGame authenticate={() => setAuth(true)}/>}
                            />
                            <Route path={RoutesLogin.memory} element={<Memory/>}/>
                            <Route path={RoutesLogin.minefield} element={<Minefield/>}/>
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
