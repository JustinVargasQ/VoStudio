import { useForm, ValidationError } from '@formspree/react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { TEXT, TEXT_S, TEXT_D, BORDER, BG, BG_CARD, A, F_DISPLAY, F_MONO } from '../theme';
import { useApp } from '../context/AppContext';

const FORM_ID = 'mpqnwpjp';

const PROJECT_TYPE_ICONS = [
  <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/><circle cx="6.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="6.5" r=".5" fill="currentColor"/></g>,
  <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round"><path d="M5 8h14l-1.5 12.5a2 2 0 01-2 1.5h-7a2 2 0 01-2-1.5L5 8z"/><path d="M9 8V5a3 3 0 016 0v3"/></g>,
  <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"><rect x="6" y="2" width="12" height="20" rx="2"/><line x1="10" y1="19" x2="14" y2="19"/></g>,
  <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"><rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="5" rx="1"/><rect x="13" y="10" width="8" height="11" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/></g>,
  <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><path d="M8 11l2 2 4-4"/></g>,
  <g fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9"/><line x1="9" y1="10" x2="9.01" y2="10"/><line x1="15" y1="10" x2="15.01" y2="10"/><path d="M9 15c1 1 2 1.5 3 1.5s2-.5 3-1.5"/></g>,
];

const BUDGET_OPTIONS_BY_LOCALE = {
  es: ['< ₡500k', '₡500k – ₡1.5M', '₡1.5M – ₡5M', '> ₡5M', 'A discutir'],
  en: ['< $1k',   '$1k – $3k',     '$3k – $10k',   '> $10k', 'To discuss'],
};

