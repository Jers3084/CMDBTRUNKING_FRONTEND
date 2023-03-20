import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export const Logout = () => {
  const { userc, setUserc } = useContext(UserContext);
  sessionStorage.setItem("tokenUsuario", null);
  sessionStorage.setItem("cuentaUsuario", null);
  sessionStorage.setItem("nombreUsuario", null);
  sessionStorage.setItem("correoUsuario", null);
  sessionStorage.setItem("idUsuario", null);
  sessionStorage.setItem("rolUsuario", null);
  const navigate = useNavigate();

  var mostrar = document.getElementById("regusu");
  mostrar.style.visibility = "hidden";
  userc.token = false;
  setUserc({ ...userc });
  navigate("/");
  return <div>Logout</div>;
};
