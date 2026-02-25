---
name: frontend-design
description: Design thinking and decision-making for web UI. Use when designing components, layouts, color schemes, typography, or creating aesthetic interfaces. Teaches principles, not fixed values.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Frontend Design System

> **Philosophy:** Every pixel has purpose. Restraint is luxury. User psychology drives decisions.
> **Core Principle:** THINK, don't memorize. ASK, don't assume.

---

## 🎯 Selective Reading Rule (MANDATORY)

**Read REQUIRED files always, OPTIONAL only when needed:**

| File                                         | Status          | When to Read                      |
| -------------------------------------------- | --------------- | --------------------------------- |
| [ux-psychology.md](ux-psychology.md)         | 🔴 **REQUIRED** | Always read first!                |
| [color-system.md](color-system.md)           | ⚪ Optional     | Color/palette decisions           |
| [typography-system.md](typography-system.md) | ⚪ Optional     | Font selection/pairing            |
| [visual-effects.md](visual-effects.md)       | ⚪ Optional     | Glassmorphism, shadows, gradients |
| [animation-guide.md](animation-guide.md)     | ⚪ Optional     | Animation needed                  |
| [motion-graphics.md](motion-graphics.md)     | ⚪ Optional     | Lottie, GSAP, 3D                  |
| [decision-trees.md](decision-trees.md)       | ⚪ Optional     | Context templates                 |

> 🔴 **ux-psychology.md = ALWAYS READ. Others = only if relevant.**

---

## 🔧 Runtime Scripts

