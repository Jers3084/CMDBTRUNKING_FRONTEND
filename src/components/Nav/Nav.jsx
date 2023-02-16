import React, { useContext } from "react";
import styles from "./Nav.module.css";
import { Link } from "react-router-dom";
import logo from "./img/logo.jpg";
import { UserContext } from "../../Context/UserContext";

export const Nav = () => {
  const { userc, setUserc } = useContext(UserContext);
  var usuario = sessionStorage.getItem("cuentaUsuario");

  if (usuario === "admin") {
    var mostrar = document.getElementById("regusu");
    mostrar.style.display = "block";
  }

  const logout = () => {
    sessionStorage.setItem("tokenUsuario", null);
    sessionStorage.setItem("cuentaUsuario", null);
    sessionStorage.setItem("nombreUsuario", null);
    sessionStorage.setItem("correoUsuario", null);
    sessionStorage.setItem("idUsuario", null);
    var mostrar = document.getElementById("regusu");
    mostrar.style.display = "none";
    userc.token = false;
    setUserc({ ...userc });
  };
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
          <li className={styles.navbar_item1}>
            <Link className={styles.navbar_font} to="/registrar">
              Registrar
            </Link>
          </li>

          <li className={styles.navbar_item2}>
            <Link className={styles.navbar_font} to="/buscar">
              Buscar
            </Link>
          </li>

          <li className={styles.navbar_item3}>
            {userc.token ? (
              <>
                <Link to="#" className={(styles.dropdown, styles.navbar_font)}>
                  Usuario: {usuario}
                </Link>
                <div className={styles.submenu}>
                  <ul>
                    <li className={styles.li_dropdown}>
                      <Link
                        to="/perfildeusuario"
                        className={styles.navbar_font}
                      >
                        Perfil de Usuario
                      </Link>
                    </li>
                    <li className={styles.li_dropdown}>
                      <Link
                        to="#"
                        className={styles.navbar_font}
                        onClick={logout}
                      >
                        Cerrar Sesion
                      </Link>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <Link to="/login" className={styles.navbar_font}>
                Iniciar Sesion
              </Link>
            )}
          </li>

          <li className={styles.navbar_item5} id="regusu">
            <Link to="/usuarios" className={styles.navbar_font}>
              Usuarios
            </Link>
          </li>
        </ul>
      </Nav>
    </div>
  );
};
