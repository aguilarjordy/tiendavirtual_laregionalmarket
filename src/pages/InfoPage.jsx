import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function InfoPage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 250);
    return () => clearTimeout(timer);
  }, []);

  if (!loaded) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-success">
        <div className="spinner-border text-success mb-3" role="status"></div>
        <p className="fw-semibold">Cargando información...</p>
      </div>
    );
  }

  return (
    <div className="container my-5">
      {/* Título principal */}
      <motion.h2
        className="text-center text-success fw-bold mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Sobre Nosotros
      </motion.h2>

      {/* Propósito */}
      <motion.section
        className="mb-5"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <h4 className="fw-bold text-success mb-3">Nuestro propósito</h4>
        <p>
          En <strong>La Regional Market</strong> buscamos acercar a las personas a lo
          mejor del Perú: sus sabores, su tradición y su identidad. Queremos demostrar
          que los productos regionales pueden tener un espacio moderno, accesible y con
          un profundo respeto por sus raíces.
        </p>

        <p>
          Nuestro objetivo principal es <strong>evaluar la viabilidad comercial</strong> y
          las preferencias de consumo del público que disfruta de lo auténtico, a través
          de un minimarket especializado en <strong>productos tradicionales peruanos</strong>.
        </p>

        <h5 className="fw-semibold text-success mt-4">Objetivos específicos</h5>
        <ul className="ms-3">
          <li>
            Analizar los <strong>hábitos y motivaciones</strong> de los consumidores al
            elegir productos locales y naturales.
          </li>
          <li>
            Identificar el nivel de <strong>aceptación y disposición de compra</strong> por
            productos tradicionales ofrecidos en un formato moderno y sostenible.
          </li>
        </ul>
      </motion.section>

      {/* Público objetivo */}
      <motion.section
        className="mb-5"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <h4 className="fw-bold text-success mb-3">Nuestro público</h4>
        <p>
          Nos dirigimos a <strong>jóvenes y adultos entre 25 y 55 años</strong> que viven
          en zonas urbanas y sienten orgullo por la cultura peruana. Personas que buscan
          productos <strong>auténticos, artesanales y naturales</strong>, con un origen
          responsable y una historia detrás de cada sabor.
        </p>
        <p>
          También pensamos en los <strong>turistas nacionales y extranjeros</strong> que
          desean llevarse un pedacito del Perú consigo, y en los <strong>consumidores
          conscientes</strong> que valoran la procedencia, la calidad y la sostenibilidad
          de cada producto que eligen.
        </p>
      </motion.section>

      {/* Enfoque */}
      <motion.section
        className="mb-5"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
      >
        <h4 className="fw-bold text-success mb-3">Nuestro enfoque</h4>
        <p>
          El proyecto combina lo mejor de dos perspectivas para comprender a nuestros
          clientes y su relación con los productos tradicionales:
        </p>
        <ul className="ms-3">
          <li>
            <strong>Cualitativo:</strong> Nos permite conocer las emociones, percepciones
            y opiniones sobre la identidad cultural y el valor de lo hecho en el Perú.
          </li>
          <li>
            <strong>Cuantitativo:</strong> Nos ayuda a medir hábitos de compra, niveles de
            gasto y el grado de aceptación del concepto de minimarket temático.
          </li>
        </ul>
        <p>
          Con este enfoque mixto, buscamos ofrecer una propuesta que no solo venda
          productos, sino que <strong>promueva orgullo, conexión y sostenibilidad</strong>.
        </p>
      </motion.section>

      {/* Banner final */}
      <motion.section
        className="mt-5 rounded-4 shadow overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{
          backgroundImage:
            "url('https://www.alpacaexpeditions.com/wp-content/uploads/smart-scaled.webp')", // 🔸 banner horizontal (1920x640 aprox)
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "400px",
          position: "relative",
        }}
      >
        <div
          className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center text-white text-center"
          style={{
            backgroundColor: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(2px)",
            padding: "2rem",
          }}
        >
          <h3 className="fw-bold mb-3 display-6">
            Conectamos el sabor del Perú contigo 🇵🇪
          </h3>
          <p className="lead fw-medium" style={{ maxWidth: "800px" }}>
            Porque cada producto cuenta una historia, y cada sabor nos une a nuestras raíces.
          </p>
        </div>
      </motion.section>
    </div>
  );
}
