import { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function ProjectDetail() {
  const [, params] = useRoute("/portfolio/:id");
  const projectId = params?.id ? parseInt(params.id) : null;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Array de proyectos (mismo que en Portfolio.tsx)
  const allProjects = [
    {
      id: 1,
      title: "Hotel Meliá Beach",
      category: "Hoteles",
      location: "Mallorca",
      year: "2024",
      materials: "Techlam, Quarzo",
      image: "/images/projects/HOTEL MELIA BEACH - MATERIAL BAÑOS TECHLAM - BARRA QUARZO/_MG_8806.jpg",
      description: "Renovación integral de espacios del hotel con materiales de alta gama. El proyecto incluye la reforma completa de baños con Techlam y la instalación de una nueva barra de bar en Quarzo, combinando funcionalidad y diseño premium.",
      sections: [
        {
          name: "Baños",
          material: "Techlam",
          images: [
            "/images/projects/HOTEL MELIA BEACH - MATERIAL BAÑOS TECHLAM - BARRA QUARZO/_MG_8806.jpg",
            "/images/projects/HOTEL MELIA BEACH - MATERIAL BAÑOS TECHLAM - BARRA QUARZO/_MG_8811.jpg",
            "/images/projects/HOTEL MELIA BEACH - MATERIAL BAÑOS TECHLAM - BARRA QUARZO/_MG_8820.jpg",
            "/images/projects/HOTEL MELIA BEACH - MATERIAL BAÑOS TECHLAM - BARRA QUARZO/_MG_8821.jpg",
          ]
        },
        {
          name: "Barra",
          material: "Quarzo",
          images: [
            "/images/projects/HOTEL MELIA BEACH - MATERIAL BAÑOS TECHLAM - BARRA QUARZO/_MG_8827.jpg",
            "/images/projects/HOTEL MELIA BEACH - MATERIAL BAÑOS TECHLAM - BARRA QUARZO/_MG_8845 ret.jpg",
            "/images/projects/HOTEL MELIA BEACH - MATERIAL BAÑOS TECHLAM - BARRA QUARZO/_MG_8861 ret.jpg",
            "/images/projects/HOTEL MELIA BEACH - MATERIAL BAÑOS TECHLAM - BARRA QUARZO/_MG_8868 ret.jpg",
          ]
        }
      ]
    },
    {
      id: 2,
      title: "Hotel Katmandu",
      category: "Hoteles",
      location: "Mallorca",
      year: "2024",
      materials: "Granito Negro Zimbabwe",
      image: "/images/projects/HOTEL KATMANDU - BUFFET GRANITO NEGRO ZIMBAWE/_MG_8961.jpg",
      description: "Diseño y ejecución de buffet en granito Negro Zimbabwe. Un espacio gastronómico que destaca por la elegancia atemporal de la piedra natural, su resistencia y acabado impecable.",
      sections: [
        {
          name: "Buffet",
          material: "Granito Negro Zimbabwe",
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
        }
      ]
    },
    {
      id: 3,
      title: "Apartamentos Cala Major",
      category: "Residencial",
      location: "Mallorca",
      year: "2024",
      materials: "Techlam",
      image: "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8589.jpg",
      description: "Reforma integral de apartamentos con material Techlam en cocinas, baños y espacios comunes. Un proyecto residencial que apuesta por la innovación, calidad en cada detalle y durabilidad.",
      sections: [
        {
          name: "General",
          material: "Techlam",
          images: [
            "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8589.jpg",
            "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8593.jpg",
            "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8596.jpg",
            "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8598.jpg",
            "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8603.jpg",
            "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8611.jpg",
          ]
        },
        {
          name: "Cocinas",
          material: "Techlam",
          images: [
            "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8624.jpg",
            "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8626.jpg",
            "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8632.jpg",
            "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8637.jpg",
            "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8639.jpg",
            "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8641.jpg",
          ]
        },
        {
          name: "Baños",
          material: "Techlam",
          images: [
            "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8657.jpg",
            "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8662.jpg",
            "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8664.jpg",
            "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8665.jpg",
            "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8669.jpg",
            "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8671.jpg",
          ]
        }
      ]
    },
  ];

  const project = allProjects.find(p => p.id === projectId);

  // Combinar todas las imágenes de todas las secciones
  const allImages = project?.sections.flatMap(section => section.images) || [];

  if (!project) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="bg-stone-200 min-h-screen pt-28 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl mb-4">Proyecto no encontrado</h1>
            <Link href="/portfolio">
              <Button>Volver a Portfolio</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedProjects = allProjects
    .filter(p => p.category === project.category && p.id !== project.id)
    .slice(0, 3);

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
              <p className="text-lg text-neutral-700 leading-relaxed">
                {project.description}
              </p>
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
                className="relative aspect-[4/3] overflow-hidden bg-stone-200 cursor-pointer group"
                onClick={() => openLightbox(currentImageIndex)}
              >
                <img
                  src={allImages[currentImageIndex]}
                  alt={`${project.title} - ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Contador overlay */}
                <div className="absolute top-4 right-4 bg-black/70 text-white px-4 py-2 text-sm">
                  {currentImageIndex + 1} / {allImages.length}
                </div>

                {/* Icono de zoom */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                  <div className="bg-white/90 rounded-full p-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Flechas de navegación */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
                    aria-label="Imagen anterior"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
                    aria-label="Siguiente imagen"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
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
                    className={`flex-shrink-0 w-24 h-24 overflow-hidden border-2 transition-all ${
                      currentImageIndex === index 
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
                  className={`transition-all ${
                    currentImageIndex === index
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
            <div className="max-h-[90vh] max-w-[90vw] flex items-center justify-center">
              <img
                src={allImages[currentImageIndex]}
                alt={`${project.title} - ${currentImageIndex + 1}`}
                className="max-h-[90vh] max-w-[90vw] object-contain"
                onClick={(e) => e.stopPropagation()}
              />
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
    </div>
  );
}
