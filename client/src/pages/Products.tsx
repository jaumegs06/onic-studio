import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ChevronDown, Search, X } from "lucide-react";

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState(() => {
    return sessionStorage.getItem('selectedCategory') || "Best Sellers";
  });
  const [selectedColor, setSelectedColor] = useState(() => {
    return sessionStorage.getItem('selectedColor') || "Todos";
  });
  const [selectedFinish, setSelectedFinish] = useState(() => {
    return sessionStorage.getItem('selectedFinish') || "Todos";
  });
  const [searchTerm, setSearchTerm] = useState(() => {
    return sessionStorage.getItem('searchTerm') || "";
  });
  const [colorOpen, setColorOpen] = useState(false);
  const [finishOpen, setFinishOpen] = useState(false);

  const colorRef = useRef<HTMLDivElement>(null);
  const finishRef = useRef<HTMLDivElement>(null);

  // Guardar filtros cuando cambien
  useEffect(() => {
    sessionStorage.setItem('selectedCategory', selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    sessionStorage.setItem('selectedColor', selectedColor);
  }, [selectedColor]);

  useEffect(() => {
    sessionStorage.setItem('selectedFinish', selectedFinish);
  }, [selectedFinish]);

  useEffect(() => {
    sessionStorage.setItem('searchTerm', searchTerm);
  }, [searchTerm]);

  // Restaurar posición del scroll al volver
  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem('productsScrollPosition');
    if (savedScrollPosition) {
      window.scrollTo(0, parseInt(savedScrollPosition));
      sessionStorage.removeItem('productsScrollPosition');
    }
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (colorRef.current && !colorRef.current.contains(event.target as Node)) {
        setColorOpen(false);
      }
      if (finishRef.current && !finishRef.current.contains(event.target as Node)) {
        setFinishOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const clearAllFilters = () => {
    setSelectedColor("Todos");
    setSelectedFinish("Todos");
    setSearchTerm("");
  };

  const hasActiveFilters = selectedColor !== "Todos" || selectedFinish !== "Todos" || searchTerm !== "";

  const products = [
    // GRANITOS
    { id: 1, name: "Alaska", category: "Granito", color: "Blanco", finish: "Pulido", image: "/images/products/ALASKA - GRANITO .jpg" },
    { id: 2, name: "Amarula", category: "Granito", color: "Beige", finish: "Pulido", image: "/images/products/AMARULA - GRANITO.jpg" },
    { id: 3, name: "Angola Black", category: "Granito", color: "Negro", finish: "Pulido", image: "/images/products/ANGOLA BLACK - GRANITO.jpg" },
    { id: 4, name: "Aquabella", category: "Granito", color: "Azul", finish: "Pulido", image: "/images/products/AQUABELLA - GRANITO .jpg" },
    { id: 5, name: "Azul Noche", category: "Granito", color: "Azul", finish: "Pulido", image: "/images/products/AZUL NOCHE - GRANITO.jpg" },
    { id: 6, name: "Belvedere", category: "Granito", color: "Beige", finish: "Pulido", image: "/images/products/BELVEDERE - GRANITO .jpg" },
    { id: 7, name: "Blanco Cristal", category: "Granito", color: "Blanco", finish: "Pulido", image: "/images/products/BLANCO CRISTAL - GRANITO.jpg" },
    { id: 8, name: "Blue Mare", category: "Granito", color: "Azul", finish: "Pulido", image: "/images/products/BLUE MARE GRANITO .jpg" },
    { id: 9, name: "Cheyene", category: "Granito", color: "Beige", finish: "Pulido", image: "/images/products/CHEYENE - GRANITO.jpg" },
    { id: 10, name: "Labrador Oscuro", category: "Granito", color: "Negro", finish: "Pulido", image: "/images/products/LABRADOR OSCURO - GRANITO.jpg" },
    { id: 11, name: "Lennon", category: "Granito", color: "Beige", finish: "Pulido", image: "/images/products/LENNON - GRANITO.jpg" },
    { id: 12, name: "Negro Tezal", category: "Granito", color: "Negro", finish: "Pulido", image: "/images/products/NEGRO TEZAL - GRANITO.jpg" },
    { id: 13, name: "Negro Zimbawe", category: "Granito", color: "Negro", finish: "Pulido", image: "/images/products/NEGRO ZIMBAWE - GRANITO .jpg" },
    { id: 14, name: "Olimpo", category: "Granito", color: "Beige", finish: "Pulido", image: "/images/products/OLIMPO - GRANITO .jpg" },
    { id: 15, name: "Perla Venata", category: "Granito", color: "Blanco", finish: "Pulido", image: "/images/products/PERLA VENATA - GRANITO.jpg" },
    { id: 16, name: "Portobello", category: "Granito", color: "Beige", finish: "Pulido", image: "/images/products/PORTOBELLO - GRANITO .jpg" },
    { id: 17, name: "Rojo Balmoral", category: "Granito", color: "Rojo", finish: "Pulido", image: "/images/products/ROJO BALMORAL - GRANITO.jpg" },
    { id: 18, name: "Rosa Porriño", category: "Granito", color: "Rosa", finish: "Pulido", image: "/images/products/ROSA PORRIÑO - GRANITO.jpg" },
    { id: 19, name: "Rosavel", category: "Granito", color: "Rosa", finish: "Pulido", image: "/images/products/ROSAVEL - GRANITO.jpg" },
    { id: 20, name: "Sahara Nights", category: "Granito", color: "Beige", finish: "Pulido", image: "/images/products/SAHARA NIGHTS - GRANITO.jpg" },
    { id: 21, name: "Stromboli", category: "Granito", color: "Negro", finish: "Pulido", image: "/images/products/STROMBOLI - GRANITO .jpg" },
    { id: 22, name: "Tropical Storm", category: "Granito", color: "Beige", finish: "Pulido", image: "/images/products/TROPICAL STORM - GRANITO .jpg" },
    { id: 23, name: "Verde Lara", category: "Granito", color: "Verde", finish: "Pulido", image: "/images/products/VERDE LARA. - GRANITO .jpg" },
    { id: 24, name: "Warwick Rubi", category: "Granito", color: "Rojo", finish: "Pulido", image: "/images/products/WARWICK RUBI - GRANITO .jpg" },

    // MÁRMOLES
    { id: 25, name: "Blanco Carrara", category: "Mármol", color: "Blanco", finish: "Pulido", image: "/images/products/BLANCO CARRARA - MARMOL .jpg" },
    { id: 26, name: "Blanco Dolomita", category: "Mármol", color: "Blanco", finish: "Pulido", image: "/images/products/BLANCO DOLOMITA - MARMOL .webp" },
    { id: 27, name: "Blanco Ibiza", category: "Mármol", color: "Blanco", finish: "Pulido", image: "/images/products/BLANCO IBIZA MARMOL .jpg" },
    { id: 28, name: "Blanco Thasos", category: "Mármol", color: "Blanco", finish: "Pulido", image: "/images/products/BLANCO THASOS .jpg" },
    { id: 29, name: "Boticcino", category: "Mármol", color: "Beige", finish: "Pulido", image: "/images/products/BOTICCINO - MARMOL .webp" },
    { id: 30, name: "Calacatta Violet", category: "Mármol", color: "Blanco", finish: "Pulido", image: "/images/products/CALACATTA VIOLET - MARMOL .webp" },
    { id: 31, name: "Calcatta Verde", category: "Mármol", color: "Verde", finish: "Pulido", image: "/images/products/CALCATTA VERDE - MARMOL .webp" },
    { id: 32, name: "Emperador Claro", category: "Mármol", color: "Marrón", finish: "Pulido", image: "/images/products/EMPERADOR CLARO - MARMOL .webp" },
    { id: 33, name: "Emperador Oscuro", category: "Mármol", color: "Marrón", finish: "Pulido", image: "/images/products/EMPERADRO OSCURO - MARMOL .jpg" },
    { id: 34, name: "Blanco Macael", category: "Mármol", color: "Blanco", finish: "Pulido", image: "/images/products/MACAEL - MARMOL .webp" },
    { id: 35, name: "Crema Marfil Clásico", category: "Mármol", color: "Beige", finish: "Pulido", image: "/images/products/MARMOL MARFIL CLASICO .jpg" },
    { id: 36, name: "Mistral", category: "Mármol", color: "Beige", finish: "Pulido", image: "/images/products/MISTRAL - MARMOLES .jpg" },
    { id: 37, name: "Negro Marquina", category: "Mármol", color: "Negro", finish: "Pulido", image: "/images/products/NEGRO MARQUINA - MARMOL .jpg" },
    { id: 38, name: "Rojo Alicante", category: "Mármol", color: "Rojo", finish: "Pulido", image: "/images/products/ROJO ALICANTE - MARMOL .jpg" },
    { id: 39, name: "Rojo Levante", category: "Mármol", color: "Rojo", finish: "Pulido", image: "/images/products/ROJO LEVANTE - MARMOL .webp" },
    { id: 40, name: "Rosa Portugués", category: "Mármol", color: "Rosa", finish: "Pulido", image: "/images/products/ROSA PORTUGUES - MARMOL .jpg" },
    { id: 41, name: "Sinai Pearl / Beig Levante", category: "Mármol", color: "Beige", finish: "Pulido", image: "/images/products/SIENAI PERAL - MARMOL .jpg" },
    { id: 42, name: "Travertino Rojo", category: "Mármol", color: "Rojo", finish: "Apomazado", image: "/images/products/TRAVERINO ROJO - MARMOL .jpg" },
    { id: 43, name: "Travertino Turco Light Cross Cut", category: "Mármol", color: "Beige", finish: "Apomazado", image: "/images/products/TRAVERTINO CROSS CUT LIGHT .webp" },
    { id: 44, name: "Travertino Egipcio", category: "Mármol", color: "Beige", finish: "Apomazado", image: "/images/products/TRAVERTINO EGIPCIO - MARMOL .jpg" },
    { id: 45, name: "Travertino Turco Light Vein Cut", category: "Mármol", color: "Beige", finish: "Apomazado", image: "/images/products/TRAVERTINO LIGHT VEIN CUT .webp" },
    { id: 46, name: "Travertino Vallanca", category: "Mármol", color: "Beige", finish: "Apomazado", image: "/images/products/TRAVERTINO VALLANCA .jpg" },
    { id: 47, name: "Verde Antique", category: "Mármol", color: "Verde", finish: "Pulido", image: "/images/products/VERDE ANTIQUE - MARMOL .webp" },
    { id: 48, name: "Verde India", category: "Mármol", color: "Verde", finish: "Pulido", image: "/images/products/VERDE INDIA - MARMOL .jpeg" },
    { id: 76, name: "Gris Zarzi", category: "Mármol", color: "Beige", finish: "Pulido", image: "/images/products/GRIS ZARZI - MARMOL.jpg" },
    { id: 77, name: "Piedra de Binissalem", category: "Mármol", color: "Beige", finish: "Apomazado", image: "/images/products/PIEDRA BINISSALEM - MARMOL.jpg" },

    // CUARCITAS
    { id: 49, name: "Blue Deep", category: "Cuarcita", color: "Azul", finish: "Pulido", image: "/images/products/BLUE DEEP - CUARCITA.jpg" },
    { id: 50, name: "Blue Roma", category: "Cuarcita", color: "Azul", finish: "Pulido", image: "/images/products/BLUE ROMA - CUARCITA .jpg" },
    { id: 51, name: "Diamond Black", category: "Cuarcita", color: "Negro", finish: "Vintage/Leather", image: "/images/products/DIAMOND BLACK - CUARCITA.jpg" },

    // CALIZAS
    { id: 52, name: "Basaltina", category: "Caliza", color: "Negro", finish: "Apomazado", image: "/images/products/CALIZA BASALTINA.jpg" },
    { id: 53, name: "Beauharnais", category: "Caliza", color: "Beige", finish: "Bruto", image: "/images/products/CALIZA BEAUHARNAIS.jpg" },
    { id: 54, name: "Beaumaniere Classic", category: "Caliza", color: "Beige", finish: "Bruto", image: "/images/products/CALIZA BEAUMANIERE CLASSIC.jpg" },
    { id: 55, name: "Beaurnais", category: "Caliza", color: "Beige", finish: "Bruto", image: "/images/products/CALIZA BEAURNAIS.jpg" },
    { id: 56, name: "Blue Chevernie", category: "Caliza", color: "Azul", finish: "Bruto", image: "/images/products/CALIZA BLUE CHEVERNIE.jpg" },
    { id: 57, name: "Capri", category: "Caliza", color: "Blanco", finish: "Pulido", image: "/images/products/CALIZA CAPRI.jpg" },
    { id: 58, name: "Damask Gold", category: "Caliza", color: "Beige", finish: "Bruto", image: "/images/products/CALIZA DAMASK GOLD.jpg" },
    { id: 59, name: "Fountaine Clare", category: "Caliza", color: "Beige", finish: "Bruto", image: "/images/products/CALIZA FOUNTAINE CLARE.jpg" },
    { id: 60, name: "Gascogne Blue", category: "Caliza", color: "Azul", finish: "Bruto", image: "/images/products/CALIZA GASCOGNE BLUE.jpg" },
    { id: 61, name: "Heliodoro", category: "Caliza", color: "Beige", finish: "Apomazado", image: "/images/products/CALIZA HELIODORO.jpg" },
    { id: 62, name: "Limestone Bianco", category: "Caliza", color: "Blanco", finish: "Pulido", image: "/images/products/CALIZA LIMESTONE BIANCO.jpg" },
    { id: 63, name: "Magny Louvre", category: "Caliza", color: "Beige", finish: "Bruto", image: "/images/products/CALIZA MAGNY LOUVRE.jpg" },
    { id: 64, name: "Moca Creme", category: "Caliza", color: "Beige", finish: "Pulido", image: "/images/products/CALIZA MOCA CREME.jpg" },
    { id: 65, name: "Moleanos", category: "Caliza", color: "Beige", finish: "Apomazado", image: "/images/products/CALIZA MOLEANOS.jpg" },
    { id: 66, name: "Peperino Grigio", category: "Caliza", color: "Beige", finish: "Flameado", image: "/images/products/CALIZA PEPERINO GRIGIO.jpg" },
    { id: 67, name: "Picture Stone", category: "Caliza", color: "Beige", finish: "Bruto", image: "/images/products/CALIZA PICTURE STONE.jpg" },
    { id: 68, name: "Pietra del Cardoso", category: "Caliza", color: "Negro", finish: "Flameado", image: "/images/products/CALIZA PIETRA DEL CARDOSO.jpg" },
    { id: 69, name: "Pietra di Bedonia", category: "Caliza", color: "Beige", finish: "Bruto", image: "/images/products/CALIZA PIETRA DI BEDONIA.jpg" },
    { id: 70, name: "Pietra di Vicenza", category: "Caliza", color: "Beige", finish: "Bruto", image: "/images/products/CALIZA PIETRA DI VICENZA.jpg" },
    { id: 71, name: "Pietra Dorata", category: "Caliza", color: "Beige", finish: "Bruto", image: "/images/products/CALIZA PIETRA DORATA.jpg" },
    { id: 72, name: "Pietra Serena", category: "Caliza", color: "Beige", finish: "Apomazado", image: "/images/products/CALIZA PIETRA SERENA.jpg" },
    { id: 73, name: "Richeval", category: "Caliza", color: "Beige", finish: "Bruto", image: "/images/products/CALIZA RICHEVAL.jpg" },
    { id: 74, name: "Rose Laurents", category: "Caliza", color: "Rosa", finish: "Bruto", image: "/images/products/CALIZA ROSE LAURENTS.jpg" },
    { id: 75, name: "Teak Wood", category: "Caliza", color: "Marrón", finish: "Apomazado", image: "/images/products/CALIZA TEAK WOOD.jpg" },
  ];

  const categories = ["Best Sellers", "Granito", "Mármol", "Cuarcita", "Caliza"];
  const colors = ["Todos", "Blanco", "Negro", "Beige", "Rojo", "Rosa", "Verde", "Azul", "Marrón"];
  const finishes = ["Todos", "Pulido", "Apomazado", "Vintage/Leather", "Bruto", "Flameado", "Granallado"];

  // IDs de los productos Best Sellers
  const bestSellerIds = [76, 35, 41, 43, 45, 77, 57, 13];

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "Best Sellers" 
      ? bestSellerIds.includes(product.id)
      : product.category === selectedCategory;
    const matchesColor = selectedColor === "Todos" || product.color === selectedColor;
    const matchesFinish = selectedFinish === "Todos" || product.finish === selectedFinish;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesColor && matchesFinish && matchesSearch;
  });

  return (
    <motion.div 
      className="flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navigation />

      <main className="bg-white min-h-screen pt-28">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-stone-200">
          <div className="container-full">
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-4 uppercase tracking-tight" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, letterSpacing: "-0.02em" }}>
              MATERIALES
            </h1>
            <p className="text-xs md:text-sm text-neutral-600 mb-4 md:mb-6">
              ({filteredProducts.length}) Materiales
            </p>
            <p className="text-lg text-neutral-600 leading-relaxed max-w-3xl">
              Selección exclusiva de materiales premium para proyectos de lujo
            </p>
          </div>
        </section>

        {/* Category Tabs */}
        <section className="py-8 bg-stone-200 border-b border-neutral-300">
          <div className="container-full">
            <div className="flex flex-wrap items-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 text-sm uppercase tracking-widest transition-all ${
                    selectedCategory === category 
                      ? "bg-black text-white" 
                      : "bg-white text-black hover:bg-stone-100 border border-neutral-200"
                  }`}
                  style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: selectedCategory === category ? 600 : 500 }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 bg-white border-b border-neutral-200">
          <div className="container">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
                {/* Filtros desplegables */}
                <div className="flex flex-wrap items-center gap-2">

                  {/* Filtro de Color */}
                  <div className="relative" ref={colorRef}>
                    <button
                      onClick={() => {
                        setColorOpen(!colorOpen);
                        setCategoryOpen(false);
                        setFinishOpen(false);
                      }}
                      className={`group flex items-center gap-2 px-5 py-2.5 bg-stone-50 hover:bg-stone-100 border border-neutral-200 transition-all text-xs uppercase tracking-widest ${
                        selectedColor !== "Todos" ? "border-black bg-stone-100" : ""
                      }`}
                      style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
                    >
                      <span className={selectedColor !== "Todos" ? "font-semibold" : ""}>
                        {selectedColor !== "Todos" ? selectedColor : "Color"}
                      </span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${
                        colorOpen ? "rotate-180" : ""
                      }`} />
                    </button>
                    {colorOpen && (
                      <div className="absolute top-full left-0 mt-2 bg-white border border-neutral-200 shadow-xl z-20 min-w-[220px] max-h-[320px] overflow-y-auto">
                        {colors.map((color) => (
                          <button
                            key={color}
                            onClick={() => {
                              setSelectedColor(color);
                              setColorOpen(false);
                            }}
                            className={`w-full text-left px-5 py-3 text-xs uppercase tracking-widest hover:bg-stone-50 transition-colors border-b border-neutral-100 last:border-0 ${
                              selectedColor === color ? "bg-stone-50 font-semibold" : ""
                            }`}
                            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: selectedColor === color ? 600 : 400 }}
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Filtro de Acabado */}
                  <div className="relative" ref={finishRef}>
                    <button
                      onClick={() => {
                        setFinishOpen(!finishOpen);
                        setCategoryOpen(false);
                        setColorOpen(false);
                      }}
                      className={`group flex items-center gap-2 px-5 py-2.5 bg-stone-50 hover:bg-stone-100 border border-neutral-200 transition-all text-xs uppercase tracking-widest ${
                        selectedFinish !== "Todos" ? "border-black bg-stone-100" : ""
                      }`}
                      style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
                    >
                      <span className={selectedFinish !== "Todos" ? "font-semibold" : ""}>
                        {selectedFinish !== "Todos" ? selectedFinish : "Acabado"}
                      </span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${
                        finishOpen ? "rotate-180" : ""
                      }`} />
                    </button>
                    {finishOpen && (
                      <div className="absolute top-full left-0 mt-2 bg-white border border-neutral-200 shadow-xl z-20 min-w-[220px] max-h-[320px] overflow-y-auto">
                        {finishes.map((finish) => (
                          <button
                            key={finish}
                            onClick={() => {
                              setSelectedFinish(finish);
                              setFinishOpen(false);
                            }}
                            className={`w-full text-left px-5 py-3 text-xs uppercase tracking-widest hover:bg-stone-50 transition-colors border-b border-neutral-100 last:border-0 ${
                              selectedFinish === finish ? "bg-stone-50 font-semibold" : ""
                            }`}
                            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: selectedFinish === finish ? 600 : 400 }}
                          >
                            {finish}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Barra de búsqueda */}
                <div className="relative lg:ml-auto">
                  <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full lg:w-80 pl-4 pr-10 py-2.5 bg-stone-50 border border-neutral-200 focus:border-black focus:outline-none transition-colors text-xs uppercase tracking-widest placeholder:text-neutral-400"
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

              {/* Active Filters */}
              {hasActiveFilters && (
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-neutral-200">
                  <span className="text-[10px] uppercase tracking-widest text-neutral-400 mr-1" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}>Activos:</span>
                  {selectedCategory !== "Todos" && (
                    <button
                      onClick={() => setSelectedCategory("Todos")}
                      className="group flex items-center gap-1.5 px-3 py-1.5 bg-black text-white hover:bg-neutral-800 transition-colors text-[10px] uppercase tracking-widest"
                      style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
                    >
                      <span>{selectedCategory}</span>
                      <X className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                    </button>
                  )}
                  {selectedColor !== "Todos" && (
                    <button
                      onClick={() => setSelectedColor("Todos")}
                      className="group flex items-center gap-1.5 px-3 py-1.5 bg-black text-white hover:bg-neutral-800 transition-colors text-[10px] uppercase tracking-widest"
                      style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
                    >
                      <span>{selectedColor}</span>
                      <X className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                    </button>
                  )}
                  {selectedFinish !== "Todos" && (
                    <button
                      onClick={() => setSelectedFinish("Todos")}
                      className="group flex items-center gap-1.5 px-3 py-1.5 bg-black text-white hover:bg-neutral-800 transition-colors text-[10px] uppercase tracking-widest"
                      style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
                    >
                      <span>{selectedFinish}</span>
                      <X className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                    </button>
                  )}
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="group flex items-center gap-1.5 px-3 py-1.5 bg-black text-white hover:bg-neutral-800 transition-colors text-[10px] uppercase tracking-widest"
                      style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
                    >
                      <span>"{searchTerm}"</span>
                      <X className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                    </button>
                  )}
                  <button
                    onClick={clearAllFilters}
                    className="ml-2 px-3 py-1.5 border border-neutral-300 hover:border-black hover:bg-stone-50 transition-colors text-[10px] uppercase tracking-widest"
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
                  >
                    Limpiar
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12 md:py-16">
          <div className="container-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5 }}
                >
                  <Link href={`/productos/${product.id}`}>
                    <a 
                      className="block group cursor-pointer"
                      onClick={() => {
                        sessionStorage.setItem('productsScrollPosition', window.scrollY.toString());
                      }}
                    >
                    <motion.div 
                      className="relative aspect-[3/4] overflow-hidden mb-4 bg-white"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
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
                    </motion.div>
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
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </motion.div>
  );
}