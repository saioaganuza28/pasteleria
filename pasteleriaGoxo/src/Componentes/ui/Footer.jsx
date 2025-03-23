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
            <h5>Pastelería Goxo</h5>
            <p>Dirección: Calle Dulce, 123</p>
            <p>Tel: +34 600 123 456</p>
          </div>

          {/* Mapa interactivo */}
        <div className="footer-section">
          <h5>Ubicación</h5>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3038.235246297281!2d-74.00601538459446!3d40.71277577933143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a292c9a5b5f%3A0x3ee12bfa479d032d!2sOne%20World%20Trade%20Center!5e0!3m2!1ses-419!2smx!4v1617776420109!5m2!1ses-419!2smx"
              width="100%"
              height="150"
              style={{border: 0}}
              allowFullScreen=""
              loading="lazy"
              title="Ubicación de Pastelería Goxo"
            ></iframe>
          </div>
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
        <p className="footer-bottom-text">© 2024 Pastelería Goxo- Todos los derechos reservados</p>
      </footer>
    )
}

export default Footer;