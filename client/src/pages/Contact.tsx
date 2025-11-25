import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      projectType: "",
      message: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex flex-col">
      <Navigation />

      <main className="bg-stone-200 min-h-screen pt-28">
        {/* Hero Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl mb-6">Contacto</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                ¿Tienes un proyecto en mente? Nos encantaría conocer tus ideas
                y ayudarte a crear el espacio perfecto.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Form */}
              <div>
                <h2 className="text-3xl mb-8">Envíanos un mensaje</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm mb-2 uppercase tracking-wider"
                    >
                      Nombre *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm mb-2 uppercase tracking-wider"
                    >
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm mb-2 uppercase tracking-wider"
                    >
                      Teléfono
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="projectType"
                      className="block text-sm mb-2 uppercase tracking-wider"
                    >
                      Tipo de Proyecto *
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      required
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-background border border-input text-foreground"
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="residencial">Residencial</option>
                      <option value="hoteles">Hoteles</option>
                      <option value="restauracion">Restauración</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm mb-2 uppercase tracking-wider"
                    >
                      Mensaje *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full resize-none"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Enviar Mensaje
                  </Button>
                </form>
              </div>

              {/* Contact Info */}
              <div>
                <h2 className="text-3xl mb-8">Información de contacto</h2>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl mb-3">Oficina</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Calle Serrano 123, 4º A<br />
                      28006 Madrid, España
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl mb-3">Email</h3>
                    <a
                      href="mailto:info@onicstudio.com"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      info@onicstudio.com
                    </a>
                  </div>

                  <div>
                    <h3 className="text-xl mb-3">Teléfono</h3>
                    <a
                      href="tel:+34123456789"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      +34 123 456 789
                    </a>
                  </div>

                  <div>
                    <h3 className="text-xl mb-3">Horario</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Lunes a Viernes: 9:00 - 18:00<br />
                      Sábados: 10:00 - 14:00<br />
                      Domingos: Cerrado
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl mb-3">Síguenos</h3>
                    <div className="flex gap-4">
                      <a
                        href="#"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Instagram
                      </a>
                      <a
                        href="#"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        LinkedIn
                      </a>
                      <a
                        href="#"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Pinterest
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="h-96 bg-muted-foreground/20">
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <p className="text-sm uppercase tracking-wider">Mapa de ubicación</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
