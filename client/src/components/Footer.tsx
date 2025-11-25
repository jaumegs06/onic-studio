import { APP_TITLE } from "@/const";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16">
        <div className="max-w-[1800px] mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Columna 1: Espacio vacío (elegancia) */}
            <div className="hidden md:block">
              <div className="h-full border-r border-neutral-800"></div>
            </div>

            {/* Columna 2: PRODUCTOS */}
            <div>
              <h3 className="text-xl lg:text-2xl tracking-wider text-neutral-400 mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                PRODUCTOS
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/productos">
                    <a className="text-sm font-light text-neutral-300 hover:text-white transition-colors duration-200 cursor-pointer">
                      Piedra Natural
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/productos">
                    <a className="text-sm font-light text-neutral-300 hover:text-white transition-colors duration-200 cursor-pointer">
                      Terrazo
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/productos">
                    <a className="text-sm font-light text-neutral-300 hover:text-white transition-colors duration-200 cursor-pointer">
                      Porcelanato
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/productos">
                    <a className="text-sm font-light text-neutral-300 hover:text-white transition-colors duration-200 cursor-pointer">
                      Hecho a mano
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/productos">
                    <a className="text-sm font-light text-neutral-300 hover:text-white transition-colors duration-200 cursor-pointer">
                      Madera
                    </a>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Columna 3: ONICE */}
            <div>
              <h3 className="text-xl lg:text-2xl tracking-wider text-neutral-400 mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                ONICE
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/portfolio">
                    <a className="text-sm font-light text-neutral-300 hover:text-white transition-colors duration-200 cursor-pointer">
                      Inspiración
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/portfolio">
                    <a className="text-sm font-light text-neutral-300 hover:text-white transition-colors duration-200 cursor-pointer">
                      Proyectos
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/estudio">
                    <a className="text-sm font-light text-neutral-300 hover:text-white transition-colors duration-200 cursor-pointer">
                      Nosotros
                    </a>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Columna 4: SERVICIO AL CLIENTE */}
            <div>
              <h3 className="text-xl lg:text-2xl tracking-wider text-neutral-400 mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                SERVICIO AL CLIENTE
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/contacto">
                    <a className="text-sm font-light text-neutral-300 hover:text-white transition-colors duration-200 cursor-pointer">
                      Contáctanos
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/contacto">
                    <a className="text-sm font-light text-neutral-300 hover:text-white transition-colors duration-200 cursor-pointer">
                      Contacta un representante
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/contacto">
                    <a className="text-sm font-light text-neutral-300 hover:text-white transition-colors duration-200 cursor-pointer">
                      Solicita una muestra
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Pie de página */}
          <div className="mt-24 pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex gap-8 text-xs text-neutral-400">
              <a href="#" className="hover:text-white transition-colors duration-200">
                Política de Privacidad
              </a>
              <a href="#" className="hover:text-white transition-colors duration-200">
                Términos
              </a>
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl tracking-wider text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                {APP_TITLE}
              </h2>
            </div>
          </div>
        </div>
      </footer>
  );
}
