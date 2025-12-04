import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-success text-white mt-5 pt-4 pb-2">
      <div className="container text-center text-md-start">
        <div className="row align-items-center">
          {/* Columna 1: nombre y descripción */}
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">🌿 La Regional Market</h5>
            <p className="small mb-0">
              Productos originarios del Perú, conectando tradición y sabor con el mundo.
            </p>
          </div>

          {/* Columna 2: secciones */}
          <div className="col-md-4 mb-3">
            <h6 className="fw-semibold">Secciones</h6>
            <ul className="list-unstyled small">
              <li>
                <a href="/productos" className="text-white text-decoration-none footer-link">
                  Productos
                </a>
              </li>
              <li>
                <a href="/info" className="text-white text-decoration-none footer-link">
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="/faq" className="text-white text-decoration-none footer-link">
                  Preguntas Frecuentes
                </a>
              </li>
              <li>
                <a href="/contacto" className="text-white text-decoration-none footer-link">
                  Contacto
                </a>
              </li>
              <li>
                <a href="/ayuda" className="text-white text-decoration-none footer-link">
                  Ayuda
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: redes sociales */}
          <div className="col-md-4 mb-3 text-center text-md-end">
            <h6 className="fw-semibold">Síguenos en nuestras redes:</h6>
            <div className="d-flex justify-content-center justify-content-md-end gap-3 fs-4 mt-2">
              <a
                href="https://www.facebook.com/laregionalmarket?locale=es_LA"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                title="Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.instagram.com/LaRegionalMarket"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                title="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.tiktok.com/@laregionalmarket"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                title="TikTok"
              >
                <FaTiktok />
              </a>
              <a
                href="https://wa.me/51958700568"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                title="WhatsApp"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>

        {/* Línea de contacto */}
        <div className="text-center mt-4 small">
          <p className="mb-1">
            <FaEnvelope className="me-2" />
            <a
              href="mailto:laregionalmarket@gmail.com"
              className="text-white text-decoration-none footer-link"
            >
              laregionalmarket@gmail.com
            </a>
          </p>
          <p className="mb-0">
            <FaWhatsapp className="me-2" />
            <a
              href="https://wa.me/51958700568"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-decoration-none footer-link"
            >
              +51 958 700 568
            </a>
          </p>
        </div>

        {/* Línea final */}
        <hr className="border-light mt-4" />
        <p className="text-center small mb-0">
          © {new Date().getFullYear()} La Regional Market – Productos originarios del Perú 🇵🇪
        </p>
      </div>

      {/* Estilos personalizados */}
      <style>{`
        .social-icon {
          color: white;
          transition: transform 0.25s ease, color 0.25s ease;
        }
        .social-icon:hover {
          transform: scale(1.2);
        }
        .social-icon[title="Facebook"]:hover {
          color: #1877f2;
        }
        .social-icon[title="Instagram"]:hover {
          color: #e4405f;
        }
        .social-icon[title="TikTok"]:hover {
          color: #000000;
        }
        .social-icon[title="WhatsApp"]:hover {
          color: #25d366;
        }
        .footer-link {
          transition: color 0.2s ease;
        }
        .footer-link:hover {
          color: #d9ffd6;
          text-decoration: underline;
        }
      `}</style>
    </footer>
  );
}
