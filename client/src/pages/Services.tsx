import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Services() {
  const services = [
    {
      title: "Arquitectura Residencial",
      description:
        "Diseñamos viviendas exclusivas que combinan funcionalidad, estética y sostenibilidad. Cada proyecto residencial es único y refleja la personalidad y estilo de vida de nuestros clientes.",
      features: [
        "Diseño arquitectónico integral",
        "Planificación espacial optimizada",
        "Selección de materiales premium",
        "Supervisión de obra completa",
      ],
      image: "/images/residential.jpg",
    },
    {
      title: "Hoteles y Hospitalidad",
      description:
        "Creamos espacios hoteleros que ofrecen experiencias memorables. Desde hoteles boutique hasta resorts de lujo, diseñamos ambientes que combinan confort, elegancia y funcionalidad operativa.",
      features: [
        "Diseño de espacios públicos y privados",
        "Optimización de flujos operativos",
        "Experiencia de usuario integral",
        "Identidad visual coherente",
      ],
      image: "/images/hotel.jpg",
    },
    {
      title: "Restauración y Gastronomía",
      description:
        "Diseñamos restaurantes, bares y espacios gastronómicos que crean atmósferas únicas. Nuestros proyectos equilibran estética, acústica, iluminación y funcionalidad para ofrecer experiencias culinarias excepcionales.",
      features: [
        "Diseño de ambientes gastronómicos",
        "Planificación de cocinas profesionales",
        "Iluminación y acústica especializada",
        "Mobiliario y decoración a medida",
      ],
      image: "/images/restaurant.jpg",
    },
  ];

  return (
    <motion.div 
      className="min-h-screen flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navigation />

      <main className="bg-stone-200 min-h-screen pt-28">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-stone-200">
          <div className="container-full">
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-4 uppercase tracking-tight" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, letterSpacing: "-0.02em" }}>
              SERVICIOS
            </h1>
            <p className="text-base md:text-lg text-neutral-600 leading-relaxed max-w-3xl">
              Ofrecemos servicios integrales de arquitectura y diseño de
              interiores para proyectos de alto standing. Nuestro enfoque
              combina creatividad, funcionalidad y atención al detalle.
            </p>
          </div>
        </section>

        {/* Services Detail */}
        {services.map((service, index) => (
          <motion.section
            key={index}
            className="py-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="container-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div 
                  className={index % 2 === 0 ? "order-1" : "order-1 lg:order-2"}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h2 className="text-4xl mb-6">{service.title}</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                    {service.description}
                  </p>
                  <div className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <motion.div 
                        key={idx} 
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.3 + (idx * 0.1) }}
                      >
                        <div className="w-1.5 h-1.5 bg-foreground mt-2.5 flex-shrink-0" />
                        <p className="text-foreground">{feature}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                <motion.div 
                  className={index % 2 === 0 ? "order-2" : "order-2 lg:order-1"}
                  initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <motion.div 
                    className="relative h-96 lg:h-[500px] overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.section>
        ))}

        {/* CTA Section */}
        <section className="py-24 bg-foreground text-background">
          <div className="container text-center">
            <h2 className="text-4xl md:text-5xl mb-6">
              ¿Tienes un proyecto en mente?
            </h2>
            <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto">
              Nos encantaría conocer tus ideas y ayudarte a crear el espacio
              perfecto para tu proyecto.
            </p>
            <a
              href="/contacto"
              className="inline-block bg-background text-foreground px-8 py-4 text-base font-medium hover:opacity-90 transition-opacity"
            >
              Contactar
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </motion.div>
  );
}
