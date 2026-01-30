import { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Mail, Package } from "lucide-react";
import { productsAPI } from "@/lib/api";

interface Product {
  id: number;
  name: string;
  category: string;
  color: string;
  finish: string;
  image: string;
  best_seller?: boolean;
}

// Category-specific data
const CATEGORY_DATA = {
  Granito: {
    sizes: ["60x30 cm", "60x40 cm", "60x60 cm", "80x80 cm", "100x100 cm", "Tabla"],
    finishes: ["Pulido", "Apomazado", "Leather/Vintage"],
    extraFinishes: ["Bruto", "Flameado", "Granallado"],
    graniteWithExtraFinishes: [
      "Angola Black", "Azul noche", "Labrador oscuro", "Negro TEzal",
      "Negro zimbabwe", "Rojo Balmoral", "Rosa Porriño", "Rosavel", "Blanco cristal"
    ],
    applications: ["Encimeras", "Pavimentos", "Fachadas"]
  },
  Mármol: {
    sizes: ["60x30 cm", "60x40 cm", "60x60 cm", "80x80 cm", "100x100 cm", "Tabla"],
    finishes: ["Pulido", "Natural", "Apomazado", "Arenado", "Envejecido", "Abujardado", "Abujardado y Cepillado"],
    applications: ["Encimeras", "Baños", "Pavimentos", "Fachadas"],
    hasOpusRomano: true // For travertino materials
  },
  Caliza: {
    sizes: ["60x30 cm", "60x40 cm", "60x60 cm", "80x80 cm", "100x100 cm", "Tabla"],
    finishes: ["Pulido", "Natural", "Apomazado", "Arenado", "Envejecido", "Abujardado", "Abujardado y Cepillado"],
    applications: ["Encimeras", "Baños", "Pavimentos", "Fachadas"]
  },
  Cuarcita: {
    sizes: ["60x30 cm", "60x40 cm", "60x60 cm", "80x80 cm", "100x100 cm", "Tabla"],
    finishes: ["Pulido", "Apomazado", "Leather/Vintage"],
    applications: ["Encimeras", "Pavimentos", "Fachadas"]
  }
};

