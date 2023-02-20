import React, { useContext } from "react";
import styles from "./Navbar.module.css";
import { Link, useHistory } from "react-router-dom";
import logo from "./img/logo.jpg";
import { UserContext } from "../../Context/UserContext";

export const Navbar = () => {
  const { userc, setUserc } = useContext(UserContext);
  const ruta = useHistory();
  var usuario = sessionStorage.getItem("cuentaUsuario");
  var rolusuario = sessionStorage.getItem("rolUsuario");

  if (rolusuario === "administrador") {
    var mostrar = document.getElementById("regusu");
    mostrar.style.visibility = "visible";
  }

  const logout = () => {
    sessionStorage.setItem("tokenUsuario", null);
    sessionStorage.setItem("cuentaUsuario", null);
    sessionStorage.setItem("nombreUsuario", null);
    sessionStorage.setItem("correoUsuario", null);
    sessionStorage.setItem("idUsuario", null);
    sessionStorage.setItem("rolUsuario", null);

    var mostrar = document.getElementById("regusu");
    mostrar.style.visibility = "hidden";
    userc.token = false;
    setUserc({ ...userc });
    ruta.push("/");
  };

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
            <Link className={styles.navbar_font} to="/registrarserv">
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
