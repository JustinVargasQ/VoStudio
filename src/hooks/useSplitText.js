import { useMemo } from 'react';

/**
 * Lightweight SplitText alternative — splits text into spans by char/word/line.
 * Returns ready-to-render JSX so GSAP can target the spans by ref.
 */
export function splitChars(text, className = 'split-char') {
  return text.split('').map((c, i) => (
    <span key={i} className={className} style={{ display: 'inline-block', whiteSpace: 'pre' }}>
      {c === ' ' ? ' ' : c}
    </span>
  ));
}

export function splitWords(text, className = 'split-word') {
  return text.split(' ').map((w, i) => (
    <span key={i} className={className} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}>
      <span style={{ display: 'inline-block' }}>{w}</span>
      {i < text.split(' ').length - 1 ? ' ' : ''}
    </span>
  ));
}

/**
 * Split a string into lines wrapped in spans with overflow:hidden so the inner span can slide up.
 * Returns { wrapperClass, innerClass, content }.
 */
export function splitLines(lines = [], wrapperClass = 'split-line', innerClass = 'split-line-inner') {
  return lines.map((line, i) => (
    <span key={i} className={wrapperClass} style={{ display: 'block', overflow: 'hidden', lineHeight: 1.05 }}>
      <span className={innerClass} style={{ display: 'inline-block', willChange: 'transform' }}>{line}</span>
    </span>
  ));
}

export function useSplitChars(text) {
  return useMemo(() => splitChars(text), [text]);
}
