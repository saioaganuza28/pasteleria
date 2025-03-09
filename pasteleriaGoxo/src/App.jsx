
import './App.css'
import { useEffect, useState } from 'react'
import Header from './Componentes/ui/Header';
import Footer from './Componentes/ui/Footer';
import Home from './Pages/Home';
import Productos from './Pages/Productos';
import Login from './Componentes/Login/Login';
import { Route, Routes } from 'react-router'
import AutContext from '../store/AutContext';
import axios from 'axios'
import Cesta from './Pages/Cesta';

function App() {

  const [login, setLogin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginData, setLoginData] = useState({});
  const [productosFirebase, setproductosFirebase] = useState([])
  
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
      <AutContext.Provider value={{ login: login, loginData: loginData, showLogin: showLogin, setShowLogin: setShowLogin, actualizarLogin: actualizarLogin }}>
        <Header setShowLogin={setShowLogin} actualizarLogin={actualizarLogin} />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/productos' element={<Productos productos={productosFirebase} cesta={false}/>}></Route>
          <Route path='/cesta' element={<Cesta productos={productosFirebase}/>}></Route>
          <Route path='*' element={<Home />}></Route>
        </Routes>
        <Login show={showLogin} setShow={setShowLogin} actualizarLogin={actualizarLogin} />
        <Footer />
      </AutContext.Provider>
    </>
  )
}

export default App
