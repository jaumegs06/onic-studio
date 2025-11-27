import { useState } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  const products = [
    // GRANITOS
    { id: 1, name: "Alaska", category: "Granito", image: "/images/products/ALASKA - GRANITO .jpg" },
    { id: 2, name: "Amarula", category: "Granito", image: "/images/products/AMARULA - GRANITO.jpg" },
    { id: 3, name: "Angola Black", category: "Granito", image: "/images/products/ANGOLA BLACK - GRANITO.jpg" },
    { id: 4, name: "Aquabella", category: "Granito", image: "/images/products/AQUABELLA - GRANITO .jpg" },
    { id: 5, name: "Azul Noche", category: "Granito", image: "/images/products/AZUL NOCHE - GRANITO.jpg" },
    { id: 6, name: "Belvedere", category: "Granito", image: "/images/products/BELVEDERE - GRANITO .jpg" },
    { id: 7, name: "Blanco Cristal", category: "Granito", image: "/images/products/BLANCO CRISTAL - GRANITO.jpg" },
    { id: 8, name: "Blue Mare", category: "Granito", image: "/images/products/BLUE MARE GRANITO .jpg" },
    { id: 9, name: "Cheyene", category: "Granito", image: "/images/products/CHEYENE - GRANITO.jpg" },
    { id: 10, name: "Labrador Oscuro", category: "Granito", image: "/images/products/LABRADOR OSCURO - GRANITO.jpg" },
    { id: 11, name: "Lennon", category: "Granito", image: "/images/products/LENNON - GRANITO.jpg" },
    { id: 12, name: "Negro Tezal", category: "Granito", image: "/images/products/NEGRO TEZAL - GRANITO.jpg" },
    { id: 13, name: "Negro Zimbawe", category: "Granito", image: "/images/products/NEGRO ZIMBAWE - GRANITO .jpg" },
    { id: 14, name: "Olimpo", category: "Granito", image: "/images/products/OLIMPO - GRANITO .jpg" },
    { id: 15, name: "Perla Venata", category: "Granito", image: "/images/products/PERLA VENATA - GRANITO.jpg" },
    { id: 16, name: "Portobello", category: "Granito", image: "/images/products/PORTOBELLO - GRANITO .jpg" },
    { id: 17, name: "Rojo Balmoral", category: "Granito", image: "/images/products/ROJO BALMORAL - GRANITO.jpg" },
    { id: 18, name: "Rosa Porriño", category: "Granito", image: "/images/products/ROSA PORRIÑO - GRANITO.jpg" },
    { id: 19, name: "Rosavel", category: "Granito", image: "/images/products/ROSAVEL - GRANITO.jpg" },
    { id: 20, name: "Sahara Nights", category: "Granito", image: "/images/products/SAHARA NIGHTS - GRANITO.jpg" },
    { id: 21, name: "Stromboli", category: "Granito", image: "/images/products/STROMBOLI - GRANITO .jpg" },
    { id: 22, name: "Tropical Storm", category: "Granito", image: "/images/products/TROPICAL STORM - GRANITO .jpg" },
    { id: 23, name: "Verde Lara", category: "Granito", image: "/images/products/VERDE LARA. - GRANITO .jpg" },
    { id: 24, name: "Warwick Rubi", category: "Granito", image: "/images/products/WARWICK RUBI - GRANITO .jpg" },

    // MÁRMOLES
    { id: 25, name: "Blanco Carrara", category: "Mármol", image: "/images/products/BLANCO CARRARA - MARMOL .jpg" },
    { id: 26, name: "Blanco Dolomita", category: "Mármol", image: "/images/products/BLANCO DOLOMITA - MARMOL .webp" },
    { id: 27, name: "Blanco Ibiza", category: "Mármol", image: "/images/products/BLANCO IBIZA MARMOL .jpg" },
    { id: 28, name: "Blanco Thasos", category: "Mármol", image: "/images/products/BLANCO THASOS .jpg" },
    { id: 29, name: "Boticcino", category: "Mármol", image: "/images/products/BOTICCINO - MARMOL .webp" },
    { id: 30, name: "Calacatta Violet", category: "Mármol", image: "/images/products/CALACATTA VIOLET - MARMOL .webp" },
    { id: 31, name: "Calcatta Verde", category: "Mármol", image: "/images/products/CALCATTA VERDE - MARMOL .webp" },
    { id: 32, name: "Emperador Claro", category: "Mármol", image: "/images/products/EMPERADOR CLARO - MARMOL .webp" },
    { id: 33, name: "Emperador Oscuro", category: "Mármol", image: "/images/products/EMPERADRO OSCURO - MARMOL .jpg" },
    { id: 34, name: "Macael", category: "Mármol", image: "/images/products/MACAEL - MARMOL .webp" },
    { id: 35, name: "Marfil Clásico", category: "Mármol", image: "/images/products/MARMOL MARFIL CLASICO .jpg" },
    { id: 36, name: "Mistral", category: "Mármol", image: "/images/products/MISTRAL - MARMOLES .jpg" },
    { id: 37, name: "Negro Marquina", category: "Mármol", image: "/images/products/NEGRO MARQUINA - MARMOL .jpg" },
    { id: 38, name: "Rojo Alicante", category: "Mármol", image: "/images/products/ROJO ALICANTE - MARMOL .jpg" },
    { id: 39, name: "Rojo Levante", category: "Mármol", image: "/images/products/ROJO LEVANTE - MARMOL .webp" },
    { id: 40, name: "Rosa Portugués", category: "Mármol", image: "/images/products/ROSA PORTUGUES - MARMOL .jpg" },
    { id: 41, name: "Siena Pearl", category: "Mármol", image: "/images/products/SIENAI PERAL - MARMOL .jpg" },
    { id: 42, name: "Travertino Rojo", category: "Mármol", image: "/images/products/TRAVERINO ROJO - MARMOL .jpg" },
    { id: 43, name: "Travertino Cross Cut Light", category: "Mármol", image: "/images/products/TRAVERTINO CROSS CUT LIGHT .webp" },
    { id: 44, name: "Travertino Egipcio", category: "Mármol", image: "/images/products/TRAVERTINO EGIPCIO - MARMOL .jpg" },
    { id: 45, name: "Travertino Light Vein Cut", category: "Mármol", image: "/images/products/TRAVERTINO LIGHT VEIN CUT .webp" },
    { id: 46, name: "Travertino Vallanca", category: "Mármol", image: "/images/products/TRAVERTINO VALLANCA .jpg" },
    { id: 47, name: "Verde Antique", category: "Mármol", image: "/images/products/VERDE ANTIQUE - MARMOL .webp" },
    { id: 48, name: "Verde India", category: "Mármol", image: "/images/products/VERDE INDIA - MARMOL .jpeg" },

    // CUARCITAS
    { id: 49, name: "Blue Deep", category: "Cuarcita", image: "/images/products/BLUE DEEP - CUARCITA.jpg" },
    { id: 50, name: "Blue Roma", category: "Cuarcita", image: "/images/products/BLUE ROMA - CUARCITA .jpg" },
    { id: 51, name: "Diamond Black", category: "Cuarcita", image: "/images/products/DIAMOND BLACK - CUARCITA.jpg" },

    // CALIZAS
    { id: 52, name: "Basaltina", category: "Caliza", image: "/images/products/CALIZA BASALTINA.jpg" },
    { id: 53, name: "Beauharnais", category: "Caliza", image: "/images/products/CALIZA BEAUHARNAIS.jpg" },
    { id: 54, name: "Beaumaniere Classic", category: "Caliza", image: "/images/products/CALIZA BEAUMANIERE CLASSIC.jpg" },
    { id: 55, name: "Beaurnais", category: "Caliza", image: "/images/products/CALIZA BEAURNAIS.jpg" },
    { id: 56, name: "Blue Chevernie", category: "Caliza", image: "/images/products/CALIZA BLUE CHEVERNIE.jpg" },
    { id: 57, name: "Capri", category: "Caliza", image: "/images/products/CALIZA CAPRI.jpg" },
    { id: 58, name: "Damask Gold", category: "Caliza", image: "/images/products/CALIZA DAMASK GOLD.jpg" },
    { id: 59, name: "Fountaine Clare", category: "Caliza", image: "/images/products/CALIZA FOUNTAINE CLARE.jpg" },
    { id: 60, name: "Gascogne Blue", category: "Caliza", image: "/images/products/CALIZA GASCOGNE BLUE.jpg" },
    { id: 61, name: "Heliodoro", category: "Caliza", image: "/images/products/CALIZA HELIODORO.jpg" },
    { id: 62, name: "Limestone Bianco", category: "Caliza", image: "/images/products/CALIZA LIMESTONE BIANCO.jpg" },
    { id: 63, name: "Magny Louvre", category: "Caliza", image: "/images/products/CALIZA MAGNY LOUVRE.jpg" },
    { id: 64, name: "Moca Creme", category: "Caliza", image: "/images/products/CALIZA MOCA CREME.jpg" },
    { id: 65, name: "Moleanos", category: "Caliza", image: "/images/products/CALIZA MOLEANOS.jpg" },
    { id: 66, name: "Peperino Grigio", category: "Caliza", image: "/images/products/CALIZA PEPERINO GRIGIO.jpg" },
    { id: 67, name: "Picture Stone", category: "Caliza", image: "/images/products/CALIZA PICTURE STONE.jpg" },
    { id: 68, name: "Pietra del Cardoso", category: "Caliza", image: "/images/products/CALIZA PIETRA DEL CARDOSO.jpg" },
    { id: 69, name: "Pietra di Bedonia", category: "Caliza", image: "/images/products/CALIZA PIETRA DI BEDONIA.jpg" },
    { id: 70, name: "Pietra di Vicenza", category: "Caliza", image: "/images/products/CALIZA PIETRA DI VICENZA.jpg" },
    { id: 71, name: "Pietra Dorata", category: "Caliza", image: "/images/products/CALIZA PIETRA DORATA.jpg" },
    { id: 72, name: "Pietra Serena", category: "Caliza", image: "/images/products/CALIZA PIETRA SERENA.jpg" },
    { id: 73, name: "Richeval", category: "Caliza", image: "/images/products/CALIZA RICHEVAL.jpg" },
    { id: 74, name: "Rose Laurents", category: "Caliza", image: "/images/products/CALIZA ROSE LAURENTS.jpg" },
    { id: 75, name: "Teak Wood", category: "Caliza", image: "/images/products/CALIZA TEAK WOOD.jpg" },
  ];

  const categories = ["Todos", "Granito", "Mármol", "Cuarcita", "Caliza"];

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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

        {/* Filter Section */}
        <section className="py-8 bg-white border-y border-neutral-300">
          <div className="max-w-7xl mx-auto px-6">
            {/* Barra de búsqueda */}
            <div className="mb-8 max-w-md mx-auto">
              <input
                type="text"
                placeholder="Buscar material..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-3 border border-neutral-300 focus:outline-none focus:border-black transition-colors text-sm uppercase tracking-wider"
                style={{ fontFamily: "'Lato', sans-serif" }}
              />
            </div>

            {/* Filtros de categoría */}
            <div className="flex flex-wrap gap-4 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-8 py-3 text-sm uppercase tracking-widest transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-black text-white"
                      : "bg-transparent text-neutral-600 hover:bg-neutral-100 border border-neutral-300"
                  }`}
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  {category}
                </button>
              ))}
            </div>
            <p className="text-center mt-6 text-sm text-neutral-500">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'material' : 'materiales'} encontrados
            </p>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <Link key={product.id} href={`/productos/${product.id}`}>
                  <a className="block group cursor-pointer">
                  <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-white">
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
                  {/* Información visible siempre */}
                  <div className="opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
                      {product.category}
                    </p>
                    <h3 className="text-foreground text-xl font-serif">
                      {product.name}
                    </h3>
                  </div>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}