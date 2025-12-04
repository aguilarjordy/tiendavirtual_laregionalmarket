import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../index.css";

export default function ProductCard({ product, onImageClick }) {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAddToCart = (e) => {
    e.stopPropagation(); // evita que clic en botón abra modal
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
    <div className="card product-card h-100 border-0 rounded-4 overflow-hidden shadow-sm">
      <div
        className="product-image-wrapper"
        onClick={onImageClick}
        style={{ cursor: "pointer" }}
      >
        <img
          src={product.imagen}
          className="card-img-top product-image"
          alt={product.nombre}
        />
      </div>

      <div className="card-body text-center">
        <h5 className="card-title fw-bold text-success mb-2">{product.nombre}</h5>
        <p className="text-muted small mb-2">{product.descripcion}</p>
        <p className="card-text fw-bold fs-5 mb-3">S/. {product.precio}</p>

        {/* Selector de cantidad */}
        <div className="d-flex justify-content-center align-items-center mb-2 gap-2">
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
    </div>
  );
}
