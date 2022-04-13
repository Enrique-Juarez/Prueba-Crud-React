import { useState } from "react";
import "./modificador.css";

function ModificadorUser(props) {
  const [newDataUser, setNewDataUser] = useState({});
  console.log("Este es newDATAUSER", props.clickedUser.id);

  const [id, setId] = useState(props.clickedUser.id);
  const [newNombre, setNewNombre] = useState(props.clickedUser.nombre);
  const [newFechaNacimiento, setNewFechaNacimiento] = useState(
    props.clickedUser.fechaNacimiento
  );
  const [newCorreo, setNewCorreo] = useState(props.clickedUser.correo);
  const [newTelefono, setNewTelefono] = useState(props.clickedUser.telefono);

  console.log(
    "Este es HANDLEINPUTS",
    newNombre,
    newFechaNacimiento,
    newCorreo,
    newTelefono
  );

  const sendChangeData = async () => {
    setNewDataUser({
      id: props.clickedUser.id,
      nombre: newNombre,
      fechaNacimiento: newFechaNacimiento,
      correo: newCorreo,
      telefono: newTelefono,
    });

    const rawResponse = await fetch("https://examen.avirato.com/client/put", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        id: props.clickedUser.id,
        nombre: newNombre,
        fechaNacimiento: newFechaNacimiento,
        correo: newCorreo,
        telefono: newTelefono,
      }),
    });
    const content = await rawResponse.json();
    console.log(
      "Esta es la respuesta del servidor: ",
      content.statusCode,
      content.error,
      content.message
    );
    window.location.reload();
  };

  return (
    <div className="bodyModificador">
      <h2>Modificar</h2>
      <div className="cajaModificador">
        <input
          type="text"
          placeholder="Nombre y Apellidos"
          name="nombre"
          value={newNombre}
          onChange={(e) => setNewNombre(e.target.value)}
          className="inputModificador"
        ></input>
        <input
          type="text"
          placeholder="Correo Electrónico"
          name="FechaNacimiento"
          value={newFechaNacimiento}
          onChange={(e) => setNewFechaNacimiento(e.target.value)}
          className="inputModificador"
        ></input>
        <input
          type="text"
          placeholder="Fecha de Nacimiento"
          name="correo"
          value={newCorreo}
          onChange={(e) => setNewCorreo(e.target.value)}
          className="inputModificador"
        ></input>
        <input
          type="number"
          placeholder="Telefono"
          name="Telefono"
          value={newTelefono}
          onChange={(e) => setNewTelefono(e.target.value)}
          className="inputModificador"
        ></input>

        <button onClick={sendChangeData} className="btnModificador">
          Actualizar
        </button>
      </div>
    </div>
  );
}

export default ModificadorUser;
