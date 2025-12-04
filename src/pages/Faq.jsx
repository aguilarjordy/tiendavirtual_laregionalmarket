import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const preguntasFrecuentes = [
  {
    pregunta: "¿Cómo puedo hacer un pedido?",
    respuesta:
      "Puedes navegar por nuestros productos, agregar al carrito la cantidad deseada y luego completar tu compra desde la página del carrito.",
  },
  {
    pregunta: "¿Hacen envíos a todo el Perú?",
    respuesta:
      "Sí, realizamos envíos a nivel nacional. Los costos y tiempos de entrega se calcularán en el carrito según tu ubicación.",
  },
  {
    pregunta: "¿Puedo modificar mi pedido después de hacerlo?",
    respuesta:
      "Una vez realizado el pedido, no podemos garantizar cambios. Por favor revisa tu carrito antes de confirmar la compra.",
  },
  {
    pregunta: "¿Qué métodos de pago aceptan?",
    respuesta:
      "El objetivo es aceptar tarjetas de crédito, débito y pagos mediante transferencia bancaria o plataformas de pago locales (De momento esta página se encuentra en desarrollo).",
  },
  {
    pregunta: "¿Qué hago si un producto llega dañado?",
    respuesta:
      "Contáctanos de inmediato vía nuestro formulario de contacto o correo electrónico. Evaluaremos la situación y coordinaremos un reemplazo o reembolso.",
  },
];

// Definición de las variantes de animación para la respuesta.
// Duración de 2 segundos para un efecto MUY suave y notorio.
const collapseVariants = {
    closed: { 
        opacity: 0, 
        height: 0, 
        transition: { 
            duration: 2, 
            ease: "easeInOut" 
        } 
    },
    open: { 
        opacity: 1, 
        height: "auto", // Importante para que Framer Motion calcule la altura real
        transition: { 
            duration: 2, 
            ease: "easeInOut" 
        } 
    },
};

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-5" style={{ minHeight: "80vh" }}>
      <div className="container">
        {/* Título con animación de entrada */}
        <motion.h2
          className="text-center fw-bold text-success mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🌿 Preguntas Frecuentes
        </motion.h2>

        <motion.div
          className="accordion"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
            {/* AnimatePresence permite que el componente de respuesta ejecute la animación 'exit' antes de desmontarse */}
            <AnimatePresence initial={false}>
          {preguntasFrecuentes.map((item, index) => (
            <div className="accordion-item mb-2" key={index}>
              <h2 className="accordion-header">
                <button
                  className={`accordion-button ${
                    openIndex === index ? "" : "collapsed"
                  } fw-semibold text-success`}
                  type="button"
                  onClick={() => toggle(index)}
                  style={{ cursor: "pointer" }}
                >
                  {item.pregunta}
                </button>
              </h2>
                {/* Renderizado condicional de la respuesta */}
                {openIndex === index && (
                    <motion.div
                        variants={collapseVariants}
                        initial="closed"
                        animate="open"
                        exit="closed" 
                        // 🟢 ¡CLAVE! Eliminamos la clase 'accordion-collapse' para que Framer Motion controle la altura.
                        // Aplicamos el overflow y un borde para mantener la apariencia de Bootstrap.
                        style={{ overflow: "hidden", borderTop: '1px solid #dee2e6' }} 
                    >
                        {/* Usamos accordion-body para el padding y el estilo de texto */}
                        <div className="accordion-body text-muted">{item.respuesta}</div>
                    </motion.div>
                )}
            </div>
          ))}
            </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}