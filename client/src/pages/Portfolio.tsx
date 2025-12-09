import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ChevronDown, Search } from "lucide-react";

export default function Portfolio() {
  const [filter, setFilter] = useState<string | null>(null);
  const [locationFilter, setLocationFilter] = useState("Todas");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);

  const categories = ["Todos", "Residencial", "Hoteles"];
  const locations = ["Todas", "Mallorca"];

  const projects = [
    // Hotel Meliá Beach
    {
      id: 1,
      title: "Hotel Meliá Beach",
      category: "Hoteles",
      location: "Mallorca",
      year: "2024",
      materials: "Techlam, Quarzo",
      image: "/images/projects/HOTEL MELIA BEACH - MATERIAL BAÑOS TECHLAM - BARRA QUARZO/_MG_8806.jpg",
      images: [
        "/images/projects/HOTEL MELIA BEACH - MATERIAL BAÑOS TECHLAM - BARRA QUARZO/_MG_8806.jpg",
        "/images/projects/HOTEL MELIA BEACH - MATERIAL BAÑOS TECHLAM - BARRA QUARZO/_MG_8811.jpg",
        "/images/projects/HOTEL MELIA BEACH - MATERIAL BAÑOS TECHLAM - BARRA QUARZO/_MG_8820.jpg",
        "/images/projects/HOTEL MELIA BEACH - MATERIAL BAÑOS TECHLAM - BARRA QUARZO/_MG_8821.jpg",
        "/images/projects/HOTEL MELIA BEACH - MATERIAL BAÑOS TECHLAM - BARRA QUARZO/_MG_8827.jpg",
        "/images/projects/HOTEL MELIA BEACH - MATERIAL BAÑOS TECHLAM - BARRA QUARZO/_MG_8845 ret.jpg",
        "/images/projects/HOTEL MELIA BEACH - MATERIAL BAÑOS TECHLAM - BARRA QUARZO/_MG_8861 ret.jpg",
        "/images/projects/HOTEL MELIA BEACH - MATERIAL BAÑOS TECHLAM - BARRA QUARZO/_MG_8868 ret.jpg",
      ]
    },
    // Hotel Katmandu
    {
      id: 2,
      title: "Hotel Katmandu",
      category: "Hoteles",
      location: "Mallorca",
      year: "2024",
      materials: "Granito Negro Zimbabwe",
      image: "/images/projects/HOTEL KATMANDU - BUFFET GRANITO NEGRO ZIMBAWE/_MG_8961.jpg",
      images: [
        "/images/projects/HOTEL KATMANDU - BUFFET GRANITO NEGRO ZIMBAWE/_MG_8961.jpg",
        "/images/projects/HOTEL KATMANDU - BUFFET GRANITO NEGRO ZIMBAWE/_MG_8965.jpg",
        "/images/projects/HOTEL KATMANDU - BUFFET GRANITO NEGRO ZIMBAWE/_MG_8971.jpg",
        "/images/projects/HOTEL KATMANDU - BUFFET GRANITO NEGRO ZIMBAWE/_MG_8976.jpg",
        "/images/projects/HOTEL KATMANDU - BUFFET GRANITO NEGRO ZIMBAWE/_MG_8977.jpg",
        "/images/projects/HOTEL KATMANDU - BUFFET GRANITO NEGRO ZIMBAWE/_MG_8982.jpg",
        "/images/projects/HOTEL KATMANDU - BUFFET GRANITO NEGRO ZIMBAWE/_MG_8995.jpg",
        "/images/projects/HOTEL KATMANDU - BUFFET GRANITO NEGRO ZIMBAWE/_MG_8997.jpg",
        "/images/projects/HOTEL KATMANDU - BUFFET GRANITO NEGRO ZIMBAWE/_MG_9006.jpg",
      ]
    },
    // Apartamentos Cala Major
    {
      id: 3,
      title: "Apartamentos Cala Major",
      category: "Residencial",
      location: "Mallorca",
      year: "2024",
      materials: "Techlam",
      image: "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8589.jpg",
      images: [
        "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8589.jpg",
        "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8593.jpg",
        "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8596.jpg",
        "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8598.jpg",
        "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8603.jpg",
        "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8611.jpg",
        "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8624.jpg",
        "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8626.jpg",
        "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8632.jpg",
        "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8637.jpg",
        "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8639.jpg",
        "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8641.jpg",
        "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8657.jpg",
        "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8662.jpg",
        "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8664.jpg",
        "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8665.jpg",
        "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8669.jpg",
        "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8671.jpg",
      ]
    },
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = !filter || filter === "Todos" || project.category === filter;
    const matchesLocation = locationFilter === "Todas" || project.location === locationFilter;
    const matchesSearch = searchTerm === "" || 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.materials.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesLocation && matchesSearch;
  });

  return (
    <motion.div 
      className="flex flex-col"
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
              PORTFOLIO
            </h1>
            <p className="text-xs md:text-sm text-neutral-600 mb-4 md:mb-6">
              ({filteredProjects.length}) Proyectos
            </p>
            <p className="text-lg text-neutral-600 leading-relaxed max-w-3xl">
              Una selección de nuestros proyectos más destacados en
              arquitectura y diseño de interiores de lujo.
            </p>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 bg-stone-200 relative">
          <div className="container">
            {/* Línea superior */}
            <div className="absolute top-8 left-0 right-0 h-px bg-neutral-300"></div>
            {/* Línea inferior */}
            <div className="absolute bottom-8 left-0 right-0 h-px bg-neutral-300"></div>
            
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4">
              {/* Filtros desplegables */}
              <div className="flex flex-wrap items-center gap-3 p-3 md:p-4 border border-neutral-300 bg-stone-200">
                {/* Filtro de Aplicación/Categoría */}
                <div className="relative" onMouseLeave={() => setCategoryOpen(false)}>
                  <button
                    onClick={() => {
                      setCategoryOpen(!categoryOpen);
                      setLocationOpen(false);
                    }}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-neutral-100 transition-colors text-sm uppercase tracking-wider bg-stone-200 border border-neutral-300 rounded-sm"
                  >
                    <span className="text-neutral-700 font-medium">{!filter ? "APLICACIÓN" : filter.toUpperCase()}</span>
                    <ChevronDown className={`w-4 h-4 text-neutral-600 transition-transform ${categoryOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {categoryOpen && (
                    <div className="absolute top-full left-0 mt-1 bg-white border border-neutral-300 shadow-lg z-10 min-w-[200px]">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => {
                            setFilter(filter === category ? null : category);
                            setCategoryOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm uppercase tracking-wider hover:bg-neutral-100 transition-colors ${
                            filter === category ? "bg-neutral-100 font-semibold" : ""
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Filtro de Ubicación */}
                <div className="relative" onMouseLeave={() => setLocationOpen(false)}>
                  <button
                    onClick={() => {
                      setLocationOpen(!locationOpen);
                      setCategoryOpen(false);
                    }}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-neutral-100 transition-colors text-sm uppercase tracking-wider bg-stone-200 border border-neutral-300 rounded-sm"
                  >
                    <span className="text-neutral-700 font-medium">{locationFilter === "Todas" ? "UBICACIÓN" : locationFilter.toUpperCase()}</span>
                    <ChevronDown className={`w-4 h-4 text-neutral-600 transition-transform ${locationOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {locationOpen && (
                    <div className="absolute top-full left-0 mt-1 bg-white border border-neutral-300 shadow-lg z-10 min-w-[200px]">
                      {locations.map((location) => (
                        <button
                          key={location}
                          onClick={() => {
                            setLocationFilter(location);
                            setLocationOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm uppercase tracking-wider hover:bg-neutral-100 transition-colors ${
                            locationFilter === location ? "bg-neutral-100 font-semibold" : ""
                          }`}
                        >
                          {location}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Barra de búsqueda */}
              <div className="relative w-full md:w-auto p-3 md:p-4 border border-neutral-300 bg-stone-200 md:ml-auto">
                <input
                  type="text"
                  placeholder="Buscar proyectos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-4 pr-10 py-2 border-0 focus:outline-none focus:ring-0 transition-colors text-sm uppercase tracking-wider w-full bg-transparent"
                />
                <Search className="w-4 h-4 text-neutral-500 absolute right-5 md:right-6 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-12 md:py-16">
          <div className="container-full">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-2xl text-neutral-400 mb-4">No se encontraron proyectos</p>
                <p className="text-neutral-500 mb-8">Intenta ajustar los filtros o la búsqueda</p>
                <button
                  onClick={() => {
                    setFilter(null);
                    setLocationFilter("Todas");
                    setSearchTerm("");
                  }}
                  className="px-6 py-2 border border-neutral-800 hover:bg-neutral-800 hover:text-white transition-colors text-sm uppercase tracking-wider"
                >
                  Limpiar Filtros
                </button>
              </div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.05
                    }
                  }
                }}
              >
                {filteredProjects.map((project) => {
                  const totalImages = project.sections.reduce((acc, section) => acc + section.images.length, 0);
                  
                  return (
                    <motion.div
                      key={project.id}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <Link href={`/portfolio/${project.id}`}>
                        <a className="block group cursor-pointer">
                          <motion.div 
                            className="relative aspect-[3/4] mb-6 overflow-hidden bg-neutral-100"
                            whileHover={{ scale: 1.01 }}
                            transition={{ duration: 0.4 }}
                          >
                            <img
                              src={project.image}
                              alt={project.title}
                              loading="lazy"
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Overlay con información */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                <p className="text-sm uppercase tracking-widest mb-2 text-white/80">
                                  {totalImages} imágenes
                                </p>
                                <p className="text-base leading-relaxed text-white/90">
                                  {project.materials}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                          <div className="space-y-2">
                            <p className="text-xs uppercase tracking-widest text-neutral-500">
                              {project.category}
                            </p>
                            <h3 className="text-2xl" style={{ fontFamily: "'Playfair Display', serif" }}>{project.title}</h3>
                            <p className="text-sm text-neutral-600">
                              {project.location} · {project.year}
                            </p>
                          </div>
                        </a>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-white">
          <div className="container text-center">
            <h2 className="text-4xl md:text-5xl mb-6">
              ¿Listo para comenzar tu proyecto?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Cuéntanos tu visión y trabajaremos juntos para hacerla realidad.
            </p>
            <a
              href="/contacto"
              className="inline-block bg-foreground text-background px-8 py-4 text-base font-medium hover:opacity-90 transition-opacity"
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
