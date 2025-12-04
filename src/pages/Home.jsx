import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const imagenes = [
    "https://i.imgur.com/d01qvRG.jpeg", // Imagen 1
    "https://i.imgur.com/RGVdw6z.jpeg", // Imagen 2
    "https://i.imgur.com/cvCmhQC.jpeg", // Imagen 3
    "https://i.imgur.com/h37QD63.jpeg", // Imagen 4
    "https://i.imgur.com/DfW1ZAD.jpeg", // Imagen 5
    "https://i.imgur.com/zR2eCmx.jpeg", // Imagen 6
    "https://i.imgur.com/hr49U8x.jpeg", // Imagen 7
    "https://i.imgur.com/kwM8JBG.jpeg", // Imagen 8
    "https://i.imgur.com/XRIEI2w.jpeg", // Imagen 9
  ];

  const [loaded, setLoaded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); 
  const totalGrupos = Math.ceil(imagenes.length / 3); 

  // Carga de imágenes (Igual que antes)
  useEffect(() => {
    let loadedCount = 0;
    imagenes.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = img.onerror = () => {
        loadedCount++;
        if (loadedCount === imagenes.length) setLoaded(true);
      };
    });
  }, []);

  // Lógica del temporizador para la secuencia automática
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        // Avanza 3 posiciones
        const nextIndex = prevIndex + 3;
        return nextIndex >= imagenes.length ? 0 : nextIndex;
      });
    }, 4500); 

    return () => clearInterval(timer);
  }, [imagenes.length]);

  // Función para cambiar de grupo manualmente
  const goToGroup = (groupIndex) => {
    setCurrentIndex(groupIndex * 3); 
  };

  if (!loaded) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-success">
        <div className="spinner-border text-success mb-3" role="status"></div>
        <p className="fw-semibold">Cargando contenido...</p>
        </div>
    );
  }

  return (
    <div className="container my-5">
      {/* Encabezado (Igual que antes) */}
      <motion.section
        className="text-center mb-5 pb-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="fw-bold text-success mb-3">
          Bienvenido a La Regional Market
        </h1>
        <p className="text-muted mx-auto" style={{ maxWidth: "700px" }}>
          “La Regional” es un minimarket temático peruano que ofrece productos
          tradicionales, artesanales y gastronómicos de todas las regiones del Perú.
        </p>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link to="/productos" className="btn btn-success btn-lg mt-3 shadow">
            Comprar Ahora
          </Link>
        </motion.div>
      </motion.section>

      {/* Beneficios (Igual que antes) */}
      <motion.section
        className="bg-light rounded-4 shadow-sm p-4 p-md-5 mb-5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h3 className="text-center text-success fw-bold mb-4">
          Beneficios de comprar en La Regional Market 🍃
        </h3>
        <div className="row g-4">
          {[
            { titulo: "Apoyo al productor local", texto: "Cada compra impulsa a pequeños agricultores." },
            { titulo: "Productos auténticos", texto: "Alimentos y bebidas con recetas tradicionales." },
            { titulo: "Calidad y frescura", texto: "Seleccionamos cuidadosamente los productos." },
            { titulo: "Cultura en cada detalle", texto: "Cada producto cuenta una historia de su origen." },
          ].map((beneficio, i) => (
            <div key={i} className="col-12 col-md-6 col-lg-3 text-center">
              <div className="p-3 bg-white rounded-4 shadow-sm h-100">
                <h5 className="fw-semibold text-success mb-2">{beneficio.titulo}</h5>
                <p className="text-muted small">{beneficio.texto}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* --- SECUENCIA DE IMÁGENES (3x3 con Espacio) --- */}
      <section className="text-center">
        <h3 className="text-success mb-4 fw-semibold">
          Conoce un poco de nuestra esencia
        </h3>
        
        <div 
          className="mx-auto position-relative overflow-hidden rounded-4 shadow-lg p-2" 
          style={{ maxWidth: "800px", height: "300px", backgroundColor: "#f0f0f0" }} 
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex} 
              className="w-100 h-100 d-flex gap-2" 
              
              initial={{ opacity: 0, x: 100 }} 
              animate={{ opacity: 1, x: 0 }}   
              exit={{ opacity: 0, x: -100 }}   
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {/* Mapeamos desde currentIndex hasta currentIndex + 3 */}
              {imagenes.slice(currentIndex, currentIndex + 3).map((src, index) => (
                <img
                  key={currentIndex + index} 
                  src={src}
                  alt={`Slide ${currentIndex + index}`}
                  className="h-100 rounded-3 shadow-sm"
                  style={{ 
                        objectFit: "cover", 
                        // Fórmula para 3 imágenes con gap-2 (0.5rem)
                        width: 'calc(33.333% - 0.333rem)' 
                    }}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Indicadores (Puntos opcionales debajo) */}
          <div className="position-absolute bottom-0 start-50 translate-middle-x mb-3 d-flex gap-2">
            {/* Iteramos sobre el número de grupos */}
            {Array.from({ length: totalGrupos }).map((_, groupIndex) => (
              <div 
                key={groupIndex}
                onClick={() => goToGroup(groupIndex)}
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: groupIndex * 3 === currentIndex ? "#198754" : "rgba(255,255,255,0.7)",
                  cursor: "pointer",
                  transition: "background 0.3s"
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}