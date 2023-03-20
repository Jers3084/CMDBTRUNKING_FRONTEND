import React, { useContext } from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import logo from "./img/logo.jpg";
import { UserContext } from "../../Context/UserContext";

export const Navbar = () => {
  const { userc } = useContext(UserContext);
  var usuario = sessionStorage.getItem("cuentaUsuario");
  var rolusuario = sessionStorage.getItem("rolUsuario");

  if (rolusuario === "administrador") {
    var mostrar = document.getElementById("regusu");
    mostrar.style.visibility = "visible";
  }

  return (
    <div>
      <nav className={styles.nav_style}>
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
            {userc.token ? (
              <Link className={styles.navbar_font} to="/registrarserv">
                Registrar
              </Link>
            ) : (
              <Link
                style={{ pointerEvents: "none", color: "#3d6bb3" }}
                className={styles.navbar_font}
                to="/registrarserv"
                onClick={(event) => event.preventDefault()}
              >
                Registrar
              </Link>
            )}
          </li>

          <li className={styles.navbar_item2}>
            {userc.token ? (
              <Link className={styles.navbar_font} to="/buscar">
                Buscar
              </Link>
            ) : (
              <Link
                style={{ pointerEvents: "none", color: "#3d6bb3" }}
                className={styles.navbar_font}
                to="/buscar"
                onClick={(event) => event.preventDefault()}
              >
                Buscar
              </Link>
            )}
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
                      <Link to="/logout" className={styles.navbar_font}>
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

          <li className={styles.navbar_item4} id="regusu">
            <>
              <Link to="#" className={(styles.dropdown, styles.navbar_font)}>
                Usuarios
              </Link>
              <div className={styles.submenu}>
                <ul>
                  <li className={styles.li_dropdown}>
                    <Link to="/mostrarusuarios" className={styles.navbar_font}>
                      Ver Usuarios
                    </Link>
                  </li>
                  <li className={styles.li_dropdown}>
                    <Link to="/regusuarios" className={styles.navbar_font}>
                      Reg Usuarios
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          </li>
        </ul>
      </nav>
    </div>
  );
};
