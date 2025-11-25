import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { APP_TITLE } from "@/const";

export default function Navigation() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isHomePage = location === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { path: "/", label: "Inicio" },
    { path: "/servicios", label: "Servicios" },
    { path: "/portfolio", label: "Portfolio" },
    { path: "/productos", label: "Materiales" },
    { path: "/estudio", label: "Estudio" },
    { path: "/contacto", label: "Contacto" },
  ];

  const headerClass = (isScrolled || !isHomePage)
    ? 'bg-white text-black shadow-md'
    : 'bg-transparent text-white shadow-none';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ease-in-out ${headerClass}`}>
      <div className="container">
        <div className="flex items-center justify-between h-20">
          <Link href="/">
            <span 
              className="text-3xl font-bold tracking-normal cursor-pointer hover:opacity-70 transition-opacity"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                letterSpacing: "0.5px",
                color: "inherit"
              }}
            >
              {APP_TITLE}
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <span
                  className={`text-sm tracking-widest uppercase transition-colors cursor-pointer ${
                    location === item.path
                      ? (isScrolled || !isHomePage) ? "text-black font-medium" : "text-white font-medium"
                      : (isScrolled || !isHomePage) ? "text-gray-600 hover:text-black" : "text-white/80 hover:text-white"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </div>

          <button 
            className="md:hidden text-current transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden absolute top-20 left-0 right-0 ${
            (isScrolled || !isHomePage) ? 'bg-white text-black border-b border-border' : 'bg-background text-white border-b border-border'
          }`}>
            <div className="flex flex-col py-4">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <span
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-6 py-3 text-sm tracking-widest uppercase transition-colors cursor-pointer ${
                      location === item.path
                        ? (isScrolled || !isHomePage) ? "text-black font-medium bg-muted" : "text-white font-medium bg-muted"
                        : (isScrolled || !isHomePage) ? "text-muted-foreground hover:text-foreground hover:bg-muted/50" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
