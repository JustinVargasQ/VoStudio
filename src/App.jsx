import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const VO_COLOR = '#EA6113';

const TEAM = [
  {
    name: 'Justin Josué Vargas Quirós',
    role: 'Ingeniero en Sistemas',
    phone: '86737114', wa: '50686737114', initials: 'JV',
    skills: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS', 'Vite'],
    bio: 'Ingeniero graduado de la Universidad Técnica Nacional. Especializado en desarrollo fullstack, arquitectura de APIs REST y tiendas en línea.',
  },
  {
    name: 'Zaylin Yuleisy López Ovares',
    role: 'Ingeniera en Sistemas',
    phone: '63438399', wa: '50663438399', initials: 'ZO',
    skills: ['UI/UX', 'React', 'Diseño web', 'Base de datos', 'Figma', 'CSS'],
    bio: 'Ingeniera graduada de la Universidad Técnica Nacional. Enfocada en diseño de interfaces, experiencia de usuario y desarrollo frontend.',
  },
];

const PROJECTS = [
  {
    name: 'JD Virtual Store', tag: 'E-commerce', emoji: '💄', color: '#B85F72',
    desc: 'Tienda de maquillaje y skincare con panel admin completo, flujo de pedidos por WhatsApp, cupones, reseñas, SEO y almacenamiento en la nube.',
    url: 'https://jd-virtual.vercel.app',
    techs: ['React', 'Node.js', 'MongoDB', 'Cloudinary', 'Tailwind'],
  },
  {
    name: 'UTN Maps', tag: 'App universitaria', emoji: '🗺️', color: '#EA6113',
    desc: 'Aplicación de navegación y mapas para el campus de la Universidad Técnica Nacional. Permite a estudiantes y docentes ubicarse dentro de la institución.',
    url: null,
    techs: ['React Native', 'Maps API', 'Node.js'],
  },
];

const SERVICES = [
  { icon: '🌐', title: 'Páginas web', desc: 'Sitios modernos, rápidos y optimizados para Google. Desde landing pages hasta tiendas en línea completas.' },
  { icon: '📱', title: 'Aplicaciones', desc: 'Apps web y móviles a medida para tu negocio o institución. Diseño limpio y funcional.' },
  { icon: '🛒', title: 'E-commerce', desc: 'Tiendas en línea con carrito, pagos, panel de administración y flujos de venta personalizados.' },
  { icon: '⚙️', title: 'Sistemas a medida', desc: 'Paneles de control, dashboards, gestión de inventario y cualquier sistema que tu negocio necesite.' },
  { icon: '🔒', title: 'Seguridad web', desc: 'Implementación de buenas prácticas: autenticación, protección de datos, headers de seguridad.' },
  { icon: '📈', title: 'SEO & Analytics', desc: 'Posicionamiento en Google, meta tags, sitemap, Search Console y seguimiento con Analytics.' },
];

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.3, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  const links = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Proyectos', href: '#proyectos' },
    { label: 'Equipo', href: '#equipo' },
    { label: 'Contacto', href: '#contacto' },
  ];
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/85 backdrop-blur-lg border-b border-white/5' : ''}`}>
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <a href="#inicio" className="font-display font-bold text-xl tracking-tight">
          VO <span style={{ color: VO_COLOR }}>STUDIO</span>
        </a>
        <nav className="hidden md:flex items-center gap-7">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-sm text-white/55 hover:text-white transition-colors">{l.label}</a>
          ))}
          <a href="#contacto" className="text-sm font-semibold px-5 py-2 rounded-full text-white transition-opacity hover:opacity-85"
            style={{ background: VO_COLOR }}>Hablemos</a>
        </nav>
        <button onClick={() => setOpen(v => !v)} className="md:hidden p-2 text-white/70">
          {open
            ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
            : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          }
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="md:hidden bg-black/95 backdrop-blur-lg border-b border-white/10 px-5 py-4 space-y-1">
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="block py-2.5 text-sm text-white/60 hover:text-white transition-colors">{l.label}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="min-h-screen flex flex-col items-center justify-center px-5 pt-16 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(234,97,19,0.07) 1px, transparent 0)', backgroundSize: '48px 48px' }} />
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[140px]"
        style={{ background: 'rgba(234,97,19,0.10)' }} />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full border mb-8"
            style={{ borderColor: 'rgba(234,97,19,0.3)', color: VO_COLOR, background: 'rgba(234,97,19,0.08)' }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: VO_COLOR }} />
            Ingenieros en Sistemas · Costa Rica
          </span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1 }}
          className="font-display text-6xl sm:text-7xl lg:text-9xl font-bold leading-none tracking-tight mb-6">
          VO <span style={{ color: VO_COLOR }}>STUDIO</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.25 }}
          className="text-white/45 text-lg sm:text-xl max-w-xl mx-auto leading-relaxed mb-10">
          Construimos soluciones digitales a medida — páginas web, tiendas en línea, apps y sistemas para tu negocio.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="#proyectos"
            className="px-7 py-3.5 rounded-full font-semibold text-white transition-opacity hover:opacity-85 active:scale-95"
            style={{ background: VO_COLOR }}>
            Ver proyectos
          </a>
          <a href="#contacto"
            className="px-7 py-3.5 rounded-full font-semibold border border-white/15 text-white/70 hover:border-white/40 hover:text-white transition-all">
            Hablemos
          </a>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-white/20 text-[10px] tracking-widest uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}
          className="w-px h-8" style={{ background: `linear-gradient(to bottom, ${VO_COLOR}80, transparent)` }} />
      </motion.div>
    </section>
  );
}

