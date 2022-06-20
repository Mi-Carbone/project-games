import * as React from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
import { fakeAuthProvider } from "./auth";

export default function App() {
  return (
    <AuthProvider>
      <h1>Auth Example</h1>

      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<PublicPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/protected" element={<RequireAuth><ProtectedPage /></RequireAuth>}/>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

function Layout() {
  return (
    <div>
      <AuthStatus />

      <ul>
        <li>
          <Link to="/">Public Page</Link>
        </li>
        <li>
          <Link to="/protected">Protected Page</Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
}

interface AuthContextType {
  user: any;
  signin: (user: string, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = React.useState<any>(null);

  let signin = (newUser: string, callback: VoidFunction) => {
    return fakeAuthProvider.signin(() => {
      setUser(newUser);
      callback();
    });
  };

  let signout = (callback: VoidFunction) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return React.useContext(AuthContext);
}

function AuthStatus() {
  let auth = useAuth();
  let navigate = useNavigate();

  if (!auth.user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <p>
      Welcome {auth.user}!{" "}
      <button
        onClick={() => {
          auth.signout(() => navigate("/"));
        }}
      >
        Sign out
      </button>
    </p>
  );
}

function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function LoginPage() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  let from = location.state?.from?.pathname || "/";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let username = formData.get("username") as string;

    auth.signin(username, () => {
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.  This means that
      // when they get to the protected page and click the back button, they
      // won't end up back on the login page, which is also really nice for the
      // user experience.
      navigate(from, { replace: true });
    });
  }

  return (
    <div>
      <p>You must log in to view the page at {from}</p>

      <form onSubmit={handleSubmit}>
        <label>
          Username: <input name="username" type="text" />
        </label>{" "}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

function PublicPage() {
  return <h3>Public</h3>;
}

function ProtectedPage() {
  return <h3>Protected</h3>;
}











  // async function onChange(e) {
  //   const file = e.target.files[0];
  //   try {
  //     const img = await Storage.put(file.name, file, {
  //       contentType: "image/png", // contentType is optional
  //     });
      
  //     console.log("passato", img);

  //     const id = localStorage.getItem("userId");
  //     console.log(img.key,'boh');
  //  return API.graphql({
  //     query: updateProfile,
  //     variables: {
  //       image: img.key,
  //       userId: id,
  //     },
  //     authMode: "AMAZON_COGNITO_USER_POOLS",
      
  //   });
    
  //   } catch (error) {
  //     console.log("Error uploading file: ", error);
  //   }
  // }

  function UploadImage() {
    const id = localStorage.getItem("userId");
    return API.graphql({
      query: updateProfile,
      variables: {
        image: image,
        userId: id,
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  }

  const handleUploadImage = () => {
    console.log(image,'funzione');
    image
      .then((data) => {
        console.log("data img", data);
      })
      .catch((err) => {
        console.log(err, "errore");
      });
  };

























  //useEffet chiamata ListMessage per tutti i messaggi salvati
  useEffect(() => {
    //const token = localStorage.getItem("token");
    API.graphql({
      query: listMessages,
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })
      .then((data) => {
        //console.log(data.data.listMessages.items, "data listMessages");
        setListSubMessage(data.data.listMessages.items);
        //console.log(listSubMessage, "DOPPIO ARRAY");
        //meChat.push(listSubMessage[0]);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  }, []);


  listSubMessage.sort(function (a, b) {
    var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
    return dateB - dateA
  });
  
  //console.log(array) //array is now sorted by date
  console.log(listSubMessage, "ARRAY dopo");


  //funzione che richiama la mutation createMessage
  function newCreateMessage() {
    return API.graphql({
      query: newMessage,
      variables: {
        message: message,
      },
    });
  }

  // funzione input
  const handleChange = (event) => {
    event.preventDefault();
    if (event.target.name === "chat") {
      setMessage(event.target.value);
    }
  };

  const handleClick = () => {
    if (message === "") {
      return;
    } else {
      newCreateMessage()
        .then((data) => {
          console.log(data, "data ");
          listSubMessage.push(data);

          setMessage("");

          //window.location.reload();
        })
        .catch((err) => {
          console.log(err, "err");
        });
    }
  };

  //funzione che richiama la subscription
  API.graphql(
    graphqlOperation(onCreateMessage, {
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })
  ).subscribe({
    next: (rest) => {
      console.log(rest.value.data.onCreateMessage, "data sub");
      setListCreateChat(rest.value.data.onCreateMessage);
      listSubMessage.push(listCreateChat);
      // const res = rest.value.data.onCreateMessage;
      // setMeChat(res);
      // const arrMesage = [];
      // arrMesage.push(res);
      // setListSubMessage(arrMesage);
      // for (let index = 0; index < arrMesage.length; index++) {
      //   const res = [];
      //   const element = arrMesage[index];
      //   res.push({
      //     ...element,
      //     userFirst: userChatFirst,
      //     userSecond: userChatSecond,
      //   });
      //   console.log(res[0], "ELEMENT");
      //   setUserSubMsg(res[0].message);
      //   setUserSubFirst(res[0].userFirst);
      //   setUserSubSecond(res[0].userSecond);
      //   setUserSubId(res[0].id);
      //   setUserSubDate(res[0].updatedAt);
      //   setUserSubOwner(res[0].owner);
      //   setMeChat(res);
      // }
    },
  });
  // console.log(chatMessages, "chatMessages");
  // useEffect(() => {
  //   setAccess(true)
  //   if (access === true) {
  //     newRecord();
  //   }
  // }, [meChat]);
  // //localStorage.setItem("userChat", JSON.stringify(meChat));
  // function newRecord() {
  //   var existing = localStorage.getItem("sidebarUsername");
  //   existing = existing ? JSON.parse(existing) : {};
  //   console.log(existing, "existing");
  //   //controllo Array
  //   if (!existing) {
  //     existing.chat = [];
  //     console.log(existing.chat, "existing.chat");
  //   }
  //   //push elementi
  //   existing.chat.push({
  //     id: userSubId,
  //     message: userSubMsg,
  //     owner: userSubOwner,
  //     updatedAt: userSubDate,
  //     userFirst: userSubFirst,
  //     userSecond: userSubSecond,
  //   });
  //   localStorage.setItem("sidebarUsername", JSON.stringify(existing));
  // }
  // const handleClickFirst = () => {
  //   setUserChatSecond(false);
  //   setUserChatFirst(true);
  // };

  // const handleClickSecond = () => {
  //   setUserChatFirst(false);
  //   setUserChatSecond(true);
  // };
  