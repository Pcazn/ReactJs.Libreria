import React, { useState, useEffect } from "react";
import "../App.css"; 

export default function ProductList({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://68335fe8464b499636ff407d.mockapi.io/api/libros/Libros")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar productos");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Cargando productos...</p>;
  if (error) return <p style={{ color: "red", textAlign: "center" }}>Error: {error}</p>;

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.avatar} alt={product.Nombre} />
          <strong>{product.Nombre}</strong>
          <p>{product.Descripcion}</p>
          <p>${parseFloat(product.Precio).toLocaleString("es-AR")}</p>
          <button onClick={() => addToCart(product)}>Agregar al carrito</button>
        </div>
      ))}
    </div>
  );
}

