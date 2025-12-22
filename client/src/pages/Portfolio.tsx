import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ChevronDown, Search, X } from "lucide-react";

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState(() => {
    return sessionStorage.getItem('portfolioSelectedCategory') || "Todos";
  });
  const [locationFilter, setLocationFilter] = useState("Todas");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);

  const locationRef = useRef<HTMLDivElement>(null);

  // Save filter to sessionStorage
  useEffect(() => {
    sessionStorage.setItem('portfolioSelectedCategory', selectedCategory);
  }, [selectedCategory]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setLocationOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setFilterPanelOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const clearAllFilters = () => {
    setLocationFilter("Todas");
    setSearchTerm("");
    setSelectedCategory("Todos");
  };

  const hasActiveFilters = locationFilter !== "Todas" || searchTerm !== "" || selectedCategory !== "Todos";

  const { scrollY } = useScroll();

  const categories = ["Todos", "Residencial", "Hoteles", "Restauración"];
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
      category: "Restauración",
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
    const matchesCategory = selectedCategory === "Todos" || project.category === selectedCategory;
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

      <main className="bg-stone-200 min-h-screen pt-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-stone-200 relative overflow-hidden">
          {/* Parallax Background */}
          <motion.div
            style={{ y: useTransform(scrollY, [0, 500], [0, -150]) }}
            className="absolute inset-0 bg-gradient-to-b from-stone-100 to-stone-200 opacity-50"
          />

          <div className="container-full relative z-10">
            <motion.h1
              initial={{ filter: "blur(10px)", opacity: 0 }}
              animate={{ filter: "blur(0px)", opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-4 uppercase tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 300, letterSpacing: "-0.03em" }}
            >
              PORTFOLIO
            </motion.h1>
            <p className="text-xs md:text-sm text-neutral-600 mb-4 md:mb-6" style={{ letterSpacing: "0.2em" }}>
              ({filteredProjects.length}) PROYECTOS
            </p>
            <p className="text-lg text-neutral-600 leading-relaxed max-w-3xl">
              Una selección de nuestros proyectos más destacados en
              arquitectura y diseño de interiores de lujo.
            </p>
          </div>
        </section>

        {/* Category Tabs */}
        <section className="py-10 bg-white border-y border-neutral-200">
          <div className="container-full">
            <div className="flex flex-wrap items-center justify-center gap-4">
              {categories.map((category) => {
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-8 py-3 border text-sm uppercase tracking-[0.2em] transition-all duration-700 ease-out ${selectedCategory === category
                      ? "border-black bg-black text-white shadow-md"
                      : "border-neutral-300 bg-white text-neutral-700 hover:bg-gradient-to-r hover:from-slate-700 hover:to-slate-900 hover:border-slate-600 hover:text-white hover:shadow-[0_8px_30px_rgba(51,65,85,0.4)] hover:-translate-y-0.5 hover:scale-[1.02]"
                      }`}
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: selectedCategory === category ? 500 : 400 }}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-6 bg-white border-b border-neutral-200">
          <div className="container">
            <div className="flex items-center justify-between gap-4">
              {/* Botón FILTROS */}
              <div className="relative">
                <button
                  onClick={() => setFilterPanelOpen(!filterPanelOpen)}
                  className="flex items-center gap-3 px-6 py-3 bg-white border border-neutral-300 hover:border-black transition-all text-sm uppercase tracking-[0.2em]"
                  style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  <span>FILTROS</span>
                </button>

                {/* Panel Dropdown */}
                {filterPanelOpen && (
                  <>
                    {/* Backdrop */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setFilterPanelOpen(false)}
                    ></div>

                    {/* Panel */}
                    <div className="absolute top-full left-0 mt-2 bg-white border border-neutral-200 shadow-2xl z-50">
                      {/* Filters Content */}
                      <div className="p-4 flex gap-8">
                        {/* Location Filter */}
                        <div className="min-w-[200px]" ref={locationRef}>
                          <button
                            onClick={() => setLocationOpen(!locationOpen)}
                            className="w-full flex items-center justify-between py-2 border-b border-neutral-200 text-left"
                          >
                            <span className="text-sm uppercase tracking-[0.15em] text-neutral-700" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}>
                              Ubicación
                            </span>
                            <ChevronDown className={`w-4 h-4 transition-transform ${locationOpen ? "rotate-180" : ""}`} />
                          </button>
                          {locationOpen && (
                            <div className="mt-3 space-y-2 max-h-[300px] overflow-y-auto">
                              {locations.map((location) => (
                                <button
                                  key={location}
                                  onClick={() => {
                                    setLocationFilter(location);
                                  }}
                                  className="w-full flex items-center gap-3 py-2 text-left group"
                                >
                                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${locationFilter === location ? "border-black" : "border-neutral-300"
                                    }`}>
                                    {locationFilter === location && (
                                      <div className="w-2 h-2 rounded-full bg-black"></div>
                                    )}
                                  </div>
                                  <span className={`text-xs ${locationFilter === location ? "font-medium text-black" : "text-neutral-600"
                                    }`}>
                                    {location}
                                  </span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Clear Filters Button */}
                        <div className="min-w-[150px] flex items-start pt-2">
                          <button
                            onClick={clearAllFilters}
                            className={`w-full py-2 px-4 transition-colors text-xs uppercase tracking-[0.2em] ${hasActiveFilters
                              ? "bg-black text-white hover:bg-neutral-800"
                              : "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                              }`}
                            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
                            disabled={!hasActiveFilters}
                          >
                            Limpiar
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Active Filter Badges */}
              <div className="flex items-center gap-2 flex-1">
                {locationFilter !== "Todas" && (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-100 border border-neutral-200 text-xs uppercase tracking-wider">
                    <span className="text-neutral-700" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}>
                      Ubicación: {locationFilter}
                    </span>
                    <button
                      onClick={() => setLocationFilter("Todas")}
                      className="text-neutral-500 hover:text-black transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>

              {/* Barra de búsqueda */}
              <div className="relative flex-1 max-w-md ml-auto">
                <input
                  type="text"
                  placeholder="BUSCAR..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 bg-white border border-neutral-300 focus:border-black focus:outline-none transition-colors text-sm uppercase tracking-[0.15em] placeholder:text-neutral-400"
                  style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}
                />
                {searchTerm ? (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                ) : (
                  <Search className="w-4 h-4 text-neutral-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                )}
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
                    setSelectedCategory("Todos");
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
                className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-12 md:gap-16 lg:gap-20 xl:gap-24"
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
                  const totalImages = project.images.length;

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
                            className="relative aspect-[4/3] mb-6 overflow-hidden bg-neutral-100"
                            whileHover={{ scale: 1.01 }}
                            transition={{ duration: 0.4 }}
                          >
                            <img
                              src={project.image}
                              alt={project.title}
                              loading="lazy"
                              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
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
            <motion.a
              href="/contacto"
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ duration: 0.3 }}
              className="inline-block relative overflow-hidden border-2 border-black px-10 py-4 group cursor-pointer"
            >
              <span className="relative z-10 uppercase tracking-wider text-sm transition-colors duration-400 group-hover:text-white">
                Contactar
              </span>
              <motion.div
                className="absolute inset-0 bg-black"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </motion.a>
          </div>
        </section>
      </main>

      <Footer />
    </motion.div>
  );
}
