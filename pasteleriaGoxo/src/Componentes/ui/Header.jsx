import './header.css';
import { Navbar, Container, Row, Nav, Button, Badge, Dropdown } from 'react-bootstrap';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AutContext from '../../../store/AutContext';

function Header(props) {
  const contextValue = useContext(AutContext);
  const iniciarSesion = () => {
    props.setShowLogin(true);
  };
  const cerrarSesion = () => {
    props.actualizarLogin(false, {});
    window.location.reload();
  };

  return (
    <>
      <Navbar className="navbar-main" expand="lg">
        <Container>
          <Navbar.Brand href="/home" className="logo">
            <img
              src='https://static.vecteezy.com/system/resources/previews/011/787/246/non_2x/cake-shop-logo-cupcake-and-berries-illustration-for-menu-recipe-book-baking-shop-cafe-restaurant-vector.jpg'
              className="logo-img"
              alt="logo"
            />
            <div className='logo-titulo'>Pastelitos Store</div>
          </Navbar.Brand>
          <Nav className="ml-auto navbar-links">
            {/* Dropdown Menu */}
            <Dropdown>
              <Dropdown.Toggle variant="link" className="nav-link">
                Menú
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/productos">
                  Productos
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/pedidos">
                  Pedidos
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            
          </Nav>
          <Link to="/sobre-nosotros" className="nav-link">Sobre Nosotros</Link>

          <div className='carritoBoton'>
            <Link to="/cesta" className="nav-link">
              <Button variant="outline-light" className="cart-btn">🛒</Button>
            </Link>

            <div>
              {!contextValue.login && <Button className='botonSecundario' onClick={iniciarSesion}>Iniciar sesión</Button>}
              {contextValue.login && <Button className='botonSecundario' onClick={cerrarSesion}>Cerrar sesión</Button>}
            </div>

          </div>
        </Container>
      </Navbar>

      <div className="hero-section">
        <h1 className="hero-title">GOXO PASTELERÍA</h1>
        <p className="slogan">Donde cada bocado cuenta una historia</p>
      </div>
    </>
  );
}

export default Header;