export default function ProductDetail() {
  const [, params] = useRoute("/productos/:id");
  const productId = params?.id ? parseInt(params.id) : null;

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showTabla, setShowTabla] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      if (!productId) return;

      try {
        const allProducts = await productsAPI.getAll();
        const currentProduct = allProducts.find((p: Product) => p.id === productId);

        if (currentProduct) {
          setProduct(currentProduct);

          // Get related products (same category, exclude current, limit 4)
          const related = allProducts
            .filter((p: Product) => p.category === currentProduct.category && p.id !== productId)
            .slice(0, 4);
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error("Error loading product:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-stone-200 flex items-center justify-center"
      >
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-600">Cargando...</p>
        </div>
      </motion.div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-stone-200 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Material no encontrado</h2>
          <Link href="/productos">
            <a className="text-black underline">Volver a Materiales</a>
          </Link>
        </div>
      </div>
    );
  }

  // Robust category lookup
  const categoryName = product.category.trim();
  let categoryData = CATEGORY_DATA[categoryName as keyof typeof CATEGORY_DATA];

  // DEBUG LOGS
  console.log('--- PRODUCT DETAIL DEBUG ---');
  console.log('Product Category (Raw):', `"${product.category}"`);
  console.log('Product Category (Trimmed):', `"${categoryName}"`);
  console.log('Available Keys:', Object.keys(CATEGORY_DATA));
  console.log('Direct Lookup Result:', categoryData);

  // Fallback: Try case-insensitive match if direct lookup fails
  if (!categoryData) {
    const matchingKey = Object.keys(CATEGORY_DATA).find(k => k.toLowerCase() === categoryName.toLowerCase());
    if (matchingKey) {
      categoryData = CATEGORY_DATA[matchingKey as keyof typeof CATEGORY_DATA];
    }
  }
  const availableFinishes = categoryData?.finishes || [];
  const hasExtraFinishes = product.category === "Granito" &&
    CATEGORY_DATA.Granito.graniteWithExtraFinishes.includes(product.name);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navigation />

      <main className="bg-stone-200 min-h-screen pt-28">
        {/* Breadcrumb */}
        <section className="py-3 bg-white">
          <div className="container-full">
            <div className="flex gap-2 text-xs uppercase tracking-widest text-neutral-500">
              <Link href="/">
                <a className="hover:text-black transition-colors">Inicio</a>
              </Link>
              <span>/</span>
              <Link href="/productos">
                <a className="hover:text-black transition-colors">Materiales</a>
              </Link>
              <span>/</span>
              <span className="text-black">{product.name}</span>
            </div>
          </div>
        </section>

        {/* Product Detail */}
        <section className="py-12">
          <div className="container-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="aspect-square overflow-hidden bg-white shadow-xl">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              {/* Product Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                {/* Category */}
                <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                  {product.category}
                </p>

                {/* Name */}
                <h1
                  className="text-5xl leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {product.name}
                </h1>

                {/* Description placeholder - could be dynamic from DB */}
                <p className="text-neutral-600 leading-relaxed">
                  Material natural de alta calidad que combina elegancia y durabilidad.
                  Ideal para proyectos de arquitectura y diseño de interiores premium.
                </p>

                {/* Tamaños Disponibles */}
                {categoryData && (
                  <div className="border-t border-neutral-300 pt-6">
                    <h3 className="text-sm font-medium uppercase tracking-wider mb-4">
                      Tamaños Disponibles
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {categoryData.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 border-2 transition-all ${selectedSize === size
                            ? "border-black bg-black text-white"
                            : "border-neutral-300 bg-white text-black hover:border-black"
                            }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>


                    {/* Opus Romano for Travertino */}
                    {product.category === "Mármol" && product.name.toLowerCase().includes("travertino") && (
                      <p className="mt-2 text-sm text-neutral-600">
                        → Los Mármoles que sean TRAVERTINO .... Añadir en tamaño disponible "OPUS ROMANO"
                      </p>
                    )}
                  </div>
                )}

                {/* Acabados */}
                {categoryData && (
                  <div className="border-t border-neutral-300 pt-6">
                    <h3 className="text-sm font-medium uppercase tracking-wider mb-4">
                      Acabados
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {availableFinishes.map((finish) => (
                        <button
                          key={finish}
                          className="px-4 py-2 border-2 border-neutral-300 bg-white text-black hover:border-black transition-all"
                        >
                          {finish}
                        </button>
                      ))}
                    </div>

                    {/* Extra finishes for certain granites */}
                    {hasExtraFinishes && (
                      <div className="mt-4">
                        <p className="text-sm text-neutral-600 mb-3">
                          → Granitos a añadir acabados extras:
                        </p>
                        <div className="flex flex-wrap gap-3">
                          {CATEGORY_DATA.Granito.extraFinishes.map((finish) => (
                            <button
                              key={finish}
                              className="px-4 py-2 border-2 border-neutral-300 bg-white text-black hover:border-black transition-all"
                            >
                              {finish}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Aplicaciones */}
                {categoryData && (
                  <div className="border-t border-neutral-300 pt-6">
                    <h3 className="text-sm font-medium uppercase tracking-wider mb-4">
                      Aplicaciones
                    </h3>
                    <ul className="space-y-2 text-neutral-700">
                      {categoryData.applications.map((app) => (
                        <li key={app} className="flex items-start gap-2">
                          <span className="text-black mt-1">•</span>
                          <span>{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="space-y-3 pt-6">
                  <Link href="/contacto">
                    <a className="group flex items-center justify-center gap-3 w-full px-8 py-4 bg-black text-white hover:bg-neutral-800 transition-all">
                      <Mail className="w-5 h-5" />
                      <span
                        className="uppercase tracking-[0.15em] text-sm font-medium"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        Solicitar Información
                      </span>
                    </a>
                  </Link>

                  <Link href="/contacto">
                    <a className="group flex items-center justify-center gap-3 w-full px-8 py-4 border-2 border-black bg-transparent hover:bg-black text-black hover:text-white transition-all">
                      <Package className="w-5 h-5" />
                      <span
                        className="uppercase tracking-[0.15em] text-sm font-medium"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        Solicitar Muestra
                      </span>
                    </a>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {
          relatedProducts.length > 0 && (
            <section className="py-16 bg-white border-t border-neutral-200">
              <div className="container-full">
                <h2
                  className="text-4xl mb-12"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Materiales Similares
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {relatedProducts.map((relatedProduct) => (
                    <Link key={relatedProduct.id} href={`/productos/${relatedProduct.id}`}>
                      <a
                        className="group"
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                      >
                        <div className="aspect-[3/4] overflow-hidden mb-3 bg-white shadow-md">
                          <img
                            src={relatedProduct.image}
                            alt={relatedProduct.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">
                          {relatedProduct.category}
                        </p>
                        <h3 className="text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                          {relatedProduct.name}
                        </h3>
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )
        }
      </main >

      <Footer />
    </motion.div >
  );
}