**Execute these for audits (don't read, just run):**

| Script                | Purpose                             | Usage                                       |
| --------------------- | ----------------------------------- | ------------------------------------------- |
| `scripts/ux_audit.py` | UX Psychology & Accessibility Audit | `python scripts/ux_audit.py <project_path>` |

---

## ⚠️ CRITICAL: ASK BEFORE ASSUMING (MANDATORY)

> **STOP! If the user's request is open-ended, DO NOT default to your favorites.**

### When User Prompt is Vague, ASK:

**Color not specified?** Ask:

> "What color palette do you prefer? (blue/green/orange/neutral/other?)"

**Style not specified?** Ask:

> "What style are you going for? (minimal/bold/retro/futuristic/organic?)"

**Layout not specified?** Ask:

> "Do you have a layout preference? (single column/grid/asymmetric/full-width?)"

### ⛔ DEFAULT TENDENCIES TO AVOID (ANTI-SAFE HARBOR):

| AI Default Tendency             | Why It's Bad                | Think Instead                                       |
| ------------------------------- | --------------------------- | --------------------------------------------------- |
| **Bento Grids (Modern Cliché)** | Used in every AI design     | Why does this content NEED a grid?                  |
| **Hero Split (Left/Right)**     | Predictable & Boring        | How about Massive Typography or Vertical Narrative? |
| **Mesh/Aurora Gradients**       | The "new" lazy background   | What's a radical color pairing?                     |
| **Glassmorphism**               | AI's idea of "premium"      | How about solid, high-contrast flat?                |
| **Deep Cyan / Fintech Blue**    | Safe harbor from purple ban | Why not Red, Black, or Neon Green?                  |
| **"Orchestrate / Empower"**     | AI-generated copywriting    | How would a human say this?                         |
| Dark background + neon glow     | Overused, "AI look"         | What does the BRAND actually need?                  |
| **Rounded everything**          | Generic/Safe                | Where can I use sharp, brutalist edges?             |

> 🔴 **"Every 'safe' structure you choose brings you one step closer to a generic template. TAKE RISKS."**

---

## 1. Constraint Analysis (ALWAYS FIRST)

Before any design work, ANSWER THESE or ASK USER:

| Constraint   | Question              | Why It Matters              |
| ------------ | --------------------- | --------------------------- |
| **Timeline** | How much time?        | Determines complexity       |
| **Content**  | Ready or placeholder? | Affects layout flexibility  |
| **Brand**    | Existing guidelines?  | May dictate colors/fonts    |
| **Tech**     | What stack?           | Affects capabilities        |
| **Audience** | Who exactly?          | Drives all visual decisions |

### Audience → Design Approach

| Audience        | Think About                         |
| --------------- | ----------------------------------- |
| **Gen Z**       | Bold, fast, mobile-first, authentic |
| **Millennials** | Clean, minimal, value-driven        |
| **Gen X**       | Familiar, trustworthy, clear        |
| **Boomers**     | Readable, high contrast, simple     |
| **B2B**         | Professional, data-focused, trust   |
| **Luxury**      | Restrained elegance, whitespace     |

---

## 2. UX Psychology Principles

### Core Laws (Internalize These)

| Law                 | Principle                         | Application                               |
| ------------------- | --------------------------------- | ----------------------------------------- |
| **Hick's Law**      | More choices = slower decisions   | Limit options, use progressive disclosure |
| **Fitts' Law**      | Bigger + closer = easier to click | Size CTAs appropriately                   |
| **Miller's Law**    | ~7 items in working memory        | Chunk content into groups                 |
| **Von Restorff**    | Different = memorable             | Make CTAs visually distinct               |
| **Serial Position** | First/last remembered most        | Key info at start/end                     |

### Emotional Design Levels

```
VISCERAL (instant)  → First impression: colors, imagery, overall feel
BEHAVIORAL (use)    → Using it: speed, feedback, efficiency
REFLECTIVE (memory) → After: "I like what this says about me"
```

### Trust Building

- Security indicators on sensitive actions
- Social proof where relevant
- Clear contact/support access
- Consistent, professional design
- Transparent policies

---

## 3. Layout Principles

### Golden Ratio (φ = 1.618)

```
Use for proportional harmony:
├── Content : Sidebar = roughly 62% : 38%
├── Each heading size = previous × 1.618 (for dramatic scale)
├── Spacing can follow: sm → md → lg (each × 1.618)
```

### 8-Point Grid Concept

```
All spacing and sizing in multiples of 8:
├── Tight: 4px (half-step for micro)
├── Small: 8px
├── Medium: 16px
├── Large: 24px, 32px
├── XL: 48px, 64px, 80px
└── Adjust based on content density
```

### Key Sizing Principles

| Element           | Consideration                        |
| ----------------- | ------------------------------------ |
| **Touch targets** | Minimum comfortable tap size         |
| **Buttons**       | Height based on importance hierarchy |
| **Inputs**        | Match button height for alignment    |
| **Cards**         | Consistent padding, breathable       |
| **Reading width** | 45-75 characters optimal             |

---

## 4. Color Principles

### 60-30-10 Rule

```
60% → Primary/Background (calm, neutral base)
30% → Secondary (supporting areas)
10% → Accent (CTAs, highlights, attention)
```

### Color Psychology (For Decision Making)

| If You Need...     | Consider Hues            | Avoid                 |
| ------------------ | ------------------------ | --------------------- |
| Trust, calm        | Blue family              | Aggressive reds       |
| Growth, nature     | Green family             | Industrial grays      |
| Energy, urgency    | Orange, red              | Passive blues         |
| Luxury, creativity | Deep Teal, Gold, Emerald | Cheap-feeling brights |
| Clean, minimal     | Neutrals                 | Overwhelming color    |

### Selection Process

1. **What's the industry?** (narrows options)
2. **What's the emotion?** (picks primary)
3. **Light or dark mode?** (sets foundation)
4. **ASK USER** if not specified

For detailed color theory: [color-system.md](color-system.md)

---

## 5. Typography Principles

### Scale Selection

| Content Type | Scale Ratio | Feel                   |
| ------------ | ----------- | ---------------------- |
| Dense UI     | 1.125-1.2   | Compact, efficient     |
| General web  | 1.25        | Balanced (most common) |
| Editorial    | 1.333       | Readable, spacious     |
| Hero/display | 1.5-1.618   | Dramatic impact        |

### Pairing Concept

```
Contrast + Harmony:
├── DIFFERENT enough for hierarchy
├── SIMILAR enough for cohesion
└── Usually: display + neutral, or serif + sans
```

### Readability Rules

- **Line length**: 45-75 characters optimal
- **Line height**: 1.4-1.6 for body text
- **Contrast**: Check WCAG requirements
- **Size**: 16px+ for body on web

For detailed typography: [typography-system.md](typography-system.md)

---

## 6. Visual Effects Principles

### Glassmorphism (When Appropriate)

```
Key properties:
├── Semi-transparent background
├── Backdrop blur
├── Subtle border for definition
└── ⚠️ **WARNING:** Standard blue/white glassmorphism is a modern cliché. Use it radically or not at all.
```

### Shadow Hierarchy

```
Elevation concept:
├── Higher elements = larger shadows
├── Y-offset > X-offset (light from above)
├── Multiple layers = more realistic
└── Dark mode: may need glow instead
```

### Gradient Usage

```
Harmonious gradients:
├── Adjacent colors on wheel (analogous)
├── OR same hue, different lightness
├── Avoid harsh complementary pairs
├── 🚫 **NO Mesh/Aurora Gradients** (floating blobs)
└── VARY from project to project radically
```

For complete effects guide: [visual-effects.md](visual-effects.md)

---

## 7. Animation Principles

### Timing Concept

```
Duration based on:
├── Distance (further = longer)
├── Size (larger = slower)
├── Importance (critical = clear)
└── Context (urgent = fast, luxury = slow)
```

### Easing Selection

| Action   | Easing      | Why                   |
| -------- | ----------- | --------------------- |
| Entering | Ease-out    | Decelerate, settle in |
| Leaving  | Ease-in     | Accelerate, exit      |
| Emphasis | Ease-in-out | Smooth, deliberate    |
| Playful  | Bounce      | Fun, energetic        |

### Performance

- Animate only transform and opacity
- Respect reduced-motion preference
- Test on low-end devices

For animation patterns: [animation-guide.md](animation-guide.md), for advanced: [motion-graphics.md](motion-graphics.md)

---

## 8. "Wow Factor" Checklist

### Premium Indicators

- [ ] Generous whitespace (luxury = breathing room)
- [ ] Subtle depth and dimension
- [ ] Smooth, purposeful animations
- [ ] Attention to detail (alignment, consistency)
- [ ] Cohesive visual rhythm
- [ ] Custom elements (not all defaults)

### Trust Builders

- [ ] Security cues where appropriate
- [ ] Social proof / testimonials
- [ ] Clear value proposition
- [ ] Professional imagery
- [ ] Consistent design language

### Emotional Triggers

- [ ] Hero that evokes intended emotion
- [ ] Human elements (faces, stories)
- [ ] Progress/achievement indicators
- [ ] Moments of delight

---

## 9. Anti-Patterns (What NOT to Do)

### ❌ Lazy Design Indicators

- Default system fonts without consideration
- Stock imagery that doesn't match
- Inconsistent spacing
- Too many competing colors
- Walls of text without hierarchy
- Inaccessible contrast

### ❌ AI Tendency Patterns (AVOID!)

- **Same colors every project**
- **Dark + neon as default**
- **Purple/violet everything (PURPLE BAN ✅)**
- **Bento grids for simple landing pages**
- **Mesh Gradients & Glow Effects**
- **Same layout structure / Vercel clone**
- **Not asking user preferences**

### ❌ Dark Patterns (Unethical)

- Hidden costs
- Fake urgency
- Forced actions
- Deceptive UI
- Confirmshaming

---

## 10. Decision Process Summary

```
For EVERY design task:

1. CONSTRAINTS
   └── What's the timeline, brand, tech, audience?
   └── If unclear → ASK

2. CONTENT
   └── What content exists?
   └── What's the hierarchy?

3. STYLE DIRECTION
   └── What's appropriate for context?
   └── If unclear → ASK (don't default!)

4. EXECUTION
   └── Apply principles above
   └── Check against anti-patterns

5. REVIEW
   └── "Does this serve the user?"
   └── "Is this different from my defaults?"
   └── "Would I be proud of this?"
```

---

## Reference Files

For deeper guidance on specific areas:

- [color-system.md](color-system.md) - Color theory and selection process
- [typography-system.md](typography-system.md) - Font pairing and scale decisions
- [visual-effects.md](visual-effects.md) - Effects principles and techniques
- [animation-guide.md](animation-guide.md) - Motion design principles
- [motion-graphics.md](motion-graphics.md) - Advanced: Lottie, GSAP, SVG, 3D, Particles
- [decision-trees.md](decision-trees.md) - Context-specific templates
- [ux-psychology.md](ux-psychology.md) - User psychology deep dive

---

## 11. 🏗️ Project Design System (Dashboard) — MANDATORY

> **This section is project-specific.** When working on ANY dashboard component, apply these rules before adding any class directly.

### Primitive Components (always use, never reinvent)

| Component         | Path                             | Purpose                                                                               |
| ----------------- | -------------------------------- | ------------------------------------------------------------------------------------- |
| `<Box>`           | `@/components/ui/box`            | White card shell → `bg-white border border-gray-100`. No padding, no radius.          |
| `<SectionHeader>` | `@/components/ui/section-header` | Inline section divider → indigo icon + `UPPERCASE` label + `border-b border-gray-100` |

**Rules:**

- ❌ **NEVER** use `rounded-lg`, `rounded-xl`, `rounded-full` on cards, inputs, or buttons — the design system is **sharp (zero radius)**.
- ❌ **NEVER** recreate inline a `div` that replicates `Box`. Always import and use `<Box>`.
- ❌ **NEVER** recreate a section label with `div + w-0.5 + text`. Always use `<SectionHeader icon={} label="">`.

### Card Anatomy Pattern

Every dashboard card follows this three-layer pattern:

```tsx
<Box>
  {/* 1 — Header: icon + title/subtitle + optional action button */}
  <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
    <div className="flex items-center gap-2.5">
      <div className="w-7 h-7 bg-gray-900 flex items-center justify-center">
        <Icon className="w-3.5 h-3.5 text-white" />
      </div>
      <div>
        <h2 className="text-xs font-extrabold text-gray-900 uppercase tracking-widest">
          Title
        </h2>
        <p className="text-[10px] text-gray-400 font-medium">Subtitle</p>
      </div>
    </div>
    {/* optional: action button */}
  </div>

  {/* 2 — Body: padding owned by consumer */}
  <div className="p-6">
    {/* Sub-sections use SectionHeader */}
    <div className="space-y-3">
      <SectionHeader icon={<Icon className="w-3 h-3" />} label="Section Name" />
      {/* content */}
    </div>
  </div>
</Box>
```

### Accent Color Token

Use **`#4F46E5`** (indigo-600) for all interactive accents:

- Primary buttons: `bg-[#4F46E5] hover:bg-[#4338CA]`
- Focus rings: `focus:border-[#4F46E5]/40`
- Icon squares on sidebar/section headers
- Hover states on interactive list items: `hover:border-[#4F46E5]/40 hover:bg-[#4F46E5]/3`

### Input Pattern (zero-radius, sharp)

```tsx
<input className="w-full h-9 px-3 border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-[#4F46E5]/40 focus:outline-none transition-all text-sm text-gray-900" />
```

### Primary Button Pattern

```tsx
<button className="flex items-center gap-2 bg-[#4F46E5] hover:bg-[#4338CA] disabled:opacity-60 text-white h-8 px-4 text-[11px] font-bold uppercase tracking-widest transition-all duration-200 active:scale-95 cursor-pointer">
```

### Info / Error Box Pattern (border-l-2)

```tsx
{
  /* info */
}
;<div className="border-l-2 border-[#4F46E5] bg-[#4F46E5]/04 px-3 py-2.5 flex items-start gap-2">
  <Info size={13} className="text-[#4F46E5] shrink-0 mt-0.5" />
  <p className="text-[10px] text-[#4F46E5]/80 leading-relaxed">Mensagem</p>
</div>

{
  /* error */
}
;<div className="border-l-2 border-rose-400 bg-rose-50 px-3 py-2.5 flex items-center gap-2">
  <Info size={13} className="text-rose-500 shrink-0" />
  <p className="text-[11px] text-rose-700 font-medium">Mensagem de erro</p>
</div>
```

---

> **Remember:** Design is THINKING, not copying. Every project deserves fresh consideration based on its unique context and users. **Avoid the Modern SaaS Safe Harbor!**
