<!--
SYNC IMPACT REPORT
==================
Version change:   (none) → 1.0.0  (initial ratification)
Modified principles: n/a — first version
Added sections:
  - Core Principles (I–V)
  - Technology Constraints
  - Development Workflow
  - Governance
Removed sections: n/a
Templates requiring updates:
  - .specify/templates/plan-template.md  ✅ Constitution Check section is generic; gates defined per-plan
  - .specify/templates/spec-template.md  ✅ no constitution-specific mandatory sections to propagate
  - .specify/templates/tasks-template.md ✅ task types align with principles (no TDD mandate here)
Deferred items: none
-->

# VOStudio Constitution

## Core Principles

### I. Component Isolation

Every UI section MUST be a self-contained React component under `src/components/`.
Components MUST NOT share mutable state with siblings — data flows down via props,
events flow up via callbacks. A component added or removed MUST NOT break any other
section of the page.

**Rationale**: The site grows section by section (Services, Pricing, Projects, etc.).
Isolation lets each section be developed, tested and replaced independently without
cascading breakage.

### II. Content-Driven Architecture

All user-facing copy, prices, service descriptions, project data and team information
MUST live in `src/data/content.js` and be consumed via `getContent(locale)`.
Components MUST NOT hardcode Spanish or English strings inline.
Bilingual support (ES / EN) is non-negotiable — every content addition MUST supply
both locale keys.

**Rationale**: VOStudio serves clients in Costa Rica and abroad. Mixing locale strings
into components makes translation error-prone and couples content to UI.

### III. Design System Fidelity

All colors, gradients, font stacks and layout constants MUST be imported from
`src/theme.js`. No component MAY introduce a raw hex, rgba, or font-family string
that is not already exported from the theme file. New visual tokens MUST be added to
`src/theme.js` first, then consumed by components.

**Rationale**: The "Midnight Signal — Cyan/Pink/Coral" palette (`#06B6D4` primary,
`#FF5C9A` secondary, `#040C14` background) is the brand. Ad-hoc color values
fragment the visual identity and make palette updates a find-and-replace nightmare.

### IV. Performance-First Delivery

The site MUST maintain a Lighthouse Performance score ≥ 90 on mobile.
Images MUST be served via Cloudinary or Vercel's CDN — no unoptimized local images
in `public/` above 200 KB. Animations using Framer Motion MUST respect
`prefers-reduced-motion`. Vercel Speed Insights and Analytics are the monitoring
baseline and MUST remain wired in `App.jsx`.

**Rationale**: A slow studio site is a contradiction. Performance is a deliverable
standard for clients and MUST be demonstrated on the studio's own product.

### V. Mobile-First Responsive

All components MUST be designed and reviewed at 320 px before any wider breakpoint.
Layouts MUST remain usable from 320 px to 2560 px. Touch targets MUST be ≥ 44 px.
Horizontal scroll at any viewport width is a blocking defect.

**Rationale**: The majority of prospective clients discover VOStudio on mobile.
A broken mobile layout directly costs leads.

## Technology Constraints

The approved stack is fixed for this site. Additions require explicit team agreement
and a documented justification committed alongside the change.

| Layer        | Locked choices                                      |
|--------------|-----------------------------------------------------|
| UI framework | React 18 + Vite                                     |
| Styling      | Tailwind CSS + inline styles via `src/theme.js`     |
| Animation    | Framer Motion (+ GSAP where scroll precision needed)|
| Deploy       | Vercel (Analytics + Speed Insights included)        |
| Design       | Figma — prototype approved before implementation    |
| i18n         | Custom bilingual object in `src/data/content.js`    |

No new runtime dependency MAY be added without team discussion. Prefer composing
with existing stack before introducing a new library.

## Development Workflow

1. **Design-first**: UI changes MUST be approved in Figma or shared mockup before
   any code is written.
2. **Weekly demos**: Active feature work is demoed to the team every week at
   whatever stage it is — no "I'll show it when it's done."
3. **Staging before merge**: All changes deploy to a Vercel preview URL for review
   before merging to `main`.
4. **Post-launch window**: After every production deploy, the site MUST be manually
   spot-checked on mobile and desktop before the session ends.

## Governance

This constitution is the single source of truth for VOStudio's development standards.
It supersedes any verbal agreement, prior convention, or individual preference.

**Amendment procedure**:
- Either team member may propose an amendment in writing (PR description or
  shared doc).
- Both team members MUST review and approve before merging.
- Constitution version is bumped according to semantic versioning:
  - MAJOR — a principle is removed or fundamentally redefined.
  - MINOR — a new principle or section is added.
  - PATCH — wording clarified, typo fixed, non-semantic refinement.
- The commit message MUST reference the new version:
  `docs: amend constitution to vX.Y.Z (<summary>)`

**Compliance**: Every PR MUST be checked against the Constitution Check gate in the
implementation plan before merge. Violations require documented justification in the
Complexity Tracking table of the relevant plan.

**Version**: 1.0.0 | **Ratified**: 2026-05-24 | **Last Amended**: 2026-05-24
