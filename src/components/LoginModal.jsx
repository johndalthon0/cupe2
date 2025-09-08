import React, { useState } from "react";
import "./Modal.css";

function LoginModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      alert("Por favor completa todos los campos.");
      return;
    }
    alert(`¡Bienvenido ${email.split("@")[0]}!`);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Iniciar sesión</h2>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="modal-input"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="modal-input"
        />
        <button onClick={handleLogin} className="modal-button">Entrar</button>
        <button onClick={onClose} className="modal-close">Cerrar</button>
      </div>
    </div>
  );
}

export default LoginModal;