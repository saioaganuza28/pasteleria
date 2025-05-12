import { Form } from 'react-bootstrap';
import Producto from '../Componentes/Producto';
import { useContext, useEffect, useRef, useState } from 'react';
import AutContext from '../../store/AutContext';
import axios from 'axios';
import './Productos.css';
import { FaFilter } from 'react-icons/fa'; // Icono de filtro

function Productos(props) {
  const contextValue = useContext(AutContext);
  const [productosCesta, setProductosCesta] = useState([]);

  const [busqueda, setBusqueda] = useState('');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [precioMin, setPrecioMin] = useState('');
  const [precioMax, setPrecioMax] = useState('');
  const [valoracionMin, setValoracionMin] = useState(0);

  const panelRef = useRef();

  useEffect(() => {
    if (contextValue.loginData.uid) {
      axios
        .get(`https://goxopasteleria-default-rtdb.europe-west1.firebasedatabase.app/${contextValue.loginData.uid}.json`)
        .then((response) => {
          const resultado = Object.values(response.data).map((producto) => ({
            clave: producto.clave,
            cantidad: producto.cantidad,
          }));
          setProductosCesta(resultado);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [contextValue.loginData.uid]);

  // Cerrar panel al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setMostrarFiltros(false);
      }
    }
    if (mostrarFiltros) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mostrarFiltros]);

  const productosFiltrados = props.productos.filter((producto) => {
    const coincideBusqueda = producto.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const cumplePrecioMin = precioMin === '' || producto.precio >= parseFloat(precioMin);
    const cumplePrecioMax = precioMax === '' || producto.precio <= parseFloat(precioMax);
    const cumpleValoracion = producto.valoracion >= valoracionMin;
    return coincideBusqueda && cumplePrecioMin && cumplePrecioMax && cumpleValoracion;
  });

  return (
    <>
      <div className='barra-busqueda'>
        <Form.Control
          type='text'
          placeholder='Buscar productos...'
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className='busqueda-input'
        />

        <div className='filtro-wrapper'>
          <FaFilter
            size={24}
            className='icono-filtro'
            onClick={() => setMostrarFiltros(true)}
          />

          {mostrarFiltros && (
            <div className='panel-filtros' ref={panelRef}>
              <Form.Group className='mb-2'>
                <Form.Label>Precio mínimo</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Ej: 2.00'
                  value={precioMin}
                  onChange={(e) => setPrecioMin(e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mb-2'>
                <Form.Label>Precio máximo</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Ej: 10.00'
                  value={precioMax}
                  onChange={(e) => setPrecioMax(e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mb-2'>
                <Form.Label>Valoración mínima</Form.Label>
                <Form.Select
                  value={valoracionMin}
                  onChange={(e) => setValoracionMin(parseInt(e.target.value))}
                >
                  {[0, 1, 2, 3, 4, 5].map((val) => (
                    <option key={val} value={val}>
                      {val} estrellas o más
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
          )}
        </div>
      </div>

      <div className='prod'>
        {productosFiltrados.map((elemento) => (
          <Producto
            key={elemento.clave}
            producto={elemento}
            cesta={props.cesta}
            auth={contextValue}
            productosCesta={productosCesta}
            consultarCesta={props.consultarCesta}
          />
        ))}
      </div>
    </>
  );
}

export default Productos;
