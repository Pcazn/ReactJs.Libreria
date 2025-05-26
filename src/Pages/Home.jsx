import React, { useEffect, useState } from "react";
import ProductList from "../components/ProductList";

export default function Home({ addToCart }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://68335fe8464b499636ff407d.mockapi.io/api/libros/Libros")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar los libros");
        return res.json();
      })
      .then((data) => {
        setProductos(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Cargando libros...</p>;
  if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

  return (
    <div className="home-container">
      <h1 className="home-title">Librería Vilela </h1>
      <ProductList productos={productos} addToCart={addToCart} />
    </div>
  );
}

