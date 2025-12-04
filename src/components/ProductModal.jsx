import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductModal({ product, onClose }) {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);

  // Cerrar con tecla Esc
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!product) return null;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!user) {
      toast.warn("⚠️ Debes iniciar sesión para agregar productos al carrito", {
        position: "top-center",
        autoClose: 2500,
      });
      return;
    }
    addToCart({ ...product, quantity });
    toast.success(`🛒 ${product.nombre} x${quantity} agregado al carrito`, {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
        style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal-content bg-white rounded-4 shadow-lg p-4 position-relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          style={{ maxWidth: "400px", width: "90%" }}
        >
          <button
            className="btn-close position-absolute top-0 end-0 m-3"
            onClick={onClose}
          ></button>

          <div className="text-center">
            <img
              src={product.imagen}
              alt={product.nombre}
              className="img-fluid rounded-3 mb-3"
              style={{ maxHeight: "250px", objectFit: "cover" }}
            />
            <h4 className="fw-bold text-success">{product.nombre}</h4>
            <p className="text-muted small mb-2">{product.descripcion}</p>
            <p className="fw-bold fs-5 mb-3">S/. {product.precio}</p>

            {/* Selector de cantidad */}
            <div className="d-flex justify-content-center align-items-center mb-3 gap-2">
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setQuantity(q => q + 1)}
              >
                +
              </button>
            </div>

            <button
              className="btn btn-success rounded-pill px-4 fw-semibold shadow-sm"
              onClick={handleAddToCart}
            >
              🛒 Agregar al carrito
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
