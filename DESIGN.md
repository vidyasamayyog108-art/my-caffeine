# Design Brief

## Direction

Vivah Setu — Premium matrimony for Digambar Jain community, balancing luxury with cultural reverence through warm, heritage-inspired aesthetics.

## Tone

Refined luxury rooted in Jain heritage. Warm, welcoming, premium—not corporate. Saffron + gold + maroon palette evokes sacred traditions and auspicious celebrations.

## Differentiation

Jain-specific profile fields (sub-sect, Gotra, Paryushan, temple affiliation) combined with prominent ₹499 membership visibility and culturally-rooted visual language (Ahimsa hand, swastika symbolism as subtle background textures).

## Color Palette

| Token      | OKLCH            | Role                                  |
|------------|------------------|---------------------------------------|
| background | 0.98 0.01 70     | Warm cream, welcoming primary surface |
| foreground | 0.22 0.05 30     | Deep warm brown, readable text        |
| primary    | 0.65 0.22 60     | Saffron orange, CTAs & accents        |
| accent     | 0.75 0.15 80     | Gold, premium highlighting            |
| secondary  | 0.35 0.15 25     | Deep maroon, trust & tradition        |
| muted      | 0.96 0.01 70     | Light cream, subtle contrast          |
| border     | 0.92 0.02 70     | Soft beige, minimal demarcation       |
| success    | 0.65 0.18 145    | Warm green for affirmative states     |

## Typography

- Display: Fraunces (serif, elegant, heritage-rooted) — hero headings, section titles
- Body: General Sans (clean, modern, readable) — paragraphs, labels, UI text
- Scale: Hero `text-5xl md:text-7xl font-bold tracking-tight`, h2 `text-3xl md:text-4xl font-bold`, label `text-xs font-semibold tracking-widest uppercase`, body `text-base leading-relaxed`

## Elevation & Depth

Subtle, warm-tinted shadows (primary/accent at 8% opacity) for premium restraint. Cards elevated with minimal shadow; depths created through background alternation rather than aggressive drop shadows.

## Structural Zones

| Zone    | Background           | Border              | Notes                                     |
|---------|----------------------|---------------------|-------------------------------------------|
| Header  | bg-background        | border-b border-primary | Saffron accent line, logo + nav          |
| Hero    | bg-background        | —                   | Warm cream with saffron CTA, gold ₹499   |
| Content | bg-background/muted  | —                   | Alternate sections for rhythm             |
| Cards   | bg-card              | border-2 border-accent | Subtle gold border, minimal shadow       |
| Footer  | bg-secondary/dark    | border-t border-accent | Maroon background, cream text + Jain symbol |

## Spacing & Rhythm

Section gaps `gap-16 md:gap-20`, content grouping `space-y-4 md:space-y-6`, micro-spacing `p-4 md:p-6`. Alternating background colors create visual rhythm without jarring transitions.

## Component Patterns

- Buttons: Saffron primary (`bg-primary text-primary-foreground`), gold accent (`bg-accent`), rounded `rounded-lg`, hover state lifts shadow
- Cards: Cream background with 2px gold border, rounded `rounded-lg`, subtle shadow on hover
- Badges: `.text-premium` utility for ₹499 membership badge (gold text, bold, uppercase)
- Section labels: Uppercase, semibold, warm brown, tight tracking

## Motion

- Entrance: Cards fade-in on scroll with 300ms cubic-bezier
- Hover: Buttons lift shadow, cards gain border glow, 200ms smooth transition
- Decorative: Subtle Ahimsa hand / swastika watermark in background (fixed opacity, non-interactive)

## Constraints

- No harsh blacks or pure whites — use warm cream/brown
- All text on primary must pass AA+
- Jain symbols (Ahimsa, swastika) only as background textures, never as primary UI elements
- Typography hierarchy must create visual distinction without relying on color alone
- No animated gradients — static premium aesthetic

## Signature Detail

Subtle Jain Ahimsa hand or swastika watermark (background texture, 3–5% opacity) placed in hero footer and footer zones as cultural anchor—visible but not intrusive, reinforcing community identity without overwhelming the interface.
