import { useState } from "react";
import "./register.css";

function Register() {
  const [newUser, setNewUser] = useState({
    id: "",
    nombre: "",
    fechaNacimiento: "",
    correo: "",
    telefono: "",
  });

  const saveNewUser = (event) => {
    setNewUser({
      ...newUser,
      [event.target.name]: event.target.value,
    });
  };

  const sendData = async () => {
    const rawResponse = await fetch("https://examen.avirato.com/client/post", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        nombre: newUser.nombre,
        fechaNacimiento: newUser.fechaNacimiento,
        correo: newUser.correo,
        telefono: newUser.telefono,
      }),
    });
    const content = await rawResponse.json();
    console.log(
      "Esta es la respuesta del servidor: ",
      content.statusCode,
      content.message
    );

    reset();
  };

  const reset = () => {
    setNewUser({
      id: "",
      nombre: "",
      fechaNacimiento: "",
      correo: "",
      telefono: "",
    });
  };

  return (
    <div className="bodyRegister">
      <div className="cajaRegister">
        <h2 className="registroUsuario">REGISTRO DE USUARIO</h2>

        <input
          type="text"
          placeholder="Nombre y apellidos"
          name="nombre"
          value={newUser.nombre}
          onChange={saveNewUser}
          className="inputRegistro"
        ></input>
        <input
          type="text"
          placeholder="Correo Electrónico"
          name="fechaNacimiento"
          value={newUser.fechaNacimiento}
          onChange={saveNewUser}
          className="inputRegistro"
        ></input>
        <input
          type="text"
          placeholder="Fecha de Nacimiento"
          name="correo"
          value={newUser.correo}
          onChange={saveNewUser}
          className="inputRegistro"
        ></input>
        <input
          type="number"
          placeholder="Telefono"
          name="telefono"
          value={newUser.telefono}
          onChange={saveNewUser}
          className="inputRegistro"
        ></input>

        <button onClick={sendData} className="btnRegistro">
          GUARDAR
        </button>
      </div>
    </div>
  );
}

export default Register;
