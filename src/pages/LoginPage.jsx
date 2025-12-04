import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      setError("Por favor ingresa tu nombre y correo.");
      return;
    }

    login(name.trim(), email.trim());

    toast.dismiss(); // elimina cualquier toast anterior
    toast.success(`🌿 ¡Bienvenido, ${name.trim()}!`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "colored",
    });

    setTimeout(() => navigate(from, { replace: true }), 800);
  };

  return (
    <div className="container my-5">
      <motion.div
        className="mx-auto"
        style={{ maxWidth: 480 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="card shadow-sm rounded-4 p-4">
          <h3 className="text-center text-success mb-3">
            Iniciar sesión (simulado)
          </h3>
          <p className="text-muted text-center small mb-3">
            Para simular compras, por favor inicia sesión con tu nombre y correo.
          </p>

          <form onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger py-2">{error}</div>}

            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                className="form-control"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError("");
                }}
                placeholder="Tu nombre"
                autoFocus
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Correo</label>
              <input
                className="form-control"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                placeholder="correo@ejemplo.com"
                type="email"
              />
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <button type="submit" className="btn btn-success">
                Iniciar sesión
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => navigate("/", { replace: true })}
              >
                Cancelar
              </button>
            </div>
          </form>

          <p className="text-center text-muted small mt-3 mb-0">
            (Simulación) No se envían datos a servidores externos.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
