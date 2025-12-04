import { NavLink, Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";

export default function Navbar() {
  const { cart = [] } = useCart() || {};
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  // 🔥 Animación en navbar + sticky
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeNavIfOpen = () => {
    const collapseEl = document.getElementById("navMenu");
    if (collapseEl?.classList.contains("show")) {
      collapseEl.classList.remove("show");
      document
        .querySelector(".navbar-toggler")
        ?.setAttribute("aria-expanded", "false");
    }
  };

  const handleLogin = () => {
    closeNavIfOpen();
    navigate("/login");
  };

  const handleLogout = () => {
    logout();
    closeNavIfOpen();

    toast.dismiss();
    toast.info("👋 Sesión cerrada correctamente", {
      position: "top-center",
      autoClose: 2000,
      theme: "colored",
    });

    setTimeout(() => navigate("/", { replace: true }), 700);
  };

  const userName =
    user && typeof user === "object" && typeof user.name === "string"
      ? user.name
      : null;

  // ⛔ Evita error mientras carga AuthContext
  if (loading) {
    return (
      <nav
        className="navbar bg-success fixed-top d-flex justify-content-center py-3 shadow-sm"
        style={{ opacity: 0.8 }}
      >
        <div className="spinner-border text-light" role="status"></div>
      </nav>
    );
  }

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-dark bg-success shadow-sm fixed-top ${
        scrolled ? "navbar-scrolled" : ""
      } navbar-anim`}
      style={{ transition: "all .3s ease" }}
    >
      <div className="container">
        <Link
          className="navbar-brand fw-bold d-flex align-items-center gap-2"
          to="/"
          onClick={closeNavIfOpen}
          style={{ transition: "transform .2s" }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <img
            src={logo}
            alt="Logo La Regional Market"
            width="40"
            height="40"
            className="rounded-circle border border-light"
            style={{ objectFit: "cover" }}
          />
          LA REGIONAL MARKET
        </Link>

        <button
          className="navbar-toggler shadow-sm"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
          aria-controls="navMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-1">
            <li className="nav-item">
              <NavLink className="nav-link nav-anim" to="/" onClick={closeNavIfOpen}>
                <i className="bi bi-house-door"></i> Inicio
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link nav-anim" to="/productos" onClick={closeNavIfOpen}>
                <i className="bi bi-bag"></i> Productos
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link nav-anim" to="/info" onClick={closeNavIfOpen}>
                <i className="bi bi-info-circle"></i> Información
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link nav-anim" to="/faq" onClick={closeNavIfOpen}>
                <i className="bi bi-question-circle"></i> Preguntas Frecuentes
              </NavLink>
            </li>

            {/* 🛒 Carrito */}
            <li className="nav-item ms-lg-3">
              <Link
                to="/carrito"
                className="btn btn-light position-relative rounded-pill d-flex align-items-center gap-2 nav-btn-anim"
                onClick={closeNavIfOpen}
              >
                <i className="bi bi-cart3 fs-5"></i>
                Carrito
                {cart.length > 0 && (
                  <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                    {cart.length}
                  </span>
                )}
              </Link>
            </li>

            {/* 👤 Sesión */}
            <li className="nav-item ms-lg-3">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-light rounded-pill d-flex align-items-center gap-2 nav-btn-anim"
                >
                  <i className="bi bi-box-arrow-right fs-5"></i>
                  {userName || "Usuario"}
                </button>
              ) : (
                <button
                  onClick={handleLogin}
                  className="btn btn-outline-light rounded-pill d-flex align-items-center gap-2 nav-btn-anim"
                >
                  <i className="bi bi-person-circle fs-5"></i>
                  Iniciar Sesión
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
