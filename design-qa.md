# Minerva — final design review, 12 September 2026

## Scope and evidence

This review supersedes the earlier seven-image report. The latest user direction is Apple 2016–2017, varied people and environments, at least 20 distinct images, at least 12–13 icons, readable hierarchy, fluid motion, two critique/fix cycles and desktop navigation only.

- Selected source: `qa/reference.png`, 1487 × 1058 pixels.
- Combined comparison: `qa/comparison-v2.html`, source beside a live **1487 × 1058 CSS-pixel iframe**, scaled equally to fit its column. Browser inspection confirmed both dimensions; the source is not cropped. The earlier narrow-iframe comparison was invalid and has been corrected.
- Final comparison was opened again after fixes. Focused captures separately inspected the header, hero, matching strip, category panels, gallery, editorial sections, all three sticky scenes, journal cards, profile, planner and form error state.
- Direct browser review: Codex in-app browser at 1280 × 720 CSS pixels. Earlier focused capture: 1082 × 892. No alternate mobile navigation was implemented or tested.
- Screenshots were returned inline by CUA. No nonexistent screenshot file paths are claimed. The full-page stitching output duplicated regions, so it was discarded as evidence; normal viewport captures and DOM inspection were used.
- Reviewable asset contact sheet: `qa/asset-inventory.html`. Exact new-image prompts and source paths: `qa/asset-prompts-v3.json`.

## Critique → fix cycle 1: the experience felt repeated

**P1 — Image variety was too weak.** Inner pages repeated the same studio still lifes and similar people in pale interiors. Increasing the asset count alone would not solve that visual sameness.

**Fix:** 13 new editorial scenes, each with different people, activity, setting, composition and lighting. The original homepage imagery remains on Home. Photography uses a stormy coast; Music uses blue/amber rehearsal lighting; Code uses an industrial makerspace; Share uses a tiled kitchen; About uses a bike workshop. Garden, rainy sketchwalk, dusk chess, emerald community hall, textiles, neon ramen, stargazing and printmaking complete the set.

**P1 — Generic copy and repeated closings weakened the purpose of the inner pages.**

**Fix:** separate category lesson guides with outcomes, materials and time allocations. Six additional fictional offers add cooking, gardening, bike repair, sewing, astronomy and printmaking. New journal entries link to the relevant offers. Category preparation copy now reflects the activity.

**P1 — Dark text crossed busy photographic backgrounds.**

**Fix:** inner-page headings and body copy occupy solid surfaces above or beside images. All three sticky scenes use a white copy column with full opacity. Homepage captions have opaque pale backing and category copy has its own panel.

**Post-fix review:** inspected all 20 images together, every new page hero, the two journals and all three sticky scenes. Different casting, settings and lighting are visibly present. Text and imagery remain distinct. The site has 18 fictional offers across 17 skills.

## Critique → fix cycle 2: polish must survive interaction

**P1 — Route opacity animation visibly washed out the dark Music page during entry.**

**Fix:** removed opacity from page entry and reveal motion. Translation, image scaling, sticky progression and hover feedback remain. Every reveal element measured opacity 1 across all 11 routes. All three story-copy blocks measured opacity 1 during scrolling.

**P1 — Cards implied mutual compatibility by substituting each offer’s skills for the user’s preferences. The planner could save a different trade from the one described.**

**Fix:** category, saved and Explore cards now evaluate the selected user skills. Nonmatching profiles explicitly ask whether the visitor can teach the required skill. The planner uses exactly that displayed pair. Owned offers cannot be planned as someone else’s profile.

**Post-fix interaction:** Music showed only Maya as mutual for Photography → Guitar; Priya and Zoe remained open to exchange. Priya’s confirmation displayed Coding → Guitar, and the saved plan survived reload. Completion and removal worked; the temporary plan was removed.

**P2 — Small navigation and utility labels were too faint.**

**Fix:** global links increased to 13px with a brighter foreground. Session metadata, removal actions, circle labels, demo labels and guideline numbers were darkened. Slightly stronger colors fixed the About eyebrow and Circles action.

