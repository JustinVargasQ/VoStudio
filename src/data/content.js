// ─── Cal.com ───
// Username: justin-vargas-fhlzrw (recomendado cambiar a "vostudio" en Cal.com → Settings → Profile)
// Event type: creá un evento "consulta" de 15 min en Cal.com → Event Types → New
export const CAL_LINK = 'vostudio/consulta-gratuita';

// ─── Paleta principal ───
export const VO = '#EA6113';        // Naranja corporativo
export const VO_LIGHT = '#FF8C42';
export const VO_DARK = '#C94E0A';
export const BG = '#050505';

// ─── Paleta extendida (acentos) ───
export const PURPLE = '#7B3FE4';
export const PURPLE_LIGHT = '#9B59E8';
export const CYAN = '#00D4FF';
export const CYAN_LIGHT = '#5EEAFF';
export const PINK = '#FF3D71';
export const PINK_LIGHT = '#FF6BB5';
export const GREEN = '#00E5A8';
export const GREEN_LIGHT = '#2DD4BF';
export const YELLOW = '#FFD60A';
export const INDIGO = '#5C4DFF';

// Acento cíclico reducido — solo VO y PURPLE en la UI principal
export const ACCENTS = [VO, PURPLE, VO, PURPLE, VO, PURPLE];

export const TEAM = [
  {
    name: 'Justin Josué Vargas Quirós', short: 'Justin',
    role: 'Ingeniero en Sistemas', phone: '86737114', wa: '50686737114', initials: 'JV',
    skills: ['React', 'Node.js', 'MongoDB', 'Express', 'REST APIs', 'Tailwind'],
    bio: 'Especializado en desarrollo fullstack y arquitectura de sistemas. Construye desde APIs robustas hasta interfaces que los usuarios aman.',
    color: VO,
    accent: CYAN,
    quote: 'El código bien hecho se nota desde el primer clic.',
  },
  {
    name: 'Zaylin Yuleisy López Ovares', short: 'Zaylin',
    role: 'Ingeniera en Sistemas', phone: '63438399', wa: '50663438399', initials: 'ZO',
    skills: ['UI/UX', 'React', 'Figma', 'CSS', 'Diseño web', 'Bases de datos'],
    bio: 'Diseñadora y desarrolladora frontend. Transforma ideas en interfaces limpias, intuitivas y que generan resultados.',
    color: PURPLE,
    accent: PINK,
    quote: 'El diseño es la primera impresión y la última que importa.',
  },
];

