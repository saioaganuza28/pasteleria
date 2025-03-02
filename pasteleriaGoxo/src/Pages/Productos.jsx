import Producto from "../Componentes/Producto";

function Productos(productos) {
    return(
        <Container className="py-5">
        <Row className="gx-4 gx-lg-5 justify-content-center">
          {productos.map((product) => (
            product.descripcion
          ))}
        </Row>
      </Container>
    )
}

export default Productos