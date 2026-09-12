# Minerva — concept documentation

## Sitemap

```text
Home /
├── Explore /explore
│   └── Skill query /explore?q=...
├── Music /skills/music
├── Photography /skills/photography
├── Code /skills/code
├── Swap circles /circles
├── How it works /how-it-works
├── My swaps /my-swaps
├── Share a skill /share
├── About /about
└── Community guidelines /guidelines
```

## Primary user flow

```text
Home
  → choose “I can teach” and “I want to learn”
  → Show matching people
  → open a profile
  → inspect the exact give/receive pair
  → Plan this swap
  → choose date, time and note
  → Save swap request
  → My swaps
```

Alternate path: Home → Fifty ways to begin → a skill query → Explore results. When no direct pair exists: Home → Swap circles → choose two skills → inspect the directed three-person exchange → plan the circle.

## Wireframe description

The Home wireframe is ordered vertically: compact global bar, centered two-line headline, exchange photograph, match strip, three category panels, animated skill gallery, then two editorial story panels. Inner routes use a local bar, an editorial hero with separate copy and image stages, a focused workspace, and a footer. Forms use a single readable column with native controls and an explicit error state.

## UI concepts

1. **The exchange:** two still-life objects separated by a blue swap gesture communicate reciprocity immediately.
2. **The circle:** three people and three directed lesson edges make a failed direct match feel solvable.
3. **The first session:** every offer is reduced to a small outcome, time and materials so a beginner knows how to begin.

## Design iterations

- The initial retro browser/pixel direction was discarded after feedback; the chosen direction is Apple 2016–2017.
- A heavy single-page dashboard was split into real routes with a compact global and local navigation system.
- Repeated studio imagery was replaced with 13 varied editorial scenes, bringing the total to 20 distinct images.
- Text that crossed busy imagery was moved into white or pale copy panels.
- Category pages gained practical three-step lesson guides instead of generic closing copy.
- A critique pass corrected washed-out route entry, misleading mutual labels and an inaccurate planner skill pair.
- A second pass corrected small-label contrast, added a gallery pause control, improved targeted result links and rejected blank form submissions.
