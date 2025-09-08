import React, { useState } from "react";
import "./Modal.css";

function RegisterModal({ onClose }) {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (!nombre || !correo || !password) {
      alert("Por favor completa todos los campos.");
      return;
    }
    alert(`¡Registrado como ${nombre}!`);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Registrarse</h2>
        <input
          type="text"
          placeholder="Nombre completo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="modal-input"
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className="modal-input"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="modal-input"
        />
        <button onClick={handleRegister} className="modal-button">Registrarse</button>
        <button onClick={onClose} className="modal-close">Cerrar</button>
      </div>
    </div>
  );
}

export default RegisterModal;