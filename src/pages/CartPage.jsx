import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();

  const total = cart.reduce(
    (sum, item) => sum + item.precio * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (!user) {
      toast.warn("⚠️ Inicia sesión para finalizar la compra", {
        position: "top-center",
        autoClose: 2500,
      });
      return;
    }

    if (cart.length === 0) {
      toast.info("🛍️ Tu carrito está vacío", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    toast.success("✅ Compra simulada completada con éxito", {
      position: "top-center",
      autoClose: 2500,
    });
    clearCart();
  };

  return (
    <div className="container my-5">
      <div className="card shadow-sm border-0 p-4 rounded-4">
        <h2 className="fw-bold text-success mb-4 text-center">
          🛍️ Tu Carrito de Compras
        </h2>

        {cart.length === 0 ? (
          <div className="text-center text-muted py-4">
            <p className="fs-5">Tu carrito está vacío 😔</p>
            <a href="/productos" className="btn btn-success mt-3">
              Compra Ahora
            </a>
          </div>
        ) : (
          <>
            <div className="table-responsive">
              <table className="table align-middle">
                <thead className="table-success text-center">
                  <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {cart.map((item) => (
                    <tr key={item.id}>
                      <td className="fw-semibold">{item.nombre}</td>
                      <td>S/. {item.precio.toFixed(2)}</td>
                      <td>{item.quantity}</td>
                      <td>S/. {(item.precio * item.quantity).toFixed(2)}</td>
                      <td>
                        <button
                          className="btn btn-outline-danger btn-sm rounded-pill"
                          onClick={() => removeFromCart(item.id)}
                        >
                          🗑️ Quitar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap gap-3">
              <h4 className="text-success fw-bold mb-0">
                Total: S/. {total.toFixed(2)}
              </h4>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-outline-secondary rounded-pill px-3"
                  onClick={clearCart}
                >
                  Vaciar carrito
                </button>
                <button
                  className="btn btn-success rounded-pill px-3"
                  onClick={handleCheckout}
                >
                  Finalizar compra
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
