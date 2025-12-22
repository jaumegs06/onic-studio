import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Services() {
  const services = [
    {
      title: "Conocimiento del material desde su origen hasta su aplicación",
      description:
        "Asesoramos en la selección y uso de piedra natural, porcelánicos técnicos, cuarzos y solid surface, evaluando cada proyecto según su uso, entorno y exigencias técnicas.",
      features: [
        "Selección de materiales según origen y prestaciones",
        "Comparativa técnica entre materiales",
        "Recomendaciones según clima, tránsito y mantenimiento",
        "Definición del material más adecuado para cada aplicación",
      ],
      image: "/images/services/technical-advisory.jpg",
    },
    {
      title: "Soluciones técnicas y acompañamiento en obra",
      description:
        "Desarrollamos soluciones técnicas para la correcta aplicación de los materiales en obra, anticipando incidencias y optimizando los sistemas constructivos. Trabajamos junto a arquitectos, interioristas, constructores y proveedores, tanto a nivel local como internacional.",
      features: [
        "Sistemas de colocación y anclaje",
        "Definición de espesores, formatos y acabados",
        "Resolución de encuentros y detalles constructivos",
        "Asistencia técnica durante la ejecución",
      ],
      image: "/images/services/technical-execution.jpg",
    },
    {
      title: "Piedra natural en proyectos",
      description:
        "Aplicación técnica y control del material. Aplicamos piedra natural en proyectos residenciales, hoteleros, comerciales y contract, cuidando su comportamiento técnico y su integración en cada contexto.",
      features: [
        "Interior y exterior",
        "Zonas de alto tránsito",
        "Espacios húmedos y fachadas",
        "Proyectos en distintos países y climas",
      ],
      image: "/images/services/natural-stone-projects.png",
    },
    {
      title: "Porcelánico de gran formato",
      description:
        "Precisión técnica y control en obra. Nos hemos especializado en la aplicación de porcelánico de gran formato, respondiendo a las exigencias del diseño contemporáneo y a las necesidades funcionales del proyecto.",
      features: [
        "Aplacados y solados de gran formato",
        "Superficies continuas",
        "Definición de sistemas de colocación",
        "Resolución técnica de juntas y encuentros",
      ],
      image: "/images/services/large-format-porcelain.png",
    },
    {
      title: "Encimeras y superficies técnicas",
      description:
        "Materiales adecuados para un uso intensivo. Trabajamos con encimeras y superficies técnicas en porcelánico, cuarzo técnico y solid surface, ofreciendo soluciones precisas, resistentes y adaptadas al uso real.",
      features: [
        "Encimeras de cocina en porcelánico",
        "Superficies en cuarzo técnico",
        "Solid surface para soluciones continuas",
        "Asesoramiento técnico y ejecución",
      ],
      image: "/images/services/technical-surfaces.jpg",
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
        <section className="py-16 md:py-24 bg-stone-200">
          <div className="container-full">
            <motion.h1
              initial={{ filter: "blur(10px)", opacity: 0 }}
              animate={{ filter: "blur(0px)", opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-4 uppercase tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 300, letterSpacing: "-0.03em" }}
            >
              SERVICIOS
            </motion.h1>
            <div className="text-base md:text-lg text-neutral-600 leading-relaxed max-w-4xl space-y-4">
              <p>
                Especialistas en piedra natural y materiales técnicos aplicados a proyectos reales, en cualquier parte del mundo.
              </p>
              <p>
                En ONICE STUDIO contamos con experiencia internacional trabajando con piedra natural de distintos orígenes y materiales técnicos de última generación.
              </p>
              <p>
                Aportamos conocimiento del material, criterio técnico y soluciones constructivas reales, acompañando al proyecto desde la selección del material hasta su correcta ejecución en obra.
              </p>
            </div>
          </div>
        </section>

        {/* Services Detail */}
        {services.map((service, index) => (
          <motion.section
            key={index}
            className="py-24 bg-white"
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
            <motion.a
              href="/contacto"
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ duration: 0.3 }}
              className="inline-block border border-white px-10 py-4 uppercase tracking-wider text-sm text-white hover:bg-white hover:text-black transition-colors duration-300"
            >
              Contactar
            </motion.a>
          </div>
        </section>
      </main>

      <Footer />
    </motion.div>
  );
}
