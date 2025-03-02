import './footer.css';
import { Navbar, Container, Row, Nav, Button, Badge} from 'react-bootstrap';
import { Link } from 'react-router';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
function Footer() {
    return (
<footer className="footer">
        <Container className="footer-container">
          {/* Información de la tienda */}
          <div className="footer-section">
            <h5>Pastelitos Store</h5>
            <p>Dirección: Calle Dulce, 123</p>
            <p>Tel: +34 600 123 456</p>
          </div>


          {/* Redes sociales */}
          <div className="footer-section">
            <h5>Síguenos</h5>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebookF className="social-icon" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="social-icon" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="social-icon" />
              </a>
            </div>
          </div>
        </Container>
        <p className="footer-bottom-text">© 2024 Pastelitos Store - Todos los derechos reservados</p>
      </footer>
    )
}

export default Footer;