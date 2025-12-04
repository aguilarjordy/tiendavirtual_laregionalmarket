import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import CartPage from "./pages/CartPage";
import InfoPage from "./pages/InfoPage";
import LoginPage from "./pages/LoginPage";
import FAQ from "./pages/Faq";

import { CartProvider } from "./context/CartContext";
import { AuthProvider, RequireAuth } from "./context/AuthContext";

// 🟢 Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <main className="flex-grow-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/productos" element={<Productos />} />
                <Route
                  path="/carrito"
                  element={
                    <RequireAuth>
                      <CartPage />
                    </RequireAuth>
                  }
                />
                <Route path="/info" element={<InfoPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/faq" element={<FAQ />} /> {/* <-- NUEVO */}
              </Routes>
            </main>
            <Footer />
          </div>

          {/* ✅ Contenedor global de notificaciones, con mejor configuración */}
          <ToastContainer
            position="top-center"
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            limit={2} // evita duplicados o toasts congelados
          />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}
