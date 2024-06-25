// import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import logoInicio from "../assets/icasa_logo.png";

function Login() {
  const { register, handleSubmit, reset } = useForm();

  const navigate = useNavigate();

  const page = "https://servicedesk-dev-is.onbmc.com";

  const submit = (data) => {

    axios
      .post(`${page}/api/jwt/login`, data,
        {headers: {
          'Accept': '*/*',
          'X-Requested-By': 'XMLHttpRequest',
          'content-type': 'application/x-www-form-urlencoded'
        }}
      )
      
      .then((res) => {
        localStorage.setItem("usuario", data.username),
          localStorage.setItem("token", res.data);

        navigate("/menu");
      })
      .catch((error) => {
        if (error.response.status === 404) {
          alert(error);
        }
      });
    reset({
      identifier: "",
      password: "",
    });
  };

  return (
    <div>
      <img src={logoInicio} alt="Logo ICASA" />
      <form onSubmit={handleSubmit(submit)}>
        <div>
          <TextField
            id="username"
            label="Usuario"
            variant="outlined"
            type="text"
            {...register("username", { required: true })}
          />
        </div>
        <br />
        <div>
          <TextField
            id="password"
            label="Contraseña"
            variant="outlined"
            type="password"
            {...register("password", { required: true })}
          />
        </div>
        <br />
        <Button variant="contained" type="submit" style={{ marginRight: 5 }}>
          Acceder
        </Button>
        <Button variant="contained" type="reset" style={{ marginLeft: 5 }}>
          Borrar
        </Button>
      </form>
    </div>
  );
}

export default Login;
