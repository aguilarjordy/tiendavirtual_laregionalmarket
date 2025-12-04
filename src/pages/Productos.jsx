import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import productos from "../data/productos.json";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";

export default function Productos() {
  const categorias = [
    "Todos",
    "Galletas",
    "Golosinas",
    "Abarrotes",
    "Superfoods",
    "Snacks",
    "Bebidas",
    "Licores",
    "Café",
    "Cacao",
  ];

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // 🛑 Bloquear scroll cuando hay modal abierto
  useEffect(() => {
    if (productoSeleccionado) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [productoSeleccionado]);

  const productosFiltrados = useMemo(() => {
    if (categoriaSeleccionada === "Todos") return productos;
    return productos.filter((p) =>
      p.categoria
        ? p.categoria.toLowerCase() === categoriaSeleccionada.toLowerCase()
        : false
    );
  }, [categoriaSeleccionada]);

  return (
    <section className="productos-section py-5">
      <div className="container">
        {/* 🔽 Encabezado */}
        <motion.h2
          className="text-center fw-bold text-success mb-3"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🌿 Nuestros Productos Regionales
        </motion.h2>

        <motion.p
          className="text-center text-muted mb-4 mx-auto"
          style={{ maxWidth: "600px" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Descubre lo mejor del Perú: productos naturales, artesanales y de
          origen sostenible, seleccionados con cuidado para ti.
        </motion.p>

        {/* 🔽 Selector de categoría */}
        <div className="row justify-content-center mb-4">
          <div className="col-md-6 d-flex align-items-center gap-2">
            <label htmlFor="categoria" className="fw-semibold mb-0">
              Filtrar por categoría:
            </label>
            <select
              id="categoria"
              className="form-select"
              value={categoriaSeleccionada}
              onChange={(e) => setCategoriaSeleccionada(e.target.value)}
            >
              {categorias.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 🔽 Lista de productos */}
        <div className="row g-4">
          {productosFiltrados.map((p, index) => (
            <div key={p.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <ProductCard
                  product={p}
                  onImageClick={() => setProductoSeleccionado(p)} // 📌 solo la imagen abre modal
                />
              </motion.div>
            </div>
          ))}

          {productosFiltrados.length === 0 && (
            <div className="col-12 text-center mt-4">
              <p>No hay productos en esta categoría.</p>
            </div>
          )}
        </div>
      </div>

      {/* 🔽 Modal de producto */}
      <ProductModal
        product={productoSeleccionado}
        onClose={() => setProductoSeleccionado(null)}
      />
    </section>
  );
}
