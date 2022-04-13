import { useState } from "react";
import "./login.css";

function Login() {
  const [userPassword, setUserPassword] = useState({
    email: "",
    password: "",
  });

  const settingPassword = (event) => {
    setUserPassword({
      ...userPassword,
      [event.target.name]: event.target.value,
    });
  };

  const sendPassword = async () => {
    const rawResponse = await fetch("https://examen.avirato.com/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userPassword.email,
        password: userPassword.password,
      }),
    });
    const content = await rawResponse.json();
    localStorage.setItem('token', content.access_token);
    console.log(
      "Esta es la respuesta del servidor: ",
      content.statusCode,
      content.error,
      content.message
    );
    console.log("Este es el content Login", content);
  if( localStorage.getItem("token") === "undefined"){
    window.location.href = "http://localhost:3000/"
  }else{
    window.location.reload();
  }
 
  };

  return (
    <div className="bodyLogin">
      <div className="cajaLogin">
        <h2 className="iniciarSesion">INICIAR SESIÓN</h2>
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={userPassword.email}
          onChange={settingPassword}
          className="inputInicioSesion"
        ></input>
        <input
          type="password"
          placeholder="Contraseña"
          name="password"
          value={userPassword.password}
          onChange={settingPassword}
          className="inputInicioSesion"
        ></input>

        <button onClick={sendPassword} className="btnInicioSesion">Inicia Sesión</button>
      </div>
    </div>
  );
}

export default Login;
