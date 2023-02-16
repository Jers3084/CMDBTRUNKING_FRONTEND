import { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import { Buscar } from "./components/Buscar/Buscar";
import { Registrar } from "./components/Registrar/Registrar";
import { Home } from "./components/Home/Home";
import { Logout } from "./components/Logout/Logout";
import { Usuarios } from "./components/Usuarios/Usuarios";
import { Nav } from "./components/Nav/Nav";
import { UserContext } from "./Context/UserContext";
import Login from "./components/Login/Login";
import PerfildeUsuario from "./components/PerfildeUsuario/PerfildeUsuario";
import CambiarPassword from "./components/CambiarPassword/CambiarPassword";

function App() {
  const [userc, setUserc] = useState({
    token: false,
    shopping: [],
    cantidad: 0,
    index: 0,
    tokenUsuario: "",
    idUsuario: "",
  });

  return (
    <div className="App">
      <UserContext.Provider value={{ userc, setUserc }}>
        <BrowserRouter>
          <Nav />
          <div className="cuerpo">
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/registrar">
                <Registrar />
              </Route>
              <Route path="/buscar">
                <Buscar />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/perfildeusuario">
                <PerfildeUsuario />
              </Route>
              <Route path="/cambiarpassword">
                <CambiarPassword />
              </Route>
              <Route path="/logout">
                <Logout />
              </Route>
              <Route path="/usuarios">
                <Usuarios />
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
