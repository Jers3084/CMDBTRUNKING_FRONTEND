import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import styles from "./RegUsuarios.module.css";
import { UserContext } from "../../Context/UserContext";
import { Modal } from "../../components/Modal/Modal";

export const RegUsuarios = () => {
  const { userc } = useContext(UserContext);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [rol, setRol] = useState("usuario");
  const [password, setPassword] = useState("");
  const [estadoModal, setEstadoModal] = useState(false);
  const [encabezadoModal, setEncabezadoModal] = useState("");
  const [tituloModal, setTituloModal] = useState("");
  const [mensajeModal, setMensajeModal] = useState("");

  var tokenRegu = userc.tokenUsuario;
  const ruta = useHistory();

  const handleSubmitr = async (e) => {
    e.preventDefault();

    await enviarRegistro();
    setNombre("");
    setEmail("");
    setUsername("");
    setRol("usuario");
    setPassword("");
  };

  const enviarRegistro = async () => {
    try {
      return fetch("http://localhost:9000/api/usuarios", {
        method: "POST",
        body: JSON.stringify({ nombre, email, username, password, rol }), // data {object}
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          setEncabezadoModal("Succesfull");
          setTituloModal("Registro");
          setMensajeModal(response.message);
          setEstadoModal(true);
        });
    } catch (e) {
      console.log("hubo un error");
      console.log(e);
      setEncabezadoModal("Error");
      setTituloModal("hubo un error");
      setMensajeModal(e.message);
      setEstadoModal(true);
    }
  };

  const salir = () => {
    setNombre("");
    setEmail("");
    setUsername("");
    setRol("");
    setPassword("");
    ruta.push("/");
  };

  return (
    <div className={styles.contenedor}>
      <h2 className={styles.titulo}>Registro</h2>
      <form className={styles.formato} onSubmit={handleSubmitr}>
        <div className={styles.fullentry}>
          <label htmlFor="inputNombre" className={styles.formlabel}>
            Nombre
          </label>
          <input
            type="text"
            className={styles.formcontrol}
            id="inputNombre"
            value={nombre}
            placeholder="Nombre"
            onChange={(e) => {
              setNombre(e.target.value);
            }}
          />
        </div>

        <div className={styles.fullentry}>
          <label htmlFor="inputEmail" className={styles.formlabel}>
            E-mail
          </label>
          <input
            type="email"
            className={styles.formcontrol}
            id="inputEmail"
            value={email}
            placeholder="Correo electronico"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <div className={styles.fullentry}>
          <label htmlFor="inputUsername" className={styles.formlabel}>
            Username
          </label>
          <input
            type="text"
            className={styles.formcontrol}
            id="inputUsername"
            name="Username"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>

        <div className={styles.fullentry}>
          <label htmlFor="inputRol" className={styles.formlabel}>
            Rol
          </label>
          <select
            className={styles.formcontrol}
            id="inputRol"
            name="rol"
            defaultValue="usuario"
            onChange={(e) => {
              setRol(e.target.value);
            }}
          >
            <option value="usuario">Usuario</option>
            <option value="administrador">Administrador</option>
          </select>
        </div>

        <div className={styles.fullentry}>
          <label htmlFor="inputPassword" className={styles.formlabel}>
            Password
          </label>
          <input
            type="password"
            className={styles.formcontrol}
            id="inputPassword"
            aria-describedby="inputGroupPrepend"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <footer>
          <div className={styles.contenBoton}>
            <button className={styles.boton} type="button" onClick={salir}>
              Salir
            </button>

            <button className={styles.boton} type="submit">
              Registrar usuario
            </button>
          </div>
        </footer>
      </form>

      {estadoModal && (
        <Modal
          estado={estadoModal}
          cambiarestado={setEstadoModal}
          encabezado={encabezadoModal}
          titulo={tituloModal}
          mensaje={mensajeModal}
        />
      )}
    </div>
  );
};
export default RegUsuarios;
