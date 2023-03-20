import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/registrarserv" element={<RegistrarServ />} />
              <Route path="/buscar" element={<Buscar />} />
              <Route path="/login" element={<Login />} />
              <Route path="/perfildeusuario" element={<PerfildeUsuario />} />
              <Route path="/cambiarpassword" element={<CambiarPassword />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/regusuarios" element={<RegUsuarios />} />
              <Route path="/mostrarusuarios" element={<MostrarUsuarios />} />
              <Route path="/editarusuario" element={<EditarUsuario />} />
              <Route path="/editarserv" element={<Editarserv />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
