import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Studio() {
  const values = [
    {
      title: "Excelencia",
      description:
        "Buscamos la perfección en cada detalle, desde el concepto inicial hasta la ejecución final.",
    },
    {
      title: "Innovación",
      description:
        "Combinamos técnicas tradicionales con las últimas tendencias y tecnologías en diseño.",
    },
    {
      title: "Sostenibilidad",
      description:
        "Integramos prácticas sostenibles y materiales ecológicos en todos nuestros proyectos.",
    },
    {
      title: "Personalización",
      description:
        "Cada proyecto es único y diseñado específicamente para las necesidades de nuestros clientes.",
    },
  ];

  const team = [
    {
      name: "Ana Martínez",
      role: "Directora Creativa",
      description:
        "Arquitecta con más de 15 años de experiencia en proyectos de lujo internacionales.",
    },
    {
      name: "Carlos Ruiz",
      role: "Director de Diseño",
      description:
        "Especialista en diseño de interiores con enfoque en espacios comerciales y hoteleros.",
    },
    {
      name: "Laura Sánchez",
      role: "Arquitecta Senior",
      description:
        "Experta en arquitectura residencial sostenible y diseño bioclimático.",
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
            <p className="text-base md:text-lg text-neutral-600 leading-relaxed max-w-3xl">
              Somos un estudio de arquitectura y diseño de interiores
              especializado en proyectos de alto standing. Nuestra pasión es
              crear espacios únicos que inspiran y transforman.
            </p>
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
                    En Onic Studio creemos que la arquitectura y el diseño de
                    interiores van más allá de la estética. Cada espacio debe
                    contar una historia, reflejar la identidad de quien lo
                    habita y mejorar la calidad de vida.
                  </p>
                  <p>
                    Nuestro enfoque minimalista no significa simplicidad, sino
                    la búsqueda de la esencia. Eliminamos lo superfluo para
                    destacar lo verdaderamente importante: la luz, el espacio,
                    los materiales y la experiencia humana.
                  </p>
                  <p>
                    Trabajamos en estrecha colaboración con nuestros clientes,
                    entendiendo sus necesidades, deseos y estilo de vida para
                    crear espacios que sean auténticos y atemporales.
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
            <h2 className="text-4xl mb-16 text-center">Nuestros Valores</h2>
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
                  className="text-center"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-2xl mb-4">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
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
            <h2 className="text-4xl mb-16 text-center">Nuestro Equipo</h2>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-12"
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
                  className="text-center"
                  variants={{
                    hidden: { opacity: 0, scale: 0.95 },
                    visible: { opacity: 1, scale: 1 }
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-48 h-48 mx-auto mb-6 bg-foreground/10" />
                  <h3 className="text-2xl mb-2">{member.name}</h3>
                  <p className="text-sm text-muted-foreground uppercase tracking-wider mb-4">
                    {member.role}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {member.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-24">
          <div className="container">
            <h2 className="text-4xl mb-16 text-center">Nuestro Proceso</h2>
            <div className="max-w-3xl mx-auto space-y-12">
              {[
                {
                  step: "01",
                  title: "Consulta Inicial",
                  description:
                    "Conocemos tu visión, necesidades y objetivos del proyecto.",
                },
                {
                  step: "02",
                  title: "Concepto y Diseño",
                  description:
                    "Desarrollamos propuestas creativas y soluciones espaciales personalizadas.",
                },
                {
                  step: "03",
                  title: "Desarrollo del Proyecto",
                  description:
                    "Refinamos cada detalle técnico y estético del diseño.",
                },
                {
                  step: "04",
                  title: "Ejecución",
                  description:
                    "Supervisamos la construcción para asegurar la calidad y fidelidad al diseño.",
                },
              ].map((phase, index) => (
                <div key={index} className="flex gap-8">
                  <div className="text-5xl text-muted-foreground font-light">
                    {phase.step}
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-2xl mb-3">{phase.title}</h3>
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
            <h2 className="text-4xl md:text-5xl mb-6">
              Trabajemos juntos
            </h2>
            <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto">
              Si buscas un estudio que entienda tu visión y la transforme en
              realidad, nos encantaría conocerte.
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
