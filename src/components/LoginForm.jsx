import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API,Auth } from "aws-amplify";
import { RoutesLogin } from "../Routes";
import { login } from "../graphql/queries";




const LoginUser = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [userScore, setUserScore] = useState({
    name: "",
    scoresMine: [],
    scoresMemory: [],
  });

 
  function Login() {
    return API.graphql({
      query: login,
      authMode: 'AMAZON_COGNITO_USER_POOLS',
      variables: {
        username: username,
        password: password
      },
      
    });
  }
  const handleChange = (event) => {
    if (event.target.name === "username") {
      setUsername(event.target.value);
    } else {
      setPassword(event.target.value);
    }
  };
  const handleClick = async (event) => {
    if (username === "" || password === "") {
      alert("Compile all the fields");
    } else {
      event.preventDefault();
      Auth.signIn(username.trim().toLowerCase(), password.trim())
        .then((data) => {
          setUserScore({
            name: data.username.toLowerCase(),
            score: "",
          });
          userScore.name = data.username;
          Login()
          .then((res) => {
            console.log(res.data.login)
            localStorage.setItem('userId', res.data.login.id);
          })
          .catch((error) => {
            alert('Error while logging');
            console.log(error);
          })
          localStorage.setItem("sidebarUsername", JSON.stringify(userScore));
          setToken(data.signInUserSession.accessToken.jwtToken);
        })
        .catch((err) => {
          if (err) {
            console.log(err);
            alert("Username o password not correct");
          }
        });
    }
  };
  useEffect(() => {
    if (token !== "" && token !== "error") {
      localStorage.setItem("token", token);
      navigate(RoutesLogin.choice);
      // window.location.reload()
    }
  }, [token,navigate]);

  const handleClickForgotPass = () => {
    navigate(RoutesLogin.forgotPass);
  }
  return (
    <div>
      <form className="form-login">
        <div className="form-inner">
          <div className=" form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="username"
              name="username"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3 form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="password"
              name="password"
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-button">
            <button className="btn btn-primary" onClick={handleClick}>
              Accedi
            </button>
            <button className="btn btn-primary ms-5"
            onClick={handleClickForgotPass}>Password dimenticata</button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default LoginUser;


// TUTTO QUESTO SENZA IL COLLEGAMENTO CON IL BACK DI LUCA
// import React, { useState } from "react";
// import { Auth } from "aws-amplify";

// function LoginForm({ error }) {
//   // const [details, setDetails] = useState({
//   //   name: '',
//   //   email: '',
//   //   password:''

//   // });

//   const submitHandler = (e) => {
//     e.preventDefault();
//     //qui richiamiamo la funzione dove al suo interno verranno passati i dettagli degli input
//     //per passare i dati bisogna aggiungere la funzione onChange a ogni input inserendo anche il cambiamento dello setState in base al suo value
//     handleClick(details);
//   };

//   const handleClick = async (event) => {
//     if (username === "" || password === "") {
//       alert("Compile all the fields");
//     } else {
//       event.preventDefault();
//       await Auth.signIn(username.trim().toLowerCase(), password.trim())
//         .then((data) => {
//           localStorage.setItem("sidebarUsername", data.username.toLowerCase());
//           setToken(data.signInUserSession.accessToken.jwtToken);
//         })
//         .catch((error) => {
//           if (error) {
//             alert("Username o password not correct");
//           }
//         });
//     }
//   };
//   return (
//     <>
//       <form onSubmit={submitHandler} className="form-login">
//         <div className="form-inner">
//           <h2>Login</h2>
//           {/* inserimenro ERRORE nella compilazione del form */}
//           {error !== "" ? <div className="error">{error}</div> : ""}
//           <div className="form-group">
//             <label htmlFor="name">Name:</label>
//             <input
//               className="input-button"
//               type="text"
//               name="name"
//               id="name"
//               onChange={(e) => setDetails({ ...details, name: e.target.value })}
//               value={details.name}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="email">Email:</label>
//             <input
//               className="input-button"
//               type="email"
//               name="email"
//               id="email"
//               onChange={(e) =>
//                 setDetails({ ...details, email: e.target.value })
//               }
//               value={details.email}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="password">Password:</label>
//             <input
//               className="input-button"
//               type="password"
//               name="password"
//               id="password"
//               onChange={(e) =>
//                 setDetails({ ...details, password: e.target.value })
//               }
//               value={details.password}
//             />
//           </div>
//           <input className="input-button" type="submit" value="LOGIN" />
//         </div>
//       </form>
//     </>
//   );
// }

// export default LoginForm;
