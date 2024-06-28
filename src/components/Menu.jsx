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
          'Authorization': `AR-JWT ${token}`
        },
      };
      
      axios
      .get(
          `${page}/api/arsys/v1.0/entry/CTM:People?fields=values(Person ID, Remedy Login ID, Profile Status, Full Name, Corporate E-Mail, Assignment Availability)&q=%27Remedy%20Login%20ID%27%3D%20%22${username}%22`,
          config
        )
        
        .then((res) => 
          {
            let tmpUsr = res.data.entries[0].values['Full Name'];
            setUsuario(tmpUsr)

            let tmpStatus = (res.data.entries[0].values['Assignment Availability']);

            let tmpPersonId = res.data.entries[0].values['Person ID']

            setPersonId(tmpPersonId)

               if (tmpStatus == 'Yes') {
                  setEnable(true)
                }          
        }
      )
        .catch(function (error) {
          console.log(error);
        });
      

  }, []);

  const cerrarSesion = () => {
    localStorage.clear();
    navigate("/");
  };

const habilitarDeshabilitar = () => {

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `AR-JWT ${token}`
    },
  };
  const habilitar = JSON.stringify({
    "values": {
      "Assignment Availability":"Yes"
    }
  })
  const deshabilitar = JSON.stringify({
    "values": {
      "Assignment Availability":"No"
    }
  })

  if (enable == false) {
    axios
    .put(`${page}/api/arsys/v1.0/entry/CTM:People/${personId}`,
     habilitar, config
    )
    .then((res) => 
      {
      console.log("ok"+res)
      setEnable(true)
    }
  )
    .catch(function (error) {
      console.log(error);
    });
  } else {
    axios
    .put(`${page}/api/arsys/v1.0/entry/CTM:People/${personId}`,
     deshabilitar, config
    )
    .then((res) => 
      {
      console.log("ok"+res)
      setEnable(false)
    }
  )
    .catch(function (error) {
      console.log(error);
    });
  }
}
  return (
    <div>
      <h2 style={{ marginTop: 0, marginBottom: 20 }}>
        Bienvenid@ 👋 {usuario}
      </h2>
      <div
        style={{
          display: "contents",
        }}
      >
        <div
          style={{ cursor: "pointer", scale: "0.6"}}
          onClick={() => habilitarDeshabilitar()}
        >
          <img src={enable ? on : off} alt="Departamento" className="imgMenu"/>
          <h2>{enable ? 'Deshabilitar' : 'Habilitar'}</h2>
        </div>
        <div style={{ cursor: "pointer", scale: "0.6" }} onClick={cerrarSesion}>
          <img src={salida} alt="Cerrar Sesión" className="imgMenu" />
          <h2>Cerrar Sesión</h2>
        </div>
      </div>
   
      <img
        style={{ scale: "0.5" }}
        src={logo}
        alt="Logo"
        className="imgMenu"
      />
      </div>
  );
}

export default Menu;
