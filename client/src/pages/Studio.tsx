import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Studio() {
  const values = [
    {
      title: "Criterio técnico",
      description:
        "Decidimos desde el conocimiento del material y la experiencia en obra.",
    },
    {
      title: "Honestidad material",
      description:
        "Cada material se utiliza por lo que es y para lo que sirve.",
    },
    {
      title: "Experiencia real",
      description:
        "Soluciones contrastadas en proyectos ejecutados, en distintos contextos y países.",
    },
    {
      title: "Colaboración",
      description:
        "Trabajamos en equipo con arquitectos, interioristas, constructores y proveedores.",
    },
  ];

  const team = [
    {
      name: "Miguel",
      role: "CEO",
    },
    {
      name: "Javi",
      role: "Directivo Técnico",
    },
    {
      name: "Ana",
      role: "Arquitecta Técnica",
    },
    {
      name: "Ray",
      role: "Sales Manager",
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
              EL ESTUDIO
            </motion.h1>
            <div className="text-base md:text-lg text-neutral-600 leading-relaxed max-w-3xl space-y-4">
              <p>
                Somos un estudio especializado en materiales, arquitectura y soluciones técnicas aplicadas a proyectos reales.
              </p>
              <p>
                En ONICE STUDIO trabajamos desde el conocimiento del material y la experiencia en obra. Acompañamos a arquitectos, interioristas y clientes en la toma de decisiones técnicas y estéticas, aportando criterio, control y una visión global del proyecto.
              </p>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-24 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl mb-6">Nuestra Filosofía</h2>
                <div className="space-y-6 text-muted-foreground leading-relaxed">
                  <p>
                    En ONICE STUDIO entendemos la arquitectura y el diseño como un proceso técnico y humano a la vez. Creemos en espacios bien pensados, bien ejecutados y honestos con los materiales.
                  </p>
                  <p>
                    Nuestro enfoque parte del análisis y la comprensión de cada proyecto, atendiendo al material, la luz, la proporción y el uso real del espacio.
                  </p>
                  <p>
                    Cada decisión se toma en función del contexto, las necesidades del cliente y la forma en que el espacio va a ser vivido.
                  </p>
                  <p>
                    Trabajamos de manera cercana con cada cliente, escuchando y acompañando durante todo el proceso, desde la primera idea hasta la ejecución final en obra.
                  </p>
                </div>
              </div>
              <div className="relative h-96 lg:h-[500px]">
                <img
                  src="/images/hero.jpg"
                  alt="Filosofía del estudio"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24">
          <div className="container">
            <h2 className="text-4xl mb-16 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>Nuestros Valores</h2>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.15
                  }
                }
              }}
            >
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className="text-left md:text-center"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-xl mb-3 font-medium">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24 bg-white">
          <div className="container">
            <h2 className="text-4xl mb-8 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>Nuestro Equipo</h2>

            <div className="max-w-4xl mx-auto mb-16 text-center space-y-4 text-muted-foreground leading-relaxed">
              <p>Somos un equipo multidisciplinar con experiencia en arquitectura, materiales y ejecución.</p>
              <p>Nuestro valor no está en los títulos, sino en el conocimiento acumulado tras años de trabajo en proyectos reales.</p>
              <p>Participamos activamente en todas las fases del proyecto, aportando criterio técnico, sensibilidad estética y una actitud cercana y resolutiva.</p>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.2
                  }
                }
              }}
            >
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  className="text-center group"
                  variants={{
                    hidden: { opacity: 0, scale: 0.95 },
                    visible: { opacity: 1, scale: 1 }
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="aspect-square mx-auto mb-6 bg-stone-100 flex items-center justify-center border border-stone-200">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Foto {member.name}</span>
                  </div>
                  <h3 className="text-xl mb-1 uppercase tracking-wide">{member.name}</h3>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">
                    {member.role}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-24">
          <div className="container">
            <h2 className="text-4xl mb-16 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>Nuestro Proceso</h2>
            <div className="max-w-4xl mx-auto space-y-12">
              {[
                {
                  step: "01",
                  title: "Análisis inicial",
                  description:
                    "Escuchamos, analizamos el contexto y definimos las necesidades técnicas y materiales del proyecto.",
                },
                {
                  step: "02",
                  title: "Definición de soluciones",
                  description:
                    "Seleccionamos materiales y desarrollamos soluciones constructivas coherentes con el diseño.",
                },
                {
                  step: "03",
                  title: "Desarrollo técnico",
                  description:
                    "Ajustamos detalles, formatos y sistemas de aplicación.",
                },
                {
                  step: "04",
                  title: "Ejecución y seguimiento",
                  description:
                    "Acompañamos el proceso en obra para garantizar una correcta ejecución.",
                },
              ].map((phase, index) => (
                <div key={index} className="flex gap-6 md:gap-10">
                  <div className="text-xl md:text-2xl font-light text-black/40 pt-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {phase.step} ·
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl mb-3">{phase.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {phase.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-foreground text-background">
          <div className="container text-center">
            <p className="text-xl md:text-2xl opacity-90 mb-12 max-w-4xl mx-auto" style={{ fontFamily: "'Playfair Display', serif" }}>
              Si buscas un equipo cercano, con experiencia real en materiales y obra, estaremos encantados de acompañarte en tu proyecto.
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
