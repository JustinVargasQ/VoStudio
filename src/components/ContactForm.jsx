import { useForm, ValidationError } from '@formspree/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { VO, VO_LIGHT, PURPLE } from '../data/content';

const FORM_ID = 'mpqnwpjp';

const PROJECT_TYPES = [
  { v: 'web',       label: 'Página web' },
  { v: 'ecommerce', label: 'E-commerce' },
  { v: 'app',       label: 'Aplicación' },
  { v: 'sistema',   label: 'Sistema a medida' },
  { v: 'seo',       label: 'SEO / Mantenimiento' },
  { v: 'otro',      label: 'Otro' },
];

const BUDGET_OPTIONS = ['< ₡500k', '₡500k – ₡1.5M', '₡1.5M – ₡5M', '> ₡5M', 'A discutir'];

function Field({ label, children, required, fieldName, errors }) {
  return (
    <label style={{ display: 'block' }}>
      <span style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>
        {label}{required && <span style={{ color: VO, marginLeft: 4 }}>*</span>}
      </span>
      {children}
      {fieldName && (
        <ValidationError field={fieldName} prefix={label} errors={errors}
          className="fs-error" />
      )}
    </label>
  );
}

const inputStyle = {
  width: '100%', background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14,
  padding: '14px 16px', fontSize: 14, color: '#fff',
  fontFamily: 'inherit', outline: 'none',
  transition: 'border-color 0.25s, background 0.25s',
};
const onFocus = (e) => { e.target.style.borderColor = VO; e.target.style.background = 'rgba(234,97,19,0.04)'; };
const onBlur  = (e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(255,255,255,0.04)'; };

export function ContactForm() {
  const [state, handleSubmit] = useForm(FORM_ID);
  const [budget, setBudget] = useState('A discutir');

  if (state.succeeded) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
        style={{ padding: '52px 32px', background: `linear-gradient(155deg, ${VO}12 0%, rgba(12,12,12,0.85) 60%)`, border: `1px solid ${VO}30`, borderRadius: 24, textAlign: 'center', boxShadow: `0 0 60px ${VO}15` }}
      >
        <div style={{ width: 64, height: 64, margin: '0 auto 20px', borderRadius: '50%', background: `linear-gradient(135deg, ${VO}, ${VO_LIGHT})`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 30px ${VO}50` }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h3 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 26, color: '#fff', marginBottom: 10 }}>
          ¡Mensaje recibido!
        </h3>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, maxWidth: 380, margin: '0 auto' }}>
          Ya nos llegó tu consulta. Te respondemos en menos de 24 horas. Si tenés urgencia, escribinos directo por WhatsApp.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.8 }}
      style={{ padding: 32, background: 'linear-gradient(155deg, rgba(20,20,20,0.7) 0%, rgba(10,10,10,0.85) 100%)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 28, textAlign: 'left', position: 'relative', overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.4)', backdropFilter: 'blur(20px)' }}
    >
      <div style={{ position: 'absolute', top: -100, right: -100, width: 300, height: 300, borderRadius: '50%', background: `radial-gradient(circle, ${VO}20, transparent 70%)`, filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -80, left: -80, width: 280, height: 280, borderRadius: '50%', background: `radial-gradient(circle, ${PURPLE}18, transparent 70%)`, filter: 'blur(60px)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 'clamp(20px,2.8vw,28px)', color: '#fff', letterSpacing: '-0.02em', marginBottom: 6 }}>
            Contanos tu proyecto
          </h3>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
            Respondemos en menos de 24 horas. Campos con <span style={{ color: VO }}>*</span> obligatorios.
          </p>
        </div>

        {/* Global form error */}
        <ValidationError errors={state.errors}
          style={{ display: 'block', fontSize: 12, color: '#FF6B6B', padding: '10px 14px', background: 'rgba(255,60,60,0.06)', border: '1px solid rgba(255,60,60,0.2)', borderRadius: 10, marginBottom: 18 }} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 16 }}>
          <Field label="Nombre" required fieldName="nombre" errors={state.errors}>
            <input type="text" name="nombre" required onFocus={onFocus} onBlur={onBlur} placeholder="Tu nombre" autoComplete="name" style={inputStyle} />
          </Field>
          <Field label="Email" required fieldName="email" errors={state.errors}>
            <input type="email" name="email" required onFocus={onFocus} onBlur={onBlur} placeholder="tu@email.com" autoComplete="email" style={inputStyle} />
          </Field>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 16 }}>
          <Field label="Teléfono / WhatsApp" fieldName="telefono" errors={state.errors}>
            <input type="tel" name="telefono" onFocus={onFocus} onBlur={onBlur} placeholder="+506 8xxx-xxxx" autoComplete="tel" style={inputStyle} />
          </Field>
          <Field label="Tipo de proyecto" fieldName="tipo" errors={state.errors}>
            <select name="tipo" onFocus={onFocus} onBlur={onBlur}
              style={{ ...inputStyle, appearance: 'none', backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'><path d='M1 1L6 6L11 1' stroke='${encodeURIComponent('rgba(255,255,255,0.5)')}' stroke-width='2' stroke-linecap='round' fill='none'/></svg>")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center', paddingRight: 36 }}>
              {PROJECT_TYPES.map((p) => <option key={p.v} value={p.label} style={{ background: '#111' }}>{p.label}</option>)}
            </select>
          </Field>
        </div>

        {/* Hidden budget field — value controlled by pill buttons */}
        <input type="hidden" name="presupuesto" value={budget} />

        <div style={{ marginBottom: 16 }}>
          <Field label="Presupuesto estimado">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {BUDGET_OPTIONS.map((b) => (
                <button type="button" key={b} onClick={() => setBudget(b)}
                  style={{ padding: '8px 14px', borderRadius: 50, fontSize: 12, fontWeight: 600, background: budget === b ? `${VO}20` : 'rgba(255,255,255,0.03)', border: `1px solid ${budget === b ? VO + '60' : 'rgba(255,255,255,0.08)'}`, color: budget === b ? VO : 'rgba(255,255,255,0.6)', cursor: 'pointer', transition: 'all 0.2s' }}>
                  {b}
                </button>
              ))}
            </div>
          </Field>
        </div>

        <div style={{ marginBottom: 24 }}>
          <Field label="Mensaje" required fieldName="mensaje" errors={state.errors}>
            <textarea name="mensaje" rows={5} required onFocus={onFocus} onBlur={onBlur} placeholder="Contanos: qué necesitás, plazos, ideas que tengas en mente..." style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }} />
          </Field>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', maxWidth: 280, lineHeight: 1.55 }}>
            Tu info no se comparte con nadie. Solo la usamos para responderte.
          </p>
          <motion.button
            type="submit"
            disabled={state.submitting}
            whileHover={{ scale: state.submitting ? 1 : 1.04, boxShadow: `0 0 50px ${VO}80` }}
            whileTap={{ scale: 0.97 }}
            style={{ padding: '14px 28px', borderRadius: 50, background: `linear-gradient(135deg, ${VO}, ${VO_LIGHT})`, color: '#fff', border: 'none', fontWeight: 700, fontSize: 14, cursor: state.submitting ? 'wait' : 'pointer', display: 'inline-flex', alignItems: 'center', gap: 10, boxShadow: `0 0 30px ${VO}40`, opacity: state.submitting ? 0.8 : 1 }}
          >
            {state.submitting ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: 'spin 1s linear infinite' }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                Enviando…
              </>
            ) : (
              <>
                Enviar mensaje
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </>
            )}
          </motion.button>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .fs-error { display: block; font-size: 11px; color: #FF6B6B; margin-top: 6px; }
      `}</style>
    </motion.form>
  );
}
