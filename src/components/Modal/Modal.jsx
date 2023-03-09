import React from "react";
import styles from "./Modal.module.css";
import imagen from "./img/declinereject.svg";

export const Modal = ({
  estado,
  cambiarestado,
  encabezado = "Alert",
  titulo,
  mensaje,
}) => {
  return (
    <>
      <section className={styles.contenedorModal}>
        <article className={styles.modal}>
          <div className={styles.encabezadoModal}>
            <p>{encabezado}</p>
            <button
              className={styles.cerrarModal}
              onClick={() => cambiarestado(false)}
            >
              <img src={imagen} alt="" className={styles.imagen} />
            </button>
          </div>
          <h4 className={styles.tituloModal}>{titulo}</h4>
          <p className={styles.mensajeModal}>{mensaje}</p>
          <div className={styles.containerBoton}>
            <button
              className={styles.boton}
              onClick={() => cambiarestado(false)}
            >
              Aceptar
            </button>
          </div>
        </article>
      </section>
    </>
  );
};
