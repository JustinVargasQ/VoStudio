/**
 * Site content — bilingual.
 * Use getContent(locale) → returns { TEAM, PROJECTS, SERVICES, ... } in the requested language.
 * Shared (locale-agnostic) data is at the top.
 */

import { A } from '../theme';
const A_L = A;

// ─── Shared (no translation needed) ──────────────────────────────────────
export const CAL_LINK = 'vostudio/consulta-gratuita';
export const VO = A; export const VO_LIGHT = A_L; export const PURPLE = A;

// Studio shared contact
export const STUDIO_PHONE     = '62676464';
export const STUDIO_PHONE_FMT = '6267-6464';
export const STUDIO_WA        = '50662676464';

export const TEAM = [
  {
    name: 'Justin Josué Vargas Quirós', short: 'Justin',
    role_es: 'Ingeniero en Sistemas · Años de experiencia',
    role_en: 'Systems Engineer · Years of experience',
    email: 'justinvargas4299@gmail.com',
    initials: 'JV',
    color: A,
  },
  {
    name: 'Zaylin Yuleisy López Ovares', short: 'Zaylin',
    role_es: 'Ingeniera en Sistemas · Años de experiencia',
    role_en: 'Systems Engineer · Years of experience',
    email: 'zaylinlopezo@gmail.com',
    initials: 'ZO',
    color: A_L,
  },
];

export const STACK = ['React', 'Node.js', 'MongoDB', 'Tailwind', 'TypeScript', 'Vite', 'Express', 'React Native', 'Figma', 'Cloudinary', 'Next.js', 'PostgreSQL'];

