import { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ChevronLeft, ChevronRight, X, Loader2, Minimize2, Maximize2 } from "lucide-react";
import { projectsAPI, productsAPI } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  id: number;
  title: string;
  category: string;
  location: string;
  year: string;
  materials: string;
  image: string;
  images: string[];
  description?: string;
}

export default function ProjectDetail() {
  const [, params] = useRoute("/portfolio/:id");
  const projectId = params?.id ? parseInt(params.id) : null;

  const [project, setProject] = useState<Project | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (projectId) {
      loadProject(projectId);
    }
  }, [projectId]);

  const loadProject = async (id: number) => {
    setLoading(true);
    try {
      // Load current project
      const data = await projectsAPI.getById(id);
      setProject(data);

      // Load all projects to find related ones (could be optimized with a specific endpoint)
      const allData = await projectsAPI.getAll();
      const related = allData
        .filter((p: Project) => p.category === data.category && p.id !== data.id)
        .slice(0, 3);
      setRelatedProjects(related);

      // Load products for checking materials
      const productsData = await productsAPI.getAll();
      setProducts(productsData);
    } catch (error) {
      console.error("Failed to load project", error);
    } finally {
      setLoading(false);
    }
  };

  const allImages = project?.images || (project?.image ? [project.image] : []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  // Navegación con teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'Escape' && lightboxOpen) {
        setLightboxOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [allImages.length, lightboxOpen]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="bg-stone-200 flex-1 flex items-center justify-center pt-28">
          <Loader2 className="w-8 h-8 animate-spin text-neutral-400" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="bg-stone-200 min-h-screen pt-28 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl mb-4">Proyecto no encontrado</h1>
            <Link href="/portfolio">
              <a className="inline-block px-6 py-2 bg-black text-white hover:bg-neutral-800 transition-colors">Volver a Portfolio</a>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Navigation />

      <main className="bg-stone-200 min-h-screen pt-28">
        {/* Breadcrumb */}
        <section className="py-6 bg-white">
          <div className="container-full">
            <div className="flex gap-2 text-xs uppercase tracking-widest text-neutral-500">
              <Link href="/">
                <a className="hover:text-black transition-colors">Inicio</a>
              </Link>
              <span>/</span>
              <Link href="/portfolio">
                <a className="hover:text-black transition-colors">Portfolio</a>
              </Link>
              <span>/</span>
              <span className="text-black">{project.title}</span>
            </div>
          </div>
        </section>

        {/* Project Info */}
        <section className="py-16 bg-white">
          <div className="container-full">
            <div className="max-w-4xl">
              <p className="text-sm uppercase tracking-widest text-neutral-500 mb-2">
                {project.category}
              </p>
              <h2 className="text-4xl lg:text-5xl mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                {project.title}
              </h2>
              <div className="flex gap-6 text-lg text-neutral-600 mb-6">
                <span>{project.location}</span>
                <span>•</span>
                <span>{project.year}</span>
              </div>
              <p className="text-lg text-neutral-700 leading-relaxed whitespace-pre-wrap">
                {project.description}
              </p>
              {project.materials && (
                <div className="mt-4 text-neutral-500">
                  <strong>Materiales: </strong>
                  {project.materials.split(',').map((materialName, index) => {
                    const name = materialName.trim();
                    const product = products.find(p => p.name.toLowerCase() === name.toLowerCase());
                    return (
                      <span key={index}>
                        {index > 0 && ", "}
                        {product ? (
                          <Link href={`/productos/${product.id}`}>
                            <a className="underline decoration-1 underline-offset-2 text-neutral-700 hover:text-black hover:decoration-2 transition-all">
                              {name}
                            </a>
                          </Link>
                        ) : (
                          name
                        )}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-16 bg-stone-200">
          <div className="max-w-5xl mx-auto px-6">
            {/* Gallery premium con navegación */}
            <div className="relative">
              {/* Imagen principal */}
              <div
                className="relative h-[60vh] md:h-[75vh] w-full overflow-hidden cursor-pointer group rounded-sm"
                onClick={() => openLightbox(currentImageIndex)}
              >
                <AnimatePresence mode="wait">
                  {allImages.length > 0 ? (
                    <motion.img
                      key={currentImageIndex}
                      src={allImages[currentImageIndex]}
                      alt={`${project.title} - ${currentImageIndex + 1}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-400">Sin imágenes</div>
                  )}
                </AnimatePresence>

                {/* Cursor Zones for Desktop */}
                <div className="absolute inset-0 hidden md:flex">
                  <div
                    className="w-1/3 h-full"
                    style={{ cursor: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>') 20 20, auto` }}
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    title="Anterior"
                  />
                  <div
                    className="w-1/3 h-full cursor-zoom-in"
                    onClick={() => openLightbox(currentImageIndex)}
                    title="Ampliar"
                  />
                  <div
                    className="w-1/3 h-full"
                    style={{ cursor: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>') 20 20, auto` }}
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    title="Siguiente"
                  />
                </div>

                {/* Contador overlay - Minimalist */}
                <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm text-black px-3 py-1 text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  {currentImageIndex + 1} / {allImages.length}
                </div>
              </div>

              {/* Flechas de navegación - Premium Fade In */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-black p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hidden md:flex"
                    aria-label="Imagen anterior"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-black p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hidden md:flex"
                    aria-label="Siguiente imagen"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Mobile controls (always visible but subtle) */}
                  <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between md:hidden pointer-events-none">
                    <button onClick={(e) => { e.stopPropagation(); prevImage() }} className="bg-white/80 p-2 rounded-full shadow-sm pointer-events-auto"><ChevronLeft className="w-4 h-4" /></button>
                    <button onClick={(e) => { e.stopPropagation(); nextImage() }} className="bg-white/80 p-2 rounded-full shadow-sm pointer-events-auto"><ChevronRight className="w-4 h-4" /></button>
                  </div>
                </>
              )}
            </div>

            {/* Thumbnails con scroll */}
            <div className="mt-6 overflow-x-auto scrollbar-hide">
              <div className="flex gap-3">
                {allImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-24 h-24 overflow-hidden border-2 transition-all ${currentImageIndex === index
                      ? 'border-black shadow-lg scale-105'
                      : 'border-neutral-300 hover:border-neutral-500 opacity-60 hover:opacity-100'
                      }`}
                  >
                    <img src={img} alt={`Miniatura ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Indicadores de puntos */}
            <div className="flex justify-center gap-2 mt-6">
              {allImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`transition-all ${currentImageIndex === index
                    ? 'w-8 h-2 bg-black'
                    : 'w-2 h-2 bg-neutral-400 hover:bg-neutral-600 rounded-full'
                    }`}
                  aria-label={`Ir a imagen ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox Modal */}
        {lightboxOpen && (
          <div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            {/* Botón cerrar */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-all"
              aria-label="Cerrar"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Contador */}
            <div className="absolute top-4 left-4 bg-white/10 text-white px-4 py-2 text-sm">
              {currentImageIndex + 1} / {allImages.length}
            </div>

            {/* Imagen fullscreen */}
            <div className="max-h-[90vh] max-w-[90vw] flex items-center justify-center relative">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={allImages[currentImageIndex]}
                  alt={`${project.title} - ${currentImageIndex + 1}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="max-h-[90vh] max-w-[90vw] object-contain"
                  onClick={(e) => e.stopPropagation()}
                />
              </AnimatePresence>
            </div>

            {/* Navegación lightbox */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all"
                  aria-label="Siguiente"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}
          </div>
        )}

        {/* Contact CTA */}
        <section className="py-16 bg-white">
          <div className="container text-center">
            <h2 className="text-3xl mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              ¿Interesado en un proyecto similar?
            </h2>
            <p className="text-neutral-600 mb-8 max-w-2xl mx-auto">
              Cuéntanos tu visión y trabajaremos juntos para hacerla realidad
            </p>
            <Link href="/contacto">
              <a className="inline-block px-8 py-3 border border-neutral-800 hover:bg-neutral-800 hover:text-white transition-colors duration-300 text-sm uppercase tracking-wider">
                Contactar
              </a>
            </Link>
          </div>
        </section>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="py-16 bg-stone-100">
            <div className="container">
              <h2 className="text-3xl mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
                Proyectos Relacionados
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {relatedProjects.map((relatedProject) => (
                  <Link key={relatedProject.id} href={`/portfolio/${relatedProject.id}`}>
                    <a className="block group">
                      <div className="aspect-[3/4] overflow-hidden mb-4 bg-white">
                        <img
                          src={relatedProject.image}
                          alt={relatedProject.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">
                        {relatedProject.category}
                      </p>
                      <h3 className="text-2xl mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{relatedProject.title}</h3>
                      <p className="text-sm text-neutral-600">
                        {relatedProject.location} · {relatedProject.year}
                      </p>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div >
  );
}
