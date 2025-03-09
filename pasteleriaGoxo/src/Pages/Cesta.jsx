import { Container } from 'react-bootstrap';
import { useContext, useState, useEffect } from 'react';
import AutContext from '../../store/AutContext';
import axios from 'axios';
import Productos from './Productos';

function Cesta(props) {
  const [contenido, setContenido] = useState('');
  const contextValue = useContext(AutContext);
  const [productos, setProductos] = useState([]);
  const [productosCesta, setProductosCesta] = useState([]);
  const consultarCesta = () => {
    axios.get('https://goxopasteleria-default-rtdb.europe-west1.firebasedatabase.app/' + contextValue.loginData.uid + '.json')
      .then((response) => {
        const resultado = Object.values(response.data).map((producto) => ({
          nombre: producto.clave,
          cantidad: producto.cantidad
        }));
        setProductosCesta(resultado)
      })
      .catch((error) => { console.log(error) })
  }
  useEffect(() => {
    if (contextValue.login) {
      consultarCesta()
      contextValue.setShowLogin(false);
    } else {
      setContenido('');
      contextValue.setShowLogin(true);
    }
  }, [contextValue.login]);

  useEffect(() => {
    setProductos(props.productos)
    let arrayProductos = []
    for (let key in productos) {
      for (let keyCesta in productosCesta) {
        if (productos[key].clave == productosCesta[keyCesta].nombre) {
          arrayProductos.push({
            id: key,
            nombre: productos[key].nombre,
            precio: productos[key].precio,
            cantidad: productosCesta[keyCesta].cantidad,
            valoracion: productos[key].valoracion,
            descripcion: productos[key].descripcion
          })
        }
      }
    }
    setContenido(<Productos productos={arrayProductos} cesta={true} />);
  }, [props.productos, productosCesta]);
  return (
    <Container className="py-5">
      {contenido}
    </Container>
  );
}

export default Cesta;
