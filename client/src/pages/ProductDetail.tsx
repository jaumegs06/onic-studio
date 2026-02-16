import { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { productsAPI } from "@/lib/api";
import { Loader2, Mail, Package } from "lucide-react";

interface Product {
  id: number;
  name: string;
  category: string;
  color: string;
  finish: string[];
  image: string;
  best_seller?: boolean;
  description?: string;
  // Fields not yet in DB, kept optional/mocked for now
  collection?: string;
}

// Category-specific data (Reserved logic from previous version for fallback/extra data)
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
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  useEffect(() => {
    if (productId) {
      loadProduct(productId);
      window.scrollTo(0, 0);
    }
  }, [productId]);

  const loadProduct = async (id: number) => {
    setLoading(true);
    try {
      const data = await productsAPI.getById(id);
      setProduct(data);
      loadRelated(data.category, data.id);
    } catch (error) {
      console.error("Error loading product:", error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  const loadRelated = async (category: string, currentId: number) => {
    try {
      const all = await productsAPI.getAll();
      const related = all
        .filter((p: Product) => p.category === category && p.id !== currentId)
        .slice(0, 4);
      setRelatedProducts(related);
    } catch (error) {
      console.error("Error loading related products:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="bg-stone-200 min-h-screen pt-28 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-neutral-500" />
        </main>
        <Footer />
      </div>
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

  // Imágenes del producto
  const productImages = [product.image];

  // Category specific data lookup
  const categoryName = product.category.trim();
  let categoryData = CATEGORY_DATA[categoryName as keyof typeof CATEGORY_DATA];

  if (!categoryData) {
    const matchingKey = Object.keys(CATEGORY_DATA).find(k => k.toLowerCase() === categoryName.toLowerCase());
    if (matchingKey) {
      categoryData = CATEGORY_DATA[matchingKey as keyof typeof CATEGORY_DATA];
    }
  }

  // Use product.finish if available (from DB) otherwise fallback to category finishes
  const displayFinishes = (product.finish && product.finish.length > 0)
    ? product.finish
    : (categoryData?.finishes || []);

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
                {productImages.length > 1 && (
                  <div className="flex gap-2 mt-4">
                    {productImages.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`w-20 h-20 overflow-hidden border-2 ${selectedImage === index ? 'border-black' : 'border-neutral-300'
                          }`}
                      >
                        <img src={img} alt={`Vista ${index + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Información del producto */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-8"
              >
                <div>
                  <p className="text-xs uppercase tracking-widest text-neutral-500 mb-3">
                    {product.collection || product.category}
                  </p>
                  <h1 className="text-6xl lg:text-7xl mb-6 uppercase tracking-tight" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, letterSpacing: "-0.02em" }}>
                    {product.name}
                  </h1>
                  <p className="text-base text-neutral-600 leading-relaxed whitespace-pre-line">
                    {product.description || `${product.name} es un ${product.category.toLowerCase()} de alta calidad que combina elegancia y durabilidad. Ideal para proyectos de arquitectura y diseño de interiores premium.`}
                  </p>
                </div>

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
                <div className="border-t border-neutral-300 pt-6">
                  <h3 className="text-sm font-medium uppercase tracking-wider mb-4">
                    Acabados
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {displayFinishes.map((finish) => (
                      <div
                        key={finish}
                        className="px-4 py-2 border-2 border-neutral-300 bg-white text-black"
                      >
                        {finish}
                      </div>
                    ))}
                  </div>

                  {/* Extra finishes for certain granites (Legacy logic) */}
                  {hasExtraFinishes && false && ( /* Disabled for now as we want db driven finishes, but kept code references */
                    <div className="mt-4">
                      <p className="text-sm text-neutral-600 mb-3">
                        → Granitos a añadir acabados extras:
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {CATEGORY_DATA.Granito.extraFinishes.map((finish) => (
                          <div
                            key={finish}
                            className="px-4 py-2 border-2 border-neutral-300 bg-white text-black"
                          >
                            {finish}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

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
        {relatedProducts.length > 0 && (
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
      </main>

      <Footer />
    </motion.div>
  );
}
