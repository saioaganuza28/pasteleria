import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

function Home() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        axios.get('https://goxopasteleria-default-rtdb.europe-west1.firebasedatabase.app/productos.json')
            .then((response) => {
                let arrayProductos = [];
                for (let key in response.data) {
                    arrayProductos.push({
                        id: key,
                        nombre: response.data[key].nombre,
                        precio: response.data[key].precio,
                        imagen: response.data[key].imagen,
                        descripcion: response.data[key].descripcion
                    });
                }
                setProductos(arrayProductos);
            })
            .catch((error) => { console.log(error) });
    }, []);
    function ProductosCarrusel({ productos }) {
        const grupos = [];
        for (let i = 0; i < productos.length; i += 3) {
            grupos.push(productos.slice(i, i + 3));
        }
    }
        return (
            <div className="home-container">
                <div className="historia">
                    <div className="historia-texto">
                        <h3 className="titulo-historia">Nuestra Historia</h3>
                        <p>En Goxo Pastelería, cada pastelito cuenta una historia de pasión y dedicación. Desde nuestros primeros días hace más de 10 años, nos hemos comprometido a ofrecer un sabor único y auténtico en cada bocado. Nacimos con la idea de compartir con nuestros clientes no solo deliciosos pasteles, sino también momentos inolvidables de felicidad. Nos especializamos en sabores exclusivos y recetas artesanales, hechas con ingredientes frescos y de la mejor calidad. Cada pastel es una obra de arte que refleja nuestra dedicación a la tradición, pero con un toque innovador que hace que cada cliente vuelva por más. ¡Ven y descubre lo que significa disfrutar de un pastel como nunca antes!</p>
                    </div>
                    <img src="https://static.vecteezy.com/system/resources/previews/011/787/246/non_2x/cake-shop-logo-cupcake-and-berries-illustration-for-menu-recipe-book-baking-shop-cafe-restaurant-vector.jpg" alt="Historia" className="historia-img" />
                </div>

                <div>
                    <h3 className="titulo-productos">¡Descubre Nuestros Productos!</h3>
                    <Carousel indicators={false} nextIcon={<span aria-hidden="true" className="carousel-control-next-icon icono" />} prevIcon={<span aria-hidden="true" className="carousel-control-prev-icon icono" />}>
                        {productos.map((producto, index) => (
                            <Carousel.Item key={index}>
                                <Row className="justify-content-center">
                                            <div className="producto text-center">
                                                <img src={producto.imagen} alt={producto.nombre} className="producto-img img-fluid" />
                                                <h4>{producto.nombre}</h4>
                                                <p>{producto.descripcion}</p>
                                            </div>

                                </Row>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
            </div>
        );
    }

    export default Home;



