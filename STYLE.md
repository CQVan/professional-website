# Style guide

The visual language for this site. Anything visible — pages, components, empty
states, email templates if they ever exist — follows this file. If a change
needs a rule that isn't here, add the rule first, then use it.

The reference implementation is `components/sidebar.tsx` plus the tokens in
`app/globals.css`.

## The idea

A quiet editorial rail. One fixed left column of name, pages and links, and a
wide reading area for content. The design gets out of the way of the work:
no cards, no shadows, no color accents, no decorative chrome. Hierarchy is
carried by type size, weight and one muted gray. Restraint is the style.

If a page starts to feel decorated, remove something.

## Color

Tokens live in `app/globals.css`. Always use the token, never a raw hex, and
never a Tailwind palette color (`slate-500`, `zinc-800`, …).

| Token | Light | Dark | Use |
|---|---|---|---|
| `background` | `#fbfbfa` | `#121211` | Page surface |
| `foreground` | `#1b1b19` | `#ececea` | Body text, active nav, headings |
| `muted` | `#6b6b65` | `#8e8e88` | Secondary text, inactive nav, metadata |
| `hairline` | `#e6e6e1` | `#2a2a28` | 1px borders and dividers, nothing else |

Rules:

- Two text colors, `foreground` and `muted`. That is the whole palette.
- No accent color. A link is identified by position, weight, underline or
  context, not by hue.
- Dark mode is automatic via `prefers-color-scheme`. Any new token gets a dark
  value in the same edit.
- `muted` is for supporting text only. It is never used for body copy, and
  never on a surface other than `background`.
- Contrast floor: 4.5:1 for text below 18px. `muted` on `background` already
  sits near that line — do not lighten it.

## Type

One family: Geist Sans, loaded in `app/layout.tsx`. Geist Mono exists for code
samples only; it is never used for labels, numbers or nav.

Scale — four steps, no other sizes:

| Role | Class | Size | Weight | Tracking |
|---|---|---|---|---|
| Page heading (`h1`) | `text-2xl` | 24px | 600 | `tracking-tight` |
| Name / section heading | `text-base` | 16px | 600 | `tracking-tight` |
| Body and nav | `text-sm` | 14px | 400 (500 when active) | default |
| Secondary, role line, socials, metadata | `text-xs` | 12px | 400 | default |

Rules:

- Line length under 80 characters. The sidebar role line uses `max-w-[22ch]`
  because it is a subtitle, not a paragraph.
- Body copy: `leading-relaxed` at 12px, default leading at 14px and above.
- Never accent a single word in a heading with italic, color or weight. If a
  phrase matters, give it its own line or its own sentence.
- No all-caps labels, no letter-spaced eyebrows, no small mono data labels.
- Don't use pixel font sizes (`text-[15px]`). Use the scale.
- Headings are sentence case.

## Layout

Desktop is a two-column split: a 256px (`md:w-64`) sidebar that is
`sticky top-0 h-screen`, and a content area that fills the rest. Below `md`
the sidebar becomes a full-width header and the columns stack.

- Sidebar padding: `px-6 py-8` mobile, `md:px-8 md:py-12` desktop.
- Sidebar internal rhythm: 32px between blocks, 48px above the nav, socials
  pinned to the bottom with `md:mt-auto`.
- Content padding: `px-6 py-10` mobile, `md:px-12 md:py-16` desktop. Content is
  left-aligned and capped at a readable measure (`max-w-[65ch]`), never centered
  except for a deliberate single statement.
- Separation is a 1px `border-hairline` or whitespace, whichever is quieter.
  Prefer whitespace.
- Border radius: `rounded-sm` (2px) for interactive hit areas only. Content
  surfaces are square.
- No shadows, gradients, glass, or background tints. No cards wrapping content.

## Components

### Nav link

```tsx
className={`-mx-2 block rounded-sm px-2 py-1.5 text-sm transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-current ${
  isCurrent ? "font-medium text-foreground" : "text-muted hover:text-foreground"
}`}
aria-current={isCurrent ? "page" : undefined}
```

Active state is `foreground` plus medium weight. Inactive is `muted` and moves
to `foreground` on hover. No underline, dot, pill or left bar.

### External link

Same colors as nav, `text-xs`, `target="_blank"` with
`rel="noopener noreferrer"`. Label is the destination name (“GitHub”,
“LinkedIn”), never “here” or an icon alone.

### Button

There is no button style yet. When one is needed: `foreground` fill,
`background` text, `rounded-sm`, `text-sm`, `px-4 py-2`, no shadow. Secondary
buttons are a 1px `hairline` border with `foreground` text. Never invent a
third color for either.

### Divider

1px `border-hairline` with 24–32px of air on both sides. A divider separates
two different kinds of content; it does not decorate a heading.

## Motion

- 150ms `transition-colors` for hover and focus only. Nothing else animates.
- No entrance animations, staggered reveals, parallax or scroll effects.
- Page-level motion belongs to the content itself (a demo, a live diagram),
  not to the chrome.
- Every transition must respect `prefers-reduced-motion`; color changes are
  safe, movement is not.

## Accessibility

- Visible focus on every interactive element: `focus-visible:outline-2` with
  `outline-offset-2` (4px for text links in open space).
- Hit areas at least 32px tall. `py-1.5` on 14px text meets this.
- One `h1` per page. Headings descend in order.
- Links say what they open. “Read the case study”, not “Learn more”.
- Color is never the only signal. The active nav item also carries
  `aria-current="page"`.
- Test at 320px width and at 200% browser zoom.

## Copy

- Sentence case everywhere except proper nouns (GitHub, LinkedIn).
- Active voice, plain verbs: “Save changes”, “View projects”.
- Name the thing the way a visitor understands it, not how it is built.
- One job per string. A subtitle says what you do; a nav label says where it
  goes.
- No filler. Delete “passionate”, “leverage”, “seamlessly”, “in today's world”.

## Checklist for any visual change

1. Only tokens and the type scale — no raw hex, no off-scale sizes.
2. Nothing added to the layout that doesn't carry information.
3. Focus ring present; mobile at 320px still works.
4. Dark mode still reads.
5. Copy passes the rules above.
6. Remove one accessory before you're done.
