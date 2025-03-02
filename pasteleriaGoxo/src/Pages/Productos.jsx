import { Navbar, Container, Row, Nav, Button, Badge} from 'react-bootstrap';
import { Link } from 'react-router';

function Productos(props) {
    return(
        <Container className="py-5">
        <Row className="gx-4 gx-lg-5 justify-content-center">
          {props.productos.map((product) => (
            product.descripcion
          ))}
        </Row>
      </Container>
    )
}

export default Productos