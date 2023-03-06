import { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import { Buscar } from "./components/Buscar/Buscar";
import { RegistrarServ } from "./components/RegistrarServ/RegistrarServ";
import { Home } from "./components/Home/Home";
import { Logout } from "./components/Logout/Logout";
import { RegUsuarios } from "./components/RegUsuarios/RegUsuarios";
import { Navbar } from "./components/Navbar/Navbar";
import { UserContext } from "./Context/UserContext";
import Login from "./components/Login/Login";
import PerfildeUsuario from "./components/PerfildeUsuario/PerfildeUsuario";
import CambiarPassword from "./components/CambiarPassword/CambiarPassword";
import { MostrarUsuarios } from "./components/MostrarUsuarios/MostrarUsuarios";
import { EditarUsuario } from "./components/EditarUsuario/EditarUsuario";
import { Editarserv } from "./components/Editarserv/Editarserv";

function App() {
  const [userc, setUserc] = useState({
    token: false,
    identificador: "",
    nombre: "",
    correo: "",
    alias: "",
    tipousuario: "",
    index: 0,
    tokenUsuario: "",
    idUsuario: "",
    service: {},
  });

  return (
    <div className="App">
      <UserContext.Provider value={{ userc, setUserc }}>
        <BrowserRouter>
          <Navbar />
          <div className="cuerpo">
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/registrarserv">
                <RegistrarServ />
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
              <Route path="/regusuarios">
                <RegUsuarios />
              </Route>
              <Route path="/mostrarusuarios">
                <MostrarUsuarios />
              </Route>
              <Route path="/editarusuario">
                <EditarUsuario />
              </Route>
              <Route path="/editarserv">
                <Editarserv />
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