function Services() {
  return (
    <section id="servicios" className="py-28 px-5">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-16">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: VO_COLOR }}>Qué hacemos</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold">Servicios</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.07}>
              <div className="p-6 rounded-2xl border border-white/8 bg-white/[0.03] hover:border-white/20 transition-all duration-300 h-full">
                <div className="text-3xl mb-4">{s.icon}</div>
                <h3 className="font-display text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="proyectos" className="py-28 px-5">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-16">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: VO_COLOR }}>Nuestro trabajo</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold">Proyectos</h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <div className="p-7 rounded-2xl border border-white/8 bg-white/[0.03] hover:border-white/18 transition-all duration-300 flex flex-col h-full">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                    style={{ background: `${p.color}18`, border: `1px solid ${p.color}28` }}>
                    {p.emoji}
                  </div>
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full"
                    style={{ background: `${p.color}15`, color: p.color }}>
                    {p.tag}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold mb-3">{p.name}</h3>
                <p className="text-white/45 text-sm leading-relaxed mb-5 flex-1">{p.desc}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {p.techs.map(t => (
                    <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 text-white/45 border border-white/8">{t}</span>
                  ))}
                </div>
                {p.url
                  ? <a href={p.url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
                      style={{ color: p.color }}>
                      Ver proyecto
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
                    </a>
                  : <span className="text-xs text-white/22">Proyecto institucional</span>
                }
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const WaIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

function Team() {
  return (
    <section id="equipo" className="py-28 px-5">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-16">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: VO_COLOR }}>Quiénes somos</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold">El equipo</h2>
          <p className="text-white/35 mt-4 max-w-md mx-auto text-sm leading-relaxed">
            Ingenieros en Sistemas graduados de la Universidad Técnica Nacional de Costa Rica.
          </p>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {TEAM.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.1}>
              <div className="p-7 rounded-2xl border border-white/8 bg-white/[0.03] hover:border-white/18 transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-display font-bold text-xl mb-5 text-white"
                  style={{ background: `linear-gradient(135deg, ${VO_COLOR}, #C94E0A)` }}>
                  {m.initials}
                </div>
                <h3 className="font-display text-lg font-bold leading-tight mb-1">{m.name}</h3>
                <p className="text-sm mb-1" style={{ color: VO_COLOR }}>{m.role}</p>
                <p className="text-xs text-white/35 mb-4">Universidad Técnica Nacional · Costa Rica</p>
                <p className="text-white/45 text-sm leading-relaxed mb-5">{m.bio}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {m.skills.map(s => (
                    <span key={s} className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 text-white/45 border border-white/8">{s}</span>
                  ))}
                </div>
                <a href={`https://wa.me/${m.wa}?text=Hola ${m.name.split(' ')[0]}! Vi el sitio de VO Studio y me interesa contactarte.`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-[#25D366] hover:bg-[#1dbb57] px-4 py-2 rounded-full transition-colors">
                  <WaIcon />
                  {m.phone.slice(0, 4)}-{m.phone.slice(4)}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contacto" className="py-28 px-5">
      <div className="max-w-2xl mx-auto text-center">
        <Reveal>
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: VO_COLOR }}>Trabajemos juntos</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-5">¿Tenés un proyecto?</h2>
          <p className="text-white/45 text-lg leading-relaxed mb-10">
            Contanos tu idea y te decimos cómo podemos hacerla realidad. Respondemos por WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {TEAM.map(m => (
              <a key={m.wa}
                href={`https://wa.me/${m.wa}?text=Hola ${m.name.split(' ')[0]}! Vi el sitio de VO Studio y me interesa un proyecto.`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full font-semibold text-white bg-[#25D366] hover:bg-[#1dbb57] transition-colors">
                <WaIcon />
                {m.name.split(' ')[0]} · {m.phone.slice(0, 4)}-{m.phone.slice(4)}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/6 py-8 px-5 text-center">
      <p className="font-display font-bold text-lg mb-1">
        VO <span style={{ color: VO_COLOR }}>STUDIO</span>
      </p>
      <p className="text-white/22 text-xs">Vargas & Ovares · Ingenieros en Sistemas · UTN · Costa Rica</p>
      <p className="text-white/12 text-xs mt-3">© {new Date().getFullYear()} VO Studio. Todos los derechos reservados.</p>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Projects />
      <Team />
      <Contact />
      <Footer />
    </>
  );
}
