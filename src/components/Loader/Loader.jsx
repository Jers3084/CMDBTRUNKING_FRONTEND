import React from "react";
import styles from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={styles.contenedorLoader} >
      <div className={styles.loader}>
      Cargando Espere
        <div className={styles.ldsspinner}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
