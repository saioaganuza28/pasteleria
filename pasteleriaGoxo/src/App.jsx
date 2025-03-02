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
import { Route, Routes } from 'react-router'
import AutContext from '../store/AutContext';

function App() {

  const [productosFirebase, setproductosFirebase] = useState([])
  const [login, setLogin] = useState(false)
  const [language, setLanguage] = useState('es-ES')

  useEffect(() => {
    axios.get('https://goxopasteleria-default-rtdb.europe-west1.firebasedatabase.app//productos.json')
      .then((response) => {
        //console.log(response.data)
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
        //console.log(arrayProductos)
        setproductosFirebase(arrayProductos)
      })
      .catch((error) => { console.log(error) })
  }, [])

  return (
    <>
      <AutContext.Provider  value={{ login: login, language: language }}>
        <Header />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/productos' element={<Productos productos={productosFirebase} ></Productos>}></Route>
          <Route path='*' element={<Home />}></Route>
        </Routes>
        <Footer />
      </AutContext.Provider>
    </>
  )
}

export default App
