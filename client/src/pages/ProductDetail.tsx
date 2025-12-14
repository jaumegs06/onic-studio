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
                {/* Miniaturas */}
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
