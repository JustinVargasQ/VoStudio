import { motion } from 'framer-motion';
import { MessageCircle, Palette, Code2, Rocket } from 'lucide-react';
import { BG, BG_ALT, BG_CARD, TEXT, TEXT_S, TEXT_D, BORDER, A, F_DISPLAY, F_MONO, MAX_W, PAD_X } from '../theme';
import { useApp } from '../context/AppContext';
import { SectionHeader } from './Services';
import RadialOrbitalTimeline from './ui/radial-orbital-timeline';

const PROCESS_META = [
  { icon: MessageCircle, energy: 100, color: '#EA580C' },
  { icon: Palette,       energy: 85,  color: '#A855F7' },
  { icon: Code2,         energy: 70,  color: '#0EA5E9' },
  { icon: Rocket,        energy: 45,  color: '#22C55E' },
];

const PROCESS_STATUS = ['completed', 'completed', 'in-progress', 'pending'];

const PROCESS_DATA = {
  es: [
    { id: 1, title: 'Consulta',    date: '1 semana',   content: 'Nos contás tu idea. Analizamos el proyecto y te damos una propuesta clara y sin costo.',                                        relatedIds: [2] },
    { id: 2, title: 'Diseño',      date: '1–2 semanas', content: 'Creamos la interfaz. Vos ves cómo va a quedar y aprobás todo antes de escribir una línea de código.',                          relatedIds: [1, 3] },
    { id: 3, title: 'Desarrollo',  date: '2–5 semanas', content: 'Construimos con las tecnologías correctas. Mostramos el avance semana a semana.',                                               relatedIds: [2, 4] },
    { id: 4, title: 'Lanzamiento', date: '1 semana',   content: 'Publicamos, configuramos el dominio y analytics, y te acompañamos los primeros 30–90 días post-lanzamiento.',                   relatedIds: [3] },
  ],
  en: [
    { id: 1, title: 'Kickoff',     date: '1 week',     content: 'You share your idea. We analyze the project and give you a clear, free proposal.',                                               relatedIds: [2] },
    { id: 2, title: 'Design',      date: '1–2 weeks',  content: 'We build the interface. You see exactly how it will look and approve everything before a single line of code is written.',       relatedIds: [1, 3] },
    { id: 3, title: 'Development', date: '2–5 weeks',  content: 'We build with the right technologies. We share weekly progress updates.',                                                        relatedIds: [2, 4] },
    { id: 4, title: 'Launch',      date: '1 week',     content: 'We publish, configure your domain and analytics, and support you through the first 30–90 days after launch.',                   relatedIds: [3] },
  ],
};

export function Process() {
  const { t, locale } = useApp();

  const timelineData = PROCESS_DATA[locale].map((item, i) => ({
    ...item,
    ...PROCESS_META[i],
    status: PROCESS_STATUS[i],
    category: item.title,
    energyLabel: locale === 'es' ? 'Prioridad' : 'Priority',
    connectedLabel: locale === 'es' ? 'Conectado con' : 'Connected with',
  }));

  return (
    <section id="proceso" style={{ background: BG_ALT, padding: `clamp(64px, 10vh, 110px) 0`, position: 'relative', overflow: 'hidden' }}>

      {/* Ambient glow */}
      <div aria-hidden style={{
        position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(234,88,12,0.12) 0%, transparent 65%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: MAX_W, margin: '0 auto', padding: `0 ${PAD_X}`, position: 'relative', zIndex: 1 }}>

        {/* Header — white text on dark bg */}
        <div style={{ marginBottom: 'clamp(32px, 5vw, 56px)' }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}
          >
            <motion.span initial={{ width: 0 }} whileInView={{ width: 32 }} viewport={{ once: true }}
              transition={{ duration: 0.6 }} style={{ height: 1, background: A, display: 'inline-block' }} />
            <span style={{ fontFamily: F_MONO, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: TEXT_S }}>
              {t('process.eyebrow')}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.21, 0.61, 0.35, 1] }}
            style={{
              fontFamily: F_DISPLAY, fontWeight: 400,
              fontSize: 'clamp(36px, 5vw, 64px)',
              lineHeight: 1.0, letterSpacing: '-0.025em',
              color: TEXT,
              maxWidth: '18ch',
            }}
          >
            {t('process.title.1')} <span style={{ fontStyle: 'italic', color: A }}>{t('process.title.2')}</span>.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
            style={{ marginTop: 16, fontSize: 'clamp(14px, 1.1vw, 16px)', color: TEXT_S, maxWidth: '52ch', lineHeight: 1.65 }}
          >
            {t('process.intro')}
          </motion.p>
        </div>

        {/* Instruction hint */}
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.8 }}
          style={{ fontFamily: F_MONO, fontSize: 10, color: TEXT_D, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8, textAlign: 'center' }}
        >
          {locale === 'es' ? '↓ clic en cada fase para ver detalle ↓' : '↓ click each phase to see details ↓'}
        </motion.p>

        {/* Orbital Timeline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 1, ease: [0.21, 0.61, 0.35, 1] }}
        >
          <RadialOrbitalTimeline timelineData={timelineData} />
        </motion.div>

        {/* Guarantee bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          style={{
            marginTop: 'clamp(32px, 4vw, 48px)',
            padding: '20px clamp(20px, 3vw, 32px)',
            background: BG_CARD,
            border: `1px solid ${BORDER}`,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: 16, flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{
              width: 34, height: 34, flexShrink: 0,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.35)', borderRadius: '50%',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: TEXT, lineHeight: 1.3 }}>{t('process.guarantee.t')}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>{t('process.guarantee.s')}</div>
            </div>
          </div>

          <a href="#contacto" className="arrow-slide-parent" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            fontSize: 13, fontWeight: 600, color: TEXT,
            borderBottom: `1px solid ${BORDER}`, paddingBottom: 2,
          }}>
            {t('process.guarantee.cta')}
            <span className="arrow-slide">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
