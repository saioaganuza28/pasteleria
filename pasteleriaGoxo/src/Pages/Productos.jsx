import { Container, Row } from 'react-bootstrap';
import Producto from '../Componentes/Producto';
import { useContext, useEffect, useState } from 'react';
import AutContext from '../../store/AutContext';
import axios from 'axios';


function Productos(props) {
  const contextValue = useContext(AutContext);
  const [productosCesta, setProductosCesta] = useState([]);
  useEffect(() => {
    if(contextValue.loginData.uid){
      axios.get('https://goxopasteleria-default-rtdb.europe-west1.firebasedatabase.app/' + contextValue.loginData.uid + '.json')
      .then((response) => {
        const resultado = Object.values(response.data).map((producto) => ({
          clave: producto.clave,
          cantidad: producto.cantidad
        }));
        setProductosCesta(resultado)
      })
      .catch((error) => { console.log(error) })

    }
  }, [contextValue.loginData.uid])
  return (
    <Container className="py-5">
      <Row className="gx-4 gx-lg-5 justify-content-center">
        <div>
          {props.productos.map((elemento) => {
            return <Producto key={elemento.id} producto={elemento} cesta={props.cesta} auth={contextValue} productosCesta={productosCesta} consultarCesta={props.consultarCesta} />
          })}
        </div>
      </Row>
    </Container>
  )
}

export default Productos