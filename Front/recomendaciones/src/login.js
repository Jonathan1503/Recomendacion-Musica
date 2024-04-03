import { Button } from "baseui/button";
import { Input } from "baseui/input";
import styled from "styled-components";
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import useSignIn from 'react-auth-kit/hooks/useSignIn'; 
import axios, {AxiosError} from "axios"
import { useNavigate } from 'react-router-dom';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const signIn = useSignIn();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
    // Aquí puedes manejar la lógica de inicio de sesión, como enviar los datos a un servidor}

    var dict = {
      "correo": username,
      "password": password
    };
    
    try{
      const response= await axios.post(
        "http://192.168.5.123:8000/api/",
       dict
       );


       signIn({
        auth: {
            token: response.data.token,
            type: 'Bearer'
        },
        userState: {
            name: JSON.parse(response.data.datos)[0].fields.nombre,
            uid: JSON.parse(response.data.datos)[0].fields.userid
        }
    })

    navigate('/recomendacion', { state: JSON.parse(response.data.datos)[0] });
    

    } catch (err){
      if (err && err instanceof AxiosError)
        setError(err.response?.data.message);
      else if (err && err instanceof Error) setError(err.message);

      console.log("Error: ", err);
      alert('Login fallido. Intenta de nuevo.');
      
    }
   
    console.log("Usuario:", username, "Contraseña:", password);
  };
  const handleNavigateToRegister = () => {
    navigate('/register');
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              Iniciar sesión
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Nombre de usuario:</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Contraseña:</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    id="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                  />
                </div>
                <button type="submit" className="btn btn-primary">Iniciar sesión</button>
                <button type="button" className="btn btn-secondary ml-2" onClick={handleNavigateToRegister}>Registrarse</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;