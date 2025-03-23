import { Container, Button, Card, ListGroup } from "react-bootstrap";
import AutContext from "../../store/AutContext";
import axios from "axios";
import './DetallePedido.css';
import { Link } from 'react-router-dom';
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

function DetallePedido() {
    const parametros = useParams();
    const navigate = useNavigate();
    const [pedido, setPedido] = useState({});
    const [productosFirebase, setProductosFirebase] = useState([]);
    const contextValue = useContext(AutContext);

    // Esta función busca el producto dentro de productosFirebase y devuelve la imagen correspondiente.
    const obtenerImagenProducto = (productoNombre) => {
        const producto = productosFirebase.find(p => p.nombre === productoNombre);
        return producto ? producto.imagen : ''; // Si no encuentra el producto, devuelve una cadena vacía.
    };

    const eliminarPedido = () => {
        const url = `https://goxopasteleria-default-rtdb.europe-west1.firebasedatabase.app/${contextValue.loginData.uid}Pedidos/${parametros.id}.json?auth=${contextValue.loginData.idToken}`;

        axios.delete(url)
            .then(() => {
                navigate("/pedidos");
            })
            .catch((error) => {
                console.error("Error al eliminar pedido:", error);
            });
    };

    useEffect(() => {
        // Obtener productos desde Firebase (como en App.jsx)
        axios.get('https://goxopasteleria-default-rtdb.europe-west1.firebasedatabase.app/productos.json')
            .then((response) => {
                let arrayProductos = []
                for (let key in response.data) {
                    arrayProductos.push({
                        id: key,
                        imagen: response.data[key].imagen,
                        nombre: response.data[key].nombre,
                        precio: response.data[key].precio,
                        valoracion: response.data[key].valoracion,
                        descripcion: response.data[key].descripcion,
                        clave: response.data[key].clave
                    })
                }
                setProductosFirebase(arrayProductos);
            })
            .catch((error) => { console.log(error) });

        // Obtener detalles del pedido desde Firebase
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
        <Container className="detalle-pedido-container mt-4">
            <Card>
                <Card.Body>
                    <Card.Title className="titulo">Resumen del Pedido</Card.Title>
                    <Card.Subtitle className="mb-2">Nombre completo: {pedido.nombreCompleto}</Card.Subtitle>
                    <Card.Subtitle className="mb-2">Fecha: {pedido.fecha}</Card.Subtitle>
                    <Card.Subtitle className="mb-2">Dirección: {pedido.direccion}</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">Código Postal: {pedido.codigoPostal}</Card.Subtitle>
                    <Card.Text><strong>Productos:</strong></Card.Text>

                    {/* Contenedor de productos en cuadrícula */}
                    <div className="productos-container">
                        {pedido.productos && Object.entries(pedido.productos).length > 0 ? (
                            Object.entries(pedido.productos).map(([nombre, producto]) => (
                                <div key={nombre} className="producto-item">
                                    <img src={obtenerImagenProducto(nombre)} alt={nombre} />
                                    <div className="producto-info">
                                        <h5>{nombre}</h5>
                                        <p>Cantidad: {producto}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>No hay productos en el pedido.</div>
                        )}
                    </div>

                    {/* Total */}
                    <h3 className="detalle-pedido-total">Total: {pedido.totalPrecio}€</h3>
                    
                    <Button variant="danger" onClick={eliminarPedido} className="mt-3">Eliminar Pedido</Button>
                    <Button variant="secondary" className="mt-3 ms-2">
                        <Link to="/pedidos" className="nav-link">Volver</Link>
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default DetallePedido;




