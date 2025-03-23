import { Button, Card, Container } from "react-bootstrap";
import { Link } from 'react-router-dom';
import './Pedido.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const formatearFecha = (fecha) => {
    const opciones = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    const fechaFormateada = new Date(fecha).toLocaleString('es-ES', opciones);
    return fechaFormateada;
};

function Pedido(props) {
    const [precios, setPrecios] = useState({});
    const [productosFirebase, setProductosFirebase] = useState([]);
    const [productosListos, setProductosListos] = useState(false);

    const productos = props.pedido.productos || {};

    const cantidadProductos = Object.values(productos).reduce((acc, cantidad) => acc + cantidad, 0);

    const totalPrecio = productosListos ? Object.entries(productos).reduce((acc, [nombre, cantidad]) => {
        const precioProducto = precios[nombre] || 0;
        return acc + (precioProducto * cantidad);
    }, 0) : 0;

    useEffect(() => {
        axios.get('https://goxopasteleria-default-rtdb.europe-west1.firebasedatabase.app/productos.json')
            .then((response) => {
                const preciosObtenidos = {};
                const productosArray = [];
                for (let key in response.data) {
                    const producto = response.data[key];
                    productosArray.push({
                        id: key,
                        imagen: producto.imagen,
                        nombre: producto.nombre,
                        precio: producto.precio,
                        valoracion: producto.valoracion,
                        descripcion: producto.descripcion,
                        clave: producto.clave,
                    });
                    preciosObtenidos[producto.nombre] = producto.precio;
                }
                setProductosFirebase(productosArray);
                setPrecios(preciosObtenidos);
                setProductosListos(true);
            })
            .catch((error) => {
                console.log('Error al obtener los precios:', error);
            });
    }, []);

    return (
        <>
            <Container className="pedido-container mt-4">
                <Card className="pedido-card">
                    <Card.Body>
                        <Card.Title className="pedido-title">Pedido #{props.pedido.numeroPedido}</Card.Title>
                        <Card.Subtitle className="pedido-subtitle">
                        <strong>Fecha:</strong> {formatearFecha(props.pedido.fecha)}
                        </Card.Subtitle>
                        <Card.Subtitle className="pedido-subtitle">
                        <strong> Cantidad de productos:</strong>  {cantidadProductos}
                        </Card.Subtitle>
                        <Card.Subtitle className="pedido-subtitle">
                        <strong> Total pagado:</strong>  {totalPrecio.toFixed(2)} €
                        </Card.Subtitle>
                        <Link to={`/pedido/detalle/${props.pedido.id}`}>
                            <Button className="detalle-btn">DETALLE PEDIDO</Button>
                        </Link>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

export default Pedido;  //hola











