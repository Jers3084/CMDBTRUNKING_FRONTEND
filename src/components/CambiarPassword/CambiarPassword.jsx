import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import styles from "./CambiarPassword.module.css";
import { UserContext } from "../../Context/UserContext";

const CambiarPassword = (props) => {
  const { userc } = useContext(UserContext);
  var id = userc.identificador;
  var nombreU = sessionStorage.getItem("nombreUsuario");
  var nombre = userc.nombre;
  var username = userc.alias;
  var token = userc.tokenUsuario;
  const [password, setPassword] = useState("");
  const [vpassword, setVpassword] = useState("");

  const handleSubmitr = async (e) => {
    e.preventDefault();
    if (password === vpassword) {
      await updatePassword();
      alert("Password Actualizado");
      props.history.push("/");
    } else {
      alert("Los Passwords introducidos no son iguales");
    }
  };

  const updatePassword = async () => {
    try {
      return fetch("http://localhost:9000/api/usuarios/actpassword", {
        method: "POST",
        body: JSON.stringify({ id, password }), // data {object}
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
        });
    } catch (e) {
      console.log("hubo un error");
      console.log(e);
    }
  };
  const saliraperfil = () => {
    props.history.push("/perfildeusuario");
  };

  return (
    <>
      <div className={styles.contenedor}>
        <h2 className={styles.titulo}>Cambiar Password</h2>
        <form className={styles.formato} onSubmit={handleSubmitr}>
          <div className={styles.fullentry}>
            <label htmlFor="inputNombre" className={styles.formlabel}>
              Nombre
            </label>
            <input
              readOnly
              type="text"
              className={styles.formcontrol}
              id="inputNombre"
              value={nombre}
            />
          </div>

          <div className={styles.fullentry}>
            <label htmlFor="inputUsername" className={styles.formlabel}>
              Nombre
            </label>
            <input
              readOnly
              type="text"
              className={styles.formcontrol}
              id="inputUsername"
              value={username}
            />
          </div>

          <div className={styles.fullentry}>
            <label htmlFor="inputPassword1" className={styles.formlabel}>
              Introducir Nuevo Password
            </label>
            <input
              type="password"
              className={styles.formcontrol}
              id="inputPassword1"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className={styles.fullentry}>
            <label htmlFor="inputPasswordv" className={styles.formlabel}>
              Repetir Nuevo Password
            </label>
            <input
              type="password"
              className={styles.formcontrol}
              id="inputPasswordv"
              placeholder="Password"
              required
              value={vpassword}
              onChange={(e) => {
                setVpassword(e.target.value);
              }}
            />
          </div>

          <div className={styles.contenBoton}>
            <button
              className={styles.boton}
              type="button"
              onClick={saliraperfil}
            >
              Cancelar
            </button>
            <button className={styles.boton} type="submit">
              Actualizar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default withRouter(CambiarPassword);
