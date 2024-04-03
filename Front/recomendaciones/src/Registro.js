import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Registro = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [artistas, setArtistas] = useState([]);
  const [artistasSeleccionados, setArtistasSeleccionados] = useState([]);
  const [filtro, setFiltro] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    // Reemplaza la URL con la URL correcta de tu API
    axios.get('http://192.168.5.123:8000/api/soloartistas')
      .then(response => {
        console.log(response)
        const nombresArtistas = JSON.parse(response.data).map(artista => artista.fields.nombre);
        setArtistas(nombresArtistas);
        console.log(nombresArtistas)
      })
      .catch(error => console.error('Hubo un error al obtener los artistas:', error));
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    const usuario = { "nombre":nombre, "correo":correo, "password": password, "artistas": artistasSeleccionados };
    axios.post('http://192.168.5.123:8000/api/register', usuario)
      .then(response => {
        alert('Registro exitoso, logueate para ver tus recomendaciones');
        // Redirigir al usuario o manejar la respuesta
        navigate("/")
      })
      .catch(error => console.error('Error en el registro:', error));
  };

  const toggleArtistaSeleccionado = (nombre) => {
    setArtistasSeleccionados(prev => {
      if (prev.includes(nombre)) {
        return prev.filter(item => item !== nombre);
      } else {
        return [...prev, nombre];
      }
    });
  };

  return (
    <div className="container mt-5">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input type="text" className="form-control" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="correo" className="form-label">Correo Electrónico</label>
          <input type="email" className="form-control" id="correo" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
          <input type="password" className="form-control" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="filtroArtistas" className="form-label">Buscar Artistas</label>
          <input type="text" className="form-control" id="filtroArtistas" onChange={(e) => setFiltro(e.target.value)} />
          <ul className="list-unstyled">
            {artistas.filter(nombre => nombre.toLowerCase().includes(filtro.toLowerCase())).slice(0, 20).map((nombre, index) => (
              <li key={index} onClick={() => toggleArtistaSeleccionado(nombre)} style={{cursor: 'pointer', backgroundColor: artistasSeleccionados.includes(nombre) ? 'lightgray' : 'transparent'}}>
                {nombre}
              </li>
            ))}
          </ul>
        </div>
        <button type="submit" className="btn btn-primary">Registrar</button>
      </form>
    </div>
  );
};

export default Registro;