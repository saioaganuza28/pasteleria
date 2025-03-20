
import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="container">
      {/* Sección Hero */}
      <div className="hero-section text-center">
        <h1 className="titulo">Bienvenidos a Goxo</h1>
        <p className="subtitulo">
          Repostería artesanal y Bubble Tea en un solo lugar.
        </p>
      </div>

      {/* Sección Historia */}
      <div className="row historia">
        <div className="col-md-6">
          <img
            src="https://cdn-icons-png.freepik.com/256/8221/8221735.png"
            alt="Historia de la pastelería"
            className="img-fluid historia-img"
          />
        </div>
        <div className="col-md-6 historia-texto">
          <h2>Nuestra Historia</h2>
          <p>
            Desde 2001, Goxo ha sido el lugar donde la tradición y
            la innovación se encuentran. Comenzamos como una pequeña pastelería
            familiar en el corazón de la ciudad, ofreciendo recetas caseras
            llenas de amor.
          </p>
          <p>
            Con el tiempo, incorporamos el <strong>Bubble Tea</strong> a
            nuestro menú, combinando lo mejor de la repostería con las bebidas
            más refrescantes y coloridas.
          </p>
        </div>
      </div>

      {/* Sección Especialidades */}
      <h2 className="text-center mt-5">Nuestras Especialidades</h2>
      <div className="row productos">
        <div className="col-md-3 text-center producto">
          <img
            src="https://st4.depositphotos.com/24038622/27073/v/450/depositphotos_270734898-stock-illustration-lemon-meringue-pie-cartoon-illustration.jpg"
            alt="Tarta de Merengue y Limón" 
            className="img-fluid"
          />
          <p>Tarta de Merengue y Limón</p>
        </div>
        <div className="col-md-3 text-center producto">
          <img
            src="https://"
            alt="Galleta de Canela"
            className="img-fluid"
          />
          <p>Galleta de Canela</p>
        </div>
        <div className="col-md-3 text-center producto">
          <img
            src="https://"
            alt="Tarta de Fresa"
            className="img-fluid"
          />
          <p>Tarta de Fresa</p>
        </div>
        <div className="col-md-3 text-center producto">
          <img
            src="https://"
            alt="Bubble Tea de Mango"
            className="img-fluid"
          />
          <p>Bubble Tea de Mango</p>
        </div>
      </div>

      {/* Sección Ubicación */}
      <div className="text-center mt-5">
        <h2>¿Dónde estamos?</h2>
        <p>Visítanos en el centro de la ciudad y disfruta de nuestros dulces.</p>
        <div className="mapa">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.920137145047!2d-122.08424968469292!3d37.42206597982419!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x5e4a42d4c7e1e1a0!2sGoogleplex!5e0!3m2!1ses!2ses!4v1622120219255!5m2!1ses!2ses"
            width="80%"
            height="300"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}