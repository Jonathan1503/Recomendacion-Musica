import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
      // Aquí puedes manejar la lógica de inicio de sesión, como enviar los datos a un servidor
      console.log("Usuario:", username, "Contraseña:", password);
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default LoginForm;