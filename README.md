# Minerva

A working React prototype for a skill-exchange web design competition.

## Design direction

Minerva is intentionally Apple website inspired by 2016–2017: a compact charcoal global bar, thin system typography, generous white space, restrained blue actions, image-led sections, and editorial scroll motion. Earlier Frutiger Aero and pixel directions were discarded. The product is desktop-first with one polished global navigation model.

## Run

- `npm install`
- `npm run dev -- --host 127.0.0.1 --port 4173`
- `npm run build`
- `npm test`
- `npm run test:sites`

## Routes

- `/` — image-led landing page, reciprocal match strip, 50-skill visual gallery, and editorial stories
- `/explore` — searchable and filterable people and skills
- `/circles` — three-person directed exchange finder
- `/how-it-works` — sticky story scenes explaining the exchange
- `/my-swaps` — saved sessions, offers, and local state
- `/share` — publish a skill offer
- `/skills/music`, `/skills/photography`, `/skills/code` — curated category pages
- `/about`, `/guidelines` — prototype context, community principles and a visible championship/AI disclosure

## What works

Skill/category search, reciprocal matching with explanations, three-person swap circles, profile details, session planning, duplicate-request prevention, bookmarks, skill publishing, request completion/removal, route-aware browser history, and browser-local persistence. Native dialogs support keyboard focus, Escape, and background isolation. The 50 visual skill links are real routes into Explore, not decoration.

## Imagery and motion

The site uses 20 different WebP photographs and illustrations (3.94 MB combined), with 13 new scenes spanning a night rehearsal room, coast, makerspace, garden, kitchen, bike workshop, rainy street, chess park, community hall, mending table, ramen shop, mountains and print studio. See `qa/asset-inventory.html` and the generation manifest in `qa/asset-prompts-v3.json`. The homepage keeps the original still lifes. The 50 linked skill tiles use 42 different Phosphor icon designs.

Motion includes sticky scroll scenes, image scaling, page translation, hover feedback and a pausable skill gallery. Functional text remains at full opacity. Reduced-motion styles disable movement.

## Honest prototype boundaries

All seed profiles are fictional. Requests, offers, and bookmarks are saved in localStorage on this device. No email, message, or external invitation is sent. There is no authentication, identity verification, real community database, or backend messaging service. The product makes these boundaries visible. This demonstrates the designed experience; a public launch would need accounts, moderation, safeguarding, scheduling, privacy controls, and a backend.

## Structure

- `src/App.jsx` — routing, persistence, dialogs, and interaction state
- `src/pages.jsx` — Home, Explore, Circles, story, category, form, and utility pages
- `src/components.jsx` — navigation, footer, cards, selects, dialogs, and shared UI
- `src/data.js` — explicitly fictional, replaceable sample profiles
- `src/domain.js` — pure matching, circle search, duplicate guards, and storage validation
- `src/navigation.js` — route parsing and page titles
- `src/editorial.css` — page-specific imagery, readable text panels, practical lesson layouts and final contrast fixes
- `src/styles.css` — Apple-era tokens, layout, image treatment, scroll motion, and reduced-motion fallbacks
- `public/assets` — original generated editorial imagery and optimized WebP assets
- `tests/matching.test.mjs` — meaningful invariants of the exchange logic
- `tests/navigation.test.mjs` — public route and not-found coverage
- `tests/sites-worker.test.mjs` — preserved hosting-template checks
- `JUDGES.md` — presentation script and rubric explanation
- `design-qa.md` — source/implementation comparison and evidence

## Matching model

A direct match requires the peer to teach what you want and want what you teach. A circle follows three directed lesson edges: you teach A to person 1; person 1 teaches B to person 2; person 2 teaches C to you. Person 1 and person 2 must be distinct. The default Photography → Guitar example closes through Sam (Coding) and Priya (Guitar).

The algorithm is deterministic and inspectable. It does not claim to use an AI matching service.

## Credits

- Original photographic assets: generated with OpenAI ImageGen for this project; no Apple product imagery is distributed.
- UI icons: Phosphor Icons, MIT, <https://github.com/phosphor-icons/react>
- Visual research: [Apple 2017 archive](https://www.webdesignmuseum.org/gallery/apple-2017)
- Accessibility guidance: <https://www.w3.org/TR/WCAG22/>
- Product Design React/Vite prototype runtime preserved for optional Sites deployment.

See [`design-qa.md`](./design-qa.md) for verification evidence and remaining limitations.

For the competition submission pack, see [`DESIGN_CHAMPIONSHIP_GUIDELINES.md`](./DESIGN_CHAMPIONSHIP_GUIDELINES.md), [`DESIGN_DOCUMENTATION.md`](./DESIGN_DOCUMENTATION.md), [`CONCEPT_DOCUMENTATION.md`](./CONCEPT_DOCUMENTATION.md), and [`AI_USAGE_LOG.md`](./AI_USAGE_LOG.md).
