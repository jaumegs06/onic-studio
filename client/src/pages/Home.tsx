import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function Home() {
  const services = [
    {
      title: "Residencial",
      description: "Diseño de espacios residenciales exclusivos que reflejan el estilo de vida de nuestros clientes.",
      image: "/images/residential.jpg",
    },
    {
      title: "Hoteles",
      description: "Creación de experiencias únicas en espacios hoteleros de lujo y boutique.",
      image: "/images/hotel.jpg",
    },
    {
      title: "Restauración",
      description: "Ambientes gastronómicos que combinan funcionalidad y estética sofisticada.",
      image: "/images/restaurant.jpg",
    },
  ];

  const featuredProjects = [
    {
      id: 1,
      title: "CASA SON VIDA",
      category: "Residencial",
      description: "Una villa contemporánea en Mallorca que fusiona el diseño minimalista con vistas panorámicas al Mediterráneo. Espacios abiertos, luz natural y materiales nobles definen este proyecto único.",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
    },
    {
      id: 2,
      title: "HOTEL BOUTIQUE",
      category: "Hospitalidad",
      description: "Experiencia sensorial en el corazón de Palma. Cada habitación cuenta una historia a través de texturas, colores y piezas de diseño exclusivo. Un refugio urbano de lujo contemporáneo.",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80",
    },
    {
      id: 3,
      title: "ÁTICO PALMA",
      category: "Residencial",
      description: "Reforma integral de un ático en el casco antiguo. El proyecto integra arquitectura histórica con intervenciones contemporáneas, creando un diálogo entre pasado y presente.",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    },
  ];

  const [activeProject, setActiveProject] = useState(featuredProjects[0]);

  // Autoplay: rotación automática cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProject((current) => {
        const currentIndex = featuredProjects.findIndex((p) => p.id === current.id);
        const nextIndex = (currentIndex + 1) % featuredProjects.length;
        return featuredProjects[nextIndex];
      });
    }, 5000);

    // Limpieza del intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, [featuredProjects]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-end">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/images/hero.jpg)" }}
        />

        {/* Global soft overlay to unify image contrast (behind text) */}
        <div className="absolute inset-0 bg-black/15" />

        {/* Bottom gradient for contrast on lower part of image */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="relative z-10 text-center text-white px-4 flex flex-col items-center justify-center pb-24">
          <p className="text-lg sm:text-xl md:text-2xl mb-8 text-white max-w-2xl mx-auto font-medium drop-shadow-md">
            Descubre la esencia de la piedra natural en nuestro showroom.
          </p>
          <Link href="/contact">
            <button className="group flex items-center justify-between rounded-full border border-white bg-transparent p-1 pr-1 transition-all duration-300 hover:bg-white hover:text-black">
              <span className="px-6 text-sm font-medium tracking-widest text-white transition-colors duration-300 group-hover:text-black">
                AGENDA UNA VISITA
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-colors duration-300 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-stone-200">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4 font-serif">Servicios</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Ofrecemos soluciones integrales de arquitectura y diseño de interiores
              para proyectos de lujo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group cursor-pointer"
              >
                <div className="relative h-80 mb-6 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-2xl mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/servicios">
              <Button variant="outline" size="lg" className="px-8">
                Ver Todos los Servicios
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-24 bg-stone-200">
        <div className="max-w-7xl mx-auto px-6">
          {/* Grid Asimétrico */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            {/* Columna Izquierda - Texto */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <p className="text-sm uppercase tracking-widest text-neutral-500" style={{ fontFamily: "'Lato', sans-serif" }}>
                  {activeProject.category}
                </p>
                <h2 className="text-5xl lg:text-6xl tracking-wider" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  {activeProject.title}
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg" style={{ fontFamily: "'Lato', sans-serif" }}>
                  {activeProject.description}
                </p>
                <Link href="/portfolio">
                  <a className="inline-block text-sm uppercase tracking-wider border-b border-black pb-1 hover:opacity-70 transition-opacity">
                    Ver Proyecto
                  </a>
                </Link>
              </motion.div>
            </AnimatePresence>

            {/* Columna Derecha - Imagen */}
            <div className="relative h-[600px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeProject.id}
                  src={activeProject.image}
                  alt={activeProject.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>
          </div>

          {/* Navegación Inferior - Estilo Kala */}
          <div className="flex justify-center gap-12 pt-8 border-t border-neutral-300">
            {featuredProjects.map((project) => (
              <button
                key={project.id}
                onClick={() => setActiveProject(project)}
                className={`relative text-sm lg:text-base uppercase tracking-widest transition-all duration-300 py-4 ${
                  activeProject.id === project.id
                    ? "text-black font-medium"
                    : "text-neutral-400 hover:text-neutral-600"
                }`}
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                {project.title}
                {activeProject.id === project.id && (
                  <span className="absolute top-0 left-0 w-full h-0.5 bg-black"></span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
