import { Container, Button, Card } from "react-bootstrap";

import './Pedido.css'
import { Link } from 'react-router';

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
    );
}

export default Pedido;  //hola











