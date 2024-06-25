import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import salida from "../assets/salida.png";
import on from "../assets/toggle-right.png"
import off from "../assets/toggle-left.png"
import axios from "axios";


function Menu() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [personId, setPersonId] = useState("");
  const [enable, setEnable] = useState(false);



  const page = "https://servicedesk-dev-is.onbmc.com";
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("usuario");

  useEffect(() => {

     const config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': token
        },
        // params: {
        //   fields: "values(Person ID, Remedy Login ID, Profile Status, Full Name, Corporate E-Mail, Assignment Availability)",
        //   q: "'Remedy Login ID'='luismoralesbarillas'"
        // }
      };
      
      axios
      .get(
          `${page}/api/arsys/v1.0/entry/CTM:People?fields=values(Person ID, Remedy Login ID, Profile Status, Full Name, Corporate E-Mail, Assignment Availability)&q=%27Remedy%20Login%20ID%27%3D%20%22${username}%22`,
          config
        )
        .then((res) => console.log(res.status))
        .catch(function (error) {
          console.log(error);})

        
      //   .then((res) => 
      //     {
      //       let tmpUsr = res.data.entries[0].values['Full Name'];
      //       setUsuario(tmpUsr)

      //       let tmpStatus = (res.data.entries[0].values['Assignment Availability']);

      //       let tmpPersonId = res.data.entries[0].values['Person ID']

      //       setPersonId(tmpPersonId)


      //          if (tmpStatus == 'Yes') {
      //             setEnable(true)
      //           }          
      //   }
      // )
      //   .catch(function (error) {
      //     console.log(error);
      //   });
      

  }, []);



  const cerrarSesion = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div>
      <h1 style={{ marginTop: 0, marginBottom: 20 }}>
        Bienvenid@ 👋 {usuario}
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/departamentos");
          }}
        >
          <h4>Departamento</h4>
          <img src={on} alt="Departamento" className="imgMenu" />
        </div>
        <div style={{ cursor: "pointer" }} onClick={cerrarSesion}>
          <h4>Cerrar Sesión</h4>
          <img src={salida} alt="Cerrar Sesión" className="imgMenu" />
        </div>
      </div>
      <img
        style={{ marginTop: 50 }}
        src={logo}
        alt="Logo"
        className="imgMenu"
      />
    </div>
  );
}

export default Menu;