export const PROJECTS = [
  {
    name: 'JD Virtual Store', tag: 'E-commerce', year: '2025', emoji: '💄', color: VO,
    desc: 'Tienda online de maquillaje y skincare con catálogo completo, panel admin, pedidos vía WhatsApp, cupones, reseñas y SEO optimizado.',
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
    name: 'UTN Maps', tag: 'App universitaria', year: '2024', emoji: '🗺️', color: PURPLE,
    desc: 'Aplicación de navegación interactiva para el campus de la Universidad Técnica Nacional de Costa Rica, Sede San Carlos.',
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
];

export const SERVICES = [
  {
    n: '01', title: 'Páginas web', desc: 'Sitios modernos, rápidos y listos para Google.', tagline: 'Tu carta de presentación digital.', icon: 'Globe', color: VO,
    timeline: '1 – 3 semanas',
    bestFor: 'Profesionales, PYMES, startups que necesitan presencia digital.',
    includes: ['Diseño a medida, responsive y mobile-first', 'Hasta 8 páginas (Home, Sobre, Servicios, Contacto…)', 'Formulario de contacto funcional', 'Optimización SEO básica', 'Dominio + hosting configurados', 'Capacitación para editar el contenido'],
    excludes: ['Carrito de compras (ver E-commerce)', 'Sistema de citas o reservas', 'Blog con más de 20 artículos'],
  },
  {
    n: '02', title: 'E-commerce', desc: 'Tiendas en línea con carrito, pasarela y panel de admin.', tagline: 'Vender 24/7 sin parar.', icon: 'Cart', color: PURPLE,
    timeline: '3 – 6 semanas',
    bestFor: 'Tiendas físicas que quieren vender online, emprendimientos de productos.',
    includes: ['Catálogo de productos con categorías y variantes', 'Carrito y checkout completo', 'Pasarela de pago (Sinpe, tarjeta, PayPal)', 'Panel admin para gestionar productos y pedidos', 'Sistema de cupones y descuentos', 'Notificaciones por WhatsApp/email'],
    excludes: ['Inventario en tiempo real con múltiples bodegas', 'Marketplace multivendedor', 'Facturación electrónica (requiere integración adicional)'],
  },
  {
    n: '03', title: 'Aplicaciones', desc: 'Apps web y móviles que los usuarios van a querer usar.', tagline: 'Software que la gente ama.', icon: 'Mobile', color: VO,
    timeline: '4 – 10 semanas',
    bestFor: 'Negocios con procesos repetitivos, comunidades, plataformas con usuarios registrados.',
    includes: ['Diseño UX/UI completo y testeado', 'Autenticación de usuarios (login, roles, permisos)', 'App web progresiva (PWA) instalable desde el navegador', 'API REST propia o integración con APIs externas', 'Panel de administración', 'Deploy en servidor con dominio propio'],
    excludes: ['Apps nativas para App Store/Play Store (requiere presupuesto adicional)', 'Integraciones con sistemas legacy sin documentación'],
  },
  {
    n: '04', title: 'Sistemas a medida', desc: 'Dashboards, inventarios y sistemas internos para tu empresa.', tagline: 'Procesos sin papel.', icon: 'Gear', color: PURPLE,
    timeline: '6 – 16 semanas',
    bestFor: 'Empresas con procesos manuales, repetitivos o en papel que quieren digitalizarse.',
    includes: ['Análisis de requerimientos y propuesta técnica', 'Base de datos diseñada a la medida del negocio', 'Reportes exportables a Excel/PDF', 'Control de usuarios y permisos por rol', 'Respaldo automático de datos', 'Documentación técnica y manual de usuario'],
    excludes: ['Integración con sistemas de otros proveedores sin API pública', 'Hardware (impresoras fiscales, lectores de barras, etc.)'],
  },
  {
    n: '05', title: 'SEO & Visibilidad', desc: 'Posicionamiento orgánico en Google y auditoría de métricas.', tagline: 'Que te encuentren primero.', icon: 'Search', color: VO,
    timeline: '2 – 4 semanas (setup) + seguimiento mensual',
    bestFor: 'Negocios con sitio existente que no aparecen en Google o quieren más tráfico orgánico.',
    includes: ['Auditoría técnica del sitio (velocidad, errores, indexación)', 'Investigación de palabras clave para tu industria', 'Optimización on-page (títulos, metas, estructura)', 'Configuración de Google Search Console y Analytics', 'Reporte mensual de posiciones y tráfico', 'Estrategia de contenido para 3 meses'],
    excludes: ['Publicidad pagada (Google Ads, Meta Ads)', 'Redacción de todos los artículos del blog (coordinamos en conjunto)'],
  },
  {
    n: '06', title: 'Mantenimiento', desc: 'Tu sitio siempre actualizado, seguro y funcionando.', tagline: 'Dormí tranquilo.', icon: 'Shield', color: PURPLE,
    timeline: 'Plan mensual',
    bestFor: 'Cualquier sitio o app ya lanzado que necesita cuidado continuo.',
    includes: ['Actualizaciones de seguridad y dependencias', 'Respaldos automáticos semanales', 'Monitoreo de uptime 24/7', 'Hasta 3 cambios pequeños de contenido por mes', 'Reporte mensual de rendimiento y métricas', 'Soporte por WhatsApp en días hábiles'],
    excludes: ['Rediseño completo', 'Nuevas funcionalidades grandes', 'Cambios que requieran más de 4 horas de desarrollo'],
  },
];

export const STACK = ['React', 'Node.js', 'MongoDB', 'Tailwind', 'Vite', 'Express', 'React Native', 'Figma', 'Cloudinary', 'TypeScript', 'Next.js', 'PostgreSQL'];

export const PROCESS = [
  { n: '01', icon: 'Chat',    title: 'Consulta',   desc: 'Nos contás tu idea. Analizamos el proyecto y te damos una propuesta clara, detallada y sin rodeos. Sin costo.', color: VO },
  { n: '02', icon: 'Palette', title: 'Diseño',     desc: 'Creamos el diseño visual. Vos ves cómo va a quedar y aprobás todo antes de que escribamos una sola línea de código.', color: PINK },
  { n: '03', icon: 'Code',    title: 'Desarrollo', desc: 'Construimos el producto con las tecnologías correctas. Te mostramos el avance semana a semana y podés dar feedback.', color: CYAN },
  { n: '04', icon: 'Rocket',  title: 'Lanzamiento', desc: 'Publicamos, configuramos dominio y analytics, te enseñamos a manejarlo y te acompañamos los primeros 30-90 días.', color: GREEN },
];

export const MANIFESTO = [
  { word: 'Diseñamos' },
  { word: 'experiencias' },
  { word: 'digitales' },
  { word: 'que' },
  { word: 'tu',       highlight: true },
  { word: 'negocio',  highlight: true },
  { word: 'merece.',  highlight: true },
];

// ─── NUEVAS SECCIONES ───

// Features / Why Us — estilo Antigravity (cards grandes con 3D y colores únicos)
export const FEATURES = [
  {
    title: 'Diseño que convierte',
    desc: 'No diseñamos para que se vea bonito — diseñamos para que el visitante tome acción. Cada elemento tiene una razón.',
    color: VO, icon: 'Sparkle', shape: 'sphere', tag: 'UX/UI',
  },
  {
    title: 'Velocidad real',
    desc: 'Sitios que cargan en menos de 2 segundos. Google te premia, el usuario no se va, vos vendés más.',
    color: PURPLE, icon: 'Lightning', shape: 'torus', tag: 'Performance',
  },
  {
    title: 'Código que dura',
    desc: 'Arquitectura limpia desde el primer día. No vas a necesitar rehacer todo en un año cuando el negocio crezca.',
    color: VO, icon: 'Code', shape: 'icosahedron', tag: 'Engineering',
  },
  {
    title: 'Después del lanzamiento',
    desc: 'No desaparecemos al entregar. Bug, duda, cambio urgente — escribís y respondemos. Siempre.',
    color: PURPLE, icon: 'HeadsetMic', shape: 'octahedron', tag: 'Soporte',
  },
  {
    title: 'Mobile primero',
    desc: '+70% de tu tráfico llega desde celular. Diseñamos el mobile antes que el escritorio.',
    color: VO, icon: 'DeviceMobile', shape: 'tetrahedron', tag: 'Responsive',
  },
  {
    title: 'Tuyo para siempre',
    desc: 'El código es tuyo, el dominio es tuyo, la base de datos es tuya. Sin contratos de permanencia ni candados.',
    color: PURPLE, icon: 'Lock', shape: 'cone', tag: 'Propiedad',
  },
];

// Stats grandes
export const BIG_STATS = [
  { num: 100, suffix: '%', label: 'Proyectos entregados a tiempo', color: VO },
  { num: 24,  suffix: 'h', label: 'Tiempo de respuesta promedio',  color: CYAN },
  { num: 99,  suffix: '%', label: 'Uptime garantizado',            color: GREEN },
  { num: 2,   suffix: '+', label: 'Años de experiencia conjunta',  color: PURPLE },
];

// Testimonios (placeholder hasta que los reales lleguen)
export const TESTIMONIALS = [
  {
    quote: 'Entregaron mucho más de lo que esperaba. La tienda funciona perfecto y las ventas subieron desde el primer mes.',
    author: 'María Solís',
    role: 'Dueña, JD Virtual Store',
    color: PINK,
  },
  {
    quote: 'Profesionales de verdad. Comunicación constante, plazos cumplidos y un diseño que enamora.',
    author: 'Carlos Méndez',
    role: 'Gerente, Negocio local',
    color: CYAN,
  },
  {
    quote: 'No solo son buenos en código — entienden de negocio. Eso hace toda la diferencia.',
    author: 'Andrea Vargas',
    role: 'Emprendedora',
    color: VO,
  },
  {
    quote: 'El proceso fue clarísimo desde el principio. Sabíamos en qué etapa estábamos en todo momento.',
    author: 'Roberto Jiménez',
    role: 'Director, Startup CR',
    color: PURPLE,
  },
  {
    quote: 'Diseño moderno, sitio rápido y soporte cuando lo necesito. ¿Qué más se puede pedir?',
    author: 'Laura Campos',
    role: 'Profesional independiente',
    color: GREEN,
  },
];

// Stack visual agrupado
export const TECH_GROUPS = [
  {
    category: 'Frontend',
    color: CYAN,
    techs: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Framer Motion', 'GSAP'],
  },
  {
    category: 'Backend',
    color: GREEN,
    techs: ['Node.js', 'Express', 'REST APIs', 'GraphQL', 'WebSockets', 'JWT'],
  },
  {
    category: 'Database',
    color: PURPLE,
    techs: ['MongoDB', 'PostgreSQL', 'Redis', 'Firebase', 'Supabase'],
  },
  {
    category: 'Mobile',
    color: PINK,
    techs: ['React Native', 'Expo', 'Capacitor', 'PWA'],
  },
  {
    category: 'DevOps',
    color: VO,
    techs: ['Vercel', 'Netlify', 'Docker', 'GitHub Actions', 'Cloudflare'],
  },
  {
    category: 'Design',
    color: PURPLE,
    techs: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator'],
  },
];

export const PRICING = [
  {
    name: 'Landing',
    price: 'desde ₡450k',
    priceUSD: '~$900',
    timeline: '1 – 2 semanas',
    color: PURPLE,
    bestFor: 'Profesionales y emprendimientos que necesitan presencia online rápido.',
    features: [
      'Diseño custom responsive (hasta 5 secciones)',
      'Formulario de contacto funcional',
      'SEO básico + Google Analytics',
      'Dominio + hosting configurados',
      '1 ronda de revisiones de diseño',
      '30 días de soporte post-lanzamiento',
    ],
    notIncluded: 'Panel admin, e-commerce, blog',
    cta: 'Empezar',
  },
  {
    name: 'Sitio completo',
    price: 'desde ₡950k',
    priceUSD: '~$1.900',
    timeline: '2 – 4 semanas',
    color: VO,
    popular: true,
    bestFor: 'PYMES y negocios establecidos que quieren un sitio profesional y completo.',
    features: [
      'Todo lo de Landing, más:',
      'Hasta 10 páginas con CMS para gestionar contenido',
      'Blog integrado y administrable',
      'Optimización SEO avanzada',
      'Formulario de cotización personalizado',
      '2 rondas de revisiones',
      '60 días de soporte post-lanzamiento',
    ],
    notIncluded: 'E-commerce con pagos, sistemas de usuarios',
    cta: 'El más elegido',
  },
  {
    name: 'E-commerce',
    price: 'desde ₡2.2M',
    priceUSD: '~$4.400',
    timeline: '4 – 7 semanas',
    color: PINK,
    bestFor: 'Tiendas que quieren vender en línea con sistema de pagos real.',
    features: [
      'Todo lo de Sitio completo, más:',
      'Catálogo de productos ilimitado + variantes',
      'Carrito y checkout optimizado para conversión',
      'Pasarela de pago (Sinpe, tarjeta, PayPal)',
      'Panel admin completo para gestionar pedidos',
      'Cupones, descuentos y notificaciones',
      '90 días de soporte post-lanzamiento',
    ],
    notIncluded: 'Marketplace multivendedor, facturación electrónica',
    cta: 'Empezar tienda',
  },
  {
    name: 'App / Sistema',
    price: 'desde ₡4.5M',
    priceUSD: '~$9.000',
    timeline: 'A convenir (6+ semanas)',
    color: PURPLE,
    bestFor: 'Empresas con procesos complejos que necesitan software a medida.',
    features: [
      'Análisis de requerimientos detallado',
      'Diseño UX/UI con prototipo aprobado',
      'App web o móvil con autenticación y roles',
      'API propia o integración con sistemas existentes',
      'Panel de administración completo',
      'Documentación técnica y de usuario',
      '90 días de soporte + plan de mantenimiento',
    ],
    notIncluded: 'Apps nativas en App Store (se cotiza aparte)',
    cta: 'Cotizar proyecto',
  },
];

export const PRICING_NOTE = 'Los precios son de referencia. Cada proyecto se cotiza según alcance, integraciones y plazos. Siempre recibís una propuesta detallada antes de firmar nada.';

export const GUARANTEES = [
  { icon: 'Check', text: '2 rondas de revisión incluidas en todos los planes' },
  { icon: 'Clock', text: 'Plazos acordados por escrito y respetados' },
  { icon: 'Code2', text: 'Código fuente 100% tuyo al entregar' },
  { icon: 'HeadsetMic', text: 'Soporte post-lanzamiento en todos los planes' },
];

// FAQ
export const FAQ = [
  {
    q: '¿Cuánto cuesta un proyecto?',
    a: 'Tenés una referencia en nuestra sección de precios. Una landing page arranca desde ₡450k (~$900), un sitio completo desde ₡950k, e-commerce desde ₡2.2M y sistemas desde ₡4.5M. Siempre te damos una propuesta detallada sin costo antes de empezar.',
  },
  {
    q: '¿Quién hospeda el sitio? ¿Hay un costo mensual aparte?',
    a: 'Nosotros configuramos el hosting en la plataforma que mejor se adapte al proyecto (Vercel, Netlify, VPS). El costo mensual de hosting típico varía entre $5 y $25/mes dependiendo del tamaño. Te explicamos todo antes de decidir y el dominio + primer año van incluidos en la mayoría de planes.',
  },
  {
    q: '¿Puedo editar el contenido del sitio yo solo después de entregado?',
    a: 'Sí, y es una de nuestras prioridades. Los sitios de contenido vienen con panel admin propio (o conectado a un CMS). Te capacitamos para que puedas cambiar textos, imágenes, productos y demás sin tocar código. Si algo sale raro, nos escribís y lo resolvemos.',
  },
  {
    q: '¿Cómo son los pagos? ¿Hay formas de financiar?',
    a: 'Trabajamos con un esquema de 50% al iniciar y 50% al entregar. Aceptamos Sinpe, transferencia bancaria y tarjeta. Para proyectos grandes podemos acordar un plan de 3 pagos. Todo queda en contrato antes de empezar.',
  },
  {
    q: '¿Cuánto tiempo toma el desarrollo?',
    a: 'Landing: 1-2 semanas. Sitio completo: 2-4 semanas. E-commerce: 4-7 semanas. Apps y sistemas: 6+ semanas. Los plazos los acordamos al inicio y los respetamos. Vos siempre sabés en qué etapa va el proyecto.',
  },
  {
    q: '¿Qué pasa si necesito cambios después de que me entreguen?',
    a: 'Incluimos días de soporte post-lanzamiento según el plan (30 a 90 días). Después de ese período, tenemos planes de mantenimiento mensuales desde ₡100k que incluyen cambios pequeños, actualizaciones de seguridad y soporte por WhatsApp.',
  },
  {
    q: '¿Trabajan con clientes fuera de Costa Rica?',
    a: 'Sí. Trabajamos 100% remoto con clientes en Latinoamérica. La comunicación es por WhatsApp, Zoom o el medio que prefieras. Los pagos se pueden hacer por transferencia internacional o PayPal.',
  },
  {
    q: '¿Tienen experiencia en mi industria?',
    a: 'Hemos trabajado con comercio minorista, salud, educación, restaurantes y servicios profesionales. Si no hemos trabajado en tu industria específica, investigamos antes de proponer y te lo decimos con honestidad. Lo importante es entender tu negocio.',
  },
  {
    q: '¿Qué necesito tener listo antes de empezar?',
    a: 'Lo básico: saber qué querés lograr con el sitio, tener los textos y logos (o darnos acceso para redactarlos), y un rango de presupuesto. Con eso ya podemos hacer la propuesta. El resto lo resolvemos en conjunto.',
  },
  {
    q: '¿Son ustedes los dueños del código?',
    a: 'No. Al entregar el proyecto te damos todo: código fuente, credenciales de hosting, base de datos, dominio. No hay contratos de permanencia con nosotros. El trabajo es tuyo.',
  },
];