**Post-fix measurement:** a DOM-based contrast screen across all 11 routes found no failing text on the tested solid surfaces, using 4.5:1 for normal text and 3:1 for large text. It excludes decorative/hidden/disabled text and the translucent global navigation. The navigation and image-adjacent regions were reviewed visually. This is focused evidence, not a claim of complete WCAG certification.

**P2 — The moving gallery lacked an explicit pause control; targeted links forced repeated scrolling; blank spaces could pass required form fields.**

**Fix:** added a labelled pause/play button; both rails report `animation-play-state: paused` after activation. Query links now open their results below the hero. Share validates trimmed values and meaningful introduction/outcome length. A null guard protects the reveal observer during route teardown. The circle footer now explains which lesson returns to the visitor.

**Post-fix interaction:** tested the Share error, published an explicitly temporary Sewing offer, reloaded to verify persistence, then removed it. Photography → Guitar returned exactly one profile. Targeted results were visible immediately beneath the sticky navigation. Gallery pause was verified in computed styles. The final combined reference comparison showed the preserved thin type, quiet blue controls, charcoal bar, bright still lifes and image-led category row.

## Asset and route audit

20 image paths are rendered across the public pages; 20 different file hashes confirm they are different files. Combined optimized size: **3,940,764 bytes**. All 20 loaded in the inventory; lazy-loaded images were also checked in their actual Home and Explore sections. The gallery contains 50 accessible original links with **42 distinct icon SVG contents**; duplicate animation copies are hidden from assistive technology.

| Route | Distinct imagery | Desktop audit |
|---|---|---|
| `/` | 6 original homepage assets | One h1, six nav links, no overflow, no hidden reveal text |
| `/explore` | Garden, textiles, language | Same checks; query results and journals inspected |
| `/skills/music` | Rehearsal | Same checks; dark hero and corrected profile flow inspected |
| `/skills/photography` | Coast | Same checks; category-specific lesson copy |
| `/skills/code` | Makerspace | Same checks; practical guide and offers inspected |
| `/circles` | Community hall | Same checks; directed circle and 90-minute planner inspected |
| `/how-it-works` | Sketchwalk, chess park, craft | Same checks; all three sticky scenes inspected |
| `/share` | Kitchen | Same checks; validation and publish/reload/remove exercised |
| `/my-swaps` | Functional workspace | Same checks; saved plan and offer states exercised |
| `/about` | Repair, stargazing, printmaking | Same checks; mission and journal inspected |
| `/guidelines` | Library icons | Same checks; numbered principles inspected |

## Fidelity surfaces

- Typography: system/Helvetica stack, thin display headings, readable regular-weight body copy. Exact source font files are unavailable; platform rendering can differ.
- Rhythm: 44px global navigation, 52px local navigation, large photographic stages, restrained controls and separate routes. The source homepage composition remains recognizable; additional pages and brighter/darker environments follow the user’s explicit revisions.
- Color: white, charcoal, pale page-specific tints and blue actions. No Aero or pixel styling.
- Imagery: generated original assets, optimized WebP, meaningful editorial alt text. Images illustrate activities, not verified member identities.
- Copy: practical first outcomes, equal time, preparation and explicit demo boundaries. No fabricated testimonials or success statistics.

## Final technical checks

- `npm test`: 10/10 matching, storage and route tests pass.
- `npm run build`: passes; client/server Sites artifacts produced.
- `npm run test:sites`: 4/4 pass after the final build.
- Browser runtime includes one historical observer error at 08:41:42 UTC, before the null guard. The final 11-route sweep after 09:06:25 UTC produced no new errors or warnings. Every rendered image loaded successfully, all 20 distinct image URLs were found on actual product routes, and no route had horizontal overflow at 1280 × 720.
- Native dialog, visible keyboard focus, labelled fields and reduced-motion CSS retained. Motion fallbacks were inspected in source; no system accessibility preference was changed.
- The repository contains the project as untracked files, so a clean `git diff --check` alone does not validate their whitespace. Build and browser checks are the substantive evidence.

## Practical limits

This is a local competition prototype with fictional profiles and browser storage. No message is sent, and there are no real accounts or backend scheduling. The 50 discovery links intentionally include interests beyond the 17 seeded skills; those searches show an empty state. The score and competition result depend on the judges and the presentation.

All P1/P2 findings above have been addressed and rechecked within the stated desktop scope.

final result: passed
