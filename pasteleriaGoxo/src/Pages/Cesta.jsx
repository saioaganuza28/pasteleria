import { Button, Container, Modal, Form, FloatingLabel } from 'react-bootstrap';
import { useContext, useState, useEffect } from 'react';
import AutContext from '../../store/AutContext';
import axios from 'axios';
import Productos from './Productos';
import './Cesta.css'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';

function Cesta(props) {
  const [contenido, setContenido] = useState('');
  const contextValue = useContext(AutContext);
  const [productos, setProductos] = useState([]);
  const [productosCesta, setProductosCesta] = useState([]);
  const [arrayProductos, setArrayProductos] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [confirmado, setConfirmado] = useState(false)
  const [totalPrecio, setTotalPrecio] = useState('')

  const schema = yup.object().shape({
    nombreCompleto: yup.string().required("Introduzca su nombre completo"),
    direccion: yup.string().required("Introduzca su dirección de envío"),
    codigoPostal: yup.string().min(5, "Debe tener al menos 5 caracteres").required("Introduzca el código postal")
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const consultarCesta = () => {
    axios.get('https://goxopasteleria-default-rtdb.europe-west1.firebasedatabase.app/' + contextValue.loginData.uid + '.json')
      .then((response) => {
        if(response.data !=null){
          const resultado = Object.values(response.data).map((producto) => ({
            nombre: producto.clave,
            cantidad: producto.cantidad
          }));
          setProductosCesta(resultado)
        }else{
          const resultado = []
          setProductosCesta(resultado)
        }

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
            imagen: productos[key].imagen,
            nombre: productos[key].nombre,
            precio: productos[key].precio,
            cantidad: productosCesta[keyCesta].cantidad,
            valoracion: productos[key].valoracion,
            descripcion: productos[key].descripcion,
            clave: productos[key].clave
          })
        }
      }
    }
    setArrayProductos(arrayProductos)
    const totalPrecio = arrayProductos.reduce((total, producto) => {
      return total + producto.precio * producto.cantidad;
    }, 0);
    setTotalPrecio(totalPrecio)
    if (arrayProductos.length > 0) {
      setContenido(
        <>
          <Productos productos={arrayProductos} cesta={true} consultarCesta={consultarCesta} />
          <div>Total: {totalPrecio}€</div>
          <Button onClick={()=> {comenzarProceso()}}>Realizar pedido</Button>
        </>)
    } else if (contextValue.login) {
      setContenido(
        <>
          Carrito vacío, ve a comprar!
          <Link to="/productos" className="nav-link">
            <Button className="cart-btn">Comprar</Button>
          </Link>
        </>)
    }

  }, [props.productos, productosCesta]);

  const comenzarProceso = () => {
    setConfirmado(false)
    setShowModal(true)
  }
  const realizarPedido = (data) => {
    const productos = {
      ...arrayProductos.reduce((acc, producto) => {
        acc[producto.nombre] = producto.cantidad;
        acc["imagen"] = producto.imagen;
        return acc;
      }, {})
    }
    const pedido = {
      nombreCompleto: data.nombreCompleto,
      direccion: data.direccion,
      codigoPostal: data.codigoPostal,
      fecha: new Date().toISOString(),
      totalPrecio: totalPrecio,
      productos: productos
    };
    axios.post('https://goxopasteleria-default-rtdb.europe-west1.firebasedatabase.app/' + contextValue.loginData.uid + 'Pedidos' + '.json?auth=' + contextValue.loginData.idToken, pedido)
      .then(() => {
        setContenido(
          <div class="alert alert-success" role="alert">
            Pedido realizado correctamente, ¡Gracias!
            <Link to="/productos" className="nav-link">
              <Button className="cart-btn">Realizar nuevo pedido</Button>
            </Link>
          </div>)
        setShowModal(false)
      })
      .catch((error) => { console.log(error) })
    axios.delete('https://goxopasteleria-default-rtdb.europe-west1.firebasedatabase.app/' + contextValue.loginData.uid + '.json?auth=' + contextValue.loginData.idToken)
      .catch((error) => { console.log(error) })

  }
  const cerrarModal = () => {
    setShowModal(false);
  };


  return (
    <Container className="py-5">
      <Modal show={showModal} centered className="custom-modal">
        <div className="modal-blur-background" onClick={cerrarModal}></div>
        {confirmado ?
          (<Modal.Body className="modal-content">
            <Button className="close-btn" onClick={cerrarModal}>✖</Button>
            <p className="modal-subtitle">Rellena tus datos para completar el pedido.</p>
            <Form onSubmit={handleSubmit(realizarPedido)}>
              <label>Nombre completo *</label>
              <FloatingLabel controlId="Nombre completo" className="mb-3">
                <Form.Control type="text" {...register("nombreCompleto")} />
                <p className="error">{errors.nombreCompleto?.message}</p>
              </FloatingLabel>
              <label>Dirección de envío *</label>
              <FloatingLabel controlId="direccion" className="mb-3">
                <Form.Control type="text" {...register("direccion")} />
                <p className="error">{errors.direccion?.message}</p>
              </FloatingLabel>
              <label>Código postal *</label>
              <FloatingLabel controlId="codigoPostal" className="mb-3">
                <Form.Control type="number"  {...register("codigoPostal")} />
                <p className="error">{errors.codigoPostal?.message}</p>
              </FloatingLabel>
              <Button variant="warning" type="submit" className="submit-btn">Realizar pedido</Button>
            </Form>
          </Modal.Body>
          ) : (
            <Modal.Body className="modal-content">
              <Button className="close-btn" onClick={cerrarModal}>✖</Button>
              <label>Resumen del pedido</label>
              {arrayProductos.map((producto) => (
                <div key={producto.id}>
                  {producto.nombre}: {producto.cantidad}
                </div>
              ))}
              <div>Total: {totalPrecio}€ </div>
              <Button variant="warning" onClick={() => { setConfirmado(true) }}>CONTINUAR</Button>
            </Modal.Body>
          )
        }
      </Modal>
      {contenido}
    </Container >
  );
}

export default Cesta;
