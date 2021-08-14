import React from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import { useForm } from "../../hooks/useForm";
import { startLogin, startRegister } from "../../redux/actions/Auth";
import "./LoginScreen.css";

export const LoginScreen = () => {
  const dispatch = useDispatch();

  const [formLoginValues, handleLoginInputChange] = useForm({
    lEmail: "",
    lPassword: "",
  });

  const [formRegisterValues, handleRegisterInputChange] = useForm({
    rNombre: "",
    rApellidos: "",
    rUsername: "",
    rEmail: "",
    rPassword: "",
    rConfirm: "",
  });

  const { lEmail, lPassword } = formLoginValues;
  const { rNombre, rApellidos, rUsername, rEmail, rPassword, rConfirm } = formRegisterValues;

  const handleLogin = (e) => {
    e.preventDefault();

    dispatch(startLogin(lEmail, lPassword));
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if(rPassword !== rConfirm ) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "Las contraseñas no son iguales"
      });
    } else {
      dispatch( startRegister(rNombre, rApellidos, rUsername, rEmail, rPassword) );
    }

  }
  

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={handleLogin}>
            <div className="form-group my-3">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name="lEmail"
                value={lEmail}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group my-3">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="lPassword"
                value={lPassword}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={handleRegister}>
            <div className="form-group my-3">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="rNombre"
                value={rNombre}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group my-3">
              <input
                type="text"
                className="form-control"
                placeholder="Apellidos"
                name="rApellidos"
                value={rApellidos}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group my-3">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre de Usuario"
                name="rUsername"
                value={rUsername}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group my-3">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="rEmail"
                value={rEmail}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group my-3">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="rPassword"
                value={rPassword}
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="form-group my-3">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name="rConfirm"
                value={rConfirm}
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