export function ContactForm() {
  const { t, locale } = useApp();
  const [state, handleSubmit] = useForm(FORM_ID);
  const BUDGET_OPTIONS = BUDGET_OPTIONS_BY_LOCALE[locale] || BUDGET_OPTIONS_BY_LOCALE.es;
  const PROJECT_TYPES = [
    { v: t('form.type.web'),   icon: PROJECT_TYPE_ICONS[0] },
    { v: t('form.type.shop'),  icon: PROJECT_TYPE_ICONS[1] },
    { v: t('form.type.app'),   icon: PROJECT_TYPE_ICONS[2] },
    { v: t('form.type.sys'),   icon: PROJECT_TYPE_ICONS[3] },
    { v: t('form.type.seo'),   icon: PROJECT_TYPE_ICONS[4] },
    { v: t('form.type.other'), icon: PROJECT_TYPE_ICONS[5] },
  ];

  const [budget, setBudget] = useState(BUDGET_OPTIONS[BUDGET_OPTIONS.length - 1]);
  const [projectType, setProjectType] = useState(PROJECT_TYPES[0].v);
  const [msgLen, setMsgLen] = useState(0);

  const inputBase = {
    width: '100%',
    background: BG_CARD,
    border: `1px solid ${BORDER}`,
    padding: '14px 16px',
    fontSize: 15,
    color: TEXT,
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.15s, box-shadow 0.15s',
  };

  const onFocus = (e) => { e.target.style.borderColor = A; e.target.style.boxShadow = `0 0 0 3px ${A}18`; };
  const onBlur = (e) => { e.target.style.borderColor = BORDER; e.target.style.boxShadow = 'none'; };

  const labelStyle = {
    display: 'block', fontFamily: F_MONO, fontSize: 10,
    letterSpacing: '0.12em', textTransform: 'uppercase',
    color: TEXT_S, marginBottom: 8, fontWeight: 600,
  };

  function Field({ label, required, children, hint }) {
    return (
      <label style={{ display: 'block' }}>
        <span style={labelStyle}>
          {label}{required && <span style={{ color: A, marginLeft: 4 }}>*</span>}
        </span>
        {children}
        {hint && <span style={{ display: 'block', marginTop: 6, fontSize: 11, color: TEXT_D }}>{hint}</span>}
      </label>
    );
  }

  if (state.succeeded) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.21, 0.61, 0.35, 1] }}
        style={{
          padding: 'clamp(36px, 4vw, 56px) clamp(24px, 3vw, 40px)',
          textAlign: 'center',
          background: BG_CARD,
          border: `1px solid ${BORDER}`,
        }}
      >
        <motion.div
          initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.1 }}
          style={{
            width: 72, height: 72, margin: '0 auto 24px',
            background: '#DCFCE7', border: '1px solid #BBF7D0',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: '50%',
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#15803D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </motion.div>
        <h3 style={{ fontFamily: F_DISPLAY, fontSize: 'clamp(28px, 3vw, 36px)', color: TEXT, marginBottom: 12, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
          {t('form.success.t.1')} <span style={{ fontStyle: 'italic', color: A }}>{t('form.success.t.2')}</span>.
        </h3>
        <p style={{ fontSize: 15, color: TEXT_S, lineHeight: 1.6, maxWidth: 380, margin: '0 auto 24px' }}>
          {t('form.success.d')}
        </p>
        <a href="https://wa.me/50686737114" target="_blank" rel="noreferrer" style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          padding: '13px 22px', fontSize: 13, fontWeight: 600,
          background: '#22C55E', color: '#fff',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.4-.8-.8-1.4-1.7-1.6-2-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.8-2c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3 1.5.5 2.1.6 2.8.5.5 0 1.4-.6 1.7-1.2.2-.6.2-1 .1-1.2zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.3c1.4.8 3 1.3 4.8 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2z"/></svg>
          {t('form.success.cta')}
        </a>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.7 }}
      style={{
        background: BG_CARD,
        border: `1px solid ${BORDER}`,
        padding: 'clamp(28px, 3vw, 40px)',
        display: 'flex', flexDirection: 'column', gap: 28,
        boxShadow: 'var(--shadow-lg)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <h3 style={{
            fontFamily: F_DISPLAY, fontWeight: 400,
            fontSize: 'clamp(22px, 2vw, 28px)', letterSpacing: '-0.02em', color: TEXT, lineHeight: 1.1, marginBottom: 6,
          }}>
            {t('form.title.1')} <span style={{ fontStyle: 'italic', color: A }}>{t('form.title.2')}</span>.
          </h3>
          <p style={{ fontSize: 13, color: TEXT_S, lineHeight: 1.5 }}>{t('form.subtitle')}</p>
        </div>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 7,
          padding: '5px 10px', background: '#DCFCE7', border: '1px solid #BBF7D0',
          fontSize: 10, fontFamily: F_MONO, color: '#15803D', fontWeight: 700,
          letterSpacing: '0.1em', textTransform: 'uppercase', flexShrink: 0,
        }}>
          <motion.span
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            style={{ width: 6, height: 6, background: '#15803D', borderRadius: '50%' }}
          />
          {t('form.active')}
        </span>
      </div>

      <ValidationError errors={state.errors}
        style={{ fontSize: 13, color: '#B91C1C', padding: '12px 14px', background: '#FEF2F2', border: '1px solid #FECACA' }} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
        <Field label={t('form.label.name')} required>
          <input type="text" name="nombre" required autoComplete="name" onFocus={onFocus} onBlur={onBlur} style={inputBase} placeholder={t('form.placeholder.name')} />
        </Field>
        <Field label={t('form.label.email')} required>
          <input type="email" name="email" required autoComplete="email" onFocus={onFocus} onBlur={onBlur} style={inputBase} placeholder={t('form.placeholder.email')} />
        </Field>
      </div>

      <Field label={t('form.label.whatsapp')} hint={t('form.hint.whatsapp')}>
        <input type="tel" name="telefono" autoComplete="tel" onFocus={onFocus} onBlur={onBlur} style={inputBase} placeholder={t('form.placeholder.phone')} />
      </Field>

      <input type="hidden" name="tipo" value={projectType} />

      <Field label={t('form.label.type')}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: 8, marginTop: 4,
        }}>
          {PROJECT_TYPES.map((p) => {
            const sel = projectType === p.v;
            return (
              <motion.button type="button" key={p.v}
                onClick={() => setProjectType(p.v)}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '14px 12px',
                  background: sel ? A : BG_CARD,
                  color: sel ? '#fff' : TEXT,
                  border: `1px solid ${sel ? A : BORDER}`,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                  fontSize: 12, fontWeight: 600,
                  transition: 'all 0.18s',
                  boxShadow: sel ? `0 8px 20px ${A}35` : 'none',
                }}
                onMouseEnter={(e) => { if (!sel) e.currentTarget.style.borderColor = A; }}
                onMouseLeave={(e) => { if (!sel) e.currentTarget.style.borderColor = BORDER; }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" style={{ color: sel ? '#fff' : A }}>{p.icon}</svg>
                {p.v}
              </motion.button>
            );
          })}
        </div>
      </Field>

      <input type="hidden" name="presupuesto" value={budget} />

      <Field label={t('form.label.budget')} hint={t('form.hint.budget')}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
          {BUDGET_OPTIONS.map((b) => {
            const sel = budget === b;
            return (
              <motion.button type="button" key={b}
                onClick={() => setBudget(b)}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '10px 16px', fontSize: 13, fontWeight: 600,
                  background: sel ? TEXT : BG_CARD,
                  color: sel ? BG : TEXT,
                  border: `1px solid ${sel ? TEXT : BORDER}`,
                  transition: 'all 0.15s',
                  fontFamily: F_MONO,
                }}
                onMouseEnter={(e) => { if (!sel) e.currentTarget.style.borderColor = TEXT; }}
                onMouseLeave={(e) => { if (!sel) e.currentTarget.style.borderColor = BORDER; }}
              >
                {b}
              </motion.button>
            );
          })}
        </div>
      </Field>

      <Field label={t('form.label.message')} required hint={`${msgLen}/500`}>
        <textarea name="mensaje" rows={5} required maxLength={500}
          onChange={(e) => setMsgLen(e.target.value.length)}
          onFocus={onFocus} onBlur={onBlur}
          style={{ ...inputBase, resize: 'vertical', lineHeight: 1.55, minHeight: 120 }}
          placeholder={t('form.placeholder.msg')} />
      </Field>

      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 16, flexWrap: 'wrap',
        paddingTop: 20, borderTop: `1px solid ${BORDER}`,
      }}>
        <p style={{ fontSize: 11, color: TEXT_D, maxWidth: 280, lineHeight: 1.5, display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
          </svg>
          {t('form.privacy')}
        </p>
        <motion.button type="submit" disabled={state.submitting}
          whileHover={{ scale: state.submitting ? 1 : 1.03 }} whileTap={{ scale: 0.97 }}
          className="arrow-slide-parent"
          style={{
            padding: '15px 30px', background: TEXT, color: BG,
            fontSize: 14, fontWeight: 700,
            display: 'inline-flex', alignItems: 'center', gap: 12,
            cursor: state.submitting ? 'wait' : 'pointer',
            opacity: state.submitting ? 0.6 : 1,
            boxShadow: '0 12px 30px rgba(10,10,10,0.2)',
          }}
        >
          {state.submitting ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: 'spin 1s linear infinite' }}><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>
              {t('common.cta.sending')}
            </>
          ) : (
            <>
              {t('common.cta.send')}
              <span className="arrow-slide" style={{ fontSize: 16 }}>→</span>
            </>
          )}
        </motion.button>
      </div>
    </motion.form>
  );
}
