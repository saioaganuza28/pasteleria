import { Navbar, Nav, Container, Button, Card, Row, Col, Badge, ListGroup } from "react-bootstrap";

import './Producto.css'
import { Link } from 'react-router';

function Pedido(props) {

    return (
        <>
            <Container className="mt-4">
                <Card>
                    <Card.Body>
                        <Card.Title>Pedido {props.pedido.numeroPedido}</Card.Title>
                        <Card.Subtitle>Fecha: {props.pedido.fecha}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">
                            Cantidad de productos: {props.pedido.cantidadProductos}
                        </Card.Subtitle>
                        <Button ><Link to={`/pedido/detalle/${props.pedido.id}`}>DETALLE PEDIDO</Link></Button>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}
export default Pedido;
