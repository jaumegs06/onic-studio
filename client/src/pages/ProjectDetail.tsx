import { useState } from "react";
import { useRoute, Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function ProjectDetail() {
  const [, params] = useRoute("/portfolio/:id");
  const projectId = params?.id ? parseInt(params.id) : null;

  const [selectedSection, setSelectedSection] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);

  // Array de proyectos (mismo que en Portfolio.tsx)
  const allProjects = [
    {
      id: 1,
      title: "Hotel Meliá Beach",
      category: "Hospitalidad",
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
      category: "Hospitalidad",
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

  const currentSection = project.sections[selectedSection];
  const currentImages = currentSection.images;

  const relatedProjects = allProjects
    .filter(p => p.category === project.category && p.id !== project.id)
    .slice(0, 3);

  return (
    <div className="flex flex-col">
      <Navigation />

      <main className="bg-stone-200 min-h-screen pt-28">
        {/* Breadcrumb */}
        <section className="py-6 bg-white">
          <div className="container-full">
            <div className="flex gap-2 text-xs uppercase tracking-widest text-neutral-500">
              <Link href="/">
                <a className="hover:text-black transition-colors">Home</a>
              </Link>
              <span>&gt;</span>
              <Link href="/portfolio">
                <a className="hover:text-black transition-colors">Proyectos</a>
              </Link>
            </div>
          </div>
        </section>

        {/* Project Header */}
        <section className="py-12 bg-white border-b border-neutral-200">
          <div className="container-full">
            <h1 className="text-6xl md:text-7xl lg:text-8xl mb-4 uppercase tracking-tight" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, letterSpacing: "-0.02em" }}>
              PROYECTOS
            </h1>
            <p className="text-sm text-neutral-600">
              ({allProjects.length}) Proyectos
            </p>
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

        {/* Section Tabs */}
        {project.sections.length > 1 && (
          <section className="py-6 bg-white border-y border-neutral-300">
            <div className="container">
              <div className="flex gap-6 overflow-x-auto">
                {project.sections.map((section, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedSection(index);
                      setSelectedImage(0);
                    }}
                    className={`relative px-6 py-3 text-sm uppercase tracking-widest transition-all whitespace-nowrap ${
                      selectedSection === index
                        ? "text-black font-medium"
                        : "text-neutral-400 hover:text-neutral-600"
                    }`}
                    style={{ fontFamily: "'Lato', sans-serif" }}
                  >
                    {section.name}
                    {selectedSection === index && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Gallery */}
        <section className="py-16">
          <div className="container">
            {/* Section info */}
            <div className="mb-8">
              <h2 className="text-3xl mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                {currentSection.name}
              </h2>
              <p className="text-neutral-600 italic">Material: {currentSection.material}</p>
            </div>

            {/* Main image */}
            <div className="aspect-[16/9] mb-6 overflow-hidden bg-white">
              <img
                src={currentImages[selectedImage]}
                alt={`${project.title} - ${currentSection.name}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
              {currentImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-black' : 'border-neutral-300 hover:border-neutral-400'
                  }`}
                >
                  <img src={img} alt={`Vista ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </section>

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
              <Button size="lg" className="px-8">
                Contactar
              </Button>
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedProjects.map((relatedProject) => (
                  <Link key={relatedProject.id} href={`/portfolio/${relatedProject.id}`}>
                    <a className="block group">
                      <div className="aspect-[4/3] overflow-hidden mb-4 bg-white">
                        <img
                          src={relatedProject.image}
                          alt={relatedProject.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">
                        {relatedProject.category}
                      </p>
                      <h3 className="text-xl mb-1">{relatedProject.title}</h3>
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