// ─── Translatable content ────────────────────────────────────────────────
const CONTENT = {
  es: {
    PROJECTS: [
      {
        name: 'JD Virtual Store', tag: 'E-commerce', year: '2025', emoji: '💄', color: A,
        desc: 'Tienda online de maquillaje y skincare con catálogo completo, panel admin, pedidos vía WhatsApp, cupones y SEO optimizado.',
        challenge: 'La cliente vendía solo por DM y perdía pedidos cuando estaba ocupada. Necesitaba un canal que vendiera por sí solo.',
        approach: [
          'Catálogo administrable desde panel propio sin tocar código',
          'Pedidos generan link directo a WhatsApp con resumen pre-armado',
          'Sistema de cupones, reseñas y categorías editable',
        ],
        url: 'https://jd-virtual.vercel.app',
        techs: ['React', 'Node.js', 'MongoDB', 'Cloudinary'],
        num: '01',
        metrics: [
          { v: '100%', l: 'Responsive' },
          { v: 'Admin', l: 'Sin código' },
          { v: '24/7', l: 'Disponible' },
        ],
      },
      {
        name: 'UTN Maps', tag: 'App universitaria', year: '2024', emoji: '🗺️', color: A_L,
        desc: 'Aplicación de navegación interactiva para el campus de la Universidad Técnica Nacional, Sede San Carlos.',
        challenge: 'Los estudiantes de primer ingreso se perdían en el campus buscando aulas, oficinas y servicios.',
        approach: [
          'Mapa interactivo con todos los puntos del campus',
          'Búsqueda por nombre de aula, edificio o servicio',
          'Funciona sin conexión a internet una vez descargada',
        ],
        url: null,
        techs: ['React Native', 'Maps API', 'Node.js'],
        num: '02',
        metrics: [
          { v: '+50', l: 'Puntos mapeados' },
          { v: 'iOS', l: '· Android' },
          { v: 'UTN', l: 'Oficial' },
        ],
      },
    ],

    SERVICES: [
      { n: '01', title: 'Páginas web', desc: 'Sitios modernos, rápidos y listos para Google.', tagline: 'Tu carta de presentación digital.', timeline: '1 – 3 semanas',
        includes: ['Diseño a medida, responsive y mobile-first', 'Hasta 8 páginas (Home, Sobre, Servicios, Contacto…)', 'Formulario de contacto funcional', 'Optimización SEO básica', 'Dominio + hosting configurados', 'Capacitación para editar el contenido'],
        color: A },
      { n: '02', title: 'E-commerce', desc: 'Tiendas en línea con carrito, pasarela y panel de admin.', tagline: 'Vender 24/7 sin parar.', timeline: '3 – 6 semanas',
        includes: ['Catálogo de productos con categorías y variantes', 'Carrito y checkout completo', 'Pasarela de pago (Sinpe, tarjeta, PayPal)', 'Panel admin para gestionar productos y pedidos', 'Sistema de cupones y descuentos', 'Notificaciones por WhatsApp/email'],
        color: A },
      { n: '03', title: 'Aplicaciones', desc: 'Apps web y móviles que los usuarios van a querer usar.', tagline: 'Software que la gente ama.', timeline: '4 – 10 semanas',
        includes: ['Diseño UX/UI completo y testeado', 'Autenticación de usuarios (login, roles, permisos)', 'App web progresiva (PWA) instalable desde el navegador', 'API REST propia o integración con APIs externas', 'Panel de administración', 'Deploy en servidor con dominio propio'],
        color: A },
      { n: '04', title: 'Sistemas a medida', desc: 'Dashboards, inventarios y sistemas internos para tu empresa.', tagline: 'Procesos sin papel.', timeline: '6 – 16 semanas',
        includes: ['Análisis de requerimientos y propuesta técnica', 'Base de datos diseñada a la medida del negocio', 'Reportes exportables a Excel/PDF', 'Control de usuarios y permisos por rol', 'Respaldo automático de datos', 'Documentación técnica y manual de usuario'],
        color: A },
      { n: '05', title: 'SEO & Visibilidad', desc: 'Posicionamiento orgánico en Google y auditoría de métricas.', tagline: 'Que te encuentren primero.', timeline: '2 – 4 semanas (setup) + seguimiento mensual',
        includes: ['Auditoría técnica del sitio', 'Investigación de palabras clave', 'Optimización on-page', 'Configuración de Google Search Console', 'Reporte mensual de posiciones', 'Estrategia de contenido para 3 meses'],
        color: A },
      { n: '06', title: 'Mantenimiento', desc: 'Tu sitio siempre actualizado, seguro y funcionando.', tagline: 'Dormí tranquilo.', timeline: 'Plan mensual',
        includes: ['Actualizaciones de seguridad y dependencias', 'Respaldos automáticos semanales', 'Monitoreo de uptime 24/7', 'Hasta 3 cambios pequeños por mes', 'Reporte mensual de rendimiento', 'Soporte por WhatsApp en días hábiles'],
        color: A },
    ],

    PROCESS: [
      { n: '01', title: 'Consulta',    desc: 'Nos contás tu idea. Analizamos el proyecto y te damos una propuesta clara y sin costo.',           color: A },
      { n: '02', title: 'Diseño',      desc: 'Creamos la interfaz. Vos ves cómo va a quedar y aprobás todo antes de escribir una línea de código.', color: A },
      { n: '03', title: 'Desarrollo',  desc: 'Construimos con las tecnologías correctas. Mostramos el avance semana a semana.',                    color: A },
      { n: '04', title: 'Lanzamiento', desc: 'Publicamos, configuramos el dominio y analytics, y te acompañamos los primeros 30-90 días.',         color: A },
    ],

    PRICING: [
      { name: 'Landing',         price: 'desde ₡450k', priceUSD: '~$900',   timeline: '1 – 2 semanas', color: A,
        bestFor: 'Profesionales y emprendimientos que necesitan presencia online rápido.',
        features: ['Diseño custom responsive (hasta 5 secciones)', 'Formulario de contacto funcional', 'SEO básico + Google Analytics', 'Dominio + hosting configurados', '1 ronda de revisiones de diseño', '30 días de soporte post-lanzamiento'],
        notIncluded: 'Panel admin, e-commerce, blog',
        cta: 'Empezar' },
      { name: 'Sitio completo',  price: 'desde ₡950k', priceUSD: '~$1.900', timeline: '2 – 4 semanas', color: A, popular: true,
        bestFor: 'PYMES y negocios establecidos que quieren un sitio profesional y completo.',
        features: ['Todo lo de Landing, más:', 'Hasta 10 páginas con CMS para gestionar contenido', 'Blog integrado y administrable', 'Optimización SEO avanzada', 'Formulario de cotización personalizado', '2 rondas de revisiones', '60 días de soporte post-lanzamiento'],
        notIncluded: 'E-commerce con pagos, sistemas de usuarios',
        cta: 'El más elegido' },
      { name: 'E-commerce',      price: 'desde ₡2.2M',  priceUSD: '~$4.400', timeline: '4 – 7 semanas', color: A,
        bestFor: 'Tiendas que quieren vender en línea con sistema de pagos real.',
        features: ['Todo lo de Sitio completo, más:', 'Catálogo de productos ilimitado + variantes', 'Carrito y checkout optimizado', 'Pasarela de pago (Sinpe, tarjeta, PayPal)', 'Panel admin completo', 'Cupones, descuentos y notificaciones', '90 días de soporte'],
        notIncluded: 'Marketplace multivendedor, facturación electrónica',
        cta: 'Empezar tienda' },
      { name: 'App / Sistema',   price: 'desde ₡4.5M',  priceUSD: '~$9.000', timeline: '6+ semanas',   color: A,
        bestFor: 'Empresas con procesos complejos que necesitan software a medida.',
        features: ['Análisis de requerimientos detallado', 'Diseño UX/UI con prototipo aprobado', 'App web o móvil con autenticación y roles', 'API propia o integración con sistemas existentes', 'Panel de administración completo', 'Documentación técnica y de usuario', '90 días de soporte + mantenimiento'],
        notIncluded: 'Apps nativas para App Store (se cotiza aparte)',
        cta: 'Cotizar proyecto' },
    ],

    PRICING_NOTE: 'Precios de referencia. Cada proyecto se cotiza según alcance real — siempre recibís propuesta detallada antes de firmar.',

    GUARANTEES: [
      { text: '2 rondas de revisión incluidas en todos los planes' },
      { text: 'Plazos acordados por escrito y respetados' },
      { text: 'Código fuente 100% tuyo al entregar' },
      { text: 'Soporte post-lanzamiento en todos los planes' },
    ],

    FAQ: [
      { q: '¿Cuánto cuesta un proyecto?', a: 'Tenés una referencia en nuestra sección de precios. Una landing arranca desde ₡450k, sitio completo desde ₡950k, e-commerce desde ₡2.2M y sistemas desde ₡4.5M. Siempre te damos propuesta detallada sin costo antes de empezar.' },
      { q: '¿Quién hospeda el sitio? ¿Hay un costo mensual?', a: 'Configuramos el hosting en la plataforma que mejor se adapte (Vercel, Netlify, VPS). El costo mensual típico varía entre $5 y $25/mes. El dominio + primer año van incluidos en la mayoría de planes.' },
      { q: '¿Puedo editar el contenido yo solo después de entregado?', a: 'Sí. Los sitios de contenido vienen con panel admin propio. Te capacitamos para cambiar textos, imágenes y demás sin tocar código.' },
      { q: '¿Cómo son los pagos?', a: 'Trabajamos con 50% al iniciar y 50% al entregar. Aceptamos Sinpe, transferencia bancaria y tarjeta. Para proyectos grandes podemos acordar un plan de 3 pagos.' },
      { q: '¿Cuánto tiempo toma el desarrollo?', a: 'Landing: 1-2 semanas. Sitio completo: 2-4 semanas. E-commerce: 4-7 semanas. Apps y sistemas: 6+ semanas. Los plazos los acordamos al inicio y los respetamos.' },
      { q: '¿Qué pasa si necesito cambios después de entregar?', a: 'Incluimos soporte post-lanzamiento (30 a 90 días según plan). Después, tenemos planes de mantenimiento desde ₡100k/mes que incluyen cambios pequeños y soporte.' },
      { q: '¿Trabajan con clientes fuera de Costa Rica?', a: 'Sí, trabajamos 100% remoto. Los pagos se pueden hacer por transferencia internacional o PayPal.' },
      { q: '¿Tienen experiencia en mi industria?', a: 'Hemos trabajado con comercio, salud, educación, restaurantes y servicios profesionales. Si no tenemos experiencia específica en tu industria, investigamos antes y te lo decimos con honestidad.' },
      { q: '¿Son ustedes los dueños del código?', a: 'No, vos sos el dueño. Al entregar te damos todo: código fuente, credenciales, base de datos, dominio. Sin contratos de permanencia.' },
    ],
  },

  en: {
    PROJECTS: [
      {
        name: 'JD Virtual Store', tag: 'E-commerce', year: '2025', emoji: '💄', color: A,
        desc: 'Online makeup and skincare store with full catalog, admin panel, WhatsApp orders, coupons and optimized SEO.',
        challenge: 'The client was only selling through DMs and missing orders when busy. She needed a channel that could sell on its own.',
        approach: [
          'Catalog managed from a custom panel — no code required',
          'Orders generate a direct WhatsApp link with pre-filled summary',
          'Editable coupons, reviews and categories system',
        ],
        url: 'https://jd-virtual.vercel.app',
        techs: ['React', 'Node.js', 'MongoDB', 'Cloudinary'],
        num: '01',
        metrics: [
          { v: '100%', l: 'Responsive' },
          { v: 'Admin', l: 'No code' },
          { v: '24/7', l: 'Available' },
        ],
      },
      {
        name: 'UTN Maps', tag: 'Campus app', year: '2024', emoji: '🗺️', color: A_L,
        desc: 'Interactive navigation app for the Universidad Técnica Nacional campus, San Carlos.',
        challenge: 'First-year students kept getting lost looking for classrooms, offices and services on campus.',
        approach: [
          'Interactive map with every point on campus',
          'Search by classroom, building or service name',
          'Works offline once downloaded',
        ],
        url: null,
        techs: ['React Native', 'Maps API', 'Node.js'],
        num: '02',
        metrics: [
          { v: '+50', l: 'Mapped points' },
          { v: 'iOS', l: '· Android' },
          { v: 'UTN', l: 'Official' },
        ],
      },
    ],

    SERVICES: [
      { n: '01', title: 'Websites', desc: 'Modern, fast sites that Google loves.', tagline: 'Your digital first impression.', timeline: '1 – 3 weeks',
        includes: ['Custom responsive, mobile-first design', 'Up to 8 pages (Home, About, Services, Contact…)', 'Working contact form', 'Basic SEO optimization', 'Domain + hosting setup', 'Training to edit the content'],
        color: A },
      { n: '02', title: 'E-commerce', desc: 'Online stores with cart, payment gateway and admin panel.', tagline: 'Sell 24/7 without stopping.', timeline: '3 – 6 weeks',
        includes: ['Product catalog with categories and variants', 'Complete cart and checkout', 'Payment gateway (Sinpe, card, PayPal)', 'Admin panel for products and orders', 'Coupons and discounts system', 'WhatsApp/email notifications'],
        color: A },
      { n: '03', title: 'Applications', desc: 'Web and mobile apps people actually want to use.', tagline: 'Software people love.', timeline: '4 – 10 weeks',
        includes: ['Complete tested UX/UI design', 'User authentication (login, roles, permissions)', 'Installable PWA from the browser', 'Own REST API or integration with external APIs', 'Admin panel', 'Server deploy with own domain'],
        color: A },
      { n: '04', title: 'Custom systems', desc: 'Dashboards, inventories and internal tools for your company.', tagline: 'Paperless processes.', timeline: '6 – 16 weeks',
        includes: ['Requirements analysis and technical proposal', 'Database designed for your business', 'Reports exportable to Excel/PDF', 'User and role-based permissions', 'Automatic data backups', 'Technical and user documentation'],
        color: A },
      { n: '05', title: 'SEO & Visibility', desc: 'Organic ranking on Google + metrics audit.', tagline: 'So they find you first.', timeline: '2 – 4 weeks (setup) + monthly tracking',
        includes: ['Technical site audit', 'Keyword research', 'On-page optimization', 'Google Search Console setup', 'Monthly ranking report', 'Content strategy for 3 months'],
        color: A },
      { n: '06', title: 'Maintenance', desc: 'Your site always up to date, secure and running.', tagline: 'Sleep easy.', timeline: 'Monthly plan',
        includes: ['Security and dependency updates', 'Weekly automatic backups', '24/7 uptime monitoring', 'Up to 3 small changes per month', 'Monthly performance report', 'WhatsApp support on business days'],
        color: A },
    ],

    PROCESS: [
      { n: '01', title: 'Consultation', desc: "You tell us your idea. We analyze the project and give you a clear, no-cost proposal.",            color: A },
      { n: '02', title: 'Design',       desc: 'We create the interface. You see how it will look and approve it before a single line of code.',     color: A },
      { n: '03', title: 'Development',  desc: 'We build with the right technologies. You see weekly progress.',                                     color: A },
      { n: '04', title: 'Launch',       desc: 'We publish, set up domain and analytics, and stick around the first 30-90 days.',                    color: A },
    ],

    PRICING: [
      { name: 'Landing',          price: 'from $900',   priceUSD: '~₡450k',  timeline: '1 – 2 weeks', color: A,
        bestFor: 'Professionals and small ventures who need an online presence fast.',
        features: ['Custom responsive design (up to 5 sections)', 'Working contact form', 'Basic SEO + Google Analytics', 'Domain + hosting setup', '1 round of design revisions', '30 days post-launch support'],
        notIncluded: 'Admin panel, e-commerce, blog',
        cta: 'Get started' },
      { name: 'Full site',        price: 'from $1,900', priceUSD: '~₡950k',  timeline: '2 – 4 weeks', color: A, popular: true,
        bestFor: 'SMBs and established businesses that want a professional, complete site.',
        features: ['Everything in Landing, plus:', 'Up to 10 pages with CMS', 'Integrated and editable blog', 'Advanced SEO optimization', 'Custom quote form', '2 rounds of revisions', '60 days post-launch support'],
        notIncluded: 'E-commerce with payments, user systems',
        cta: 'Most chosen' },
      { name: 'E-commerce',       price: 'from $4,400', priceUSD: '~₡2.2M',  timeline: '4 – 7 weeks', color: A,
        bestFor: 'Stores that want to sell online with a real payment system.',
        features: ['Everything in Full site, plus:', 'Unlimited catalog + variants', 'Optimized cart and checkout', 'Payment gateway (Sinpe, card, PayPal)', 'Complete admin panel', 'Coupons, discounts and notifications', '90 days support'],
        notIncluded: 'Multi-vendor marketplace, electronic invoicing',
        cta: 'Start store' },
      { name: 'App / System',     price: 'from $9,000', priceUSD: '~₡4.5M',  timeline: '6+ weeks',    color: A,
        bestFor: 'Companies with complex processes that need custom software.',
        features: ['Detailed requirements analysis', 'Approved UX/UI prototype', 'Web or mobile app with auth and roles', 'Own API or integration with existing systems', 'Complete admin panel', 'Technical and user documentation', '90 days support + maintenance'],
        notIncluded: 'Native App Store apps (quoted separately)',
        cta: 'Quote my project' },
    ],

    PRICING_NOTE: 'Reference prices. Every project is quoted by real scope — you always get a detailed proposal before signing.',

    GUARANTEES: [
      { text: '2 rounds of revisions included in every plan' },
      { text: 'Timelines agreed in writing and honored' },
      { text: '100% of the source code is yours on delivery' },
      { text: 'Post-launch support included in every plan' },
    ],

    FAQ: [
      { q: 'How much does a project cost?', a: 'You can see references in our pricing section. A landing starts at $900, full site at $1,900, e-commerce at $4,400 and systems at $9,000. We always give you a detailed proposal at no cost before starting.' },
      { q: 'Who hosts the site? Is there a monthly cost?', a: 'We set up hosting on the platform that fits best (Vercel, Netlify, VPS). Typical monthly cost is $5-$25/mo. Domain + first year are included in most plans.' },
      { q: 'Can I edit the content myself after delivery?', a: 'Yes. Content sites come with their own admin panel. We train you to change text, images and more without touching code.' },
      { q: 'How do payments work?', a: 'We work with 50% upfront and 50% on delivery. We accept Sinpe, bank transfer and card. For large projects we can agree on a 3-payment plan.' },
      { q: 'How long does development take?', a: 'Landing: 1-2 weeks. Full site: 2-4 weeks. E-commerce: 4-7 weeks. Apps and systems: 6+ weeks. We set timelines at kickoff and stick to them.' },
      { q: 'What if I need changes after delivery?', a: 'We include post-launch support (30 to 90 days depending on plan). After that, we have maintenance plans from $200/mo including small changes and support.' },
      { q: 'Do you work with clients outside Costa Rica?', a: 'Yes, we work 100% remote. Payments can be made via international transfer or PayPal.' },
      { q: 'Do you have experience in my industry?', a: "We've worked with retail, health, education, restaurants and professional services. If we don't have specific experience in your industry, we research first and tell you honestly." },
      { q: 'Do you own the code?', a: "No, you do. On delivery we hand over everything: source code, credentials, database, domain. No lock-in contracts." },
    ],
  },
};

export function getContent(locale = 'es') {
  return CONTENT[locale] || CONTENT.es;
}

// Backwards-compatible direct exports (Spanish default)
export const { PROJECTS, SERVICES, PROCESS, PRICING, PRICING_NOTE, GUARANTEES, FAQ } = CONTENT.es;
export const ACCENTS = [A, A, A, A, A, A, A, A, A, A];
export const MANIFESTO_QUOTE = 'No vendemos sitios web.\nVendemos resultados que podés medir.';
