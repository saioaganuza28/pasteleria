import { Row, Button } from "react-bootstrap";
import './Producto.css';
import CantidadSelector from "./CantidadSelector";
import { useState, useEffect, useContext, useRef } from "react";
import AutContext from "../../store/AutContext";
import axios from "axios";

function Producto(props) {

    const [cantidadInicialProducto, setCantidadInicialProducto] = useState(0);
    const [esAnadir, setEsAnadir] = useState(true);

    const contextValue = useContext(AutContext);
    const anadirRef = useRef(esAnadir);
    useEffect(() => {
        anadirRef.current = esAnadir;
    }, [esAnadir]);

    useEffect(() => {
        props.productosCesta.forEach((item) => {
            if (item.clave === props.producto.clave) {
                setCantidadInicialProducto(item.cantidad);
            }
        });
    }, [props.productosCesta]);

    const handleCantidadChange = (nuevaCantidad) => {
        if (props.auth.login) {

            const producto = {
                clave: props.producto.clave,
                cantidad: nuevaCantidad
            };

            const url = `https://goxopasteleria-default-rtdb.europe-west1.firebasedatabase.app/${props.auth.loginData.uid}/${props.producto.clave}.json?auth=${props.auth.loginData.idToken}`;

            axios.put(url, producto).then(
                setTimeout(() => {
                    contextValue.setMessage("¡" + props.producto.nombre + (anadirRef.current ? " añadido a la cesta correctamente!" : " eliminado de la cesta correctamente!"));
                    contextValue.setAnchorEl(document.body);
                }, 0)
            )
                .catch((error) => {
                    console.error("Error al actualizar producto:", error);
                });
        } else {
            contextValue.setShowLogin(true);
        }
    };

    const eliminarDeLaCesta = () => {
        const url = `https://goxopasteleria-default-rtdb.europe-west1.firebasedatabase.app/${props.auth.loginData.uid}/${props.producto.clave}.json?auth=${props.auth.loginData.idToken}`;
        axios.delete(url)
            .then(props.consultarCesta)
            .catch((error) => {
                console.error("Error al eliminar producto:", error);
            });
    };

    return (
        <>
            {props.producto.cantidad != 0 && (<Row className="producto">
                {/* Imagen del producto */}
                <img src={props.producto.imagen} alt={props.producto.nombre} className="producto-img" />
                {/* Nombre del producto */}
                <div className="producto-title">{props.producto.nombre}</div>
                {/* Descripción del producto */}
                <div className="producto-description">{props.producto.descripcion}</div>
                {/* Valoración */}
                <div className="producto-rating">
                    {[...Array(props.producto.valoracion)].map((_, i) => <span key={i} className="star">★</span>)}
                </div>
                {/* Precio del producto */}
                <div className="producto-price">{props.producto.precio}€</div>
                {/* Selector de cantidad si no está en la cesta */}
                {!props.cesta && <CantidadSelector cantidadInicial={cantidadInicialProducto} onCantidadChange={handleCantidadChange} setEsAnadir={setEsAnadir} login={props.auth.login} />}
                {/* Si está en la cesta, mostrar la cantidad */}
                {props.cesta && <div className='cantidad'>Cantidad: {props.producto.cantidad}</div>}
                {/* Botón para eliminar del carrito */}
                {props.cesta && <Button onClick={eliminarDeLaCesta}>🗑</Button>}
            </Row>)}

        </>
    );
}

export default Producto;



