/* Real brand-style SVG logos. All sized to a 24×24 viewBox. */

export const TECH = {
  React: {
    color: '#61DAFB',
    Logo: ({ size = 22 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="2" fill="#61DAFB" />
        <g fill="none" stroke="#61DAFB" strokeWidth="1.2">
          <ellipse cx="12" cy="12" rx="10" ry="4" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
        </g>
      </svg>
    ),
  },

  'Next.js': {
    color: '#0A0A0A',
    Logo: ({ size = 22 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="11" fill="#0A0A0A" />
        <path d="M9.5 7.5v9M9.5 7.5l7 9" stroke="#fff" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        <path d="M15.2 7.5v6.5" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },

  TypeScript: {
    color: '#3178C6',
    Logo: ({ size = 22 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24">
        <rect width="24" height="24" rx="2" fill="#3178C6" />
        <path d="M9 12v1.5h2V20h1.7v-6.5h2V12H9z" fill="#fff" />
        <path d="M14.5 17.6c.4.6 1.2 1 2.2 1 1.4 0 2.4-.7 2.4-1.9 0-1.1-.6-1.6-2-2-1-.3-1.2-.5-1.2-.9 0-.3.3-.5.7-.5s.7.2 1 .6l1.2-.8c-.5-.8-1.2-1.1-2.2-1.1-1.3 0-2.2.8-2.2 1.9 0 1 .6 1.6 2 2 1 .3 1.3.5 1.3 1 0 .4-.3.6-.9.6-.6 0-1-.3-1.3-.8l-1 .9z" fill="#fff" />
      </svg>
    ),
  },

  'Node.js': {
    color: '#5FA04E',
    Logo: ({ size = 22 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24">
        <path d="M12 1L2 6.5v11L12 23l10-5.5v-11L12 1z" fill="#5FA04E" />
        <path d="M12 17.8c-.3 0-.5-.1-.7-.2l-2.2-1.3c-.3-.2-.2-.2.1-.3.4-.1.5-.2 1-.4.1 0 .1 0 .2 0l1.7 1c.1 0 .1 0 .2 0l6.6-3.8c.1 0 .1-.1.1-.2V5.5c0-.1 0-.1-.1-.2L11.4 1.5c-.1 0-.1 0-.2 0L4.7 5.3c-.1 0-.1.1-.1.2v7.6c0 .1 0 .1.1.2l1.8 1c1 .5 1.6-.1 1.6-.7V6c0-.1.1-.2.2-.2h.8c.1 0 .2.1.2.2v7.6c0 1.3-.7 2.1-2 2.1-.4 0-.7 0-1.6-.5L4 14.3c-.4-.2-.6-.7-.6-1.1V5.5c0-.4.2-.9.6-1.1L11 .6c.4-.2.9-.2 1.3 0l6.6 3.8c.4.2.6.7.6 1.1v7.6c0 .4-.2.9-.6 1.1l-6.6 3.8c-.1.1-.4.2-.6.2z" fill="#fff" opacity="0.95" />
      </svg>
    ),
  },

  MongoDB: {
    color: '#00684A',
    Logo: ({ size = 22 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24">
        <path d="M12 1.5c-.2 1.6-1.2 3-2.4 4-3.4 2.8-4.6 7.5-3.3 11.5 1 3.1 3.6 5.3 5.5 5.5l.1-.2c0-2.4-.7-4.7-.8-7.1 0-2-.4-3.9-.1-5.8.3-2.6 1.4-5.3 1-7.9z" fill="#00684A" />
        <path d="M12 1.5c1.1 2.1 2.9 4 4.3 6 3.5 5 2.9 11.8-1.5 16-.7.7-1.5 1.2-2.3 1.7-.1.1-.2.1-.3 0l.2-.5c.2-.6.3-1.2.4-1.8.4-2.7.2-5.5-.5-8.1-.6-1.8-1.4-3.5-1.6-5.4-.1-2.5.5-5 1.3-7.3v-.5z" fill="#00ED64" />
        <path d="M11.9 22.5c-.5-.1-1-.2-1.5-.3 1.1.8 2.3.9 3 .8.1-.1.2-.3.2-.5-.6-.1-1.1-.1-1.7 0z" fill="#00684A" />
      </svg>
    ),
  },

  PostgreSQL: {
    color: '#336791',
    Logo: ({ size = 22 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="11" fill="#336791" />
        <path d="M17 7c-1.5-1-3.5-1.3-5-1-2 .3-3 1-3.5 1.5-1.5 1.5-1.5 4 0 6.5.5.8 1 1.5 1 2.5 0 .5 0 1-.3 1.3-.1.2 0 .4.2.4.3 0 .5-.2.7-.5.3-.5.5-1.2.5-2 0-.7-.3-1.4-.8-2.2-1.2-2-1.2-4 0-5.2.5-.5 1.5-1 3-1.2 1.3-.2 3 .1 4.2 1z" fill="none" stroke="#fff" strokeWidth="0.7" />
        <path d="M14 8c-1 0-1.8.5-2 1.5-.2 1 0 2 .5 3.5.5 1.3.8 2.5.5 3.5" fill="none" stroke="#fff" strokeWidth="0.7" strokeLinecap="round" />
        <circle cx="15.5" cy="9" r=".6" fill="#fff" />
        <circle cx="12" cy="9" r=".4" fill="#fff" />
      </svg>
    ),
  },

  Tailwind: {
    color: '#06B6D4',
    Logo: ({ size = 22 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24">
        <path d="M12 4c-3 0-4.8 1.5-5.5 4.5 1-1.5 2.3-2 3.7-1.7.8.2 1.4.8 2 1.5 1.1 1.1 2.3 2.3 5 2.3 3 0 4.8-1.5 5.5-4.5-1 1.5-2.3 2-3.7 1.7-.8-.2-1.4-.8-2-1.5C15.9 5.2 14.7 4 12 4zM6.5 12C3.5 12 1.7 13.5 1 16.5c1-1.5 2.3-2 3.7-1.7.8.2 1.4.8 2 1.5 1.1 1.1 2.3 2.3 5 2.3 3 0 4.8-1.5 5.5-4.5-1 1.5-2.3 2-3.7 1.7-.8-.2-1.4-.8-2-1.5-1.1-1.1-2.3-2.3-5-2.3z" fill="#06B6D4" />
      </svg>
    ),
  },

  Vite: {
    color: '#41D1FF',
    Logo: ({ size = 22 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24">
        <defs>
          <linearGradient id="viteG1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#41D1FF" />
            <stop offset="100%" stopColor="#BD34FE" />
          </linearGradient>
          <linearGradient id="viteG2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFEA83" />
            <stop offset="100%" stopColor="#FFDD35" />
          </linearGradient>
        </defs>
        <path d="M22.4 4.5L12.7 22c-.2.4-.8.4-1 0L1.6 4.5c-.2-.4.1-.9.6-.8l9.7 1.7c.1 0 .2 0 .3 0l9.6-1.7c.5-.1.8.4.6.8z" fill="url(#viteG1)" />
        <path d="M16.8 1.4L9.7 2.8c-.1 0-.2.1-.2.3l-.4 7.5c0 .2.1.3.3.3l2-.5c.2 0 .3.1.3.3l-.6 2.9c0 .2.1.4.3.3l1.2-.4c.2-.1.4.1.3.3l-1 4.7c-.1.3.4.5.5.2l.1-.1L17.2 8c.1-.2-.1-.4-.3-.4l-2 .4c-.2 0-.3-.1-.3-.3l1.3-4.6c.1-.2-.1-.4-.4-.4l-.7.7z" fill="url(#viteG2)" />
      </svg>
    ),
  },

  'React Native': {
    color: '#61DAFB',
    Logo: ({ size = 22 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="2.2" fill="#61DAFB" />
        <g fill="none" stroke="#61DAFB" strokeWidth="1.3">
          <ellipse cx="12" cy="12" rx="10" ry="4" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
        </g>
      </svg>
    ),
  },

  Figma: {
    color: '#F24E1E',
    Logo: ({ size = 22 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24">
        <path d="M8.5 24c2.5 0 4.5-2 4.5-4.5V15H8.5C6 15 4 17 4 19.5S6 24 8.5 24z" fill="#0ACF83" />
        <path d="M4 12c0-2.5 2-4.5 4.5-4.5H13V12 + 4.5H8.5C6 16.5 4 14.5 4 12z" fill="#A259FF" />
        <path d="M4 4.5C4 2 6 0 8.5 0H13v9H8.5C6 9 4 7 4 4.5z" fill="#F24E1E" />
        <path d="M13 0h4.5C20 0 22 2 22 4.5S20 9 17.5 9H13V0z" fill="#FF7262" />
        <path d="M22 12c0 2.5-2 4.5-4.5 4.5S13 14.5 13 12s2-4.5 4.5-4.5S22 9.5 22 12z" fill="#1ABCFE" />
      </svg>
    ),
  },

  Cloudinary: {
    color: '#3448C5',
    Logo: ({ size = 22 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24">
        <path d="M19.5 11.5c-.2-2.8-2.5-5-5.3-5-2.4 0-4.4 1.5-5.1 3.7-.4-.2-.9-.3-1.4-.3-2 0-3.7 1.6-3.7 3.7 0 .3 0 .6.1.9C2.6 15 1.5 16.4 1.5 18c0 2 1.7 3.7 3.7 3.7h13.5c2 0 3.7-1.7 3.7-3.7 0-3-2-5.7-2.9-6.5z" fill="#3448C5" />
        <path d="M11 13l-1.8 1.8h1.3v2.4h1V14.8h1.3L11 13z" fill="#fff" transform="rotate(180 11 15)" />
      </svg>
    ),
  },

  Express: {
    color: '#0A0A0A',
    Logo: ({ size = 22 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24">
        <rect width="24" height="24" rx="3" fill="#0A0A0A" />
        <text x="12" y="16" textAnchor="middle" fontFamily="'Inter', sans-serif" fontSize="10" fontWeight="700" fill="#fff" letterSpacing="-0.5">ex</text>
      </svg>
    ),
  },
};
