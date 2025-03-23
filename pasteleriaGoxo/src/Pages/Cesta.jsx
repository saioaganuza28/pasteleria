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
    nombreCompleto: yup
      .string()
      .required("Introduzca su nombre completo"),
    direccion: yup
      .string()
      .required("Introduzca su dirección de envío"),
    codigoPostal: yup
      .string()
      .matches(/^\d+$/, "El código postal debe contener solo números positivos")
      .min(5, "Debe tener 5 caracteres")
      .max(5, "Debe tener 5 caracteres")
      .required("Introduzca el código postal"),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const consultarCesta = () => {
    axios.get('https://goxopasteleria-default-rtdb.europe-west1.firebasedatabase.app/' + contextValue.loginData.uid + '.json')
      .then((response) => {
        if (response.data != null) {
          const resultado = Object.values(response.data).map((producto) => ({
            nombre: producto.clave,
            cantidad: producto.cantidad
          }));
          setProductosCesta(resultado)
        } else {
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
          <div className='prod'>
            <Productos productos={arrayProductos} cesta={true} consultarCesta={consultarCesta} />
          </div>
          <div className='botones'>
            <div>Total: {totalPrecio}€</div>
            <Button className='botonPedido' onClick={() => { comenzarProceso() }}>Realizar pedido</Button>
          </div>
        </>
      )
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
          <div class="alert alert-success " role="alert">
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
    <>
      <Modal show={showModal} centered className="custom-modal">
        {confirmado ?
          (<Modal.Body >
            <Button className="cerrar" onClick={cerrarModal}>✖</Button>
            <p className="modal-subtitle">Rellena tus datos para completar el pedido.</p>
            <Form onSubmit={handleSubmit(realizarPedido)}>
              <h5>Nombre completo *</h5>
              <FloatingLabel controlId="Nombre completo" >
                <Form.Control type="text" {...register("nombreCompleto")} />
                <p className="error">{errors.nombreCompleto?.message}</p>
              </FloatingLabel>
              <h5>Dirección de envío *</h5>
              <FloatingLabel controlId="direccion" >
                <Form.Control type="text" {...register("direccion")} />
                <p className="error">{errors.direccion?.message}</p>
              </FloatingLabel>
              <h5>Código postal *</h5>
              <FloatingLabel controlId="codigoPostal" >
                <Form.Control type="number"  {...register("codigoPostal")} />
                <p className="error">{errors.codigoPostal?.message}</p>
              </FloatingLabel>
              <Button type="submit" className="submit-btn botonModal">Realizar pedido</Button>
            </Form>
          </Modal.Body>
          ) : (
            <Modal.Body >
              <Button className="cerrar" onClick={cerrarModal}>✖</Button>
              <h4 className="modal-title"> Resumen del pedido</h4>
              {arrayProductos.map((producto) => (
                <div key={producto.id}>
                  {producto.nombre}: {producto.cantidad}
                </div>
              ))}
              <h5 className='total'>Total: {totalPrecio}€ </h5>
              <Button className='botonModal' onClick={() => { setConfirmado(true) }}>Continuar</Button>
            </Modal.Body>
          )
        }
      </Modal>
      {contenido}
    </>
  );
}

export default Cesta;
