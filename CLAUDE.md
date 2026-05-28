# VO Studio — Contexto del proyecto

## Quiénes somos
**VO Studio** es una agencia de diseño web y producción digital con sede en Costa Rica, fundada por **Justin Vargas Quirós** y su socio. Hacemos sitios web, e-commerce, apps y tours virtuales 360° para clientes en LATAM. Este repo es nuestro propio sitio portfolio/landing.

## Stack técnico
- **Framework:** React 19 + Vite
- **Deploy:** Vercel (`https://vostudio.vercel.app`)
- **Animaciones:** Framer Motion (UI), GSAP (scroll), Lenis (smooth scroll)
- **3D / 360°:** @react-three/fiber + @react-three/drei + three.js
- **Formularios:** Formspree
- **Analytics:** GA4 (`G-F5E7YQ0DD2`) + Plausible + Vercel Analytics
- **Icons:** lucide-react
- **i18n:** sistema propio en `src/i18n/strings.js` (ES/EN, flat key-value)
- **Estilos:** CSS-in-JS inline + CSS variables (no Tailwind, no CSS modules)

## Estructura de carpetas
```
src/
  App.jsx              — orden de secciones de la landing
  theme.js             — design system completo (colores, fuentes, layout)
  index.css            — CSS variables dark/light + animaciones globales
  components/          — un archivo por componente
  context/AppContext   — locale, theme, curtain transition
  i18n/strings.js      — todas las traducciones ES + EN
  data/content.js      — datos de pricing, proyectos, etc.
  assets/              — imágenes estáticas
public/
  panoramas/           — fotos equirectangulares 2048×1024 para el tour 360°
```

## Orden de secciones (App.jsx)
`Hero → Marquee → Showcase360 → Services → Pricing → Projects → Testimonials → Process → CTABanner → Contact → FAQ → Footer`

## Design System v7 "Pink Lilac Noir"
Todos los colores vienen de `src/theme.js`. **Nunca usar amarillo, naranja ni violeta neón.**

| Token | Hex | Uso |
|-------|-----|-----|
| `A` | `#FF5C9A` | Acento principal (rosa fuerte) |
| `A2` | `#B79CFF` | Acento secundario (lila suave) |
| `A_D` | `#E03877` | Rosa oscuro (pressed/hover) |
| `C_CORAL` | `#FF6A63` | Pop / errores |
| `C_BG_DEEP` | `#06030D` | Negro profundo (fondo dark) |

**Fuentes:**
- `F_DISPLAY` → Instrument Serif (títulos grandes, italic)
- `F_MONO` → JetBrains Mono (badges, datos, código)
- `F_BODY` → Inter (cuerpo de texto)

**Gradiente firma:** `linear-gradient(145deg, #06030D, #1B1030, #FF6A63, #FF5C9A, #B79CFF, #06030D)`

## Tour 360° (componente estrella)
- **Componente:** `src/components/Panorama360.jsx`
- **Showcase:** `src/components/Showcase360.jsx` (sección en landing)
- 4 escenas: `lobby`, `jardin`, `mirador`, `playa`
- Fotos reales de Cape Florida (Key Biscayne, Miami) servidas desde `public/panoramas/`
- Coordenadas de hotspots en sistema esférico: `lon` (0=frente, 90=der, -90=izq, 180=atrás), `lat` (0=horizonte, positivo=arriba)
- Conversión: `lonLatToXYZ(lon, lat, r=9.5)` → posición 3D en esfera

## i18n
```js
// Usar siempre así:
const { t, locale } = useApp();
t('clave.anidada') // devuelve string en ES o EN según locale activo
```
Agregar siempre ambas versiones (es + en) en `src/i18n/strings.js`.

## Convenciones de código
- Estilos **siempre inline** con objetos JS (no clases CSS salvo media queries con `<style>`)
- Media queries responsivas con `className` + `<style>` scoped dentro del componente
- Sin comentarios salvo que el WHY no sea obvio
- Sin abstracciones prematuras — preferir código explícito repetido a helpers innecesarios
- `useCallback` para handlers que se pasan como props, `useMemo` para cálculos 3D

## Comandos útiles
```bash
npm run dev      # dev server en localhost:5173
npm run build    # build de producción
npm run preview  # previsualizar build
git push         # despliega automático en Vercel vía main branch
```

## SEO / Analytics
- Sitemap en `public/sitemap.xml` — URLs apuntan a `vostudio.vercel.app`
- `robots.txt` en `public/`
- GA4 instalado en `index.html` + Plausible via script externo
- Google Search Console conectado

## Notas importantes
- El socio de Justin no le gusta el naranja/amarillo — revisar siempre que no aparezcan
- Dominio: `www.vostudiocr.com` (comprado en Namecheap, apuntado a Vercel)
- Las fotos del tour 360° son demo (Cape Florida) — en producción se reemplazarán por fotos del cliente
