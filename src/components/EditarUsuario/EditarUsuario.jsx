import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./EditarUsuario.module.css";
import { UserContext } from "../../Context/UserContext";
import { Modal } from "../../components/Modal/Modal";

export const EditarUsuario = () => {
  const { userc } = useContext(UserContext);
  const [id, setId] = useState(userc.identificador);
  const [nombre, setNombre] = useState(userc.nombre);
  const [email, setEmail] = useState(userc.correo);
  const [username, setUsername] = useState(userc.alias);
  const [rol, setRol] = useState(userc.tipousuario);
  const [password, setPassword] = useState("");
  const [estadoModal, setEstadoModal] = useState(false);
  const [encabezadoModal, setEncabezadoModal] = useState("");
  const [tituloModal, setTituloModal] = useState("");
  const [mensajeModal, setMensajeModal] = useState("");
  const navigate = useNavigate();
  var tokenRegu = userc.tokenUsuario;

  const handleSubmitr = async (e) => {
    e.preventDefault();

    await actualizarRegistro();
  };

  const actualizarRegistro = async () => {
    try {
      return fetch("http://127.0.0.1:9000/api/usuarios//actualizar", {
        method: "POST",
        body: JSON.stringify({ id, nombre, email, rol }), // data {object}
        headers: {
          "Content-Type": "application/json",
          authorization: tokenRegu,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          setId(response.data._id);
          setNombre(response.data.nombre);
          setEmail(response.data.email);
          setUsername(response.data.username);
          setRol(response.data.rol);
          setPassword(response.data.password);
          setEncabezadoModal("Succesfull");
          setTituloModal("Registro Actualizado");
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

  const actualizarPassword = () => {
    navigate("/cambiarpassword");
  };

  const cancel = () => {
    setNombre("");
    setEmail("");
    setUsername("");
    setRol("");
    setPassword("");
    navigate("/mostrarusuarios");
  };

  return (
    <>
      <div className={styles.contenedor}>
        <h2 className={styles.titulo}>Editar Usuario</h2>
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
              readOnly
              type="text"
              className={styles.formcontrol}
              id="inputUsername"
              placeholder="Username"
              required
              value={username}
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
              defaultValue={rol}
              onChange={(e) => {
                setRol(e.target.value);
              }}
            >
              <option value="usuario">Usuario</option>
              <option value="administrador">Administrador</option>
            </select>
          </div>

          <div className={styles.contenBoton}>
            <button className={styles.boton} type="submit">
              Actualizar
            </button>

            <button className={styles.boton} type="button" onClick={cancel}>
              Cancelar
            </button>

            <button
              className={styles.boton}
              type="button"
              onClick={actualizarPassword}
            >
              Cambiar Password
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
