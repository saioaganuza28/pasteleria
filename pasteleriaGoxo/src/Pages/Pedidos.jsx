import { Button, Container, Modal, Form, FloatingLabel, Row } from 'react-bootstrap';
import { useContext, useState, useEffect } from 'react';
import AutContext from '../../store/AutContext';
import axios from 'axios';
import { Link } from 'react-router';
import Pedido from '../Componentes/Pedido';
import './Pedidos.css'

function Pedidos() {
    const [contenido, setContenido] = useState('');
    const contextValue = useContext(AutContext);


    const consultarPedidos = () => {
        axios.get('https://goxopasteleria-default-rtdb.europe-west1.firebasedatabase.app/' + contextValue.loginData.uid + 'Pedidos' + '.json')
            .then((response) => {
                const arrayPedidos = []; 
                let contador = 1
                for (let key in response.data) {
                  const pedido = response.data[key];
                  arrayPedidos.push({
                    id: key, 
                    numeroPedido: contador++,
                    fecha: pedido.fecha,
                    cantidadProductos: Object.values(pedido.productos).reduce((acc, cantidad) => acc + cantidad, 0)
                  });
                }
                console.log(arrayPedidos)
                if (arrayPedidos.length > 0) {
                    setContenido(
                        <>
                            <div className='pedidos'>
                                {arrayPedidos.map((elemento) => {
                                    return <Pedido key={elemento.id} pedido={elemento} auth={contextValue} />
                                })}
                            </div>
                        </>)
                } else {
                    setContenido(
                        <div className='texto'>
                            <div>No ha realizado ningún pedido, ¡vaya a comprar!</div>
                            <Link to="/productos" className="nav-link">
                                <Button className='botonMorado' >Comprar</Button>
                            </Link>
                        </div>)
                }
            })
            .catch((error) => { console.log(error) })
    }
    
    useEffect(() => {
        if (contextValue.login) {
            consultarPedidos()
            contextValue.setShowLogin(false);
        } else {
            setContenido('');
            contextValue.setShowLogin(true);
        }
    }, [contextValue.login])


    return (
        <Container className="py-5">
            <Row className="gx-4 gx-lg-5 justify-content-center">
                {contenido}
            </Row>
        </Container>
    );
}

export default Pedidos;
