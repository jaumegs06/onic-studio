import { useState } from "react";
import { useRoute, Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function ProductDetail() {
  const [, params] = useRoute("/productos/:id");
  const productId = params?.id ? parseInt(params.id) : null;

  const [selectedImage, setSelectedImage] = useState(0);

  // Array completo de productos (mismo que en Products.tsx)
  const allProducts = [
    // GRANITOS
    { id: 1, name: "Alaska", category: "Granito", image: "/images/products/ALASKA - GRANITO .jpg", collection: "Granitos Premium", sizes: ["60x60 cm", "80x80 cm", "100x100 cm"], finishes: ["Pulido", "Apomazado"], applications: ["Encimeras", "Pavimentos", "Fachadas"] },
    { id: 2, name: "Amarula", category: "Granito", image: "/images/products/AMARULA - GRANITO.jpg", collection: "Granitos Premium", sizes: ["60x60 cm", "80x80 cm"], finishes: ["Pulido"], applications: ["Encimeras", "Pavimentos"] },
    { id: 3, name: "Angola Black", category: "Granito", image: "/images/products/ANGOLA BLACK - GRANITO.jpg", collection: "Granitos Premium", sizes: ["60x60 cm", "80x80 cm", "100x100 cm"], finishes: ["Pulido", "Flameado"], applications: ["Encimeras", "Pavimentos", "Exteriores"] },
    { id: 13, name: "Negro Zimbawe", category: "Granito", image: "/images/products/NEGRO ZIMBAWE - GRANITO .jpg", collection: "Granitos Premium", sizes: ["60x60 cm", "80x80 cm", "100x100 cm", "Medida personalizada"], finishes: ["Pulido", "Apomazado"], applications: ["Encimeras", "Pavimentos", "Buffets"], description: "Granito de color negro intenso con vetas grises sutiles. Material de alta resistencia ideal para espacios de alto tráfico y aplicaciones en hostelería premium." },
    
    // MÁRMOLES
    { id: 25, name: "Blanco Carrara", category: "Mármol", image: "/images/products/BLANCO CARRARA - MARMOL .jpg", collection: "Mármoles Clásicos", sizes: ["60x60 cm", "80x80 cm", "100x100 cm"], finishes: ["Pulido", "Apomazado"], applications: ["Encimeras", "Baños", "Pavimentos"] },
    { id: 37, name: "Negro Marquina", category: "Mármol", image: "/images/products/NEGRO MARQUINA - MARMOL .jpg", collection: "Mármoles Clásicos", sizes: ["60x60 cm", "80x80 cm"], finishes: ["Pulido"], applications: ["Encimeras", "Baños", "Decoración"] },
    
    // CUARCITAS
    { id: 49, name: "Blue Deep", category: "Cuarcita", image: "/images/products/BLUE DEEP - CUARCITA.jpg", collection: "Cuarcitas Exclusivas", sizes: ["100x100 cm", "120x120 cm"], finishes: ["Pulido"], applications: ["Encimeras", "Decoración"] },
    
    // CALIZAS
    { id: 52, name: "Basaltina", category: "Caliza", image: "/images/products/CALIZA BASALTINA.jpg", collection: "Calizas Naturales", sizes: ["60x60 cm", "80x80 cm"], finishes: ["Natural", "Apomazado"], applications: ["Pavimentos", "Exteriores"] },
  ];

  const product = allProducts.find(p => p.id === productId);

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

  // Imágenes del producto (por ahora solo la principal, se pueden añadir más)
  const productImages = [product.image];

  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="flex flex-col">
      <Navigation />

      <main className="bg-stone-200 min-h-screen pt-28">
        {/* Breadcrumb */}
        <section className="py-6 bg-white">
          <div className="container-full">
            <div className="flex gap-2 text-xs uppercase tracking-widest text-neutral-500">
              <Link href="/">
                <a className="hover:text-black transition-colors">Home</a>
              </Link>
              <span>&gt;</span>
              <Link href="/productos">
                <a className="hover:text-black transition-colors">Materiales</a>
              </Link>
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
                {/* Miniaturas */}
                {productImages.length > 1 && (
                  <div className="flex gap-2">
                    {productImages.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`w-20 h-20 overflow-hidden border-2 ${
                          selectedImage === index ? 'border-black' : 'border-neutral-300'
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
                  <p className="text-base text-neutral-600 leading-relaxed">
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
