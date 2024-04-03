import logo from './logo.svg';
import "./App.css";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import Login from "./login";
import { RequireAuth } from "react-auth-kit";
import DetalleUsuario from './Recomendacion';
import Registro from './Registro';

function App() {
  return (
    
      <Routes>
        <Route
          path="/"
          element={<Login/>}
        ></Route>
        <Route path="/recomendacion" element={<DetalleUsuario />}></Route>
        <Route path="/register" element={<Registro />}></Route>
      </Routes>
  
  );
}

export  {App};
