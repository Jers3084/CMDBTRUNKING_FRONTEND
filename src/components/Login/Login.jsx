import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import styles from "./Login.module.css";
import { UserContext } from "../../Context/UserContext";
import { Modal } from "../../components/Modal/Modal";

const Login = (props) => {
  const { userc, setUserc } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [estadoModal, setEstadoModal] = useState(false);
  const [encabezadoModal, setEncabezadoModal] = useState("");
  const [tituloModal, setTituloModal] = useState("");
  const [mensajeModal, setMensajeModal] = useState("");

  const handleSubmitl = async (e) => {
    e.preventDefault();
    await enviarLogin();
    setUsername("");
    setPassword("");
  };

  const enviarLogin = async () => {
    try {
      await fetch("http://localhost:9000/api/usuarios/login", {
        method: "POST",
        body: JSON.stringify({ username, password }), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.success) {
            const tokenU = response.data.token;
            const cUsuario = response.data.user.username;
            const nombreu = response.data.user.nombre;
            const correou = response.data.user.email;
            const rolu = response.data.user.rol;
            userc.tokenUsuario = tokenU;
            sessionStorage.setItem("cuentaUsuario", cUsuario);
            sessionStorage.setItem("nombreUsuario", nombreu);
            sessionStorage.setItem("correoUsuario", correou);
            sessionStorage.setItem("rolUsuario", rolu);
            userc.idUsuario = response.data.user._id;
            userc.token = true;
            setUserc({ ...userc });
            setUsername("");
            setPassword("");
            props.history.push("/");
          } else {
            setEncabezadoModal("Error");
            setTituloModal("Login");
            setMensajeModal("usuario o password erroneos");
            setEstadoModal(true);
          }
        });
    } catch (e) {
      console.log("hubo un error");
      console.log(e);
      setEncabezadoModal("Error");
      setTituloModal("Error de autenticacion");
      setMensajeModal(e.message);
      setEstadoModal(true);
    }
  };

  return (
    <>
      <div className={styles.contenedor}>
        <h2 className={styles.titulo}>Iniciar Sesión</h2>
        <form className={styles.formato} onSubmit={handleSubmitl}>
          <div className={styles.fullentry}>
            <label htmlFor="userN" className={styles.formlabel}>
              Nombre de Usuario:
            </label>
            <input
              type="text"
              className={styles.formcontrol}
              id="userN"
              value={username}
              placeholder="Username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className={styles.fullentry}>
            <label htmlFor="inputPassword" className={styles.formlabel}>
              Password
            </label>
            <input
              type="password"
              className={styles.formcontrol}
              id="inputPassword"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className={styles.contenBoton}>
            <button type="submit" className={styles.boton}>
              Iniciar Sesion
            </button>
          </div>
        </form>
      </div>
      {estadoModal && (
        <Modal
          estado={estadoModal}
          cambiarestado={setEstadoModal}
          encabezado={encabezadoModal}
          titulo={tituloModal}
          mensaje={mensajeModal}
        />
      )}
    </>
  );
};

export default withRouter(Login);
