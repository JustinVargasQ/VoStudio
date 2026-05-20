import { useForm, ValidationError } from '@formspree/react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { TEXT, TEXT_S, TEXT_D, BORDER, BG, BG_CARD, A, F_DISPLAY, F_MONO } from '../theme';
import { useApp } from '../context/AppContext';

const FORM_ID = 'mpqnwpjp';

export function ContactForm() {
  const { t, locale } = useApp();
  const [state, handleSubmit] = useForm(FORM_ID);

  const PROJECT_TYPES = [
    t('form.type.web'),
    t('form.type.shop'),
    t('form.type.app'),
    t('form.type.sys'),
    t('form.type.seo'),
    t('form.type.other'),
  ];

  const [projectType, setProjectType] = useState(PROJECT_TYPES[0]);
  const [msgLen, setMsgLen] = useState(0);

  const inputBase = {
    width: '100%',
    background: BG_CARD,
    border: `1px solid ${BORDER}`,
    padding: '12px 14px',
    fontSize: 14,
    color: TEXT,
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.15s, box-shadow 0.15s',
  };

  const onFocus = (e) => { e.target.style.borderColor = A; e.target.style.boxShadow = `0 0 0 3px ${A}15`; };
  const onBlur  = (e) => { e.target.style.borderColor = BORDER; e.target.style.boxShadow = 'none'; };

  const labelStyle = {
    display: 'block', fontFamily: F_MONO, fontSize: 9,
    letterSpacing: '0.14em', textTransform: 'uppercase',
    color: TEXT_S, marginBottom: 7, fontWeight: 600,
  };

  if (state.succeeded) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ padding: 'clamp(32px, 4vw, 48px)', textAlign: 'center', background: BG_CARD, border: `1px solid ${BORDER}` }}
      >
        <motion.div
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.1 }}
          style={{ width: 64, height: 64, margin: '0 auto 20px', background: '#DCFCE7', border: '1px solid #BBF7D0', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#15803D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </motion.div>
        <h3 style={{ fontFamily: F_DISPLAY, fontSize: 'clamp(24px, 2.5vw, 32px)', color: TEXT, marginBottom: 10, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
          {t('form.success.t.1')} <span style={{ fontStyle: 'italic', color: A }}>{t('form.success.t.2')}</span>.
        </h3>
        <p style={{ fontSize: 14, color: TEXT_S, lineHeight: 1.6, maxWidth: 340, margin: '0 auto' }}>
          {t('form.success.d')}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.6 }}
      style={{
        background: BG_CARD,
        border: `1px solid ${BORDER}`,
        padding: 'clamp(20px, 2.5vw, 32px)',
        display: 'flex', flexDirection: 'column', gap: 18,
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <h3 style={{ fontFamily: F_DISPLAY, fontWeight: 400, fontSize: 'clamp(20px, 1.8vw, 26px)', letterSpacing: '-0.02em', color: TEXT, lineHeight: 1.1, marginBottom: 4 }}>
            {t('form.title.1')} <span style={{ fontStyle: 'italic', color: A }}>{t('form.title.2')}</span>.
          </h3>
          <p style={{ fontSize: 12, color: TEXT_S }}>{t('form.subtitle')}</p>
        </div>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 9px',
          background: '#DCFCE7', border: '1px solid #BBF7D0',
          fontSize: 9, fontFamily: F_MONO, color: '#15803D', fontWeight: 700,
          letterSpacing: '0.1em', textTransform: 'uppercase', flexShrink: 0,
        }}>
          <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.8, repeat: Infinity }}
            style={{ width: 5, height: 5, background: '#15803D', borderRadius: '50%' }} />
          {t('form.active')}
        </span>
      </div>

      <ValidationError errors={state.errors}
        style={{ fontSize: 12, color: '#B91C1C', padding: '10px 12px', background: '#FEF2F2', border: '1px solid #FECACA' }} />

      {/* Name + Email */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
        <label style={{ display: 'block' }}>
          <span style={labelStyle}>{t('form.label.name')}<span style={{ color: A, marginLeft: 3 }}>*</span></span>
          <input type="text" name="nombre" required autoComplete="name" onFocus={onFocus} onBlur={onBlur} style={inputBase} placeholder={t('form.placeholder.name')} />
        </label>
        <label style={{ display: 'block' }}>
          <span style={labelStyle}>{t('form.label.email')}<span style={{ color: A, marginLeft: 3 }}>*</span></span>
          <input type="email" name="email" required autoComplete="email" onFocus={onFocus} onBlur={onBlur} style={inputBase} placeholder={t('form.placeholder.email')} />
        </label>
      </div>

      {/* Project type — compact pills */}
      <input type="hidden" name="tipo" value={projectType} />
      <div>
        <span style={labelStyle}>{t('form.label.type')}</span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {PROJECT_TYPES.map((p) => {
            const sel = projectType === p;
            return (
              <button type="button" key={p} onClick={() => setProjectType(p)}
                style={{
                  padding: '6px 14px', fontSize: 12, fontWeight: 600,
                  background: sel ? A : 'transparent',
                  color: sel ? '#fff' : TEXT_S,
                  border: `1px solid ${sel ? A : BORDER}`,
                  borderRadius: 999,
                  transition: 'all 0.15s', cursor: 'pointer',
                }}
                onMouseEnter={(e) => { if (!sel) { e.currentTarget.style.borderColor = A; e.currentTarget.style.color = TEXT; }}}
                onMouseLeave={(e) => { if (!sel) { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = TEXT_S; }}}
              >
                {p}
              </button>
            );
          })}
        </div>
      </div>

      {/* Message */}
      <label style={{ display: 'block' }}>
        <span style={{ ...labelStyle, display: 'flex', justifyContent: 'space-between' }}>
          <span>{t('form.label.message')}<span style={{ color: A, marginLeft: 3 }}>*</span></span>
          <span style={{ color: TEXT_D, fontWeight: 400 }}>{msgLen}/500</span>
        </span>
        <textarea name="mensaje" rows={4} required maxLength={500}
          onChange={(e) => setMsgLen(e.target.value.length)}
          onFocus={onFocus} onBlur={onBlur}
          style={{ ...inputBase, resize: 'vertical', lineHeight: 1.55, minHeight: 100 }}
          placeholder={t('form.placeholder.msg')} />
      </label>

      {/* Submit */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
        <p style={{ fontSize: 11, color: TEXT_D, maxWidth: 240, lineHeight: 1.45, display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
            <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
          </svg>
          {t('form.privacy')}
        </p>
        <motion.button type="submit" disabled={state.submitting}
          whileHover={{ scale: state.submitting ? 1 : 1.03 }} whileTap={{ scale: 0.97 }}
          className="arrow-slide-parent"
          style={{
            padding: '13px 26px', background: TEXT, color: BG,
            fontSize: 13, fontWeight: 700,
            display: 'inline-flex', alignItems: 'center', gap: 10,
            cursor: state.submitting ? 'wait' : 'pointer',
            opacity: state.submitting ? 0.6 : 1,
          }}
        >
          {state.submitting ? (
            <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: 'spin 1s linear infinite' }}><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>{t('common.cta.sending')}</>
          ) : (
            <>{t('common.cta.send')}<span className="arrow-slide" style={{ fontSize: 15 }}>→</span></>
          )}
        </motion.button>
      </div>
    </motion.form>
  );
}
