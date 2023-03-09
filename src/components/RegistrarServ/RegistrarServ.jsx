import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import styles from "./RegistrarServ.module.css";
import { UserContext } from "../../Context/UserContext";
import { Modal } from "../../components/Modal/Modal";

export const RegistrarServ = (props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { userc } = useContext(UserContext);
  const History = useHistory();
  const [estadoModal, setEstadoModal] = useState(false);
  const [encabezadoModal, setEncabezadoModal] = useState("");
  const [tituloModal, setTituloModal] = useState("");
  const [mensajeModal, setMensajeModal] = useState("");

  if (!userc.token) {
    History.push("/login");
  }

  const onSubmit = (data) => {
    enviarRegistro(data);
    reset();
  };

  const enviarRegistro = async (objeto) => {
    //Envia el formulario
    try {
      await fetch("http://localhost:9000/api/servicios/", {
        method: "POST",
        body: JSON.stringify(objeto), // data {object}
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          if (!response.success) {
            setEncabezadoModal("Error");
            setTituloModal("Error de Registro");
            setMensajeModal(response.message);
            setEstadoModal(true);
          } else {
            setEncabezadoModal("Succesfull");
            setTituloModal("Registro");
            setMensajeModal(response.message);
            setEstadoModal(true);
          }
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

  const cancel = () => {
    //Salir del formulario
    History.push("/");
  };

  const borrarformulario = () => {
    //Borra formulario
    reset();
  };

  return (
    <div>
      <main>
        <form
          className={styles.formato}
          id="formatoregserv"
          onSubmit={handleSubmit(onSubmit)}
        >
          <section className={styles.tituloPrincipal}>
            <h1>Inventario de Radios Trunking (Registrar Servicio)</h1>
          </section>

          <section className={styles.tituloFormato}>
            <h2>Datos del Radio</h2>
          </section>
          <section className={styles.formRadio}>
            <div className={styles.gpoentrada}>
              <label htmlFor="serie" className={styles.etiqueta}>
                Serie
              </label>

              <input
                className={styles.entradanum}
                type="text"
                placeholder="Serie"
                id="serie"
                {...register("serie", { required: true, maxLength: 10 })}
              />
              {errors.serie?.type === "required" && (
                <p>La Serie es necesaria</p>
              )}
              {errors.serie?.type === "maxlength" && (
                <p>La longitud maxima es 10 caracteres</p>
              )}
            </div>
            <div className={styles.gpoentrada}>
              <label htmlFor="marca" className={styles.etiqueta}>
                Marca
              </label>
              <input
                className={styles.entrada}
                type="text"
                placeholder="Marca"
                id="marca"
                {...register("marca", { required: true, maxLength: 10 })}
              />
              {errors.marca?.type === "required" && (
                <p>La Marca es necesaria</p>
              )}
              {errors.marca?.type === "maxlength" && (
                <p>La longitud maxima es 10 caracteres</p>
              )}
            </div>
            <div className={styles.gpoentrada}>
              <label htmlFor="modelo" className={styles.etiqueta}>
                Modelo
              </label>
              <input
                className={styles.entrada}
                type="text"
                placeholder="Modelo"
                id="modelo"
                {...register("modelo", { required: true, maxLength: 12 })}
              />
              {errors.modelo?.type === "required" && (
                <p>El Modelo es necesario</p>
              )}
              {errors.modelo?.type === "maxlength" && (
                <p>La longitud maxima es 12 caracteres</p>
              )}
            </div>

            <div className={styles.gpoentrada}>
              <label htmlFor="submodelo" className={styles.etiqueta}>
                Sub_Modelo
              </label>
              <input
                className={styles.entrada}
                type="text"
                placeholder="Submodelo"
                id="submodelo"
                {...register("submodelo", { required: true, maxLength: 10 })}
              />
              {errors.submodelo?.type === "required" && (
                <p>El Submodelo es necesario</p>
              )}
              {errors.submodelo?.type === "maxlength" && (
                <p>La longitud maxima es 10 caracteres</p>
              )}
            </div>

            <div className={styles.gpoentrada}>
              <label htmlFor="tecnologia" className={styles.etiqueta}>
                Tecnologia
              </label>
              <select
                className={styles.entrada}
                id="tecnologia"
                defaultValue={"trunking"}
                {...register("tecnologia")}
              >
                <option value="trunking">Trunking</option>
                <option value="convencional">Convencional</option>
              </select>
            </div>

            <div className={styles.gpoentrada}>
              <label htmlFor="tiporadio" className={styles.etiqueta}>
                Tipo de radio
              </label>
              <select
                className={styles.entrada}
                id="tiporadio"
                defaultValue={"portatil"}
                {...register("tiporadio")}
              >
                <option value="portatil">Portatil</option>
                <option value="base">Base</option>
                <option value="movil">Móvil</option>
              </select>
            </div>
          </section>
          <section className={styles.tituloFormato}>
            <h2>Datos del Servicio</h2>
          </section>
          <section className={styles.formServicio}>
            <div className={styles.gpoentrada}>
              <label htmlFor="id" className={styles.etiqueta}>
                Identificador
              </label>
              <input
                className={styles.entradanum}
                id="id"
                type="number"
                placeholder="Id"
                {...register("identificador", {
                  required: true,
                  min: 0,
                  max: 799999,
                })}
              />
              {errors.identificador?.type === "required" && (
                <p>El id es necesario</p>
              )}
              {errors.identificador?.type === "max" && (
                <p>El valor maximo es 799999</p>
              )}
            </div>
            <section className={styles.seccfacilidades}>
              <div className={styles.subtitulo}>
                <h4>Facilidades:</h4>
              </div>
              <div className={styles.Gpofacilidades}>
                <div className={styles.gpoentrada}>
                  <label htmlFor="cobertura" className={styles.etiqueta}>
                    Cobertura
                  </label>
                  <select
                    className={styles.entradafacil}
                    id="cobertura"
                    defaultValue={"amplia"}
                    {...register("cobertura")}
                  >
                    <option value="amplia">Amplia</option>
                    <option value="local">Local</option>
                    <option value="regional">Regional</option>
                  </select>
                </div>
                <div className={styles.gpoentrada}>
                  <label htmlFor="callgroup" className={styles.etiqueta}>
                    Llamada de Grupo
                  </label>
                  <select
                    className={styles.entradacheck}
                    name="callgroup"
                    id="callgroup"
                    defaultValue={"si"}
                    {...register("callgroup")}
                  >
                    <option value="si">Si</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div className={styles.gpoentrada}>
                  <label htmlFor="callpriv" className={styles.etiqueta}>
                    Llamada Privada
                  </label>
                  <select
                    className={styles.entradacheck}
                    name="callpriv"
                    id="callpriv"
                    defaultValue={"si"}
                    {...register("callpriv")}
                  >
                    <option value="si">Si</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div className={styles.gpoentrada}>
                  <label htmlFor="calltel" className={styles.etiqueta}>
                    Acceso Telefonico
                  </label>
                  <select
                    className={styles.entradacheck}
                    name="calltel"
                    id="calltel"
                    defaultValue={"no"}
                    {...register("acctel")}
                  >
                    <option value="si">Si</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div className={styles.gpoentrada}>
                  <label htmlFor="callemer" className={styles.etiqueta}>
                    Llamada de Emergencia
                  </label>
                  <select
                    className={styles.entradacheck}
                    name="callemer"
                    id="callemer"
                    defaultValue={"no"}
                    {...register("callemerg")}
                  >
                    <option value="si">Si</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>
            </section>
          </section>
          <section className={styles.tituloFormato}>
            <h2>Datos del Usuario</h2>
          </section>
          <section className={styles.formUsuario}>
            <div className={styles.gpoentrada}>
              <label htmlFor="zonausuario" className={styles.etiqueta}>
                Zona del usuario
              </label>
              <select
                className={styles.entradacorta}
                id="zonausuario"
                name="zonausuario"
                defaultValue="SUR"
                {...register("zonausuario")}
              >
                <option value="sur">SUR</option>
                <option value="centro">CENTRO</option>
                <option value="centro norte">CENTRO NTE</option>
                <option value="golfo">GOLFO</option>
                <option value="golfo norte">GOLFO NTE</option>
              </select>
            </div>

            <section className={styles.Datosdeusuario}>
              <div className={styles.gpoentrada}>
                <label htmlFor="nombre" className={styles.etiqueta}>
                  Nombre
                </label>
                <input
                  className={styles.entradalarga}
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder="Nombre"
                  {...register("nombre", { required: true, maxLength: 40 })}
                />
                {errors.nombre?.type === "required" && (
                  <p>El Nombre es necesario</p>
                )}
                {errors.nombre?.type === "maxlength" && (
                  <p>La longitud maxima es 40 caracteres</p>
                )}
              </div>
              <div className={styles.gpoentrada}>
                <label htmlFor="ficha" className={styles.etiqueta}>
                  Ficha
                </label>
                <input
                  className={styles.entradanum}
                  type="number"
                  id="ficha"
                  name="ficha"
                  placeholder="Ficha"
                  {...register("ficha", {
                    required: true,
                    min: 20000,
                    max: 999999,
                  })}
                />
                {errors.ficha?.type === "required" && (
                  <p>La ficha es necesaria</p>
                )}
                {errors.ficha?.type === "max" && (
                  <p>El valor maximo es 999999</p>
                )}
              </div>

              <div className={styles.gpoentrada}>
                <label htmlFor="nivel" className={styles.etiqueta}>
                  Nivel
                </label>
                <input
                  className={styles.entradanum}
                  type="number"
                  id="nivel"
                  name="nivel"
                  placeholder="Nivel"
                  {...register("nivel", { required: true, min: 1, max: 50 })}
                />
                {errors.nivel?.type === "required" && (
                  <p>El nivel es necesario</p>
                )}
                {errors.nivel?.type === "min" && <p>El valor min es 1</p>}
                {errors.nivel?.type === "max" && <p>El valor maximo es 50</p>}
              </div>
              <div className={styles.gpoentrada}>
                <label htmlFor="regimen" className={styles.etiqueta}>
                  Regimen
                </label>
                <select
                  className={styles.entradacorta}
                  id="regimen"
                  name="regimen"
                  defaultValue="PC"
                  {...register("regimen")}
                >
                  <option value="PC">PC</option>
                  <option value="PS">PS</option>
                  <option value="TC">TC</option>
                  <option value="TS">TS</option>
                </select>
              </div>
              <div className={styles.gpoentrada}>
                <label htmlFor="telefono" className={styles.etiqueta}>
                  Extension Telefonica
                </label>
                <input
                  className={styles.entradanum}
                  type="tel"
                  id="telefono"
                  name="telefono"
                  placeholder="Telefono"
                  {...register("telefono", { maxLength: 10, pattern: [0 - 9] })}
                />
                {errors.telefono?.type === "maxlength" && (
                  <p>La longitud maxima es 10 num</p>
                )}
                {errors.telefono?.type === "pattern" && (
                  <p>Solo se admiten numeros</p>
                )}
              </div>
              <div className={styles.gpoentrada}>
                <label htmlFor="email" className={styles.etiqueta}>
                  Correo Electronico
                </label>
                <input
                  className={styles.entrada}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="email@correo.com"
                  {...register("email")}
                />
              </div>
            </section>
            <section className={styles.Datosdeusuario}>
              <section className={styles.subdatosdeusuario}>
                <div className={styles.gpoentrada}>
                  <label
                    htmlFor="organismo_usuario"
                    className={styles.etiqueta}
                  >
                    Organismo
                  </label>
                  <select
                    className={styles.entradacorta}
                    id="organismo_usuario"
                    name="organismo_usuario"
                    defaultValue="Pemex Coorporativo"
                    {...register("organismo")}
                  >
                    <option value="Pemex Coorporativo">Coorp</option>
                    <option value="Pemex Exploracion y Produccion">PEP</option>
                    <option value="Pemex Transformacion Industrial">
                      PTRI
                    </option>
                    <option value="Pemex Logistica">Logistica</option>
                  </select>
                </div>
                <div className={styles.gpoentrada}>
                  <label htmlFor="subdireccion" className={styles.etiqueta}>
                    Subdirección
                  </label>
                  <input
                    className={styles.entradalarga}
                    type="text"
                    id="subdireccion"
                    name="subdireccion"
                    {...register("subdireccion", {
                      required: true,
                      minlength: 4,
                      maxLength: 50,
                    })}
                  />
                  {errors.subdireccion?.type === "required" && (
                    <p>La Subdireccion es requerida</p>
                  )}
                  {errors.subdireccion?.type === "minlength" && (
                    <p>La longitud min es 4 caracteres</p>
                  )}
                  {errors.subdireccion?.type === "maxlength" && (
                    <p>La longitud max es 50 caracteres</p>
                  )}
                </div>
                <div className={styles.gpoentrada}>
                  <label htmlFor="clv_subdireccion" className={styles.etiqueta}>
                    Clv Subdirección
                  </label>
                  <input
                    className={styles.clvnum}
                    type="number"
                    id="clv_subdireccion"
                    name="clv_subdireccion"
                    {...register("clvsubdireccion", {
                      min: 0,
                      max: 99999,
                    })}
                  />
                  {errors.clvsubdireccion?.type === "max" && (
                    <p>El valor max es 99999</p>
                  )}
                </div>
              </section>
              <section className={styles.subdatosdeusuario}>
                <div className={styles.gpoentrada}>
                  <label htmlFor="gerencia" className={styles.etiqueta}>
                    Gerencia
                  </label>
                  <input
                    className={styles.entradalarga}
                    type="text"
                    id="gerencia"
                    name="gerencia"
                    {...register("gerencia", {
                      required: true,
                      minlength: 4,
                      maxLength: 50,
                    })}
                  />
                  {errors.gerencia?.type === "required" && (
                    <p>La Gerencia es requerida</p>
                  )}
                  {errors.gerencia?.type === "minlength" && (
                    <p>La longitud min es 4 caracteres</p>
                  )}
                  {errors.gerencia?.type === "maxlength" && (
                    <p>La longitud max es 50 caracteres</p>
                  )}
                </div>
                <div className={styles.gpoentrada}>
                  <label htmlFor="clv_gerencia" className={styles.etiqueta}>
                    Clv Gerencia
                  </label>
                  <input
                    className={styles.clvnum}
                    type="number"
                    id="clv_gerencia"
                    name="clv_gerencia"
                    {...register("clvgerencia", {
                      min: 0,
                      max: 99999,
                    })}
                  />
                  {errors.clvgerencia?.type === "max" && (
                    <p>El valor max es 99999</p>
                  )}
                </div>
              </section>
              <section className={styles.subdatosdeusuario}>
                <div className={styles.gpoentrada}>
                  <label htmlFor="superintendencia" className={styles.etiqueta}>
                    Superintendencia
                  </label>
                  <input
                    className={styles.entradalarga}
                    type="text"
                    id="superintendencia"
                    name="superintendencia"
                    {...register("suptcia", {
                      minlength: 4,
                      maxLength: 50,
                    })}
                  />
                  {errors.suptcia?.type === "required" && (
                    <p>La Superintendencia es requerida</p>
                  )}
                  {errors.suptcia?.type === "minlength" && (
                    <p>La longitud min es 4 caracteres</p>
                  )}
                  {errors.suptcia?.type === "maxlength" && (
                    <p>La longitud max es 50 caracteres</p>
                  )}
                </div>
                <div className={styles.gpoentrada}>
                  <label
                    htmlFor="clv_superintendencia"
                    className={styles.etiqueta}
                  >
                    Clv Superintendencia
                  </label>
                  <input
                    className={styles.clvnum}
                    type="number"
                    id="clv_superintendencia"
                    name="clv_superintendencia"
                    {...register("clvsuptcia", {
                      min: 0,
                      max: 99999,
                    })}
                  />
                  {errors.clvsuptcia?.type === "max" && (
                    <p>El valor max es 99999</p>
                  )}
                </div>
              </section>
              <section className={styles.subdatosdeusuario}>
                <div className={styles.gpoentrada}>
                  <label htmlFor="departamento" className={styles.etiqueta}>
                    Nombre del departamento
                  </label>
                  <input
                    className={styles.entradalarga}
                    type="text"
                    id="departamento"
                    name="departamento"
                    {...register("depto", {
                      required: true,
                      minlength: 4,
                      maxLength: 50,
                    })}
                  />
                  {errors.depto?.type === "required" && (
                    <p>El Departamento es requerido</p>
                  )}
                  {errors.depto?.type === "minlength" && (
                    <p>La longitud min es 4 caracteres</p>
                  )}
                  {errors.depto?.type === "maxlength" && (
                    <p>La longitud max es 50 caracteres</p>
                  )}
                </div>
                <div className={styles.gpoentrada}>
                  <label htmlFor="clvdepto_usuario" className={styles.etiqueta}>
                    Clave Departamento
                  </label>
                  <input
                    className={styles.entradanum}
                    type="number"
                    id="clvdepto_usuario"
                    name="clvdepto_usuario"
                    {...register("clvdepto", {
                      required: true,
                      min: 0,
                      max: 99999,
                    })}
                  />
                  {errors.clvdepto?.type === "max" && (
                    <p>El valor max es 99999</p>
                  )}
                </div>
              </section>
              <section className={styles.subdatosdeusuario}>
                <div className={styles.gpoentrada}>
                  <label htmlFor="ct_usuario" className={styles.etiqueta}>
                    Nombre del Centro de Trabajo
                  </label>
                  <input
                    className={styles.entrada}
                    type="text"
                    id="ct_usuario"
                    name="ct_usuario"
                    {...register("centrotrab", {
                      required: true,
                      minlength: 4,
                      maxLength: 35,
                    })}
                  />
                  {errors.centrotrab?.type === "required" && (
                    <p>El CT es requerido</p>
                  )}
                  {errors.centrotrab?.type === "minlength" && (
                    <p>La longitud min es 4 caracteres</p>
                  )}
                  {errors.centrotrab?.type === "maxlength" && (
                    <p>La longitud max es 35 caracteres</p>
                  )}
                </div>
                <div className={styles.gpoentrada}>
                  <label htmlFor="clvct_usuario" className={styles.etiqueta}>
                    Clv Centro de Trabajo
                  </label>
                  <input
                    className={styles.entradanum}
                    type="number"
                    id="clvct_usuario"
                    name="clvct_usuario"
                    {...register("clvct", {
                      required: true,
                      min: 0,
                      max: 9999,
                    })}
                  />
                  {errors.clvct?.type === "max" && <p>El valor max es 9999</p>}
                </div>
              </section>
            </section>
          </section>
          <section className={styles.tituloFormato}>
            <h2>Administración del Servicio</h2>
          </section>
          <section className={styles.formAdmonServ}>
            <div className={styles.gpoentrada}>
              <label htmlFor="zonaadmon" className={styles.etiqueta}>
                Zona admon del servicio
              </label>
              <select
                className={styles.entradacorta}
                id="zonaadmon"
                name="zonaadmon"
                defaultValue="SUR"
                {...register("zonadmon")}
              >
                <option value="sur">SUR</option>
                <option value="centro">CENTRO</option>
                <option value="centro norte">CENTRO NTE</option>
                <option value="golfo">GOLFO</option>
                <option value="golfo norte">GOLFO NTE</option>
              </select>
            </div>

            <div className={styles.Dadmongpo}>
              <div className={styles.gpoentrada}>
                <label htmlFor="ct_admon" className={styles.etiqueta}>
                  Centro de Trabajo
                </label>
                <input
                  className={styles.entrada}
                  type="text"
                  id="ct_admon"
                  name="ct_admon"
                  {...register("ctadmon", {
                    required: true,
                    minlength: 4,
                    maxLength: 35,
                  })}
                />
                {errors.ctadmon?.type === "required" && (
                  <p>El CT es requerido</p>
                )}
                {errors.ctadmon?.type === "minlength" && (
                  <p>La longitud min es 4 caracteres</p>
                )}
                {errors.ctadmon?.type === "maxlength" && (
                  <p>La longitud max es 35 caracteres</p>
                )}
              </div>
              <div className={styles.gpoentrada}>
                <label htmlFor="cct_admon" className={styles.etiqueta}>
                  Clv Centro de Trabajo
                </label>
                <input
                  className={styles.entradanum}
                  type="number"
                  id="cct_admon"
                  name="cct_admon"
                  {...register("clvctadmon", {
                    required: true,
                    min: 0,
                    max: 9999,
                  })}
                />
                {errors.clvctadmon?.type === "max" && (
                  <p>El valor max es 9999</p>
                )}
              </div>
              <div className={styles.gpoentrada}>
                <label htmlFor="observaciones" className={styles.etiqueta}>
                  Observaciones:
                </label>
                <textarea
                  className={styles.entradalarga}
                  name="observaciones"
                  id="observaciones"
                  {...register("observaciones", {
                    required: true,
                    rows: 2,
                    cols: 100,
                  })}
                />
              </div>
            </div>
          </section>
          <footer>
            <div className={styles.buttonbox}>
              <button className={styles.boton} type="button" onClick={cancel}>
                Salir
              </button>
              <button
                className={styles.boton}
                type="button"
                onClick={borrarformulario}
              >
                Borrar Formulario
              </button>
              <button className={styles.boton} type="submit">
                Registrar Servicio
              </button>
            </div>
          </footer>
        </form>
      </main>
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
export default RegistrarServ;
