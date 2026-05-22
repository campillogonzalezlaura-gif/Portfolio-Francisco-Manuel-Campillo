import { 
  Users, 
  Zap, 
  Languages, 
  ShieldCheck, 
  HardHat, 
  Phone, 
  Mail, 
  MapPin,
  Linkedin,
  ChevronRight,
  Menu,
  X,
  Send,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect } from 'react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Form state
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('error');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Experiencia', href: '#experience' },
    { name: 'Habilidades', href: '#skills' },
    { name: 'Sobre mí', href: '#about' },
    { name: 'Contacto', href: '#contact' },
  ];

  return (
    <div className="min-h-screen selection:bg-primary selection:text-white">
      {/* Navigation */}
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/80 backdrop-blur-xl shadow-sm py-3' : 'bg-transparent py-5'
        }`}
      >
        <nav className="flex justify-between items-center px-6 max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold font-headline text-primary"
          >
            Francisco Campillo
          </motion.div>
          
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href}
                className="text-on-surface-variant hover:text-primary transition-colors font-sans uppercase tracking-[0.05rem] text-[11px] font-bold"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden md:block bg-primary text-on-primary px-6 py-2.5 rounded-md font-sans uppercase tracking-[0.1em] text-[11px] font-bold hover:opacity-90 active:scale-95 transition-all">
              Conectar
            </button>
            <button 
              className="md:hidden p-2 text-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-surface-variant px-6 py-8 overflow-hidden"
            >
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <a 
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg font-headline font-medium text-primary"
                  >
                    {link.name}
                  </a>
                ))}
                <button className="w-full bg-primary text-on-primary py-3 rounded-md font-bold text-sm uppercase tracking-widest">
                  Conectar
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative pt-40 pb-24 px-6 max-w-7xl mx-auto">
          <div className="flex flex-col text-center max-w-5xl mx-auto space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <span className="inline-block text-secondary font-sans uppercase tracking-[0.25rem] text-[13px] font-bold opacity-80 mb-6">
                Experto en instalaciones eléctricas en obras subterráneas
              </span>
              <h1 className="text-6xl md:text-8xl font-bold text-primary leading-[1.05] tracking-tight">
                Francisco Manuel Campillo Díaz
              </h1>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl font-light text-on-surface-variant max-w-2xl mx-auto leading-relaxed"
            >
              Contramaestre Eléctrico especializado en infraestructuras críticas y grandes obras civiles.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4 justify-center pt-4"
            >
              <a href="#experience" className="bg-primary text-on-primary px-10 py-4 rounded-md font-bold tracking-wide hover:translate-y-[-2px] transition-transform active:translate-y-0 shadow-lg shadow-primary/20">
                Ver Experiencia
              </a>
              <a href="#contact" className="bg-surface-container-highest text-primary px-10 py-4 rounded-md font-bold tracking-wide hover:bg-surface-variant transition-colors">
                Contactar
              </a>
            </motion.div>
          </div>
        </section>

        {/* Experience Timeline Section */}
        <section className="py-28 bg-surface-container-low" id="experience">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div className="max-w-xl">
                <span className="text-secondary font-sans uppercase tracking-[0.2rem] text-xs font-bold">Trayectoria Profesional</span>
                <h2 className="text-4xl md:text-6xl font-bold text-primary mt-4 tracking-tight">Experiencia en ACCIONA</h2>
              </div>
              <div className="text-on-surface-variant text-lg font-light md:text-right max-w-sm">
                Veinte años liderando instalaciones eléctricas en proyectos de alta complejidad técnica.
              </div>
            </div>

            <div className="grid gap-12">
              <ExperienceCard 
                year="2023-Actualidad"
                role="Contramaestre Eléctrico"
                obra="Obra: Túnel - Belate (Navarra)"
                description="Coordinación y supervisión técnica de sistemas eléctricos en infraestructuras subterráneas de gran escala. Gestión de suministros críticos y aseguramiento de normativas de seguridad."
                skills={['Alta Tensión', 'Sistemas de Control']}
              />
              <ExperienceCard 
                year="2020-2023"
                role="Responsable de Instalaciones"
                obra="Obra: Proyecto Pulpi (Almería)"
                description="Ejecución integral de la infraestructura eléctrica para proyectos ferroviarios y obra civil. Liderazgo de equipos multidisciplinares y cumplimiento de hitos críticos de entrega."
              />
              <ExperienceCard 
                year="2006-2020"
                role="Consolidación en Grandes Obras"
                obra="Canarias, Teruel, Málaga y Proyectos Internacionales"
                description="Veinte años de experiencia ininterrumpida en ACCIONA CONSTRUCCIÓN, S.A., desempeñando roles de creciente responsabilidad en la electrificación de infraestructuras nacionales clave."
              />
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-28 bg-white" id="skills">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-5 space-y-10">
              <div>
                <span className="text-secondary font-sans uppercase tracking-[0.2rem] text-xs font-bold">Competencias Clave</span>
                <h2 className="text-4xl md:text-5xl font-bold text-primary mt-4 tracking-tight">Habilidades Profesionales</h2>
              </div>
              <p className="text-on-surface-variant text-lg leading-relaxed font-light">
                Liderazgo técnico forjado en el terreno, con capacidad de adaptación a entornos de alta presión y gestión de recursos a gran escala.
              </p>
              
              <div className="space-y-8 pt-4">
                <ProgressBar label="Gestión de Equipos" progress={100} />
                <ProgressBar label="Resolución de Problemas" progress={95} />
                <ProgressBar label="Normativa Eléctrica" progress={100} />
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <SkillCard 
                icon={<Users className="text-secondary" size={32} />}
                title="Liderazgo Operativo"
                description="Capacidad probada para dirigir plantillas extensas en condiciones de obra exigentes."
              />
              <SkillCard 
                icon={<Zap className="text-secondary" size={32} />}
                title="Sistemas Críticos"
                description="Experiencia en infraestructuras de alta tensión y sistemas de emergencia en túneles."
              />
              <SkillCard 
                icon={<Languages className="text-secondary" size={32} />}
                title="Idiomas"
                content={
                  <div className="space-y-2 mt-4 text-sm text-on-surface-variant">
                    <div className="flex justify-between border-b border-surface-variant pb-1"><span>Francés</span> <span className="font-bold">Nivel Medio</span></div>
                    <div className="flex justify-between"><span>Inglés</span> <span className="font-bold">Nivel Básico</span></div>
                  </div>
                }
              />
              <SkillCard 
                icon={<ShieldCheck className="text-secondary" size={32} />}
                title="PRL & Seguridad"
                description="Especialista en prevención de riesgos laborales para entornos eléctricos industriales."
              />
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-28 bg-primary text-on-primary overflow-hidden" id="about">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
              <motion.div
                 initial={{ opacity: 0, x: -50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-10 tracking-tight">Formación Académica</h2>
                <div className="border-l-2 border-secondary/50 pl-10 space-y-12">
                  <div className="relative">
                    <div className="absolute -left-[45px] top-1.5 w-2 h-2 rounded-full bg-secondary" />
                    <p className="text-secondary font-bold text-sm uppercase tracking-widest mb-3">1988</p>
                    <h3 className="text-3xl font-bold mb-2">Técnico Electricista</h3>
                    <p className="text-on-primary/60 text-xl font-light">Instituto Juan de la Cierva</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-primary-container p-12 md:p-16 rounded-2xl border border-white/5 relative"
              >
                <HardHat className="text-secondary mb-8" size={56} strokeWidth={1.5} />
                <blockquote className="text-3xl md:text-4xl font-light italic leading-tight mb-10">
                  "Para mí, la electricidad es precisión y disciplina; la responsabilidad de canalizar la fuerza que da vida a las grandes infraestructuras."
                </blockquote>
                <div className="flex items-center gap-5">
                  <div className="h-px w-16 bg-secondary" />
                  <p className="font-bold tracking-[0.3em] uppercase text-xs text-secondary">Filosofía de Trabajo</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-28 bg-surface-container-low" id="contact">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div className="max-w-xl">
                <span className="text-secondary font-sans uppercase tracking-[0.2rem] text-xs font-bold">Ponte en contacto</span>
                <h2 className="text-4xl md:text-6xl font-bold text-primary mt-4 tracking-tight">Contacto Directo</h2>
              </div>
              <div className="text-on-surface-variant text-lg font-light md:text-right max-w-sm">
                Disponible para consultas técnicas y propuestas de colaboración en grandes proyectos de infraestructura.
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-12">
                <div className="space-y-8">
                  <ContactInfo 
                    icon={<Phone size={24} />}
                    label="Teléfono"
                    value={
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <a href="tel:661816923" className="hover:underline hover:text-secondary transition-colors">661 81 69 23</a>
                        <span className="text-on-surface-variant/40">-</span>
                        <a href="tel:605993617" className="hover:underline hover:text-secondary transition-colors">605 99 36 17</a>
                      </div>
                    }
                  />
                  <ContactInfo 
                    icon={<Mail size={24} />}
                    label="Email"
                    value={<a href="mailto:frary@hotmail.es" className="hover:underline hover:text-secondary transition-colors">frary@hotmail.es</a>}
                  />
                  <ContactInfo 
                    icon={<MapPin size={24} />}
                    label="Ubicación"
                    value="Ocaña/Toledo"
                  />
                </div>
              </div>

              <div className="h-[450px] bg-surface-container-highest rounded-2xl overflow-hidden shadow-xl relative group">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3nbxU6JLFI42EyFE-PNnrbjwzmniFHGWAR82iLPfGqZCTMfcew3mgjR9XMkB2es0SNvwT9XBeB5xl3lNFzwzTreh8vzBNYWEiDwxLoxEE5Wom7wzJbB1MFg_7M-MT3fB55B4iNdqrv6_SaaGeDc2SPPQfIq16Qf2WFAUyploKFrNI9o5OrkKT2AySkIP5Q9hrQjeKvJq5NaPNh2MnKkrp_Pzbua1794tTaaC9z49EbTB2SqXlveqKxGL2cgl7_4EcOk5647MsSOvq" 
                  alt="Ubicación" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/20 backdrop-grayscale-[0.2]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="bg-white p-4 rounded-full shadow-2xl text-primary"
                  >
                    <MapPin size={32} fill="currentColor" fillOpacity={0.1} />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white py-16 px-6 border-t border-surface-variant">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left space-y-3">
            <span className="text-2xl font-bold font-headline text-primary block">Francisco Campillo</span>
            <p className="text-on-surface-variant text-sm font-light">
              © 2024 Francisco Manuel Campillo Díaz. Precisión eléctrica.
            </p>
          </div>
          <div className="flex gap-10 items-center">
            <FooterLink href="#" label="Privacy Policy" />
            <FooterLink href="#" label="Certifications" />
          </div>
        </div>
      </footer>
    </div>
  );
}

function ExperienceCard({ year, role, obra, description, tag, skills }: { 
  year: string, role: string, obra: string, description: string, tag?: string, skills?: string[]
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white p-10 md:p-14 rounded-2xl flex flex-col md:flex-row gap-10 shadow-sm border border-surface-container-highest/50 hover:shadow-md transition-shadow"
    >
      <div className="md:w-1/4">
        <span className="text-4xl font-bold text-primary tracking-tight">{year}</span>
        {tag && (
          <div className="mt-4 text-secondary font-bold uppercase tracking-widest text-[10px] bg-secondary/5 inline-block px-3 py-1 rounded-full border border-secondary/10">
            {tag}
          </div>
        )}
      </div>
      <div className="md:w-3/4 space-y-6">
        <div className="space-y-2">
          <h3 className="text-3xl font-bold text-primary tracking-tight">{role}</h3>
          <p className="text-xl font-medium text-secondary">{obra}</p>
        </div>
        <p className="text-on-surface/80 leading-relaxed text-lg font-light">
          {description}
        </p>
        {skills && (
          <div className="flex flex-wrap gap-3 pt-2">
            {skills.map(skill => (
              <span key={skill} className="bg-surface-container-low text-primary/70 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] rounded-sm border border-surface-container-highest">
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function ProgressBar({ label, progress }: { label: string, progress: number }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between text-xs uppercase tracking-[0.2em] font-bold text-primary/70">
        <span>{label}</span>
        <span>{progress}%</span>
      </div>
      <div className="h-[2px] w-full bg-surface-container-highest relative">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${progress}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "circOut" }}
          className="h-full bg-gradient-to-r from-secondary to-primary" 
        />
      </div>
    </div>
  );
}

function SkillCard({ icon, title, description, content }: { icon: React.ReactNode, title: string, description?: string, content?: React.ReactNode }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-10 bg-surface-container-low rounded-2xl space-y-6 border border-surface-container-highest/20 transition-all"
    >
      <div className="bg-white w-16 h-16 rounded-xl flex items-center justify-center shadow-sm">
        {icon}
      </div>
      <div className="space-y-3">
        <h4 className="text-2xl font-bold text-primary tracking-tight">{title}</h4>
        {description && <p className="text-on-surface-variant font-light leading-relaxed">{description}</p>}
        {content}
      </div>
    </motion.div>
  );
}

function ContactInfo({ icon, label, value }: { icon: React.ReactNode, label: string, value: React.ReactNode }) {
  return (
    <div className="flex items-center gap-6 group">
      <div className="w-16 h-16 bg-white flex items-center justify-center rounded-2xl shadow-sm text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-secondary mb-1">{label}</p>
        <div className="text-2xl font-medium text-primary tracking-tight">{value}</div>
      </div>
    </div>
  );
}

function FooterLink({ href, label, icon }: { href: string, label: string, icon?: React.ReactNode }) {
  return (
    <a 
      href={href} 
      className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 text-sm font-medium"
    >
      {icon}
      {label}
    </a>
  );
}
