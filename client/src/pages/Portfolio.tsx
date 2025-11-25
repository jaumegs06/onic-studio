import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Portfolio() {
  const [filter, setFilter] = useState("Todos");

  const categories = ["Todos", "Residencial", "Hoteles", "Restauración"];

  const projects = [
    {
      title: "Villa Moderna",
      category: "Residencial",
      location: "Madrid",
      year: "2024",
      image: "/images/project1.jpg",
    },
    {
      title: "Casa Minimalista",
      category: "Residencial",
      location: "Barcelona",
      year: "2023",
      image: "/images/project2.jpg",
    },
    {
      title: "Residencia de Lujo",
      category: "Residencial",
      location: "Marbella",
      year: "2023",
      image: "/images/project3.jpg",
    },
    {
      title: "Hotel Boutique",
      category: "Hoteles",
      location: "Valencia",
      year: "2024",
      image: "/images/hotel.jpg",
    },
    {
      title: "Restaurante Gourmet",
      category: "Restauración",
      location: "Madrid",
      year: "2023",
      image: "/images/restaurant.jpg",
    },
    {
      title: "Villa Contemporánea",
      category: "Residencial",
      location: "Ibiza",
      year: "2024",
      image: "/images/residential.jpg",
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
              {filteredProjects.map((project, index) => (
                <div
                  key={index}
                  className="group cursor-pointer"
                >
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
                  </div>
                </div>
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
