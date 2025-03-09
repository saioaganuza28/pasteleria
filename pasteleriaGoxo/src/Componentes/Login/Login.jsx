import './Login.css'
import { useState } from 'react'
import axios from 'axios'
import { Form, Modal, Button, FloatingLabel } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

function Login(props) {
  const [enLogin, setEnlogin] = useState(true);

  const schema = yup.object().shape({
    email: yup.string().email("Correo inválido").required("El correo es obligatorio"),
    password: yup.string().min(6, "Debe tener al menos 6 caracteres").required("La contraseña es obligatoria")
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const iniciarSesion = (data) => {
    axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCV-0B9mGF4f4i4FlkK0VusGXK5uF9S68c', {
      email: data.email,
      password: data.password,
      returnSecureToken: true
    })
      .then((response) => { 
        props.actualizarLogin(true, response.data); 
        cerrarModal(); 
        window.location.reload();})
      .catch((error) => console.log(error));
  };

  const registrarse = (data) => {
    axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCV-0B9mGF4f4i4FlkK0VusGXK5uF9S68c', {
      email: data.email,
      password: data.password,
      returnSecureToken: true
    })
      .then((response) => { 
        props.actualizarLogin(true, response.data); 
        cerrarModal();
        window.location.reload();})
      .catch((error) => console.log(error));
  };

  const cerrarModal = () => {
    props.setShow(false);
  };

  return (
    <Modal show={props.show} onHide={cerrarModal} centered className="custom-modal">
      <div className="modal-blur-background" onClick={cerrarModal}></div>
      {enLogin ? (
        <Modal.Body className="modal-content">
          <Button className="close-btn" onClick={cerrarModal}>✖</Button>
          <h3 className="modal-title">¡Bienvenido de nuevo!</h3>
          <p className="modal-subtitle">Ingresa tus datos para acceder.</p>

          <Form onSubmit={handleSubmit(iniciarSesion)}>
            <label>Crreo electrónico</label>
            <FloatingLabel controlId="email" className="mb-3">
              <Form.Control type="email" placeholder="nombre@email.com" {...register("email")} />
              <p className="error">{errors.email?.message}</p>
            </FloatingLabel>
            <label>Contraseña</label>
            <FloatingLabel controlId="password" className="mb-3">
              <Form.Control type="password" placeholder="••••••" {...register("password")} />
              <p className="error">{errors.password?.message}</p>
            </FloatingLabel>

            <Button variant="warning" type="submit" className="submit-btn">🔓 Iniciar Sesión</Button>
          </Form>
          <Button onClick={() => setEnlogin(false)}>Registrarse</Button>
        </Modal.Body>
      ) : (
        <Modal.Body className="modal-content">
          <Button className="close-btn" onClick={cerrarModal}>✖</Button>
          <h3 className="modal-title">¡Bienvenido!</h3>
          <p className="modal-subtitle">Ingresa tus datos para registrarte.</p>

          <Form onSubmit={handleSubmit(registrarse)}>
            <label>Crreo electrónico</label>
            <FloatingLabel controlId="email" className="mb-3">
              <Form.Control type="email" placeholder="nombre@email.com" {...register("email")} />
              <p className="error">{errors.email?.message}</p>
            </FloatingLabel>
            <label>Contraseña</label>
            <FloatingLabel controlId="password" className="mb-3">
              <Form.Control type="password" placeholder="••••••" {...register("password")} />
              <p className="error">{errors.password?.message}</p>
            </FloatingLabel>

            <Button variant="warning" type="submit" className="submit-btn">Registrarse</Button>
          </Form>
          <Button onClick={() => setEnlogin(true)}>🔓 Iniciar Sesión</Button>
        </Modal.Body>
      )}
    </Modal>
  );
}

export default Login;
