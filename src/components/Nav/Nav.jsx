import React from "react";
import styles from "./Nav.module.css";
import { Link } from "react-router-dom";
import logo from "./img/logo.jpg";

export const Nav = () => {
  return (
    <div>
      <Nav className={styles.nav_style}>
        <div className={styles.container_logo}>
          <Link to="/">
            <img
              className={styles.logo}
              src={logo}
              alt="Logo"
              style={{ width: "140px" }}
            ></img>
          </Link>
        </div>

        <ul id="list" className={styles.navbar_list}>
          <li className={styles.navbar_item}>
            <Link className={styles.navbar_font} to="/registrar">
              Registrar
            </Link>
          </li>

          <li className={styles.navbar_item}>
            <Link className={styles.navbar_font} to="/buscar">
              Buscar
            </Link>
          </li>

          <li className={styles.navbar_item}>
            <Link className={styles.navbar_font} to="/login">
              Login
            </Link>
          </li>

          <li className={styles.navbar_item}>
            <Link className={styles.navbar_font} to="/logout">
              Logout
            </Link>
          </li>

          <li className={styles.navbar_item}>
            <Link className={styles.navbar_font} to="/usuarios">
              Usuarios
            </Link>
          </li>
        </ul>
      </Nav>
    </div>
  );
};
