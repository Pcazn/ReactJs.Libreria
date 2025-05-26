import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home.jsx";
import Profile from "./Pages/Profile.jsx";
import Cart from "./Components/Cart.jsx";
import ProtectedRoute from "./Components/ProtectedRoute"; // <-- Importalo
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // <-- simulación

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== productId));
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar cartItemCount={cart.reduce((acc, item) => acc + item.quantity, 0)} />
        <main>
          <Routes>
            <Route path="/" element={<Home addToCart={addToCart} />} />
            
            {/* 🔒 Ruta protegida */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/cart"
              element={<Cart cart={cart} removeFromCart={removeFromCart} />}
            />
          </Routes>

          {/* 🔘 Simular login/logout (solo para pruebas) */}
          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <button onClick={() => setIsAuthenticated(!isAuthenticated)}>
              {isAuthenticated ? "Cerrar sesión" : "Iniciar sesión"}
            </button>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
