import React, { useEffect, useState, useContext } from "react";
import styles from "./Buscar.module.css";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CSVLink } from "react-csv";

export const Buscar = () => {
  const [servicios, setServicios] = useState([]);
  const { userc, setUserc } = useContext(UserContext);
  const tokendusuario = userc.tokenUsuario;
  const ruta = useHistory();

  if (!userc.token) {
    ruta.push("/login");
  }

  useEffect(() => {
    obtenerServicios();
  }, []);

  const obtenerServicios = async () => {
    await fetch("http://localhost:9000/api/servicios", {
      headers: { authorization: tokendusuario },
    })
      .then((resp) => resp.json())
      .then((value) => {
        if (value.success) {
          setServicios(value.data);
        }
      });
  };

  const borrar = async (item) => {
    const idobjeto = { _id: item._id };
    try {
      return fetch("http://localhost:9000/api/servicios/borrar", {
        method: "POST",
        body: JSON.stringify(idobjeto), // data {object}
        headers: {
          "Content-type": "application/json",
          authorization: tokendusuario,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          alert("Registro Borrado");
        });
    } catch (e) {
      console.log("hubo un error");
      console.log(e);
    }
  };

  const actualizar = (reg) => {
    userc.service = reg;
    ruta.push("/editarserv");
  };

  return (
    <>
      <div className={styles.contenedor}>
        <header className={styles.encabezado}>
          <h2 className={styles.titulo}>Lista de Servicios</h2>
          <CSVLink data={servicios} filename={"listdata.csv"}>
            <button className={styles.boton}>Exportar a CVS</button>
          </CSVLink>
        </header>

        <table className={styles.tabla}>
          <thead>
            <tr>
              <th>Eliminar</th>
              <th>Actualizar</th>
              <th>Serie</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Submodelo</th>
              <th>Tecnologia</th>
              <th>Tipo de Radio</th>
              <th>Id</th>
              <th>Cobertura</th>
              <th>Llamada Grupo</th>
              <th>Llamada Priv</th>
              <th>Acceso tel</th>
              <th>Lllamada Emerg</th>
              <th>Zona Usuario</th>
              <th>Nombre</th>
              <th>Ficha</th>
              <th>Nivel</th>
              <th>Regimen</th>
              <th>Telefono</th>
              <th>Correo</th>
              <th>Organismo</th>
              <th>Subdireccion</th>
              <th>Clv Subd</th>
              <th>Gerencia</th>
              <th>Clv Gerencia</th>
              <th>Suptcia</th>
              <th>Clv Suptcia</th>
              <th>Depto</th>
              <th>Clv Depto</th>
              <th>CT Usuario</th>
              <th>Clv CT</th>
              <th>Zona Admon</th>
              <th>CT Admon</th>
              <th>Clv CT Admon</th>
              <th>Observaciones</th>
            </tr>
          </thead>
          <tbody>
            {servicios.map((servicio, index) => {
              const {
                id,
                serie,
                marca,
                modelo,
                submodelo,
                tecnologia,
                tiporadio,
                identificador,
                cobertura,
                callgroup,
                callpriv,
                acctel,
                callemerg,
                zonausuario,
                nombre,
                ficha,
                nivel,
                regimen,
                telefono,
                email,
                organismo,
                subdireccion,
                clvsubdireccion,
                gerencia,
                clvgerencia,
                suptcia,
                clvsuptcia,
                depto,
                clvdepto,
                centrotrab,
                clvct,
                zonadmon,
                ctadmon,
                clvctadmon,
                observaciones,
              } = servicio; //destructuring

              return (
                <tr key={id} className={styles.linetable}>
                  <td>
                    <button
                      type="button"
                      className={styles.boton}
                      onClick={() => borrar(servicio)}
                    >
                      Eliminar
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className={styles.boton}
                      onClick={() => actualizar(servicio)}
                    >
                      Editar
                    </button>
                  </td>
                  <td>{serie}</td>
                  <td>{marca}</td>
                  <td>{modelo}</td>
                  <td>{submodelo}</td>
                  <td>{tecnologia}</td>
                  <td>{tiporadio}</td>
                  <td>{identificador}</td>
                  <td>{cobertura}</td>
                  <td>{callgroup}</td>
                  <td>{callpriv}</td>
                  <td>{acctel}</td>
                  <td>{callemerg}</td>
                  <td>{zonausuario}</td>
                  <td>{nombre}</td>
                  <td>{ficha}</td>
                  <td>{nivel}</td>
                  <td>{regimen}</td>
                  <td>{telefono}</td>
                  <td>{email}</td>
                  <td>{organismo}</td>
                  <td>{subdireccion}</td>
                  <td>{clvsubdireccion}</td>
                  <td>{gerencia}</td>
                  <td>{clvgerencia}</td>
                  <td>{suptcia}</td>
                  <td>{clvsuptcia}</td>
                  <td>{depto}</td>
                  <td>{clvdepto}</td>
                  <td>{centrotrab}</td>
                  <td>{clvct}</td>
                  <td>{zonadmon}</td>
                  <td>{ctadmon}</td>
                  <td>{clvctadmon}</td>
                  <td>{observaciones}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
