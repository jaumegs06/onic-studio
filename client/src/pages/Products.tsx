import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Products() {
  const products = [
    {
      id: 1,
      name: "Mármol Calacatta",
      category: "Mármol",
      image: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=800&q=80",
    },
    {
      id: 2,
      name: "Travertino Romano",
      category: "Piedra Natural",
      image: "https://images.unsplash.com/photo-1634029551754-1b0c98c2b6c7?w=800&q=80",
    },
    {
      id: 3,
      name: "Roble Europeo",
      category: "Madera",
      image: "https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=800&q=80",
    },
    {
      id: 4,
      name: "Granito Negro",
      category: "Piedra Natural",
      image: "https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=800&q=80",
    },
    {
      id: 5,
      name: "Nogal Americano",
      category: "Madera",
      image: "https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?w=800&q=80",
    },
    {
      id: 6,
      name: "Mármol Emperador",
      category: "Mármol",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
    },
    {
      id: 7,
      name: "Piedra Arenisca",
      category: "Piedra Natural",
      image: "https://images.unsplash.com/photo-1625912153123-7a8b8c5f8e7c?w=800&q=80",
    },
    {
      id: 8,
      name: "Teca Natural",
      category: "Madera",
      image: "https://images.unsplash.com/photo-1615971677064-48d52c6d4d0e?w=800&q=80",
    },
    {
      id: 9,
      name: "Mármol Carrara",
      category: "Mármol",
      image: "https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=800&q=80",
    },
  ];

  return (
    <div className="flex flex-col">
      <Navigation />

      <main className="bg-stone-200 min-h-screen pt-28">
        {/* Hero Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl lg:text-7xl text-center font-serif mb-4">
            Nuestra Colección de Materiales
          </h1>
          <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto">
            Selección exclusiva de materiales premium para proyectos de lujo
          </p>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[3/4] overflow-hidden mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Overlay con información al hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <p className="text-xs text-white/80 uppercase tracking-widest mb-1">
                      {product.category}
                    </p>
                    <h3 className="text-white text-2xl font-serif">
                      {product.name}
                    </h3>
                  </div>
                </div>
                {/* Información visible siempre (alternativa minimalista) */}
                <div className="opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
                    {product.category}
                  </p>
                  <h3 className="text-foreground text-xl font-serif">
                    {product.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
