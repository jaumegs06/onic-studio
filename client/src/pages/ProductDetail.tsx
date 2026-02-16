import { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { productsAPI } from "@/lib/api";
import { Loader2 } from "lucide-react";

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
  sizes?: string[];
  finishes?: string[];
  applications?: string[];
}

export default function ProductDetail() {
  const [, params] = useRoute("/productos/:id");
  const productId = params?.id ? parseInt(params.id) : null;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

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

      // Enrich with static data for missing fields if needed
      // For now we just use what we have and some defaults
      const fullProduct = {
        ...data,
        sizes: ["2cm", "3cm"], // Default sizes
        finishes: data.finish, // Already an array now
        applications: ["Encimeras", "Revestimientos", "Suelos"] // Default apps
      };

      setProduct(fullProduct);
      loadRelated(fullProduct.category, fullProduct.id);
    } catch (error) {
      console.error("Error loading product:", error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  const loadRelated = async (category: string, currentId: number) => {
    try {
      // Ideally we would have a specific endpoint, but filtering client side for now
      // is acceptable given the small dataset size usually fetched
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
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="bg-stone-200 min-h-screen pt-28 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl mb-4">Producto no encontrado</h1>
            <Link href="/productos">
              <Button>Volver a Materiales</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Imágenes del producto (por ahora solo la principal, se pueden añadir más si la DB lo soporta)
  const productImages = [product.image];

  return (
    <div className="flex flex-col">
      <Navigation />

      <main className="bg-stone-200 min-h-screen pt-28">
        {/* Breadcrumb */}
        <section className="py-6 bg-white">
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
        <section className="py-16">
          <div className="container-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Galería de imágenes */}
              <div>
                <div className="aspect-[3/4] mb-4 overflow-hidden bg-white">
                  <img
                    src={productImages[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Miniaturas - Solo si hay más de una (futuro) */}
                {productImages.length > 1 && (
                  <div className="flex gap-2">
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
              </div>

              {/* Información del producto */}
              <div className="space-y-8">
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

                {/* Tamaños disponibles */}
                <div>
                  <h3 className="text-lg uppercase tracking-wider mb-4">Tamaños Disponibles</h3>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes?.map((size, index) => (
                      <div key={index} className="px-4 py-2 border border-neutral-300 text-sm">
                        {size}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Acabados */}
                {product.finishes && (
                  <div>
                    <h3 className="text-lg uppercase tracking-wider mb-4">Acabados</h3>
                    <div className="flex flex-wrap gap-3">
                      {product.finishes.map((finish, index) => (
                        <div key={index} className="px-4 py-2 bg-white border border-neutral-300 text-sm">
                          {finish}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Aplicaciones */}
                {product.applications && (
                  <div>
                    <h3 className="text-lg uppercase tracking-wider mb-4">Aplicaciones</h3>
                    <ul className="space-y-2">
                      {product.applications.map((app, index) => (
                        <li key={index} className="flex items-center gap-2 text-neutral-700">
                          <div className="w-1.5 h-1.5 bg-black" />
                          {app}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Botones de acción */}
                <div className="flex gap-4 pt-4">
                  <Link href="/contacto">
                    <Button size="lg" className="px-8">
                      Solicitar Información
                    </Button>
                  </Link>
                  <Link href="/contacto">
                    <Button variant="outline" size="lg" className="px-8">
                      Solicitar Muestra
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Productos relacionados */}
        {relatedProducts.length > 0 && (
          <section className="py-16 bg-white">
            <div className="container">
              <h2 className="text-3xl mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
                Productos Similares
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <Link key={relatedProduct.id} href={`/productos/${relatedProduct.id}`}>
                    <a className="group">
                      <div className="aspect-[3/4] overflow-hidden mb-3 bg-stone-100">
                        <img
                          src={relatedProduct.image}
                          alt={relatedProduct.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">
                        {relatedProduct.category}
                      </p>
                      <h3 className="text-lg font-serif">{relatedProduct.name}</h3>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
