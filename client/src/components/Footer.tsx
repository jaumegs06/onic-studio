import { APP_TITLE } from "@/const";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 md:py-16">
      <div className="container-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Columna 1: Espacio vacío (elegancia) */}
          <div className="hidden md:block">
            <div className="h-full border-r border-neutral-800"></div>
          </div>

          {/* Columna 2: PRODUCTOS */}
          <div>
            <h3 className="text-lg md:text-xl lg:text-2xl tracking-wider text-neutral-400 mb-4 md:mb-6 uppercase" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600 }}>
              PRODUCTOS
            </h3>
            <ul className="space-y-2 md:space-y-3">
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
            <h3 className="text-lg md:text-xl lg:text-2xl tracking-wider text-neutral-400 mb-4 md:mb-6 uppercase" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600 }}>
              ONICE
            </h3>
            <ul className="space-y-2 md:space-y-3">
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
            <h3 className="text-lg md:text-xl lg:text-2xl tracking-wider text-neutral-400 mb-4 md:mb-6 uppercase" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600 }}>
              SERVICIO AL CLIENTE
            </h3>
            <ul className="space-y-2 md:space-y-3">
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
        <div className="mt-12 md:mt-24 pt-6 md:pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
          <div className="flex gap-4 md:gap-8 text-xs text-neutral-400">
            <a href="#" className="hover:text-white transition-colors duration-200">
              Política de Privacidad
            </a>
            <a href="#" className="hover:text-white transition-colors duration-200">
              Términos
            </a>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl tracking-wider text-white uppercase" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}>
              {APP_TITLE}
            </h2>
          </div>
        </div>
      </div>
    </footer>
  );
}
