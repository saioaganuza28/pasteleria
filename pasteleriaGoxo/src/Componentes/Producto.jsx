import { Navbar, Nav, Container, Button, Card, Row, Col, Badge } from "react-bootstrap";
import AutContext from "../../store/AutContext";
import axios from "axios";
import './Producto.css'
import CantidadSelector from "./CantidadSelector";
import { useState, useEffect, useContext } from "react";

function Producto(props) {

    const [cantidadInicialProducto, setCantidadInicialProducto] = useState(0);

    const contextValue = useContext(AutContext);

    useEffect(() => {
        props.productosCesta.forEach((item) => {
            if (item.clave === props.producto.clave) {
                setCantidadInicialProducto(item.cantidad);
            }
        });
    }, [props.productosCesta])

    const handleCantidadChange = (nuevaCantidad) => {
        if (props.auth.login) {

            const producto = {
                clave: props.producto.clave,
                cantidad: nuevaCantidad
            };

            const url = `https://goxopasteleria-default-rtdb.europe-west1.firebasedatabase.app/${props.auth.loginData.uid}/${props.producto.clave}.json?auth=${props.auth.loginData.idToken}`;

            axios.put(url, producto)
                .catch((error) => {
                    console.error("Error al actualizar producto:", error);
                });
        } else {
            contextValue.setShowLogin(true)
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
            <Row className="producto">
                <div>Nombre: {props.producto.nombre}</div>
                <div>Descripción: {props.producto.descripcion}</div>
                <img src={props.producto.imagen} alt="Tarta de Fresas" width="300" />
                <div>Valoración: {props.producto.valoracion}</div>
                <div>Precio: {props.producto.precio}€</div>
                {props.cesta && (<div>Cantidad: {props.producto.cantidad}</div>)}
                {props.cesta && <Button onClick={eliminarDeLaCesta}> 🗑 </Button>}  
            </Row>
            {!props.cesta && <CantidadSelector cantidadInicial={cantidadInicialProducto} onCantidadChange={handleCantidadChange}></CantidadSelector>}
            
        </>
    )
}
export default Producto;
