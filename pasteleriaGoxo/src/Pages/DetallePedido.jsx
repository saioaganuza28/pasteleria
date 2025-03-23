import { Container, Button, Card, Modal, ListGroup } from "react-bootstrap";
import AutContext from "../../store/AutContext";
import axios from "axios";
import './DetallePedido.css';
import { Link } from 'react-router-dom';
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import './DetallePedido.css'

function DetallePedido() {
    const parametros = useParams();
    const navigate = useNavigate();
    const [pedido, setPedido] = useState({})
    const [showModal, setShowModal] = useState(false)
    const contextValue = useContext(AutContext);

    // Función para formatear la fecha en formato dd/mm/aaaa hh:mm
    const formatearFecha = (fecha) => {
        const opciones = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        const fechaFormateada = new Date(fecha).toLocaleString('es-ES', opciones);
        return fechaFormateada;
    };

    // Esta función busca el producto dentro de productosFirebase y devuelve la imagen correspondiente.
    const obtenerImagenProducto = (productoNombre) => {
        const producto = productosFirebase.find(p => p.nombre === productoNombre);
        return producto ? producto.imagen : ''; // Si no encuentra el producto, devuelve una cadena vacía.
    };

    const eliminarPedido = () => {
        const url = `https://goxopasteleria-default-rtdb.europe-west1.firebasedatabase.app/${contextValue.loginData.uid}Pedidos/${parametros.id}.json?auth=${contextValue.loginData.idToken}`;

        axios.delete(url)
            .then(() => {
                setShowModal(false)
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
                        fecha: new Date(pedidoData.fecha).toLocaleDateString("es-ES", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                        }),
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
            <Container className="mt-4 container">
                <Card>
                    <Card.Body className="elementos">
                        <Card.Title><h4>Resumen del pedido</h4></Card.Title>
                        <Card.Subtitle>Nombre completo: {pedido.nombreCompleto}</Card.Subtitle>
                        <Card.Subtitle>Fecha: {pedido.fecha}</Card.Subtitle>
                        <Card.Subtitle>Dirección: {pedido.direccion}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">
                            Código Postal: {pedido.codigoPostal}
                        </Card.Subtitle>
                        <h5 className="tituloProductos">Productos:</h5>
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
                        <Card.Subtitle className="total">Total: {pedido.totalPrecio}€</Card.Subtitle>
                        <div className="botonesDetalle">
                            <Button className="botonSecundario" onClick={() => setShowModal(true)}>Eliminar pedido</Button>
                            <Link className="link" to={'/pedidos'}><Button className="botonMorado" >Volver</Button></Link>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
            <Modal show={showModal} centered className="custom-modal">
                <Modal.Body >
                    <Button className="cerrar" onClick={() => setShowModal(false)}>✖</Button>
                    <div className="elementosModal">
                        <h5 className="modal-title"> ¿Seguro que desea eliminar el pedido?</h5>
                        <div className="botones">
                            <Button className='botonModal' onClick={() =>  eliminarPedido() }>Continuar</Button>
                            <Button className='botonSecundario' onClick={() => { setShowModal(false) }}>Cancelar</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default DetallePedido;





