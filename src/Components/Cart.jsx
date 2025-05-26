import React from "react";

function Cart({ cart, removeFromCart }) {
  if (!Array.isArray(cart) || cart.length === 0) {
    return <p>El carrito está vacío.</p>;
  }

  // Calcular el total
  const total = cart.reduce((sum, item) => {
    const quantity = item.quantity || 1;
    const price = parseFloat(item.Precio);
    return sum + quantity * price;
  }, 0);

  return (
    <div>
      <h2>Carrito</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={item.id || index}>
            {item.Nombre} x {item.quantity || 1} - $
            {(parseFloat(item.Precio) * (item.quantity || 1)).toLocaleString("es-AR")}
            {" "}
            <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <h3>Total: ${total.toLocaleString("es-AR")}</h3>
    </div>
  );
}

export default Cart;
