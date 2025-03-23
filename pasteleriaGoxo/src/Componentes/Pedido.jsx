import { Container, Button, Card } from "react-bootstrap";

import './Pedido.css'
import { Link } from 'react-router';

function Pedido(props) {

    return (
        <>
            <Container className="mt-4">
                <Card>
                    <Card.Body className="elementos">
                        <Card.Title>Pedido {props.pedido.numeroPedido}</Card.Title>
                        <Card.Subtitle>Fecha: {new Date(props.pedido.fecha).toLocaleDateString("es-ES", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                        })}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">
                            Cantidad de productos: {props.pedido.cantidadProductos}
                        </Card.Subtitle>
                        <Link className="link" to={`/pedido/detalle/${props.pedido.id}`}><Button className="botonMorado">Detalle pedido</Button></Link>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}
export default Pedido;
