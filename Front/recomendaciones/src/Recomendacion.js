import React from 'react';
import { Container, Row, Col, Button, Card, ListGroup } from 'react-bootstrap';
import musica from './musica.jpg'
import { useLocation } from 'react-router-dom';
import './recomendacion.css';
import { useNavigate } from 'react-router-dom';
import  useSignOut  from 'react-auth-kit/hooks/useSignOut';

const DetalleUsuario = ({atras }) => {
    const location = useLocation();
    const json = location.state.fields
    const signOut = useSignOut();
    const navigate = useNavigate();
    console.log(json)
    const handleLogout = () => {
        signOut();  // Llamada a la función de cierre de sesión
        navigate('/');  // Redirección a la página de inicio
      };
  return (
    
    <Container fluid>
        <Row className="mt-4">
  <Col>
    <Button variant="danger" onClick={handleLogout}>
      Cerrar Sesión
    </Button>
  </Col>
</Row>
         <div className="background-image">
      </div>
  

      {/* Título de bienvenida */}
      <Row className="mb-4">
        <Col>
          <h1 className="font-weight-bold" style={{ fontFamily: 'Poppins' }}>
            Bienvenido {json.nombre}
          </h1>
        </Col>
      </Row>

      {/* Filas para cada elemento de JSON.recomendaciones */}
      {Object.entries(json.recomendaciones).map(([llave, valores], index) => (
        <Row key={index} className="mb-3">
          <Col>
            <Card>
              <Card.Header className="font-weight-bold">
                Por qué te gustó {llave}, te recomendamos:
              </Card.Header>
              <Card.Body>
                <ListGroup>
                  {valores.map((valor, i) => (
                    <ListGroup.Item key={i}>{valor}</ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default DetalleUsuario;