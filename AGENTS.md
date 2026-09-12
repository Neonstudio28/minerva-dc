# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Approved design decision
The user explicitly rejected all Frutiger Aero and pixel styling. Use only Apple website aesthetics from 2016–2017. The selected visual target is the saved Apple concept at /Users/harshit/.codex/generated_images/01a08783-10c4-7ea2-a7d8-de28a60970e4/exec-a3f787bc-b8e3-436a-8708-f5d1fbba06ee.png. Preserve the functional skill exchange journey and clearly label fictional community data.

## Approved redesign direction — September 11, 2026

- Rebuild the header around Apple’s compact 2016–2017 global navigation: icon-only home mark, small evenly spaced links, search and saved-items icons, with no large Minerva wordmark in the bar.
- Use real URL routes for Home, Explore, Circles, How it works, My swaps, Share, and category detail pages.
- Keep the homepage lean and photographic. Move the offer grid, circles, explanations, and saved plans to their own pages.
- Preserve the existing hero and Music, Photography, and Code imagery; add more original editorial imagery in the same bright studio direction.
- Use the macOS system font stack with thinner display weights, less copy, larger imagery, sticky scroll scenes, reveal motion, and reduced-motion fallbacks.

## Durable user corrections

- Never implement mobile navigation in this project. Keep the desktop navigation model.
- Do not repeat the same people, white studio environments, lighting, or generic slogans across pages. Use diverse ages, appearances and abilities in clearly different settings, activities and lighting conditions.
- Reserve the original product still lifes for the homepage. Each inner page needs its own visual story and specific practical content.
