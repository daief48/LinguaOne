# LinguaOne — Learning with AI Everyday

> **Learn. Speak. Improve. Every Day.**

A responsive React prototype of an AI-powered multi-language learning platform,
built as a **mobile-app-style product demo**. On desktop it presents inside a
centered **Google Pixel** mockup — hole-punch camera, side buttons, Android
gesture bar — and on a phone it drops the frame and runs full-screen like a
native app.

This is a **client presentation demo**: all data is local mock data. There is no
backend, no authentication, no AI API and no payment integration — the AI
behaviour (listening, transcription, correction, scoring) is simulated with
timed state machines so every flow is clickable end to end.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
```

```bash
npm run build    # production build to dist/
npm run preview  # serve the production build
```

Requires Node 18+.

---

## Tech

| | |
|---|---|
| Framework | React 19 + Vite |
| Routing | React Router 7 |
| Styling | Tailwind CSS 3 (custom design tokens) |
| Icons | lucide-react |
| Data | Local mock data (`src/data/`) |

---

## The 23 screens

| # | Screen | Route |
|---|---|---|
| 1 | Splash | `/` |
| 2 | Onboarding (3 slides) | `/onboarding` |
| 3 | Language Selection | `/language` |
| 4 | Learning Goal | `/goal` |
| 5 | Daily Practice Goal | `/daily-goal` |
| 6 | AI Placement Test | `/placement` |
| 7 | Placement Result | `/placement-result` |
| 8 | Personalized Learning Plan | `/plan` |
| 9 | **Home Dashboard** | `/home` |
| 10 | Learn | `/learn` |
| 11 | Lesson Detail | `/lesson/:lessonId` |
| 12 | **AI Voice Conversation** | `/conversation` |
| 13 | **Grammar Correction** | `/grammar` |
| 14 | Pronunciation Coach | `/pronunciation` |
| 15 | Listening Practice | `/listening` |
| 16 | Vocabulary Builder | `/vocabulary` |
| 17 | IELTS Mode | `/ielts` |
| 18 | **IELTS Speaking Test** | `/ielts/speaking` |
| 19 | Practice Modes | `/practice` |
| 20 | **Progress Dashboard** | `/progress` |
| 21 | **Premium Subscription** | `/premium` |
| 22 | Profile | `/profile` |
| 23 | Settings | `/settings` |

Unknown routes redirect to `/home`.

---

## Suggested demo path (about 3 minutes)

1. **`/`** — splash auto-advances to onboarding.
2. Swipe / click through the three onboarding slides → **Get Started**.
3. Pick a language → a goal → a daily target (15 min is preselected).
4. **Placement test** — answer a few questions, then record the spoken answer
   (the microphone runs *Listening → Processing → Scored*).
5. **Placement result** — B1, five animated skill rings, AI recommendation.
6. **Build My Learning Plan** — watch the AI "build" the 7-day plan, then
   **Start Day 1** → Home.
7. **Home** — streak, daily goal ring, continue-learning hero, daily AI practice.
8. **Start Conversation** — tap the mic three times to run the full loop:
   *listening → processing → transcript → live grammar correction → next turn*,
   ending in a session summary.
9. **IELTS → Start IELTS Speaking** — 1-minute prep, timed recording,
   "AI analyzing", then a band 6.5 breakdown and detailed feedback sheet.
10. **Premium** — switch plans and run the (simulated) upgrade; premium prompts
    disappear across the app afterwards.

---

## Project structure

```
src/
  App.jsx                    route table
  index.css                  design tokens, utilities, animations
  data/
    brand.js                 product name, tagline, AI teacher name
    mock.js                  all demo content
    tints.js                 colour tokens (gradients, soft fills, ring strokes)
  context/
    appContext.js            context + useApp() hook
    AppProvider.jsx          language, goal, daily target, XP, premium, toasts
  hooks/
    useAnimations.js         useMounted, useCountUp, useInterval, useSequence
  components/
    layout/                  AppShell, PhoneFrame, StatusBar, TopBar,
                             FlowHeader, BottomNav, Screen, Reveal
    ui/                      Button, Card, Progress, Badges, Streak, SkillCard,
                             LessonCard, VocabularyCard, Overlay (Modal +
                             BottomSheet), Toast, Icon, Flag
    ai/                      AITeacher, ChatBubble, CorrectionCard, Waveform,
                             VoiceRecorder, AudioPlayer, AIInsightCard
  screens/                   the 23 screens
```

### Motion

Animation is centralised so it stays consistent and never becomes noise:

| Layer | Where |
|---|---|
| Page transition | `.animate-page-in` on every routed screen |
| Scroll reveal | `<Reveal>` marks a block; **one** IntersectionObserver in `AppShell` watches every `.reveal` inside the scroll container |
| List cascade | `.stagger` on a grid/list — children animate in sequence via CSS `nth-child` delays |
| CTA shine | `.shine-sweep`, applied automatically to gradient `<Button>` variants |
| Ambient | drifting backdrop blobs, breathing AI teacher, animated gradient panning, glow pulses |
| Interaction | `.press` (active scale), `.lift` / `.tap-card` (hover raise), animated tab indicator |
| Data | count-ups, ring draw-on, bar growth, waveform, mic pulse |

The reveal observer also watches for late-mounted content (a `MutationObserver`)
and force-reveals anything still hidden after 4s, so a block can never get
stuck invisible during a demo. Everything collapses under
`prefers-reduced-motion`.

### Reusable components

Bottom navigation, top navigation, cards, progress bars, skill cards, AI chat
bubbles, voice recorder, audio player, vocabulary cards, lesson cards, modal,
bottom sheet, toast, premium badge, streak component, circular progress and
level badge all live in `src/components/` and are shared across screens.

---

## Notes for the client demo

- **Branding.** The product name and tagline are in `src/data/brand.js`.
  Change `BRAND.name` / `BRAND.descriptor` in that one file to rebrand the whole
  app (currently *LinguaOne*, with *Learning with AI Everyday* as the descriptor).
- **The AI teacher, "Aria",** is a single SVG component
  (`components/ai/AITeacher.jsx`) with `idle` / `speaking` / `listening` /
  `thinking` / `happy` states, used consistently across every AI screen.
- **Flags are drawn as SVG**, not emoji — Windows does not render flag emoji and
  would show "GB" / "DE" instead.
- **Simulated AI.** Microphone, transcription, corrections, pronunciation scores
  and IELTS bands are scripted in `src/data/mock.js` and driven by the
  `useSequence` timing hook. Swapping in a real API means replacing those timers
  with network calls — the UI states already exist.
- **Audio is simulated too:** `AudioPlayer` runs a timer rather than a media
  file, so the waveform, scrubbing and speed controls work with no assets.
- **Mobile first.** Designed at 390 × 844. On desktop the app is centered at
  430px inside the Pixel mockup (`components/layout/PhoneFrame.jsx`) on a soft
  gradient backdrop. Swapping the mockup for another device means editing that
  one file — the app itself knows nothing about the frame.
- **Reduced motion** is respected — animations collapse for users who ask for it.

## Verified

Every route was loaded in headless Chrome and every interactive flow driven
end to end: no console errors, no page errors, no broken routes and no
horizontal overflow at either 1440×960 or 390×844.
