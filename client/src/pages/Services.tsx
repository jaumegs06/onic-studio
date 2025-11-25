import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Services() {
  const services = [
    {
      title: "Arquitectura Residencial",
      description:
        "Diseñamos viviendas exclusivas que combinan funcionalidad, estética y sostenibilidad. Cada proyecto residencial es único y refleja la personalidad y estilo de vida de nuestros clientes.",
      features: [
        "Diseño arquitectónico integral",
        "Planificación espacial optimizada",
        "Selección de materiales premium",
        "Supervisión de obra completa",
      ],
      image: "/images/residential.jpg",
    },
    {
      title: "Hoteles y Hospitalidad",
      description:
        "Creamos espacios hoteleros que ofrecen experiencias memorables. Desde hoteles boutique hasta resorts de lujo, diseñamos ambientes que combinan confort, elegancia y funcionalidad operativa.",
      features: [
        "Diseño de espacios públicos y privados",
        "Optimización de flujos operativos",
        "Experiencia de usuario integral",
        "Identidad visual coherente",
      ],
      image: "/images/hotel.jpg",
    },
    {
      title: "Restauración y Gastronomía",
      description:
        "Diseñamos restaurantes, bares y espacios gastronómicos que crean atmósferas únicas. Nuestros proyectos equilibran estética, acústica, iluminación y funcionalidad para ofrecer experiencias culinarias excepcionales.",
      features: [
        "Diseño de ambientes gastronómicos",
        "Planificación de cocinas profesionales",
        "Iluminación y acústica especializada",
        "Mobiliario y decoración a medida",
      ],
      image: "/images/restaurant.jpg",
    },
  ];

  return (
    <div className="flex flex-col">
      <Navigation />

      <main className="bg-stone-200 min-h-screen pt-28">
        {/* Hero Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl mb-6">Servicios</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Ofrecemos servicios integrales de arquitectura y diseño de
                interiores para proyectos de alto standing. Nuestro enfoque
                combina creatividad, funcionalidad y atención al detalle.
              </p>
            </div>
          </div>
        </section>

        {/* Services Detail */}
        {services.map((service, index) => (
          <section
            key={index}
            className="py-24"
          >
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className={index % 2 === 0 ? "order-1" : "order-1 lg:order-2"}>
                  <h2 className="text-4xl mb-6">{service.title}</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                    {service.description}
                  </p>
                  <div className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-foreground mt-2.5 flex-shrink-0" />
                        <p className="text-foreground">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={index % 2 === 0 ? "order-2" : "order-2 lg:order-1"}>
                  <div className="relative h-96 lg:h-[500px]">
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* CTA Section */}
        <section className="py-24 bg-foreground text-background">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl mb-6">
              ¿Tienes un proyecto en mente?
            </h2>
            <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto">
              Nos encantaría conocer tus ideas y ayudarte a crear el espacio
              perfecto para tu proyecto.
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
    </div>
  );
}
