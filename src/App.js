import "./App.css";
import Admin from "./Components/Admin/Admin";

import { useContext } from "react";
import AuthContext from "./stores/auth-context";
import Login from "./Components/Login/Login";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <div className="App">
      {/* 
      Conditional Rendering
      - if the user is not logged in : show login page
      - if the user is logged in : show Admin page
     */}
      {!authCtx.isLoggedIn && <Login />}
      {authCtx.isLoggedIn && <Admin />}
    </div>
  );
}

export default App;
