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
export const STUDIO_EMAIL     = 'vostudiodev@gmail.com';

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
      {
        n: '00', title: 'IA & Cloud · todo conectado',
        desc: 'Integramos chatbots con IA, voz, visión por computadora, mapas y APIs — usando Google Cloud, AWS, OpenAI o stacks open source según tu presupuesto.',
        tagline: 'Inteligencia, geolocalización y automatización sin atarte a un solo proveedor.',
        timeline: 'Variable según integración',
        perfectFor: 'Negocios que necesitan IA, geolocalización o automatización sin construir todo desde cero — con stack flexible según presupuesto.',
        includes: [
          'Chatbots con IA generativa (Gemini, GPT, Claude o modelos open source)',
          'Síntesis y reconocimiento de voz (Cloud Speech, Web Speech API)',
          'Análisis de imágenes con visión por computadora (TensorFlow, Cloud Vision)',
          'Mapas interactivos (Google Maps, Leaflet+OSM, Mapbox)',
          'Integración de APIs (Google Workspace, Stripe, WhatsApp, Twilio, etc.)',
          'Despliegue serverless (Cloud Functions, AWS Lambda, Vercel Edge)',
        ],
        stack: ['Gemini', 'OpenAI', 'TensorFlow.js', 'Leaflet', 'Maps API', 'Firebase', 'Cloud Functions', 'Pollinations'],
        examples: [
          { icon: '', title: 'Chatbot 24/7',              desc: 'Asistente que responde dudas frecuentes, agenda citas y deriva a humano si hace falta.' },
          { icon: '', title: 'Voz a texto / texto a voz', desc: 'Dicta notas, transcribe llamadas o agrega narración automática a tu producto.' },
          { icon: '', title: 'Análisis de imágenes',      desc: 'Detección de objetos, lectura de documentos (OCR), moderación de contenido.' },
          { icon: '', title: 'Mapas inteligentes',        desc: 'Geocercas, rutas optimizadas, marcadores personalizados con datos en vivo.' },
        ],
        featured: true,
        color: '#4285F4',
      },
      {
        n: '01', title: 'Páginas web',
        desc: 'Sitios que convierten visitas en clientes — rápidos, modernos y listos para Google.',
        tagline: 'Tu presencia digital, trabajando por vos las 24 horas.',
        timeline: '1 – 3 semanas',
        perfectFor: 'Profesionales y emprendimientos que necesitan presencia online seria.',
        includes: ['Diseño a medida, responsive y mobile-first', 'Hasta 8 páginas (Home, Sobre, Servicios, Contacto…)', 'Formulario de contacto funcional', 'Optimización SEO básica', 'Dominio + hosting configurados', 'Capacitación para editar el contenido'],
        stack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel', 'Figma'],
        examples: [
          { icon: '', title: 'Bufete legal', desc: 'Sitio corporativo con áreas de práctica, blog jurídico y formulario de consulta gratis.' },
          { icon: '', title: 'Portafolio creativo', desc: 'Galería con lightbox + booking integrado para fotógrafa o diseñador freelance.' },
          { icon: '', title: 'Clínica médica', desc: 'Citas online, servicios, ubicación con mapa y reviews de pacientes.' },
          { icon: '', title: 'Landing de evento', desc: 'Countdown, RSVP con captura de leads, galería y venue para lanzamientos.' },
        ],
        color: A
      },
      {
        n: '02', title: 'E-commerce',
        desc: 'Tiendas en línea con carrito, pasarela y panel de admin.',
        tagline: 'Vender 24/7 sin parar.',
        timeline: '3 – 6 semanas',
        perfectFor: 'Negocios que quieren vender online con sistema de pago real, no solo DM.',
        includes: ['Catálogo de productos con categorías y variantes', 'Carrito y checkout completo', 'Pasarela de pago (Sinpe, tarjeta, PayPal)', 'Panel admin para gestionar productos y pedidos', 'Sistema de cupones y descuentos', 'Notificaciones por WhatsApp/email'],
        stack: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Cloudinary'],
        examples: [
          { icon: '', title: 'Cosméticos (caso JD)', desc: 'Catálogo + pedidos vía WhatsApp + panel admin sin código. La clienta sube productos sola.' },
          { icon: '', title: 'Moda con variantes', desc: 'Tallas, colores, wishlist, checkout multi-paso, cupones por temporada.' },
          { icon: '', title: 'Comida gourmet', desc: 'Entregas por zona, calendario de pedidos, manejo de perecederos y horarios.' },
          { icon: '', title: 'Marketplace artesanal', desc: 'Multi-vendor con comisiones automáticas, reseñas verificadas y dashboard por tienda.' },
        ],
        color: A
      },
      {
        n: '03', title: 'Aplicaciones',
        desc: 'Apps web y móviles que los usuarios van a querer usar.',
        tagline: 'Software que la gente ama.',
        timeline: '4 – 10 semanas',
        perfectFor: 'Productos digitales con usuarios y lógica más allá de un sitio web.',
        includes: ['Diseño UX/UI completo y testeado', 'Autenticación de usuarios (login, roles, permisos)', 'App web progresiva (PWA) instalable desde el navegador', 'API REST propia o integración con APIs externas', 'Panel de administración', 'Deploy en servidor con dominio propio'],
        stack: ['React Native', 'Expo', 'Node.js', 'PostgreSQL', 'Redis'],
        examples: [
          { icon: '', title: 'App de delivery', desc: 'Pedidos en tiempo real, tracking GPS del repartidor, pagos in-app y rating.' },
          { icon: '', title: 'Reservas para spa', desc: 'Calendario con horarios, recordatorios SMS automáticos y fichas de cliente.' },
          { icon: '', title: 'Red interna corporativa', desc: 'Feeds, chats por equipo, calendario de eventos y perfiles para empresas de 50+.' },
          { icon: '', title: 'App fitness', desc: 'Rutinas personalizadas según objetivo, tracking diario y gráficos de progreso.' },
        ],
        color: A
      },
      {
        n: '04', title: 'Sistemas a medida',
        desc: 'Dashboards, inventarios y sistemas internos para tu empresa.',
        tagline: 'Procesos sin papel.',
        timeline: '6 – 16 semanas',
        perfectFor: 'Empresas con flujos complejos que Excel ya no aguanta.',
        includes: ['Análisis de requerimientos y propuesta técnica', 'Base de datos diseñada a la medida del negocio', 'Reportes exportables a Excel/PDF', 'Control de usuarios y permisos por rol', 'Respaldo automático de datos', 'Documentación técnica y manual de usuario'],
        stack: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
        examples: [
          { icon: '', title: 'ERP para constructora', desc: 'Manejo de proyectos, presupuestos por etapa, materiales y planilla integrada.' },
          { icon: '', title: 'Inventario ferretería', desc: 'Códigos de barra, alertas de stock bajo, reportes de venta por producto/sucursal.' },
          { icon: '', title: 'CRM inmobiliario', desc: 'Leads calificados, fichas de propiedad, agentes, visitas calendarizadas con cliente.' },
          { icon: '', title: 'Sistema escolar', desc: 'Matrículas, libro de notas, asistencia diaria y comunicación con padres por chat.' },
        ],
        color: A
      },
      {
        n: '05', title: 'SEO & Visibilidad',
        desc: 'Posicionamiento orgánico en Google y auditoría de métricas.',
        tagline: 'Que te encuentren primero.',
        timeline: '2 – 4 semanas (setup) + seguimiento mensual',
        perfectFor: 'Negocios que ya tienen sitio pero nadie los encuentra en Google.',
        includes: ['Auditoría técnica del sitio', 'Investigación de palabras clave', 'Optimización on-page (titles, metas, schema)', 'Configuración de Google Search Console y Analytics', 'Reporte mensual de posiciones', 'Estrategia de contenido para 3 meses'],
        stack: ['Search Console', 'GA4', 'Ahrefs', 'Screaming Frog', 'Schema.org'],
        color: A
      },
      {
        n: '06', title: 'Mantenimiento',
        desc: 'Tu sitio siempre actualizado, seguro y funcionando.',
        tagline: 'Que nunca te llamen un domingo.',
        timeline: 'Plan mensual',
        perfectFor: 'Sitios y sistemas en producción que no se pueden caer.',
        includes: ['Actualizaciones de seguridad y dependencias', 'Respaldos automáticos semanales', 'Monitoreo de uptime 24/7', 'Hasta 3 cambios pequeños por mes', 'Reporte mensual de rendimiento', 'Soporte por WhatsApp en días hábiles'],
        stack: ['UptimeRobot', 'Sentry', 'GitHub Actions', 'Bunny CDN'],
        examples: [
          { icon: '', title: 'Plan básico', desc: 'Backups + monitoreo + hasta 3 cambios chicos al mes. Ideal para sitios estables.' },
          { icon: '', title: 'Plan e-commerce', desc: 'Manejo de catálogo, soporte de checkout y reportes mensuales de venta.' },
          { icon: '', title: 'Plan enterprise', desc: 'Consultoría onsite, roadmap evolutivo, SLA de uptime garantizado por escrito.' },
          { icon: '', title: 'Plan rescate', desc: 'Recuperación de sitios hackeados o caídos — atención de emergencia, 24/7.' },
        ],
        color: A
      },
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
      { q: '¿Cuánto me va a salir mi proyecto?', a: 'Te damos números reales desde el primer día: landing desde ₡450k, sitio completo desde ₡950k, e-commerce desde ₡2.2M y sistemas a medida desde ₡4.5M. Antes de firmar nada, te pasamos una propuesta línea por línea — sin sorpresas, sin letra chica, sin "y eso lo cobramos aparte".' },
      { q: '¿Y el hosting y el dominio quién los paga?', a: 'Lo configuramos en Vercel, Netlify o un VPS según lo que tu proyecto pida — anda entre $5 y $25/mes, mucho menos que GoDaddy o Wix. Dominio del primer año y todo el setup van incluidos en la mayoría de los planes. Si ya tenés hosting, lo aprovechamos sin cobrarte de más.' },
      { q: '¿Puedo cambiar textos e imágenes yo mismo después?', a: 'Sí, y es lo normal. Todos los sitios de contenido vienen con un panel admin donde editás todo sin tocar una sola línea de código. Te dejamos un video corto de capacitación para que vos o tu equipo lo manejen tranquilos — y si te trabás, estamos en WhatsApp.' },
      { q: '¿Cómo manejan los pagos?', a: 'Mitad al arrancar para reservar el cupo en agenda, mitad contra entrega. Aceptamos SINPE Móvil, transferencia bancaria y tarjeta. Para proyectos grandes (apps, sistemas) lo partimos en 3 hitos: kickoff, prototipo aprobado y entrega final.' },
      { q: '¿En cuánto tiempo va a estar listo?', a: 'Landings: 1-2 semanas. Sitios completos: 2-4 semanas. E-commerce: 4-7 semanas. Apps y sistemas: desde 6 semanas. Los plazos los firmamos al kickoff y los respetamos — si algo se atrasa, te avisamos al toque y compensamos. Nada de "ya casi" durante 3 meses.' },
      { q: '¿Y si necesito cambios después de entregar?', a: 'Todo plan incluye 30 a 90 días de soporte post-lanzamiento gratis (depende del paquete). Después, los planes de mantenimiento arrancan en ₡100k/mes e incluyen cambios chicos, actualizaciones de seguridad, monitoreo 24/7 y soporte por WhatsApp en horario laboral.' },
      { q: '¿Trabajan con clientes fuera de Costa Rica?', a: 'Más de la mitad de nuestros proyectos son 100% remotos — clientes de México, EE.UU., España y Argentina. Coordinamos por Zoom, Slack o WhatsApp según prefieras. Aceptamos pagos por PayPal, Wise o transferencia internacional, sin recargos ocultos.' },
      { q: '¿Tienen experiencia en mi rubro?', a: 'Hemos hecho proyectos para comercio retail, salud, educación, restaurantes, real estate y servicios profesionales. Si tu industria es nueva para nosotros, te lo decimos derecho desde el inicio y hacemos research previo antes de cotizar — preferimos ser honestos que prometer de más.' },
      { q: '¿De quién es el código al final?', a: 'Tuyo, 100%. Al entregar te pasamos el código fuente, todas las credenciales, la base de datos y el dominio registrado a tu nombre. No tenemos contratos de permanencia ni claves ocultas — si mañana querés llevarlo a otro equipo, podés hacerlo sin pedirnos nada.' },
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
      {
        n: '00', title: 'AI & Cloud · all connected',
        desc: 'We integrate AI chatbots, voice, computer vision, maps and APIs — using Google Cloud, AWS, OpenAI or open-source stacks based on your budget.',
        tagline: 'Intelligence, geolocation and automation without vendor lock-in.',
        timeline: 'Varies by integration',
        perfectFor: 'Businesses needing AI, geolocation or automation without building from scratch — flexible stack per budget.',
        includes: [
          'Chatbots with generative AI (Gemini, GPT, Claude or open-source models)',
          'Voice synthesis and recognition (Cloud Speech, Web Speech API)',
          'Image analysis with computer vision (TensorFlow, Cloud Vision)',
          'Interactive maps (Google Maps, Leaflet+OSM, Mapbox)',
          'API integration (Google Workspace, Stripe, WhatsApp, Twilio, etc.)',
          'Serverless deployment (Cloud Functions, AWS Lambda, Vercel Edge)',
        ],
        stack: ['Gemini', 'OpenAI', 'TensorFlow.js', 'Leaflet', 'Maps API', 'Firebase', 'Cloud Functions', 'Pollinations'],
        examples: [
          { icon: '', title: '24/7 chatbot',           desc: 'Assistant that answers FAQs, schedules meetings and hands off to a human when needed.' },
          { icon: '', title: 'Voice ↔ text',           desc: 'Dictate notes, transcribe calls or add automatic narration to your product.' },
          { icon: '', title: 'Image analysis',         desc: 'Object detection, document OCR, content moderation.' },
          { icon: '', title: 'Smart maps',             desc: 'Geofences, optimized routes, custom markers with live data.' },
        ],
        featured: true,
        color: '#4285F4',
      },
      {
        n: '01', title: 'Websites',
        desc: 'Modern, fast sites that Google loves.',
        tagline: 'Your digital first impression.',
        timeline: '1 – 3 weeks',
        perfectFor: 'Professionals and ventures that need a serious online presence.',
        includes: ['Custom responsive, mobile-first design', 'Up to 8 pages (Home, About, Services, Contact…)', 'Working contact form', 'Basic SEO optimization', 'Domain + hosting setup', 'Training to edit the content'],
        stack: ['React', 'Next.js', 'Tailwind', 'Vercel', 'Figma'],
        examples: [
          { icon: '', title: 'Law firm', desc: 'Corporate site with practice areas, legal blog and free consultation form.' },
          { icon: '', title: 'Creative portfolio', desc: 'Gallery with lightbox + integrated booking for freelance photographer or designer.' },
          { icon: '', title: 'Medical clinic', desc: 'Online appointments, services, location with map and patient reviews.' },
          { icon: '', title: 'Event landing', desc: 'Countdown, RSVP with lead capture, gallery and venue info for launches.' },
        ],
        color: A
      },
      {
        n: '02', title: 'E-commerce',
        desc: 'Online stores with cart, payment gateway and admin panel.',
        tagline: 'Sell 24/7 without stopping.',
        timeline: '3 – 6 weeks',
        perfectFor: 'Businesses that want to sell online with a real payment system, not just DMs.',
        includes: ['Product catalog with categories and variants', 'Complete cart and checkout', 'Payment gateway (Sinpe, card, PayPal)', 'Admin panel for products and orders', 'Coupons and discounts system', 'WhatsApp/email notifications'],
        stack: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Cloudinary'],
        examples: [
          { icon: '', title: 'Cosmetics (JD case)', desc: 'Catalog + WhatsApp orders + no-code admin panel. The client uploads products herself.' },
          { icon: '', title: 'Fashion w/ variants', desc: 'Sizes, colors, wishlist, multi-step checkout, seasonal coupons.' },
          { icon: '', title: 'Gourmet food', desc: 'Delivery by zone, order calendar, perishable handling and timeslot management.' },
          { icon: '', title: 'Artisan marketplace', desc: 'Multi-vendor with automatic commissions, verified reviews and per-shop dashboard.' },
        ],
        color: A
      },
      {
        n: '03', title: 'Applications',
        desc: 'Web and mobile apps people actually want to use.',
        tagline: 'Software people love.',
        timeline: '4 – 10 weeks',
        perfectFor: 'Digital products with users and logic beyond a website.',
        includes: ['Complete tested UX/UI design', 'User authentication (login, roles, permissions)', 'Installable PWA from the browser', 'Own REST API or integration with external APIs', 'Admin panel', 'Server deploy with own domain'],
        stack: ['React Native', 'Expo', 'Node.js', 'PostgreSQL', 'Redis'],
        examples: [
          { icon: '', title: 'Delivery app', desc: 'Real-time orders, GPS courier tracking, in-app payments and rating.' },
          { icon: '', title: 'Spa booking', desc: 'Time-slot calendar, automatic SMS reminders and client profiles.' },
          { icon: '', title: 'Internal corp network', desc: 'Feeds, team chats, event calendar and profiles for companies of 50+.' },
          { icon: '', title: 'Fitness app', desc: 'Personalized routines by goal, daily tracking and progress charts.' },
        ],
        color: A
      },
      {
        n: '04', title: 'Custom systems',
        desc: 'Dashboards, inventories and internal tools for your company.',
        tagline: 'Paperless processes.',
        timeline: '6 – 16 weeks',
        perfectFor: "Companies with complex flows that Excel can't handle anymore.",
        includes: ['Requirements analysis and technical proposal', 'Database designed for your business', 'Reports exportable to Excel/PDF', 'User and role-based permissions', 'Automatic data backups', 'Technical and user documentation'],
        stack: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
        examples: [
          { icon: '', title: 'Construction ERP', desc: 'Project management, phased budgets, materials and integrated payroll.' },
          { icon: '', title: 'Hardware inventory', desc: 'Barcodes, low-stock alerts, sales reports by product/branch.' },
          { icon: '', title: 'Real estate CRM', desc: 'Qualified leads, property files, agents, scheduled client visits.' },
          { icon: '', title: 'School system', desc: 'Enrollment, gradebook, daily attendance and chat with parents.' },
        ],
        color: A
      },
      {
        n: '05', title: 'SEO & Visibility',
        desc: 'Organic ranking on Google + metrics audit.',
        tagline: 'So they find you first.',
        timeline: '2 – 4 weeks (setup) + monthly tracking',
        perfectFor: "Businesses that already have a site but nobody finds them on Google.",
        includes: ['Technical site audit', 'Keyword research', 'On-page optimization (titles, metas, schema)', 'Google Search Console & Analytics setup', 'Monthly ranking report', 'Content strategy for 3 months'],
        stack: ['Search Console', 'GA4', 'Ahrefs', 'Screaming Frog', 'Schema.org'],
        color: A
      },
      {
        n: '06', title: 'Maintenance',
        desc: 'Your site always up to date, secure and running.',
        tagline: 'So they never call you on a Sunday.',
        timeline: 'Monthly plan',
        perfectFor: "Production sites and systems that can't afford to be down.",
        includes: ['Security and dependency updates', 'Weekly automatic backups', '24/7 uptime monitoring', 'Up to 3 small changes per month', 'Monthly performance report', 'WhatsApp support on business days'],
        stack: ['UptimeRobot', 'Sentry', 'GitHub Actions', 'Bunny CDN'],
        examples: [
          { icon: '', title: 'Basic plan', desc: 'Backups + monitoring + up to 3 small changes per month. Ideal for stable sites.' },
          { icon: '', title: 'E-commerce plan', desc: 'Catalog management, checkout support and monthly sales reports.' },
          { icon: '', title: 'Enterprise plan', desc: 'Onsite consulting, evolution roadmap, written uptime SLA guarantee.' },
          { icon: '', title: 'Rescue plan', desc: 'Recovery of hacked or down sites — emergency response, 24/7.' },
        ],
        color: A
      },
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
      { q: "What's my project going to cost?", a: "Real numbers from day one: landing from $900, full site from $1,900, e-commerce from $4,400 and custom systems from $9,000. Before you sign anything, we send you a line-by-line proposal — no surprises, no fine print, no \"oh, that's billed separately\"." },
      { q: 'Who pays for hosting and domain?', a: "We set it up on Vercel, Netlify or a VPS depending on what your project needs — runs $5 to $25/month, way less than GoDaddy or Wix. Domain (first year) and full setup are included in most plans. If you already have hosting, we use it without charging extra." },
      { q: 'Can I edit text and images myself afterward?', a: "Yes — and it's the default. Every content site ships with an admin panel where you edit everything without touching a single line of code. We leave a short video walkthrough so your team can handle it confidently — and if you get stuck, we're on WhatsApp." },
      { q: 'How do payments work?', a: "50% upfront to lock the slot on our calendar, 50% on delivery. We accept SINPE Móvil, bank transfer and card. For big projects (apps, systems) we split it into 3 milestones: kickoff, approved prototype, and final delivery." },
      { q: "How long until it's live?", a: "Landings: 1-2 weeks. Full sites: 2-4 weeks. E-commerce: 4-7 weeks. Apps and systems: 6+ weeks. Timelines are signed at kickoff and we stick to them — if something slips, we tell you immediately and compensate. None of that \"almost done\" for 3 months in a row." },
      { q: 'What about changes after launch?', a: "Every plan includes 30 to 90 days of free post-launch support (depends on the package). After that, maintenance plans start at $200/mo and cover small changes, security updates, 24/7 monitoring and WhatsApp support during business hours." },
      { q: 'Do you work with clients outside Costa Rica?', a: "Over half our projects are 100% remote — clients from Mexico, the US, Spain and Argentina. We coordinate via Zoom, Slack or WhatsApp, whichever you prefer. We accept PayPal, Wise or international wire transfers, with no hidden fees." },
      { q: 'Do you have experience in my industry?', a: "We've shipped projects for retail, healthcare, education, restaurants, real estate and professional services. If your industry is new to us, we say so upfront and do research before quoting — we'd rather be honest than over-promise." },
      { q: 'Who owns the code at the end?', a: "You do, 100%. On delivery we hand over the source code, every credential, the database, and the domain registered in your name. No lock-in contracts, no hidden keys — if you want to move it to another team tomorrow, you can do it without asking us." },
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
