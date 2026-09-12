# Minerva — judge walkthrough

## A three-minute story

0:00–0:25 — “People carry useful knowledge every day, but finding the right person to trade with is surprisingly hard. Minerva turns that first exchange into a clear, generous invitation.”

Show Home. Point out the compact Apple-era navigation, the two-line headline, and the physical exchange scene: one person’s guitar lesson can become another person’s doorway into music.

0:25–0:55 — In the matching strip, keep `Photography` under “I can teach” and `Guitar` under “I want to learn”. Choose “Show matching people”. Open Maya’s profile.

“This is a reciprocal match. Maya teaches guitar and wants photography, so both people can see exactly why the offer fits. There is no unexplained score.”

0:55–1:20 — Choose “Plan this swap”, select a future date and time, then save. Open My swaps.

“The first session has a small outcome and equal time for each skill. It is a real local state change; the plan persists in this browser, and the prototype never pretends that a message was sent.”

1:20–1:40 — Return Home and scroll to “Fifty ways to begin”. Let the two icon rails move, pause the gallery, then select Gardening or Sewing.

“The visual gallery makes the product feel expansive without turning the landing page into a directory. The gallery has 50 linked starting points and 42 icon designs. The seeded demo covers 17 skills; searches outside that collection show an honest empty state.”

1:40–2:05 — Open Swap circles with Photography and Guitar selected.

“Two people can miss each other’s goals. Three can close the loop: I teach photography to Sam, Sam teaches coding to Priya, and Priya teaches guitar to me. Everyone gives and receives.”

Open the circle planner and save it to My swaps.

2:05–2:25 — Open Share a skill, fill the short offer form, and publish. Return to My swaps.

“The exchange works in both directions. Publishing creates a local offer that appears in the same workspace as saved sessions, with explicit fictional/demo boundaries.”

2:25–2:45 — Open How it works and scroll through the sticky scenes.

“The motion is part of the explanation. A quiet image enters, the copy stays readable, and each scene answers one question: what can I teach, how do we share the time, and what should I prepare?”

2:45–3:00 — Open About or Community guidelines.

“AI helped explore the visual direction, generate original editorial imagery, draft the interface, and critique the result. The implementation is explainable: pure matching functions, tested routes, local persistence, native controls, and a clear list of what a public product would still need.”

## Rubric mapping

- Design thinking (20%): reciprocity, concrete first outcomes, equal time, transparent matching, directed circles, and useful empty states.
- UI/UX (20%): selected Apple 2016–2017 visual language, compact hierarchy, image-led pages, short core journey, readable forms, native controls, and keyboard-operable dialogs.
- Technical quality (20%): React route state, pure tested domain functions, validated persisted data, optimized local assets, deterministic query links, browser evidence, and Sites packaging checks.
- Innovation (20%): explainable three-person cycles solve the specific limitation of direct bartering; the 50-item gallery makes discovery feel alive while staying functional.
- Presentation (20%): demonstrate a complete exchange, explain the graph, distinguish fictional content from functionality, disclose AI assistance, and state prototype boundaries clearly.

## Code you should be able to explain

1. `isMutual` checks both directions of a trade.
2. `findCircles` searches two distinct peers to close a directed three-person cycle. It is O(n²), appropriate for this small demo; a larger service would index offers by skills and constrain candidate sets.
3. `addRequest` prevents duplicate active exchanges with a deterministic key.
4. `validateStore` rejects malformed local data; React renders user text safely as text.
5. The native `dialog` flow contains focus, supports Escape, and restores focus after close.
6. `parseRoute` keeps every public page addressable without a router dependency.
7. The app is frontend-only. A real release needs accounts, a backend, moderation, safeguarding, actual messaging, scheduling agreement, and privacy controls.

## Critique prompts for rehearsal

- Can a new visitor explain what each person gives and receives?
- Does every prominent button change the intended state?
- Can I demonstrate a circle without implying a message was sent?
- Can I explain one source file without reading from the screen?
- Can I describe both the Apple-era inspiration and the original circle contribution?
- Can I show the 50 visual starting points as real discovery links?

## Explain the visual revision

The final revision uses 20 distinct images. The original white still lifes stay on Home; the inner pages show different ages, appearances, abilities, settings and lighting. Each category has its own practical three-step lesson guide. Text sits on quiet surfaces instead of crossing busy photographs. Two critique/fix cycles are recorded in `design-qa.md`, including corrections to low-contrast labels, misleading match badges and a planner that previously used the wrong skill pair.

AI generated the photographs and assisted with implementation and critique. The pictured people illustrate the activities; they are not verified members or testimonials. The outcome of a competition cannot be promised.
