import { useState } from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import { useEffect } from 'react';

function CantidadSelector({ cantidadInicial, onCantidadChange }) {
  const [cantidad, setCantidad] = useState(cantidadInicial);

  useEffect(() => {
    setCantidad(cantidadInicial)
  }, [cantidadInicial])
  const incrementar = () => {
    setCantidad(prev => {
      const nuevaCantidad = prev + 1;
      onCantidadChange(nuevaCantidad); 
      return nuevaCantidad;
    });
  };

  const decrementar = () => {
    if (cantidad > 1) {
      setCantidad(prev => {
        const nuevaCantidad = prev - 1;
        onCantidadChange(nuevaCantidad); 
        return nuevaCantidad;
      });
    }
  };

  return (
    <InputGroup style={{ width: '150px' }}>
      <Button variant="outline-secondary" onClick={decrementar}>−</Button>
      <FormControl
        value={cantidad}
        onChange={(e) => {
          let value = parseInt(e.target.value) || 0;
          setCantidad(value);
          onCantidadChange(value);
        }}
        className="text-center"
      />
      <Button variant="outline-secondary" onClick={incrementar}>+</Button>
    </InputGroup>
  );
}

export default CantidadSelector;
