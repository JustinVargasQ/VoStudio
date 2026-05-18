import { Component } from 'react';
import { VO, VO_LIGHT } from '../data/content';

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
        minHeight: '100vh', background: '#050505',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24, textAlign: 'center', flexDirection: 'column', gap: 24,
      }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%',
          background: `linear-gradient(135deg, ${VO}, ${VO_LIGHT})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 0 40px ${VO}50`,
          fontSize: 32,
        }}>
          ⚡
        </div>
        <h1 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 32, color: '#fff', letterSpacing: '-0.02em', marginBottom: 8 }}>
          Algo salió mal
        </h1>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', maxWidth: 440, lineHeight: 1.7 }}>
          Ocurrió un error inesperado. Si el problema persiste, escribinos por WhatsApp y lo resolvemos.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '12px 24px', borderRadius: 50, border: 'none',
              background: `linear-gradient(135deg, ${VO}, ${VO_LIGHT})`,
              color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer',
            }}
          >
            Recargar página
          </button>
          <a
            href="https://wa.me/50686737114?text=Hola! Tuve un error en vostudio.cr"
            target="_blank" rel="noopener noreferrer"
            style={{
              padding: '12px 24px', borderRadius: 50,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#fff', fontWeight: 700, fontSize: 13, textDecoration: 'none',
            }}
          >
            Reportar por WhatsApp
          </a>
        </div>
        {import.meta.env.DEV && this.state.error && (
          <pre style={{ fontSize: 11, color: 'rgba(255,80,80,0.8)', maxWidth: 600, overflow: 'auto', textAlign: 'left', padding: 16, background: 'rgba(255,0,0,0.05)', borderRadius: 12, border: '1px solid rgba(255,0,0,0.1)' }}>
            {this.state.error.toString()}
          </pre>
        )}
      </div>
    );
  }
}
