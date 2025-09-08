 import React, { useState } from "react";
import logo from "./assets/Logo.jpg";
import vipImg from "./assets/vip.jpg";
import vip1 from "./assets/vip1.jpg";
import ca1 from "./assets/ca1.jpg";
import ca2 from "./assets/ca2.jpg";
import ca3 from "./assets/ca3.jpg";
import ca4 from "./assets/ca4.jpg";
import ca5 from "./assets/ca5.jpg";
import ca6 from "./assets/ca6.jpg";

import "./App.css";

import LoginModal from "./components/LoginModal";
import RegisterModal from "./components/RegisterModal";

function App() {
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [mostrarRegistro, setMostrarRegistro] = useState(false);

  const entradas = [
    { id: 1, nombre: 'Entrada Vip', precio: 120, imagen: vipImg, descripcion: ["Acesso ", "aceso general"] },
    { id: 2, nombre: 'Entrada Premium', precio: 70, imagen: 'https://via.placeholder.com/150x100?text=VIP' },
    { id: 3, nombre: 'Entrada Paseo', precio: 30, imagen: 'https://via.placeholder.com/150x100?text=Niño' },
    { id: 4, nombre: 'Entrada Niños', precio: 30, imagen: 'https://via.placeholder.com/150x100?text=Familiar' },
  ];
  

  const imagenesCarrusel = [
    "Carrusel.png",
    vip1, ca1, ca2, ca3, ca4, ca5, ca6
  ];

  const [imagenActual, setImagenActual] = useState(0);
  const [carrito, setCarrito] = useState([]);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [mostrarQR, setMostrarQR] = useState(false);

  const siguienteImagen = () => {
    setImagenActual((prev) => (prev + 1) % imagenesCarrusel.length);
  };

  const anteriorImagen = () => {
    setImagenActual((prev) => (prev - 1 + imagenesCarrusel.length) % imagenesCarrusel.length);
  };

  const agregarAlCarrito = (entrada) => {
    const existe = carrito.find((item) => item.id === entrada.id);
    if (existe) {
      setCarrito(carrito.map((item) =>
        item.id === entrada.id ? { ...item, cantidad: item.cantidad + 1 } : item
      ));
    } else {
      setCarrito([...carrito, { ...entrada, cantidad: 1 }]);
    }
    setMostrarQR(false);
  };

  const quitarDelCarrito = (id) => {
    setCarrito(
      carrito
        .map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    setMostrarQR(false);
  };

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const finalizarCompra = () => {
    if (!nombre || !correo) {
      alert("Por favor completa tus datos.");
      return;
    }
    if (carrito.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }
    setMostrarQR(true);
    setCarrito([]);
    setNombre("");
    setCorreo("");
  };

  return (
    <div className="app-container">
      {/* ENCABEZADO */}
      <header className="header">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <h1 className="titulo-header">Cupe Mundo Acuático</h1>
        <div className="acciones">
          <button className="btn-header" onClick={() => setMostrarLogin(true)}>Iniciar sesión</button>
          <button className="btn-header" onClick={() => setMostrarRegistro(true)}>Registrarse</button>
        </div>
      </header>

      {/* MODALES */}
      {mostrarLogin && <LoginModal onClose={() => setMostrarLogin(false)} />}
      {mostrarRegistro && <RegisterModal onClose={() => setMostrarRegistro(false)} />}

      {/* CARRUSEL */}
      <div className="carrusel-container">
        <button onClick={anteriorImagen} className="carrusel-boton">⬅️</button>
        <img src={imagenesCarrusel[imagenActual]} alt="Carrusel" className="carrusel-img" />
        <button onClick={siguienteImagen} className="carrusel-boton">➡️</button>
      </div>

      {/* ENTRADAS */}
      <h2 
      className="titulo-entradas-agua">Venta de entradas</h2>

      <div className="entradas-grid">
        {entradas.map((entrada) => (
          <div key={entrada.id} className="entrada-card">
            <img src={entrada.imagen} alt={entrada.nombre} className="entrada-img" />
            <h3>{entrada.nombre}</h3>
            <p className="precio">Bs {entrada.precio}</p>
            <p className="descripcion">{entrada.descripcion}</p>
            <button className="btn agregar" onClick={() => agregarAlCarrito(entrada)}>Agregar</button>
          </div>
        ))}
      </div>

      {/* CARRITO */}
      <div className="carrito-container">
        <h2>🛒 Carrito</h2>
        {carrito.length === 0 ? (
          <p className="carrito-vacio">No hay entradas agregadas.</p>
        ) : (
          <ul className="carrito-lista">
            {carrito.map((item) => (
              <li key={item.id}>
                {item.nombre} x{item.cantidad} - Bs {item.precio * item.cantidad}
                <button onClick={() => quitarDelCarrito(item.id)} className="btn eliminar">X</button>
              </li>
            ))}
          </ul>
        )}

        {carrito.length > 0 && (
          <button onClick={vaciarCarrito} className="btn vaciar">Vaciar Carrito</button>
        )}

        <p className="total">Total: Bs {total}</p>

        <input
          type="text"
          placeholder="Tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="input"
        />
        <input
          type="email"
          placeholder="Tu correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className="input"
        />
        <button onClick={finalizarCompra} className="btn finalizar">Comprar</button>

        {mostrarQR && (
          <div className="qr-container">
            <h3>✅ ¡Gracias por tu compra!</h3>
            <p>Presenta este código al ingresar:</p>
            <img src="https://api.qrserver.com/v1/create-qr-code/?data=EntradaParqueAventura&size=150x150" alt="QR" />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
