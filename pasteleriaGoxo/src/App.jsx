
import './App.css'
import { useEffect, useState } from 'react'
import Header from './Componentes/ui/Header';
import Footer from './Componentes/ui/Footer';
import Home from './Pages/Home';
import Productos from './Pages/Productos';
import Login from './Componentes/Login/Login';
import DetallePedido from './Pages/DetallePedido';
import { Route, Routes } from 'react-router'
import AutContext from '../store/AutContext';
import Pedidos from './Pages/Pedidos';
import axios from 'axios'
import Cesta from './Pages/Cesta';
import { Popover, Typography } from '@mui/material';


function App() {

  const [login, setLogin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginData, setLoginData] = useState({});
  const [productosFirebase, setproductosFirebase] = useState([])
  const [anchorEl, setAnchorEl] = useState(null);
  const [message, setMessage] = useState('');
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  const handleClose = () => {
    setAnchorEl(null);  
  };
  
  const actualizarLogin = (login, loginData) => {
    setLogin(login);
    setLoginData(loginData);
    localStorage.setItem('login', login)
    localStorage.setItem('uid', loginData.localId)
    localStorage.setItem('idToken', loginData.idToken)
  }

  useEffect(() => {
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
        setproductosFirebase(arrayProductos)
      })
      .catch((error) => { console.log(error) })
    if (localStorage.getItem('login') === 'true') {
      setLogin(true);
      setLoginData({
        idToken: localStorage.getItem('idToken'),
        uid: localStorage.getItem('uid')
      });
    }
  }, [])


  return (
    <>
      <AutContext.Provider value={{ login: login, loginData: loginData, showLogin: showLogin, 
        setShowLogin: setShowLogin, actualizarLogin: actualizarLogin, setAnchorEl:setAnchorEl, 
        setMessage:setMessage }}>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Typography sx={{ padding: 2 }}>{message}</Typography>
      </Popover>
        <Header setShowLogin={setShowLogin} actualizarLogin={actualizarLogin} />
        <Routes>
          <Route path='/sobre-nosotros' element={<Home />}></Route>
          <Route path='/productos' element={<Productos productos={productosFirebase} cesta={false}/>}></Route>
          <Route path='/pedidos' element={<Pedidos/>}></Route>
          <Route path='/pedido/detalle/:id' element={<DetallePedido />}></Route>
          <Route path='/cesta' element={<Cesta productos={productosFirebase}/>}></Route>
          <Route path='*' element={<Productos  productos={productosFirebase} cesta={false}/>}></Route>
        </Routes>
        <Login show={showLogin} setShow={setShowLogin} actualizarLogin={actualizarLogin} />
        <Footer />
      </AutContext.Provider>
    </>
  )
}

export default App
