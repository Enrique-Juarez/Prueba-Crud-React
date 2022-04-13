import "./App.css";
import Register from "./components/register/register";
import ListUser from "./components/listUser/ListUser";
import Login from "./components/login/login";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  const [logged, setLogged] = useState(false);

  useEffect(async () => {
    if (
      localStorage.getItem("token") != "undefined" &&
      localStorage.getItem("token") != null
    ) {
      setLogged(true);
      if (window.location.href != "http://localhost:3000/listUser") {
        window.location.href = "http://localhost:3000/listUser";
      }
    } else if (window.location.href != "http://localhost:3000/") {
      window.location.href = "http://localhost:3000/";
    }
  }, []);
  return (
    <Router>
      <div>
        <div className="headerButtons">
          {logged === false && (
            <button className="btnHeader">
              <Link to="/">Login</Link>
            </button>
          )}
          <button className="btnHeader">
            <Link to="/register">Registro</Link>
          </button>
          {logged === true && (
            <button className="btnHeader">
              <Link to="/listUser">Lista de Usuarios</Link>
            </button>
          )}
        </div>
        <div className="body">
          <Routes>
            <Route exact path="/" element={<Login />} className="login" />
            <Route
              path="/listUser"
              element={<ListUser />}
              className="listUser"
            />
            <Route
              path="/register"
              element={<Register />}
              className="register"
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
