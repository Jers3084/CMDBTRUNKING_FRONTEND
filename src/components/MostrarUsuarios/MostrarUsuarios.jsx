import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import styles from "./MostrarUsuarios.module.css";
import { UserContext } from "../../Context/UserContext";
import { Modal } from "../../components/Modal/Modal";

export const MostrarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const { userc } = useContext(UserContext);
  const tokendusuario = userc.tokenUsuario;
  const [estadoModal, setEstadoModal] = useState(false);
  const [encabezadoModal, setEncabezadoModal] = useState("");
  const [tituloModal, setTituloModal] = useState("");
  const [mensajeModal, setMensajeModal] = useState("");
  const ruta = useHistory();

  useEffect(() => {
    obtenerUsuarios();
  }, [usuarios]);

  const obtenerUsuarios = async () => {
    try {
      await fetch("http://localhost:9000/api/usuarios", {
        headers: { authorization: tokendusuario },
      })
        .then((resp) => resp.json())
        .then((value) => {
          if (value.success) {
            setUsuarios(value.data);
          }
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

  const borrar = async (item) => {
    const idobjeto = { _id: item._id };
    try {
      await fetch("http://localhost:9000/api/usuarios/borrar", {
        method: "POST",
        body: JSON.stringify(idobjeto), // data {object}
        headers: {
          "Content-type": "application/json",
          authorization: tokendusuario,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          setEncabezadoModal("Succesfull");
          setTituloModal("Registro Borrado");
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

  const actualizar = (reg) => {
    userc.identificador = reg._id;
    userc.nombre = reg.nombre;
    userc.correo = reg.email;
    userc.alias = reg.username;
    userc.tipousuario = reg.rol;
    ruta.push("/editarusuario");
  };

  return (
    <>
      <div className={styles.contenedor}>
        <h2 className={styles.titulo}>Lista de Usuarios</h2>
        <table className={styles.tabla}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Username</th>
              <th>E-mail</th>
              <th>Rol</th>
              <th>Eliminar</th>
              <th>Actualizar</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario, index) => {
              const { id, nombre, email, username, rol } = usuario; //destructuring
              return (
                <tr key={id} className={styles.linetable}>
                  <td>{nombre}</td>
                  <td>{username}</td>
                  <td>{email}</td>
                  <td>{rol}</td>
                  <td>
                    <button
                      type="button"
                      className={styles.boton}
                      onClick={() => borrar(usuario)}
                    >
                      Eliminar
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className={styles.boton}
                      onClick={() => actualizar(usuario)}
                    >
                      Actualizar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
