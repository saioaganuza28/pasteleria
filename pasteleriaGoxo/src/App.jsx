// import { useState } from 'react'
import './App.css'
import { Navbar, Container, Row, Nav, Button, Badge } from 'react-bootstrap';
import Producto from './Componentes/Producto';
import { useEffect, useState } from 'react'
import axios from 'axios'
import Header from './Componentes/ui/Header';
import Footer from './Componentes/ui/Footer';
import Home from './Pages/Home';
import Productos from './Pages/Productos';
import Login from './Componentes/Login/Login';
import { Route, Routes } from 'react-router'
import AutContext from '../store/AutContext';

function App() {

  const [productosFirebase, setproductosFirebase] = useState([])
  const [login, setLogin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginData, setLoginData] = useState({});
  const [language, setLanguage] = useState('es-ES')
  const actualizarLogin = (login, loginData) => {
    setLogin(login);
    setLoginData(loginData);
    localStorage.setItem('login', 'true')
    localStorage.setItem('uid', loginData.idToken)
  }
  useEffect(() => {
    axios.get('https://goxopasteleria-default-rtdb.europe-west1.firebasedatabase.app//productos.json')
      .then((response) => {
        let arrayProductos = []
        for (let key in response.data) {
          arrayProductos.push({
            id: key,
            nombre: response.data[key].nombre,
            precio: response.data[key].precio,
            fecha: new Date(response.data[key].fecha),
            descripcion: response.data[key].descripcion
          })
        }
        setproductosFirebase(arrayProductos)
      })
      .catch((error) => { console.log(error) })
      if(localStorage.getItem('login') ==='true'){
        setLogin(true);
        setLoginData({idToken: localStorage.getItem('idToken')});
      }
  }, [])

  return (
    <>
      <AutContext.Provider  value={{ login: login, language: language }}>
        <Header setShowLogin={setShowLogin} actualizarLogin={actualizarLogin}/>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/productos' element={<Productos productos={productosFirebase} ></Productos>}></Route>
          <Route path='*' element={<Home />}></Route>
        </Routes>
        <Login show={showLogin} setShow={setShowLogin} actualizarLogin={actualizarLogin}/>
        <Footer />
      </AutContext.Provider>
    </>
  )
}

export default App
