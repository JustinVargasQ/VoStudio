import { Component } from 'react';
import { TEXT, TEXT_S, BORDER, BG, F_DISPLAY } from '../theme';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('[VO Studio] Error atrapado:', error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div style={{
        minHeight: '100vh', background: BG,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 32, textAlign: 'center', flexDirection: 'column', gap: 24,
      }}>
        <h1 style={{ fontFamily: F_DISPLAY, fontSize: 'clamp(40px, 6vw, 64px)', color: TEXT, letterSpacing: '-0.02em', lineHeight: 1.05 }}>
          Algo salió mal.
        </h1>
        <p style={{ fontSize: 16, color: TEXT_S, maxWidth: 440, lineHeight: 1.6 }}>
          Ocurrió un error inesperado. Si el problema persiste, escribinos por WhatsApp y lo resolvemos.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginTop: 8 }}>
          <button
            onClick={() => window.location.reload()}
            style={{ padding: '13px 24px', background: TEXT, color: '#fff', fontWeight: 600, fontSize: 13 }}
          >
            Recargar página
          </button>
          <a
            href="https://wa.me/50686737114?text=Hola! Tuve un error en vostudio.cr"
            target="_blank" rel="noopener noreferrer"
            style={{ padding: '13px 24px', border: `1px solid ${BORDER}`, color: TEXT, fontWeight: 600, fontSize: 13 }}
          >
            Reportar por WhatsApp
          </a>
        </div>
        {import.meta.env.DEV && this.state.error && (
          <pre style={{ fontSize: 11, color: '#B91C1C', maxWidth: 600, overflow: 'auto', textAlign: 'left', padding: 16, background: '#FEF2F2', border: '1px solid #FECACA', marginTop: 16 }}>
            {this.state.error.toString()}
          </pre>
        )}
      </div>
    );
  }
}
