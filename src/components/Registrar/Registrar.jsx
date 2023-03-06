import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import styles from "./Registrar.module.css";

export const Registrar = () => {
  return (
    <div>
      <main>
        <section className={styles.tituloPrincipal}>
          <h1>Inventario de Radios Trunking</h1>
        </section>

        <section className={styles.tituloFormato}>
          <h2>Datos del Radio</h2>
        </section>
        <section className={styles.formRadio}>
          <div className={styles.gpoentrada}>
            <label className={styles.etiqueta}>Serie</label>
            <input
              className={styles.entradanum}
              type="text"
              placeholder="serie"
              name="serie"
              maxLength={10}
              required
            />
          </div>
          <div className={styles.gpoentrada}>
            <label className={styles.etiqueta}>Marca</label>
            <input
              className={styles.entrada}
              type="text"
              placeholder="marca"
              name="marca"
              required
            />
          </div>
          <div className={styles.gpoentrada}>
            <label className={styles.etiqueta}>Modelo</label>
            <input
              className={styles.entrada}
              type="text"
              placeholder="modelo"
              name="modelo"
            />
          </div>
          <div className={styles.gpoentrada}>
            <label className={styles.etiqueta}>Sub_Modelo</label>
            <input
              className={styles.entrada}
              type="text"
              placeholder="submodelo"
              name="submodelo"
            />
          </div>
          <div className={styles.gpoentrada}>
            <label className={styles.etiqueta}>Tecnologia</label>
            <select className={styles.entrada} name="tecnologia">
              <option value="convencional">Convencional</option>
              <option value="trunking">Trunking</option>
            </select>
          </div>
          <div className={styles.gpoentrada}>
            <label className={styles.etiqueta}>Tipo de radio</label>
            <select className={styles.entrada} name="tiporadio">
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
            <label className={styles.etiqueta}>Identificador</label>
            <input
              className={styles.entradanum}
              id="id"
              type="number"
              placeholder="ID"
              min={700000}
              max={799999}
              name="id"
            />
          </div>
          <section className={styles.seccfacilidades}>
            <div className={styles.subtitulo}>
              <p>Facilidades:</p>
            </div>
            <div className={styles.Gpofacilidades}>
              <div className={styles.gpoentrada}>
                <label className={styles.etiqueta}>Cobertura</label>
                <select className={styles.entradafacil} name="cobertura">
                  <option value="amplia">Amplia</option>
                  <option value="local">Local</option>
                  <option value="regional">Regional</option>
                </select>
              </div>
              <div className={styles.gpoentrada}>
                <label className={styles.etiqueta}>Llamada de Grupo</label>
                <input
                  className={styles.entradacheck}
                  type="checkbox"
                  name="callgroup"
                  defaultValue={1}
                />
              </div>
              <div className={styles.gpoentrada}>
                <label className={styles.etiqueta}>Llamada Privada</label>
                <input
                  className={styles.entradacheck}
                  type="checkbox"
                  name="callpriv"
                  defaultValue={0}
                />
              </div>
              <div className={styles.gpoentrada}>
                <label className={styles.etiqueta}>Acceso Telefonico</label>
                <input
                  className={styles.entradacheck}
                  type="checkbox"
                  name="calltel"
                  defaultValue={0}
                />
              </div>
              <div className={styles.gpoentrada}>
                <label className={styles.etiqueta}>Llamada de Emergencia</label>
                <input
                  className={styles.entradacheck}
                  type="checkbox"
                  name="callemer"
                  defaultValue={0}
                />
              </div>
            </div>
          </section>
        </section>
        <section className={styles.tituloFormato}>
          <h2>Datos del Usuario</h2>
        </section>
        <section className={styles.formUsuario}>
          <section className={styles.cuadrodezonas}>
            <div className={styles.subtitulo}>
              <p>Zona:</p>
            </div>
            <div className={styles.gpozonas}>
              <div className={styles.radiobutton}>
                <label className={styles.etiquetaradio}>Sur</label>
                <input type="radio" name="zona_usuario" defaultValue="sur" />
              </div>
              <div className={styles.radiobutton}>
                <label className={styles.etiquetaradio}>Centro</label>
                <input type="radio" name="zona_usuario" defaultValue="centro" />
              </div>
              <div className={styles.radiobutton}>
                <label className={styles.etiquetaradio}>Golfo Norte</label>
                <input
                  type="radio"
                  name="zona_usuario"
                  defaultValue="golfo norte"
                />
              </div>
              <div className={styles.radiobutton}>
                <label className={styles.etiquetaradio}>Centro Norte</label>
                <input
                  type="radio"
                  name="zona_usuario"
                  defaultValue="centro norte"
                />
              </div>
            </div>
          </section>
          <section className={styles.Datosdeusuario}>
            <div className={styles.gpoentrada}>
              <label className={styles.etiqueta}>Nombre</label>
              <input
                className={styles.entradalarga}
                type="text"
                id="nombre"
                name="nombre"
                placeholder="nombre"
                maxLength={40}
                required
              />
            </div>
            <div className={styles.gpoentrada}>
              <label className={styles.etiqueta}>Ficha</label>
              <input
                className={styles.entradanum}
                type="number"
                id="ficha"
                name="ficha"
                min={200000}
                max={999999}
                required
              />
            </div>
            <div className={styles.gpoentrada}>
              <label className={styles.etiqueta}>Nivel</label>
              <input
                className={styles.entradanum}
                type="number"
                id="nivel"
                name="nivel"
                min={1}
                max={50}
                required
              />
            </div>
            <div className={styles.gpoentrada}>
              <label className={styles.etiqueta}>Regimen</label>
              <select
                className={styles.entradacorta}
                id="regimen"
                name="regimen"
              >
                <option value="PC">PC</option>
                <option value="PS">PS</option>
                <option value="TC">TC</option>
                <option value="TS">TS</option>
              </select>
            </div>
            <div className={styles.gpoentrada}>
              <label className={styles.etiqueta}>Extension Telefonica</label>
              <input
                className={styles.entradanum}
                type="tel"
                id="telefono"
                name="telefono"
                maxLength={10}
              />
            </div>
            <div className={styles.gpoentrada}>
              <label className={styles.etiqueta}>Correo Electronico</label>
              <input
                className={styles.entrada}
                type="email"
                id="email"
                name="email"
                placeholder="email@correo.com"
              />
            </div>
          </section>
          <section className={styles.Datosdeusuario}>
            <section className={styles.subdatosdeusuario}>
              <div className={styles.gpoentrada}>
                <label className={styles.etiqueta}>Organismo</label>
                <select
                  className={styles.entradacorta}
                  id="organismo_usuario"
                  name="organismo_usuario"
                >
                  <option value="Pemex Coorporativo">Coorp</option>
                  <option value="Pemex Exploracion y Produccion">PEP</option>
                  <option value="Pemex Transformacion Industrial">PTRI</option>
                  <option value="Pemex Logistica">Logistica</option>
                </select>
              </div>
              <div className={styles.gpoentrada}>
                <label className={styles.etiqueta}>Subdirección</label>
                <input
                  className={styles.entradalarga}
                  type="text"
                  id="subdireccion"
                  name="subdireccion"
                  minLength={4}
                  maxLength={40}
                  required
                />
              </div>
              <div className={styles.gpoentrada}>
                <label className={styles.etiqueta}>Clv Subdirección</label>
                <input
                  className={styles.clvnum}
                  type="number"
                  id="clv_subdireccion"
                  name="clv_subdireccion"
                  minLength={3}
                  maxLength={4}
                  required
                />
              </div>
            </section>
            <section className={styles.subdatosdeusuario}>
              <div className={styles.gpoentrada}>
                <label className={styles.etiqueta}>Gerencia</label>
                <input
                  className={styles.entradalarga}
                  type="text"
                  id="gerencia"
                  name="gerencia"
                  maxLength={40}
                />
              </div>
              <div className={styles.gpoentrada}>
                <label className={styles.etiqueta}>Clv Gerencia</label>
                <input
                  className={styles.clvnum}
                  type="number"
                  id="clv_gerencia"
                  name="clv_gerencia"
                />
              </div>
            </section>
            <section className={styles.subdatosdeusuario}>
              <div className={styles.gpoentrada}>
                <label className={styles.etiqueta}>Superintendencia</label>
                <input
                  className={styles.entradalarga}
                  type="text"
                  id="superintendencia"
                  name="superintendencia"
                  maxLength={40}
                />
              </div>
              <div className={styles.gpoentrada}>
                <label className={styles.etiqueta}>Clv Superintendencia</label>
                <input
                  className={styles.clvnum}
                  type="number"
                  id="clv_superintendencia"
                  name="clv_superintendencia"
                />
              </div>
            </section>
            <section className={styles.subdatosdeusuario}>
              <div className={styles.gpoentrada}>
                <label className={styles.etiqueta}>
                  Nombre del departamento
                </label>
                <input
                  className={styles.entradalarga}
                  type="text"
                  id="departamento"
                  name="departamento"
                  maxLength={40}
                  required
                />
              </div>
              <div className={styles.gpoentrada}>
                <label className={styles.etiqueta}>Clave Departamento</label>
                <input
                  className={styles.entradanum}
                  type="number"
                  id="clvdepto_usuario"
                  name="clvdepto_usuario"
                  max={99999}
                  required
                />
              </div>
            </section>
            <section className={styles.subdatosdeusuario}>
              <div className={styles.gpoentrada}>
                <label className={styles.etiqueta}>
                  Nombre del Centro de Trabajo
                </label>
                <input
                  className={styles.entrada}
                  type="text"
                  id="ct_usuario"
                  name="ct_usuario"
                  maxLength={35}
                  required
                />
              </div>
              <div className={styles.gpoentrada}>
                <label className={styles.etiqueta}>
                  Clave Centro de Trabajo
                </label>
                <input
                  className={styles.entradanum}
                  type="number"
                  id="clvct_usuario"
                  name="clvct_usuario"
                  max={9999}
                  required
                />
              </div>
            </section>
          </section>
        </section>
        <section className={styles.tituloFormato}>
          <h2>Administración del Servicio</h2>
        </section>
        <section className={styles.formAdmonServ}>
          <section className={styles.cuadrodezonas}>
            <div className={styles.subtitulo}>
              <p>Zona:</p>
            </div>
            <div className={styles.gpozonas}>
              <div className={styles.radiobutton}>
                <label className={styles.etiquetaradio}>Sur</label>
                <input
                  type="radio"
                  name="zona_administrador"
                  defaultValue="sur"
                />
              </div>
              <div className={styles.radiobutton}>
                <label className={styles.etiquetaradio}>Centro</label>
                <input
                  type="radio"
                  name="zona_administrador"
                  defaultValue="centro"
                />
              </div>
              <div className={styles.radiobutton}>
                <label className={styles.etiquetaradio}>Golfo Norte</label>
                <input
                  type="radio"
                  name="zona_administrador"
                  defaultValue="golfo norte"
                />
              </div>
              <div className={styles.radiobutton}>
                <label className={styles.etiquetaradio}>Centro Norte</label>
                <input
                  type="radio"
                  name="zona_administrador"
                  defaultValue="centro norte"
                />
              </div>
            </div>
          </section>
          <div className={styles.Dadmongpo}>
            <div className={styles.gpoentrada}>
              <label className={styles.etiqueta}>Centro de Trabajo</label>
              <input
                className={styles.entrada}
                type="text"
                id="ct_admon"
                name="ct_admon"
                maxLength={35}
                required
              />
            </div>
            <div className={styles.gpoentrada}>
              <label className={styles.etiqueta}>
                Clave del Centro de Trabajo
              </label>
              <input
                className={styles.entradanum}
                type="number"
                id="cct_admon"
                name="cct_admon"
                max={9999}
                required
              />
            </div>
            <div className={styles.gpoentrada}>
              <label className={styles.etiqueta}>Observaciones:</label>
              <textarea
                className={styles.entradalarga}
                name="observaciones"
                rows={2}
                cols={100}
                defaultValue={""}
              />
            </div>
          </div>
        </section>
        <footer>
          <div className={styles.buttonbox}>
            <button className={styles.boton} type="button" value="Borrar">
              Borrar
            </button>
            <button className={styles.boton} type="submit" value="Enviar">
              Grabar
            </button>
            <button className={styles.boton} type="button" value="Cancelar">
              Salir
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
};
