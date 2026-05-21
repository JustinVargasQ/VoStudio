import { motion } from 'framer-motion';
import { F_DISPLAY, F_MONO } from '../theme';
import { useApp } from '../context/AppContext';

const TEAM_AVATARS = [
  { initials: 'JV', color: '#8A46FF', name: 'Justin' },
  { initials: 'ZO', color: '#E14DFF', name: 'Zaylin' },
];

const TIME_SLOTS = ['09:00', '10:30', '14:00', '16:30'];

export function CTAVisual() {
  const { t } = useApp();

  const CHAT_MESSAGES = [
    { from: 'them', text: t('cta.chat.them1'), time: '10:24' },
    { from: 'us',   text: t('cta.chat.us1'),   time: '10:25' },
    { from: 'them', text: t('cta.chat.them2'), time: '10:26' },
  ];

  const dayLabels = t('cta.cal.days').split('|');
  const CAL_DAYS = [
    { d: dayLabels[0], n: 12, busy: true },
    { d: dayLabels[1], n: 13, busy: false, today: true },
    { d: dayLabels[2], n: 14, busy: false },
    { d: dayLabels[3], n: 15, busy: false, selected: true },
    { d: dayLabels[4], n: 16, busy: true },
  ];

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      aspectRatio: '1 / 1',
      maxWidth: 480,
      marginInline: 'auto',
      /* prevent absolute children from bleeding outside on small screens */
      overflow: 'hidden',
    }} className="vo-cta-visual-wrap">

      {/* ── Chat card — entrance wrapper → floating inner ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.21, 0.61, 0.35, 1] }}
        style={{
          position: 'absolute',
          top: '8%', left: '4%',
          width: '78%',
          transform: 'rotate(-3deg)',
        }}
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            background: '#FFFFFF',
            boxShadow: '0 30px 80px rgba(0,0,0,0.35)',
            overflow: 'hidden',
          }}
        >
          {/* Chat header */}
          <div style={{
            padding: '14px 18px',
            background: '#0A0A0A',
            color: '#fff',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{ display: 'flex' }}>
              {TEAM_AVATARS.map((a, i) => (
                <div key={a.initials} style={{
                  width: 30, height: 30, borderRadius: '50%',
                  background: a.color, color: '#fff',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: F_MONO, fontSize: 11, fontWeight: 700,
                  border: '2px solid #0A0A0A',
                  marginLeft: i > 0 ? -10 : 0,
                  position: 'relative', zIndex: TEAM_AVATARS.length - i,
                }}>
                  {a.initials}
                </div>
              ))}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.2 }}>VO Studio</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 10, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>
                <motion.span
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  style={{ width: 6, height: 6, background: '#22C55E', borderRadius: '50%' }}
                />
                {t('common.online')}
              </div>
            </div>
            <span style={{
              fontFamily: F_MONO, fontSize: 9, color: 'rgba(255,255,255,0.5)',
              letterSpacing: '0.1em',
            }}>{t('common.today')}</span>
          </div>

          {/* Messages */}
          <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8, background: '#FAFAF7' }}>
            {CHAT_MESSAGES.map((m, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.25, duration: 0.5 }}
                style={{
                  alignSelf: m.from === 'us' ? 'flex-start' : 'flex-end',
                  maxWidth: '82%',
                  padding: '9px 13px',
                  background: m.from === 'us' ? '#8A46FF' : '#FFFFFF',
                  color: m.from === 'us' ? '#fff' : '#0A0A0A',
                  border: m.from === 'us' ? 'none' : '1px solid #E5E5E5',
                  fontSize: 12.5, lineHeight: 1.45,
                  borderRadius: m.from === 'us' ? '14px 14px 14px 4px' : '14px 14px 4px 14px',
                }}>
                {m.text}
                <div style={{
                  fontSize: 9, opacity: 0.55,
                  marginTop: 3, textAlign: 'right',
                  fontFamily: F_MONO,
                }}>{m.time}</div>
              </motion.div>
            ))}

            {/* Typing indicator */}
            <motion.div
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: 1.5 }}
              style={{
                alignSelf: 'flex-start',
                padding: '10px 14px',
                background: '#FFFFFF', border: '1px solid #E5E5E5',
                borderRadius: '14px 14px 14px 4px',
                display: 'inline-flex', gap: 4,
              }}>
              {[0,1,2].map(i => (
                <motion.span key={i}
                  animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                  style={{ width: 5, height: 5, background: '#8A46FF', borderRadius: '50%' }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Calendar card — entrance wrapper → floating inner ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.21, 0.61, 0.35, 1] }}
        style={{
          position: 'absolute',
          bottom: '4%', right: '0%',
          width: '62%',
          transform: 'rotate(4deg)',
        }}
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          style={{
            background: '#FFFFFF',
            boxShadow: '0 24px 60px rgba(0,0,0,0.30)',
            padding: 16,
          }}
        >
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: 14,
          }}>
            <div>
              <div style={{
                fontFamily: F_MONO, fontSize: 9, color: '#A3A3A3',
                letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600,
              }}>{t('cta.cal.week')}</div>
              <div style={{
                fontFamily: F_DISPLAY, fontStyle: 'italic',
                fontSize: 22, color: '#0A0A0A', letterSpacing: '-0.02em', lineHeight: 1,
              }}>{t('cta.cal.month')}</div>
            </div>
            <span style={{
              padding: '4px 8px', background: '#DCFCE7', border: '1px solid #BBF7D0',
              color: '#15803D', fontSize: 9, fontFamily: F_MONO, fontWeight: 700,
              letterSpacing: '0.1em',
            }}>{t('cta.cal.free')}</span>
          </div>

          {/* Day grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 4, marginBottom: 14 }}>
            {CAL_DAYS.map((d, i) => (
              <button key={i}
                style={{
                  padding: '8px 4px',
                  background: d.selected ? '#8A46FF' : (d.today ? '#FFF7ED' : '#FAFAF7'),
                  color: d.selected ? '#fff' : (d.busy ? '#A3A3A3' : '#0A0A0A'),
                  border: `1px solid ${d.selected ? '#8A46FF' : (d.today ? '#8A46FF' : '#E5E5E5')}`,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                  opacity: d.busy ? 0.5 : 1,
                }}>
                <span style={{
                  fontFamily: F_MONO, fontSize: 8, opacity: 0.7,
                  letterSpacing: '0.06em',
                }}>{d.d}</span>
                <span style={{
                  fontFamily: F_DISPLAY, fontStyle: 'italic', fontSize: 16,
                  letterSpacing: '-0.02em', lineHeight: 1,
                }}>{d.n}</span>
              </button>
            ))}
          </div>

          {/* Time slots */}
          <div style={{
            fontFamily: F_MONO, fontSize: 9, color: '#A3A3A3',
            letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 8,
          }}>{t('cta.cal.slots')}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {TIME_SLOTS.map((slot, i) => (
              <span key={slot} style={{
                padding: '5px 9px',
                fontSize: 11, fontWeight: 500, color: i === 1 ? '#fff' : '#0A0A0A',
                background: i === 1 ? '#8A46FF' : '#FAFAF7',
                border: `1px solid ${i === 1 ? '#8A46FF' : '#E5E5E5'}`,
                fontFamily: F_MONO,
              }}>
                {slot}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ── Badge — entrance only ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7, duration: 0.6, type: 'spring', stiffness: 200 }}
        style={{
          position: 'absolute',
          top: '0%', right: '6%',
          background: '#8A46FF',
          color: '#E9E4E0',
          padding: '10px 16px',
          fontSize: 11, fontWeight: 700, fontFamily: F_MONO,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          boxShadow: '0 12px 30px rgba(245,158,11,0.4)',
          transform: 'rotate(8deg)',
          display: 'inline-flex', alignItems: 'center', gap: 6,
        }}>
        <span style={{ fontSize: 14 }}>★</span> {t('cta.badge.free')}
      </motion.div>

      {/* ── Response time card — entrance wrapper → floating inner ── */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1, duration: 0.6 }}
        style={{
          position: 'absolute',
          bottom: '38%', left: '2%',
          transform: 'rotate(-5deg)',
        }}
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          style={{
            background: '#FFFFFF',
            padding: '10px 14px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
            display: 'inline-flex', alignItems: 'center', gap: 10,
          }}>
          <span style={{
            width: 28, height: 28, flexShrink: 0,
            background: '#DCFCE7', border: '1px solid #BBF7D0',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: '50%',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#15803D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
          </span>
          <div>
            <div style={{ fontSize: 10, color: '#A3A3A3', fontFamily: F_MONO, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>
              {t('cta.respond')}
            </div>
            <div style={{ fontFamily: F_DISPLAY, fontStyle: 'italic', fontSize: 18, color: '#0A0A0A', letterSpacing: '-0.02em', lineHeight: 1 }}>
              {t('cta.respond.v')}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
