import { useState, useEffect } from "react";
import "./listUser.css";
import ModificadorUser from "../modificadorUser/ModificadorUser";
import { deleteUser } from "../eliminar/Eliminar";

function ListUser(props) {
  const [searchField, setSearchField] = useState("");
  const [userFinded, setUserFinded] = useState("");
  const [clickedUser, setClickedUser] = useState({});
  const [vistaModificador, setVistaModificador] = useState(false);
  const [users, setUsers] = useState([
    {
      id: 0,
      nombre: "",
      fechaNacimiento: "",
      correo: "",
      telefono: 0,
    },
  ]);
  useEffect(async () => {
    const rawResponse = await fetch("https://examen.avirato.com/client/get", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const content = await rawResponse.json();

    console.log(
      "Esta es la respuesta del servidor: ",
      content.statusCode,
      content.error,
      content.message
    );
    setUsers(content);

  }, []);

  const handleChange = (e) => {
    setSearchField(e.target.value.toLowerCase());
  };

  const encontrarCliente = () => {
    if (searchField != "") {
      let objetivo = users.find((elemento) =>
        elemento.nombre.toLowerCase().includes(searchField)
      );
      let usuarioEncontrado = [];
      if (objetivo != undefined) {
        usuarioEncontrado.push(objetivo);
        setUserFinded(usuarioEncontrado);
      } else {
        alert("ese usuario no existe");
      }
    } else {
      setUserFinded("");
    }
  };
  const handleClick = async (
    id,
    nombre,
    fechaNacimiento,
    correo,
    telefono,
    parametro
  ) => {
    let modUserDatas = {
      id: id,
      nombre: nombre,
      fechaNacimiento: fechaNacimiento,
      correo: correo,
      telefono: telefono,
    };
    setClickedUser(modUserDatas);
    if (parametro === "modificar") {
      setVistaModificador(true);
    }
    if (parametro === "eliminar") {
      let confirmacion = window.confirm(
        "¿Estás seguro que quieres eliminar este usuario?"
      );
      if (confirmacion === true) {
        await deleteUser(modUserDatas.id);
        window.location.reload();
      }
    }
  };

  const renderTableHeader = () => {
    let header = Object.keys(users[0]);
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };

  const renderGenericTable = (diferentMap) => {
    if (userFinded != "") {
      diferentMap = userFinded;
    } else if (vistaModificador != false) {
      let arrayClickedUser = [clickedUser];
      diferentMap = arrayClickedUser;
    } else if (userFinded === "") {
      diferentMap = users;
    }
    return diferentMap.map((user, index) => {
      const { id, nombre, fechaNacimiento, correo, telefono } = user;
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{nombre}</td>
          <td>{fechaNacimiento}</td>
          <td>{correo}</td>
          <td>{telefono}</td>
          <td>
            <button
              onClick={() =>
                handleClick(
                  id,
                  nombre,
                  fechaNacimiento,
                  correo,
                  telefono,
                  "modificar"
                )
              }
            >
              Modificar
            </button>

            <button
              onClick={() =>
                handleClick(
                  id,
                  nombre,
                  fechaNacimiento,
                  correo,
                  telefono,
                  "eliminar"
                )
              }
            >
              Eliminar
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <div>
        <h1 id="title">LISTA DE CLIENTES</h1>

        {users.length != 0 ? (
          <>
            <div className="buscador">
              <input
                className="inputBuscador"
                type="search"
                placeholder="Busca por Nombre"
                onChange={handleChange}
              />
              <button onClick={encontrarCliente} className="btnBuscador">
                Busqueda
              </button>
            </div>
            <table id="users">
              <tbody>
                <tr>{renderTableHeader()}</tr>
                {renderGenericTable()}
              </tbody>
            </table>
          </>
        ) : (
          <div id="users">La lista de Usuarios está vacia</div>
        )}

        {vistaModificador === true && (
          <>
            <ModificadorUser clickedUser={clickedUser} />
          </>
        )}
      </div>
    </>
  );
}

export default ListUser;
