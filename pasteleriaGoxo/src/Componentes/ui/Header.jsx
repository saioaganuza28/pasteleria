import './header.css';
import { Navbar, Container, Row, Nav, Button, Badge } from 'react-bootstrap';
import { useContext } from 'react';
import { Link } from 'react-router';
import AutContext from '../../../store/AutContext';

function Header(props) {
  const contextValue = useContext(AutContext);
  const iniciarSesion = () => {
    props.setShowLogin(true)
  };
  const cerrarSesion = () => {
    props.actualizarLogin(false, {})
    window.location.reload();
  };

  return (
    <>
      <Navbar className="navbar-main" expand="lg">
        <Container>
          <Navbar.Brand href="#home" className="logo">
            <img
              src="https://via.placeholder.com/40" 
              alt="Logo"
              className="logo-img"
            />
            Pastelitos Store
          </Navbar.Brand>
          <Nav className="ml-auto navbar-links">
            <Link to="/productos" className="nav-link">Productos</Link>
            <Link to="/pedidos" className="nav-link">Pedidos</Link>
            <Link to="/sobre-nosotros" className="nav-link">Sobre Nosotros</Link>

          </Nav>

          <Link to="/cesta" className="nav-link">
            <Button variant="outline-light" className="cart-btn">🛒</Button>
          </Link>

          {!contextValue.login && <Button onClick={iniciarSesion}>Iniciar sesión</Button>}
          {contextValue.login && <Button onClick={cerrarSesion}>Cerrar sesión</Button>}
        </Container>
      </Navbar>

      <div className="hero-section">
        <h1 className="hero-title">Pastelitos Deliciosos</h1>
        <p className="slogan">¡Endulza tu vida con cada bocado!</p>
      </div>
    </>
  )
}

export default Header;