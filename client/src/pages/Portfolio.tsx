import { useState } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Portfolio() {
  const [filter, setFilter] = useState("Todos");

  const categories = ["Todos", "Residencial", "Hospitalidad"];

  const projects = [
    // Hotel Meliá Beach - Consolidado
    {
      id: 1,
      title: "Hotel Meliá Beach",
      category: "Hospitalidad",
      location: "Mallorca",
      year: "2024",
      materials: "Techlam, Quarzo",
      image: "/images/projects/HOTEL MELIA BEACH - MATERIAL BAÑOS TECHLAM - BARRA QUARZO/_MG_8806.jpg",
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
    // Hotel Katmandu
    {
      id: 2,
      title: "Hotel Katmandu",
      category: "Hospitalidad",
      location: "Mallorca",
      year: "2024",
      materials: "Granito Negro Zimbabwe",
      image: "/images/projects/HOTEL KATMANDU - BUFFET GRANITO NEGRO ZIMBAWE/_MG_8961.jpg",
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
    // Apartamentos Cala Major - Consolidado
    {
      id: 3,
      title: "Apartamentos Cala Major",
      category: "Residencial",
      location: "Mallorca",
      year: "2024",
      materials: "Techlam",
      image: "/images/projects/APARTAMENTOS CALA MAJOR - MATERIAL TECHLAM/_MG_8589.jpg",
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

  const filteredProjects =
    filter === "Todos"
      ? projects
      : projects.filter((project) => project.category === filter);

  return (
    <div className="flex flex-col">
      <Navigation />

      <main className="bg-stone-200 min-h-screen pt-28">
        {/* Hero Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl mb-6">Portfolio</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Una selección de nuestros proyectos más destacados en
                arquitectura y diseño de interiores de lujo.
              </p>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 bg-white border-y border-border">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-wrap gap-4 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-6 py-2 text-sm uppercase tracking-wider transition-colors ${
                    filter === category
                      ? "bg-foreground text-background"
                      : "bg-transparent text-foreground hover:bg-foreground/10"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <Link key={project.id} href={`/portfolio/${project.id}`}>
                  <a className="block group cursor-pointer">
                    <div className="relative h-80 mb-4 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground uppercase tracking-wider">
                        {project.category}
                      </p>
                      <h3 className="text-xl">{project.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {project.location} · {project.year}
                      </p>
                      <p className="text-xs text-muted-foreground italic">
                        {project.materials}
                      </p>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
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
    </div>
  );
}
