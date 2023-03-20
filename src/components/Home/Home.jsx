import React from "react";
import styles from "./Home.module.css";

export const Home = () => {
  return (
    <>
      <section className={styles.seccion1}>
        <h1>Sistema de Administración de Servicios de Radiocomunicación</h1>
      </section>
      <section className={styles.piedepagina}>
        <p>@ 2023 Pemex. Todos los derechos reservados</p>
      </section>
    </>
  );
};

export default Home;
