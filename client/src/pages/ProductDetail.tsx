import { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
// Updated: Border removed from breadcrumb
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowLeft, Mail, Package } from "lucide-react";
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

export default function ProductDetail() {
  const [, params] = useRoute("/productos/:id");
  const productId = params?.id ? parseInt(params.id) : null;

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

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
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="bg-stone-200 min-h-screen pt-28 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-neutral-600">Cargando...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="bg-stone-200 min-h-screen pt-28 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-4xl mb-4">Material no encontrado</h1>
            <Link href="/productos">
              <a className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-neutral-800 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Volver a Materiales
              </a>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col"
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
        <section className="py-8">
          <div className="container-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="aspect-[4/5] overflow-hidden bg-white shadow-xl">
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
                className="space-y-5"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-neutral-500 mb-3">
                    {product.category}
                  </p>
                  <h1
                    className="text-5xl lg:text-6xl mb-6 uppercase tracking-tight"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 400,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {product.name}
                  </h1>
                  <p className="text-base text-neutral-600 leading-relaxed">
                    Material natural de alta gama para proyectos de
                    arquitectura y diseño de interiores premium. Combina
                    elegancia atemporal con durabilidad excepcional.
                  </p>
                </div>

                {/* Color & Finish - DESTACADO */}
                <div className="bg-white border-2 border-black p-6 space-y-4">
                  <h3
                    className="text-sm uppercase tracking-[0.2em] text-black font-semibold mb-4"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Especificaciones
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Color */}
                    <div>
                      <p className="text-xs uppercase tracking-wider text-neutral-500 mb-2">
                        Color
                      </p>
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-slate-700 to-slate-900 text-white text-sm font-medium">
                        {product.color}
                      </div>
                    </div>

                    {/* Acabado */}
                    <div>
                      <p className="text-xs uppercase tracking-wider text-neutral-500 mb-2">
                        Acabado
                      </p>
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-slate-700 to-slate-900 text-white text-sm font-medium">
                        {product.finish}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tamaños disponibles */}
                <div>
                  <h3
                    className="text-sm uppercase tracking-[0.2em] mb-4"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Tamaños Disponibles
                  </h3>
                  <div className="space-y-2 text-sm text-neutral-600">
                    <p>• Placas comerciales: bajo pedido</p>
                    <p>• Cortes personalizados disponibles</p>
                    <p>• Consultar disponibilidad de formato</p>
                  </div>
                </div>

                {/* CTA Buttons - MEJORADOS */}
                <div className="space-y-3 pt-6">
                  <Link href="/contacto">
                    <a className="group flex items-center justify-center gap-3 w-full px-8 py-4 border-2 border-black bg-transparent hover:bg-black text-black hover:text-white transition-all">
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

                {/* Back to products */}
                <Link href="/productos">
                  <a className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-black transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    <span className="uppercase tracking-wider">Volver a Materiales</span>
                  </a>
                </Link>
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
        )}
      </main>

      <Footer />
    </motion.div>
  );
}
