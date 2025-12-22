import { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { contactAPI } from "@/lib/api";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await contactAPI.submit(formData);

      if (response.success) {
        toast.success("¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.");
        // Clear form
        setFormData({
          name: "",
          email: "",
          phone: "",
          projectType: "",
          message: "",
        });
      } else {
        toast.error(response.error || "Error al enviar el mensaje. Por favor, inténtalo de nuevo.");
      }
    } catch (error: any) {
      console.error("Error submitting contact form:", error);
      toast.error(
        error.response?.data?.error ||
        "Error al enviar el mensaje. Por favor, verifica tu conexión e inténtalo de nuevo."
      );
    } finally {
      setIsSubmitting(false);
    }
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
    <motion.div
      className="flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navigation />

      <main className="bg-stone-200 min-h-screen pt-28">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-stone-200">
          <div className="container-full">
            <motion.h1
              initial={{ filter: "blur(10px)", opacity: 0 }}
              animate={{ filter: "blur(0px)", opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-4 uppercase tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 300, letterSpacing: "-0.03em" }}
            >
              CONTACTO
            </motion.h1>
            <p className="text-base md:text-lg text-neutral-600 leading-relaxed max-w-3xl">
              ¿Tienes un proyecto en mente? Nos encantaría conocer tus ideas
              y ayudarte a crear el espacio perfecto.
            </p>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl mb-8">Envíanos un mensaje</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
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
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
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
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
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
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  >
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
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                  >
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
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                  >
                    <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                    </Button>
                  </motion.div>
                </form>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl mb-8">Información de contacto</h2>
                <div className="space-y-8">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <h3 className="text-xl mb-3">Oficina</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Avinguda de l'Argentina, 12, Ponent<br />
                      07011 Palma, Illes Balears
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    <h3 className="text-xl mb-3">Email</h3>
                    <a
                      href="mailto:oficinatecnica@onicestudio.com"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      oficinatecnica@onicestudio.com
                    </a>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  >
                    <h3 className="text-xl mb-3">Teléfono</h3>
                    <a
                      href="tel:+34661206414"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      +34 661 20 64 14
                    </a>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                  >
                    <h3 className="text-xl mb-3">Horario</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Lunes a Viernes: 9:00 - 18:00<br />
                      Sábados: 10:00 - 14:00<br />
                      Domingos: Cerrado
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                  >
                    <h3 className="text-xl mb-3">Síguenos</h3>
                    <div className="flex gap-4">
                      <a
                        href="https://www.instagram.com/onicestudiopalma/?hl=es"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Instagram
                      </a>
                      <a
                        href="https://www.facebook.com/people/%C3%93NICE-Studio/100066730569816/?locale=es_ES"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Facebook
                      </a>
                      <a
                        href="https://www.linkedin.com/company/onice-studio/about/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        LinkedIn
                      </a>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Showroom Section */}
        <section className="py-24 bg-stone-100">
          <div className="container-full">
            <div className="flex flex-col md:flex-row-reverse gap-12 md:gap-24 mb-16">
              <div className="md:w-1/3">
                <h2 className="text-4xl md:text-5xl mb-6 uppercase tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Visita nuestro<br />Showroom
                </h2>
                <div className="w-12 h-1 bg-black mb-8"></div>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Un espacio diseñado para inspirar. En nuestro showroom podrás tocar y sentir
                    la textura de nuestras piedras naturales, apreciar los matices de color y
                    descubrir las infinitas posibilidades que ofrecen nuestros materiales exclusivos.
                  </p>
                  <p>
                    Contamos con una amplia exposición de muestras de gran formato,
                    aplicaciones reales en mobiliario y un equipo de expertos listos para
                    asesorarte en tu proyecto.
                  </p>
                </div>
              </div>

              <div className="md:w-2/3">
                <div className="grid grid-cols-2 gap-4 h-[600px]">
                  <div className="col-span-1 h-full flex flex-col gap-4">
                    <div className="relative h-2/3 overflow-hidden group">
                      <img
                        src="/images/showroom/showroom-meeting.jpg"
                        alt="Zona de reuniones showroom"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="relative h-1/3 overflow-hidden group">
                      <img
                        src="/images/showroom/showroom-detail.jpg"
                        alt="Detalle de materiales"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>
                  <div className="col-span-1 h-full flex flex-col gap-4">
                    <div className="relative h-1/3 overflow-hidden group">
                      <img
                        src="/images/showroom/showroom-rack.jpg"
                        alt="Muestrario de piedras"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="relative h-2/3 overflow-hidden group">
                      <img
                        src="/images/showroom/showroom-facade.jpg"
                        alt="Fachada Onic Studio"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="h-[500px] md:h-[600px] bg-muted-foreground/20">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3075.380543941137!2d2.638176476370277!3d39.573573106524215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1297925db03a4385%3A0xec9636fffddc730b!2sOnice%20Studio!5e0!3m2!1ses!2ses!4v1766232884497!5m2!1ses!2ses"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación de Ónice Studio"
          />
        </section>
      </main>

      <Footer />
    </motion.div>
  );
}
