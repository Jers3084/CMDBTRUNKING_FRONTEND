import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PerfildeUsuario.module.css";
import { UserContext } from "../../Context/UserContext";
import { Modal } from "../../components/Modal/Modal";
import imagen from "./img/declinereject.svg";

function PerfildeUsuario(props) {
  const navigate = useNavigate();
  const { userc } = useContext(UserContext);
  var id = userc.idUsuario;
  userc.identificador = id;
  var nombreU = sessionStorage.getItem("nombreUsuario");
  userc.nombre = nombreU;
  var usernameU = sessionStorage.getItem("cuentaUsuario");
  userc.alias = usernameU;
  var correoU = sessionStorage.getItem("correoUsuario");
  var rolU = sessionStorage.getItem("rolUsuario");
  var token = userc.tokenUsuario;
  const [editar, setEditar] = useState(false);
  const [nombre, setNombre] = useState(nombreU);
  const [email, setEmail] = useState(correoU);
  const [username, setUsername] = useState(usernameU);
  const [rol, setRol] = useState(rolU);
  const [estadoModal, setEstadoModal] = useState(false);
  const [encabezadoModal, setEncabezadoModal] = useState("");
  const [tituloModal, setTituloModal] = useState("");
  const [mensajeModal, setMensajeModal] = useState("");
  const baseURL = process.env.REACT_APP_API_URL;

  const handleSubmitr = async (e) => {
    e.preventDefault();
    await updateRegistro();
    setNombre(nombreU);
    setEmail(correoU);
    setRol(rolU);
    setEditar(false);
  };

  const updateRegistro = async () => {
    try {
      return fetch(baseURL + "/usuarios/actualizar", {
        method: "POST",
        body: JSON.stringify({ id, nombre, email }),
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          sessionStorage.setItem("nombreUsuario", response.data.nombre);
          sessionStorage.setItem("correoUsuario", response.data.email);
          setNombre(response.data.nombre);
          setEmail(response.data.email);
          setEncabezadoModal("Succesfull");
          setTituloModal("Registro");
          setMensajeModal(response.message);
          setEstadoModal(true);
        });
    } catch (e) {
      console.log("hubo un error");
      console.log(e);
      setEncabezadoModal("Error");
      setTituloModal(e.message);
      setMensajeModal(e);
      setEstadoModal(true);
    }
  };

  const editarUsuario = () => {
    return setEditar(true);
  };

  const cancel = () => {
    return setEditar(false);
  };

  const actualizarPassword = () => {
    navigate("/cambiarpassword");
  };

  const salir = () => {
    navigate("/");
  };

  return (
    <>
      {!editar ? (
        <div className={styles.contenedor}>
          <h2 className={styles.titulo}>Perfil del Usuario</h2>
          <form className={styles.formato}>
            <button
              className={styles.cerrarModal}
              onClick={() => navigate("/")}
            >
              <img src={imagen} alt="" className={styles.imagen} />
            </button>

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
              <label htmlFor="inputEmail" className={styles.formlabel}>
                E-mail
              </label>
              <input
                readOnly
                type="email"
                className={styles.formcontrol}
                id="inputEmail"
                value={email}
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
                value={username}
              />
            </div>

            <div className={styles.fullentry}>
              <label htmlFor="inputUseRol" className={styles.formlabel}>
                Rol
              </label>
              <input
                readOnly
                type="text"
                className={styles.formcontrol}
                id="inputUseRol"
                value={rol}
              />
            </div>

            <div className={styles.contenBoton}>
              <button className={styles.boton} type="button" onClick={salir}>
                Salir
              </button>
              <button
                className={styles.boton}
                type="button"
                onClick={editarUsuario}
              >
                Editar
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className={styles.contenedor}>
          <h2 className={styles.titulo}>Editar Perfil del Usuario</h2>
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
              <label htmlFor="inputUseRol" className={styles.formlabel}>
                Rol
              </label>
              <input
                readOnly
                type="text"
                className={styles.formcontrol}
                id="inputUseRol"
                value={rol}
              />
            </div>
            <div className={styles.contenBoton}>
              <button className={styles.boton} type="button" onClick={cancel}>
                Cancelar
              </button>

              <button className={styles.boton} type="submit">
                Actualizar
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
      )}

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
}

export default PerfildeUsuario;
