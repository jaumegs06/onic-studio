import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ChevronDown, Search, X } from "lucide-react";
import { productsAPI } from "@/lib/api";

interface Product {
  id: number;
  name: string;
  category: string;
  color: string;
  finish: string;
  image: string;
  bestSeller?: boolean;
}

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
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);

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
    setSelectedColor("Todos");
    setSelectedFinish("Todos");
    setSearchTerm("");
  };

  const hasActiveFilters = selectedColor !== "Todos" || selectedFinish !== "Todos" || searchTerm !== "";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productsAPI.getAll();
        setProducts(data);
      } catch (e) {
        console.error('Error fetching products:', e);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);



  const categories = ["Best Sellers", "All", "Granito", "Mármol", "Cuarcita", "Caliza"];
  const colors = ["Todos", "Blanco", "Negro", "Beige", "Rojo", "Rosa", "Verde", "Azul", "Marrón"];
  const finishes = ["Todos", "Pulido", "Apomazado", "Vintage/Leather", "Bruto", "Flameado", "Granallado"];

  // IDs de los productos Best Sellers
  const bestSellerIds = [76, 35, 41, 43, 45, 77, 57, 13];

  const filteredProducts = (products || []).filter((product) => {
    const matchesCategory = selectedCategory === "Best Sellers"
      ? bestSellerIds.includes(product.id)
      : selectedCategory === "All"
        ? true
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

      <main className="bg-stone-200 min-h-screen pt-28">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-stone-200">
          <div className="container-full">
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-4 uppercase tracking-tight" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 300, letterSpacing: "-0.03em" }}>
              MATERIALES
            </h1>
            <p className="text-xs md:text-sm text-neutral-600 mb-4 md:mb-6" style={{ letterSpacing: "0.2em" }}>
              ({filteredProducts.length}) MATERIALES
            </p>
            <p className="text-lg text-neutral-600 leading-relaxed max-w-3xl">
              Selección exclusiva de materiales premium para proyectos de lujo
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
                        {/* Color Filter */}
                        <div className="min-w-[200px]">
                          <button
                            onClick={() => setColorOpen(!colorOpen)}
                            className="w-full flex items-center justify-between py-2 border-b border-neutral-200 text-left"
                          >
                            <span className="text-sm uppercase tracking-[0.15em] text-neutral-700" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}>
                              Color
                            </span>
                            <ChevronDown className={`w-4 h-4 transition-transform ${colorOpen ? "rotate-180" : ""}`} />
                          </button>
                          {colorOpen && (
                            <div className="mt-3 space-y-2 max-h-[300px] overflow-y-auto">
                              {colors.map((color) => (
                                <button
                                  key={color}
                                  onClick={() => {
                                    setSelectedColor(color);
                                  }}
                                  className="w-full flex items-center gap-3 py-2 text-left group"
                                >
                                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedColor === color ? "border-black" : "border-neutral-300"
                                    }`}>
                                    {selectedColor === color && (
                                      <div className="w-2 h-2 rounded-full bg-black"></div>
                                    )}
                                  </div>
                                  <span className={`text-xs ${selectedColor === color ? "font-medium text-black" : "text-neutral-600"
                                    }`}>
                                    {color}
                                  </span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Finish Filter */}
                        <div className="min-w-[200px]">
                          <button
                            onClick={() => setFinishOpen(!finishOpen)}
                            className="w-full flex items-center justify-between py-2 border-b border-neutral-200 text-left"
                          >
                            <span className="text-sm uppercase tracking-[0.15em] text-neutral-700" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}>
                              Acabado
                            </span>
                            <ChevronDown className={`w-4 h-4 transition-transform ${finishOpen ? "rotate-180" : ""}`} />
                          </button>
                          {finishOpen && (
                            <div className="mt-3 space-y-2 max-h-[300px] overflow-y-auto">
                              {finishes.map((finish) => (
                                <button
                                  key={finish}
                                  onClick={() => {
                                    setSelectedFinish(finish);
                                  }}
                                  className="w-full flex items-center gap-3 py-2 text-left group"
                                >
                                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedFinish === finish ? "border-black" : "border-neutral-300"
                                    }`}>
                                    {selectedFinish === finish && (
                                      <div className="w-2 h-2 rounded-full bg-black"></div>
                                    )}
                                  </div>
                                  <span className={`text-xs ${selectedFinish === finish ? "font-medium text-black" : "text-neutral-600"
                                    }`}>
                                    {finish}
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
                {selectedColor !== "Todos" && (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-100 border border-neutral-200 text-xs uppercase tracking-wider">
                    <span className="text-neutral-700" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}>
                      Color: {selectedColor}
                    </span>
                    <button
                      onClick={() => setSelectedColor("Todos")}
                      className="text-neutral-500 hover:text-black transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                {selectedFinish !== "Todos" && (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-100 border border-neutral-200 text-xs uppercase tracking-wider">
                    <span className="text-neutral-700" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}>
                      Acabado: {selectedFinish}
                    </span>
                    <button
                      onClick={() => setSelectedFinish("Todos")}
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

        {loading && (
          <div className="flex justify-center items-center h-64">
            <p>Loading...</p>
          </div>
        )}
        {error && (
          <div className="text-center text-red-500 py-4">
            {error}
          </div>
        )}
        {/* Products Grid */}

        {/* Products Grid */}
        {!loading && !error && (
          <section className="py-12 md:py-16 bg-stone-200">
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
        )}
      </main>

      <Footer />
    </motion.div>
  );
}