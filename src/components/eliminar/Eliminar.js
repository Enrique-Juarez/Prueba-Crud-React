
  const deleteUser = async (id) => {
  
    const rawResponse = await fetch(
      "https://examen.avirato.com/client/delete/" + id,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    const content = await rawResponse.json();

    console.log(
      "Esta es la respuesta del servidor: ",
      content.statusCode,
      content.error,
      content.message
    );
  };

  


export {deleteUser};
