
import './Login.css'
import { useState } from 'react'
import axios from 'axios'
import { Form, Modal, Button, FloatingLabel } from 'react-bootstrap';

function Login(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const authData = {
        email: email,
        password: password,
        returnSecureToken: true
    }
    const iniciarSesion = () => {
        event.preventDefault()
        console.log('llega')
         axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCV-0B9mGF4f4i4FlkK0VusGXK5uF9S68c', authData)
          .then((response) => {props.actualizarLogin(true, response.data); cerrarModal();})
          .catch((error)=>console.log(error))
    };
    
    const cerrarModal = () => {
        props.setShow(false)
    }

    return (
       <>
        <Modal show={props.show} onHide={cerrarModal} centered className="custom-modal">
        <div className="modal-blur-background" onClick={cerrarModal}></div> 
        <Modal.Body className="modal-content">
          <Button className="close-btn" onClick={cerrarModal}>
            ✖
          </Button>
          <h3 className="modal-title">¡Bienvenido de nuevo!</h3>
          <p className="modal-subtitle">Ingresa tus datos para acceder.</p>

          <Form onSubmit={iniciarSesion}>
            <FloatingLabel controlId="email" label="Correo Electrónico" className="mb-3">
              <Form.Control type="email" placeholder="nombre@email.com" onChange={(event) => setEmail(event.target.value)} value={email} />
            </FloatingLabel>

            <FloatingLabel controlId="password" label="Contraseña" className="mb-3">
              <Form.Control type="password" placeholder="••••••" onChange={(event) => setPassword(event.target.value)} value={password}/>
            </FloatingLabel>

            <Button variant="warning" type="submit" className="submit-btn">
              🔓 Iniciar Sesión
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
       </>
    )
}

export default Login;