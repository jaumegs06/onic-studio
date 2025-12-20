import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [currentHeroImage, setCurrentHeroImage] = useState(0);

  const heroImages = [
    "/images/hero-1.jpg",
    "/images/hero-2.jpg",
    "/images/hero-3.jpg",
    "/images/hero-4.jpg"
  ];

  const services = [
    {
      title: "Residencial",
      description: "Diseño de espacios residenciales exclusivos que reflejan el estilo de vida de nuestros clientes.",
      image: "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8589.jpg",
    },
    {
      title: "Hoteles",
      description: "Creación de experiencias únicas en espacios hoteleros de lujo y boutique.",
      image: "/images/projects/HOTEL MELIA BEACH - MATERIAL BAÑOS TECHLAM - BARRA QUARZO/_MG_8827.jpg",
    },
    {
      title: "Restauración",
      description: "Ambientes gastronómicos que combinan funcionalidad y estética sofisticada.",
      image: "/images/projects/HOTEL KATMANDU - BUFFET GRANITO NEGRO ZIMBAWE/_MG_8961.jpg",
    },
  ];

  const featuredProjects = [
    {
      id: 1,
      title: "HOTEL MELIÁ BEACH",
      category: "Hospitalidad",
      description: "Renovación integral de baños con Techlam y barra de bar en Quarzo. Un proyecto que combina funcionalidad y diseño de alto nivel para espacios de hospitalidad premium.",
      image: "/images/projects/HOTEL MELIA BEACH - MATERIAL BAÑOS TECHLAM - BARRA QUARZO/_MG_8806.jpg",
    },
    {
      id: 2,
      title: "HOTEL KATMANDU",
      category: "Hospitalidad",
      description: "Buffet realizado en granito Negro Zimbabwe. Un espacio gastronómico que destaca por la elegancia atemporal de la piedra natural y su acabado impecable.",
      image: "/images/projects/HOTEL KATMANDU - BUFFET GRANITO NEGRO ZIMBAWE/_MG_8961.jpg",
    },
    {
      id: 3,
      title: "APARTAMENTOS CALA MAJOR",
      category: "Residencial",
      description: "Reforma integral con material Techlam en cocinas, baños y espacios comunes. Un proyecto residencial que apuesta por la innovación y la calidad en cada detalle.",
      image: "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8589.jpg",
    },
  ];

  const [activeProject, setActiveProject] = useState(featuredProjects[0]);

  // Autoplay hero carousel: cambio cada 6 segundos
  useEffect(() => {
    const heroInterval = setInterval(() => {
      setCurrentHeroImage((current) => (current + 1) % heroImages.length);
    }, 6000);

    return () => clearInterval(heroInterval);
  }, []);

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
        {/* Carrusel de imágenes de fondo */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentHeroImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImages[currentHeroImage]})` }}
          />
        </AnimatePresence>

        {/* Global soft overlay to unify image contrast (behind text) */}
        <div className="absolute inset-0 bg-black/15" />

        {/* Bottom gradient for contrast on lower part of image */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Indicadores del carrusel */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentHeroImage(index)}
              className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-300 ${currentHeroImage === index
                ? 'bg-white w-6 md:w-8'
                : 'bg-white/50 hover:bg-white/75'
                }`}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>

        <div className="relative z-10 text-center text-white px-4 flex flex-col items-center justify-center pb-20 md:pb-24">
          <motion.p
            initial={{ filter: "blur(10px)", opacity: 0 }}
            animate={{ filter: "blur(0px)", opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 text-white max-w-2xl mx-auto font-medium drop-shadow-md"
          >
            Descubre la esencia de la piedra natural en nuestro showroom.
          </motion.p>
          <Link href="/contacto">
            <button className="group flex items-center justify-between rounded-full border border-white bg-transparent p-1 pr-1 transition-all duration-300 hover:bg-white hover:text-black">
              <span className="px-4 md:px-6 text-xs md:text-sm font-medium tracking-widest text-white transition-colors duration-300 group-hover:text-black">
                AGENDA UNA VISITA
              </span>
              <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-white text-black transition-colors duration-300 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white">
                <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 md:py-16 lg:py-24 bg-stone-200">
        <div className="container">
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-3 md:mb-4 font-serif">Servicios</h2>
            <p className="text-muted-foreground text-sm md:text-base lg:text-lg max-w-2xl mx-auto">
              Ofrecemos soluciones integrales de arquitectura y diseño de interiores
              para proyectos de lujo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group cursor-pointer"
              >
                <div className="relative h-64 md:h-80 mb-4 md:mb-6 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-xl md:text-2xl mb-2 md:mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 md:mt-12">
            <Link href="/servicios">
              <a className="inline-block px-8 py-3 border border-neutral-800 hover:bg-neutral-800 hover:text-white transition-colors duration-300 text-sm uppercase tracking-wider">
                Ver Todos los Servicios
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-12 md:py-16 lg:py-24 bg-stone-200">
        <div className="container-full">
          {/* Grid Asimétrico */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-8 md:mb-12 lg:mb-16">
            {/* Columna Izquierda - Texto */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-4 md:space-y-6"
              >
                <p className="text-xs md:text-sm uppercase tracking-widest text-neutral-500" style={{ fontFamily: "'Lato', sans-serif" }}>
                  {activeProject.category}
                </p>
                <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-wider" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  {activeProject.title}
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base lg:text-lg" style={{ fontFamily: "'Lato', sans-serif" }}>
                  {activeProject.description}
                </p>
                <Link href="/portfolio">
                  <a className="inline-block text-xs md:text-sm uppercase tracking-wider border-b border-black pb-1 hover:opacity-70 transition-opacity">
                    Ver Proyecto
                  </a>
                </Link>
              </motion.div>
            </AnimatePresence>

            {/* Columna Derecha - Imagen */}
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
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
          <div className="flex justify-start md:justify-center gap-6 md:gap-12 pt-6 md:pt-8 border-t border-neutral-300 overflow-x-auto pb-2">
            {featuredProjects.map((project) => (
              <button
                key={project.id}
                onClick={() => setActiveProject(project)}
                className={`relative text-xs md:text-sm lg:text-base uppercase tracking-widest transition-all duration-300 py-3 md:py-4 whitespace-nowrap flex-shrink-0 ${activeProject.id === project.id
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
