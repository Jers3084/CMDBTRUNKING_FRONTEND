import React, { useEffect, useState, useContext } from "react";
import styles from "./Buscar.module.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { Modal } from "../../components/Modal/Modal";
import { CSVLink } from "react-csv";
import Loader from "../Loader/Loader";

export const Buscar = () => {
  const [servicios, setServicios] = useState([]);
  const { userc, setUserc } = useContext(UserContext);
  const [estadoModal, setEstadoModal] = useState(false);
  const [encabezadoModal, setEncabezadoModal] = useState("");
  const [tituloModal, setTituloModal] = useState("");
  const [mensajeModal, setMensajeModal] = useState("");
  const tokendusuario = userc.tokenUsuario;
  const navigate = useNavigate();
  const [filtro, setFiltro] = useState("");
  const [id, setId] = useState(0);
  const [serie, setSerie] = useState("");
  const [zona, setZona] = useState(null);
  const [ficha, setFicha] = useState(0);
  const baseURL = process.env.REACT_APP_API_URL;
  const [bandera, setBandera] = useState(false)
  const [refresh, setRefresh] = useState(false);


  useEffect(() => {
    
    setBandera(true);

    if (filtro === "") {
      obtenerServicios();
    } else {
      applyfilter()
    }
  }, [refresh]);

  const obtenerServicios = async () => {
    try {
      await fetch(baseURL + "/servicios", {
        headers: { authorization: tokendusuario },
      })
        .then((resp) => resp.json())
        .then((value) => {
          if (value.success) {
            setServicios(value.data);
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

    setBandera(false);
  };

  const obtenerServiciosxzona = async () => {
    try {
      const url = baseURL + "/servicios/zona/" + zona;
      console.log(url);
      await fetch(url, {
        headers: { authorization: tokendusuario },
      })
        .then((resp) => resp.json())
        .then((value) => {
          if (value.success) {
            setServicios(value.data);
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
    setBandera(false);
  };

  const obtenerServiciosxid = async () => {
    try {
      const url = baseURL + "/servicios/id/" + id;
      console.log(url);
      await fetch(url, {
        headers: { authorization: tokendusuario },
      })
        .then((resp) => resp.json())
        .then((value) => {
          if (value.success) {
            setServicios(value.data);
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
    setBandera(false);
  };

  const obtenerServiciosxficha = async () => {
    try {
      const url = baseURL + "/servicios/ficha/" + ficha;
      console.log(url);
      await fetch(url, {
        headers: { authorization: tokendusuario },
      })
        .then((resp) => resp.json())
        .then((value) => {
          if (value.success) {
            setServicios(value.data);
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
    setBandera(false);
  };

  const obtenerServiciosxserie = async () => {
    try {
      const url = baseURL + "/servicios/serie/" + serie;
      console.log(url);
      await fetch(url, {
        headers: { authorization: tokendusuario },
      })
        .then((resp) => resp.json())
        .then((value) => {
          if (value.success) {
            setServicios(value.data);
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
    setBandera(false);
  };

  const borrar = async (item) => {
    const idobjeto = { _id: item._id };
    try {
      await fetch(baseURL + "/servicios/borrar", {
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
    setRefresh(!refresh);
  };

  const actualizar = (reg) => {
    userc.service = reg;
    navigate("/editarserv");
  };

  const borrarvarsearch = (valor) => {
    switch (valor) {
      case "ZONA":
        setId(0);
        setFicha(0);
        setSerie("");
        break;

      case "ID":
        setZona(null);
        setFicha(0);
        setSerie("");
        break;

      case "SERIE":
        setZona(null);
        setId(0);
        setFicha(0);
        break;

      case "FICHA":
        setZona(null);
        setId(0);
        setSerie("");
        break;

      default:
        setZona(null);
        setId(0);
        setSerie("");
        setFicha(0);
        break;
    }
  };

  const applyfilter = () => {
    switch (filtro) {
      case "ZONA":
        if (zona != null) {
          obtenerServiciosxzona();
        }
        break;

      case "ID":
        if (id !== 0) {
          obtenerServiciosxid();
        }
        break;

      case "FICHA":
        if (ficha !== 0) {
          obtenerServiciosxficha();
        }
        break;

      case "SERIE":
        if (serie !== "") {
          obtenerServiciosxserie();
        }
        break;

      default:
        setFiltro("");
        break;
    }
  };

  const deletefilter = () => {
    var slcchange = document.getElementById("filtro");
    slcchange.value = "";
    setFiltro("");
    setZona(null);
    setId(0);
    setSerie("");
    setFicha(0);
    setRefresh(!refresh);
  };

  return (
    <>
      <div className={styles.contenedor}>
        <header className={styles.encabezado}>
          <h2 className={styles.titulo}>Lista de Servicios</h2>
          <CSVLink data={servicios} filename={"listdata.csv"}>
            <button className={styles.boton}>Exportar a CVS</button>
          </CSVLink>

          <div className={styles.searchmodal}>
            <div className={styles.inputgroup}>
              <label htmlFor="filtro" className={styles.etiquetadeentrada}>
                Filtro X
              </label>
              <select
                className={styles.campodeentrada}
                id="filtro"
                name="filtro"
                defaultValue="---"
                onChange={(e) => {
                  setFiltro(e.target.value);
                  borrarvarsearch(e.target.value);
                }}
              >
                <option value="">---</option>
                <option value="ZONA">ZONA</option>
                <option value="ID">ID</option>
                <option value="SERIE">SERIE</option>
                <option value="FICHA">FICHA</option>
              </select>
            </div>

            {filtro === "" && (
              <div className={styles.inputgroup}>
                <label htmlFor="inputvar" className={styles.etiquetadeentrada}>
                  Variable a buscar
                </label>
                <input
                  type="text"
                  className={styles.campodeentrada}
                  id="inputvar"
                  Defaultvalue=""
                />
              </div>
            )}

            {filtro === "ID" && (
              <div className={styles.inputgroup}>
                <label htmlFor="inputId" className={styles.etiquetadeentrada}>
                  Id:
                </label>
                <input
                  type="number"
                  className={styles.campodeentrada}
                  id="inputId"
                  required
                  value={id}
                  onChange={(e) => {
                    setId(e.target.value);
                  }}
                />
              </div>
            )}

            {filtro === "SERIE" && (
              <div className={styles.inputgroup}>
                <label
                  htmlFor="inputSerie"
                  className={styles.etiquetadeentrada}
                >
                  Serie:
                </label>
                <input
                  type="text"
                  className={styles.campodeentrada}
                  id="inputSerie"
                  required
                  value={serie}
                  onChange={(e) => {
                    setSerie(e.target.value);
                  }}
                />
              </div>
            )}

            {filtro === "FICHA" && (
              <div className={styles.inputgroup}>
                <label
                  htmlFor="inputFicha"
                  className={styles.etiquetadeentrada}
                >
                  Ficha:
                </label>
                <input
                  type="number"
                  className={styles.campodeentrada}
                  id="inputFicha"
                  required
                  value={ficha}
                  onChange={(e) => {
                    setFicha(e.target.value);
                  }}
                />
              </div>
            )}

            {filtro === "ZONA" && (
              <div className={styles.inputgroup}>
                <label
                  htmlFor="zonausuario"
                  className={styles.etiquetadeentrada}
                >
                  Zona U:
                </label>
                <select
                  className={styles.campodeentrada}
                  id="zonausuario"
                  name="zonausuario"
                  defaultValue="SUR"
                  onChange={(e) => {
                    setZona(e.target.value);
                  }}
                >
                  <option>---</option>
                  <option value="sur">SUR</option>
                  <option value="centro">CENTRO</option>
                  <option value="pacifico">PACIFICO</option>
                  <option value="oriente">ORIENTE</option>
                  <option value="marina">MARINA</option>
                </select>
              </div>
            )}
            <button className={styles.boton} onClick={applyfilter}>
              Aplicar Filtro
            </button>

            <button className={styles.boton} onClick={deletefilter}>
              Borrar Filtro
            </button>
          </div>
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
                <tr key={index} className={styles.linetable}>
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

      {estadoModal && (
        <Modal
          estado={estadoModal}
          cambiarestado={setEstadoModal}
          encabezado={encabezadoModal}
          titulo={tituloModal}
          mensaje={mensajeModal}
        />
      )}

      {bandera && <Loader />} 

    </>
  );
};
