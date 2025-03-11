import { Navbar, Nav, Container, Button, Card, Row, Col, Badge, ListGroup } from "react-bootstrap";
import AutContext from "../../store/AutContext";
import axios from "axios";
import './DetallePedido.css'
import { Link } from 'react-router';
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";


function DetallePedido() {

    const parametros = useParams()
    const navigate = useNavigate();
    const [pedido, setPedido] = useState({})
    const contextValue = useContext(AutContext);

    const eliminarPedido = () => {

        const url = `https://goxopasteleria-default-rtdb.europe-west1.firebasedatabase.app/${contextValue.loginData.uid}Pedidos/${parametros.id}.json?auth=${contextValue.loginData.idToken}`;

        axios.delete(url)
            .then(() => {
                navigate("/pedidos");
            })
            .catch((error) => {
                console.error("Error al actualizar producto:", error);
            });
    };

    useEffect(() => {
        axios.get(`https://goxopasteleria-default-rtdb.europe-west1.firebasedatabase.app/${contextValue.loginData.uid}Pedidos.json?orderBy="$key"&equalTo="${parametros.id}"`)
            .then((resultado) => {
                if (resultado.data && Object.keys(resultado.data).length > 0) {
                    const pedidoData = Object.values(resultado.data)[0];
                    const pedido = {
                        nombreCompleto: pedidoData.nombreCompleto,
                        direccion: pedidoData.direccion,
                        codigoPostal: pedidoData.codigoPostal,
                        fecha: pedidoData.fecha,
                        totalPrecio: pedidoData.totalPrecio,
                        productos: pedidoData.productos,
                    };
                    setPedido(pedido);
                } else {
                    console.error("Pedido no encontrado");
                }
            })
            .catch((error) => {
                console.error("Error en la solicitud:", error);
            });
    }, [contextValue.loginData.uid, parametros.id]);


    return (
        <>
            <Container className="mt-4">
                <Card>
                    <Card.Body>
                        <Card.Title>Resumen del pedido</Card.Title>
                        <Card.Subtitle>Nombre completo: {pedido.nombreCompleto}</Card.Subtitle>
                        <Card.Subtitle>Fecha: {pedido.fecha}</Card.Subtitle>
                        <Card.Subtitle>Dirección: {pedido.direccion}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">
                            Código Postal: {pedido.codigoPostal}
                        </Card.Subtitle>
                        <Card.Text>
                            <strong>Productos:</strong>
                        </Card.Text>
                        {pedido.productos && Object.entries(pedido.productos).length > 0 ? (
                            Object.entries(pedido.productos).map(([nombre, cantidad]) => (
                                <ListGroup.Item key={nombre}>
                                    {nombre}: {cantidad} unidades
                                </ListGroup.Item>
                            ))
                        ) : (
                            <ListGroup.Item>No hay productos en el pedido.</ListGroup.Item>
                        )}
                        <Card.Subtitle>Total: {pedido.totalPrecio}€</Card.Subtitle>
                        <Button onClick={eliminarPedido}>ELIMINAR PEDIDO</Button>
                        <Button ><Link to={'/pedidos'}>VOLVER</Link></Button>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}
export default DetallePedido;
