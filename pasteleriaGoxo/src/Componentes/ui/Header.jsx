import './header.css';
import { Navbar, Container, Row, Nav, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router';

function Header(props) {

  const iniciarSesion = () => {
    props.setShowLogin(true)
  };
  const cerrarSesion = () => {
    props.actualizarLogin(false, {})
  };

  return (
    <>
      {/* Primera parte de la cabecera */}
      <Navbar className="navbar-main" expand="lg">
        <Container>
          <Navbar.Brand href="#home" className="logo">
            <img
              src="https://via.placeholder.com/40" // Sustituir con el logo real
              alt="Logo"
              className="logo-img"
            />
            Pastelitos Store
          </Navbar.Brand>
          <Nav className="ml-auto navbar-links">
            <Link to="/productos" className="nav-link">Productos</Link>
            <Link to="/sobre-nosotros" className="nav-link">Sobre Nosotros</Link>

          </Nav>
          <Button variant="outline-light" className="cart-btn">
            🛒
          </Button>
          <Button onClick={iniciarSesion}>Iniciar sesión</Button>
          <Button onClick={cerrarSesion}>Cerrar sesión</Button>
        </Container>
      </Navbar>

      {/* Segunda parte de la cabecera */}
      <div className="hero-section">
        <h1 className="hero-title">Pastelitos Deliciosos</h1>
        <p className="slogan">¡Endulza tu vida con cada bocado!</p>
      </div>
    </>
  )
}

export default Header;