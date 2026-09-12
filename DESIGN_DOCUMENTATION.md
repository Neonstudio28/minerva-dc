# Minerva — design documentation

## Project title

**Minerva — Everyone teaches. Everyone learns.**

## Participant information

Complete this block before submitting: **Name:** ____________________  **Age:** ______  **Category:** Middle / Senior  **School or team:** ____________________

## Theme analysis

The brief asks for a service that brings people together to exchange knowledge. Minerva treats knowledge as a two-way relationship instead of a one-way course catalogue. The 2016–2017 Apple web language gives the service a calm, image-led, editorial feel: thin system typography, a compact charcoal navigation bar, generous white space, restrained blue actions and large photography.

## Problem statement

People often know something useful but cannot find a person whose learning goal fits their own. Existing learning services can make a visitor feel like a customer or spectator. Minerva makes the first exchange concrete: each offer states what a person can teach, what they want to learn, what to bring and what a first session can achieve.

## Target users

- A curious beginner who wants a small, achievable first lesson.
- A capable peer who wants to share practical knowledge without becoming a formal instructor.
- A group whose goals do not align directly and can be connected through a three-person circle.

## Proposed solution

The visitor chooses a skill to teach and a skill to learn, explores reciprocal offers, opens a profile, plans equal teaching time, and finds the saved plan in My swaps. If a direct match is unavailable, Swap circles explains a directed three-person route. Share a skill lets the visitor add a structured offer.

## Design decisions

- **Image-led hierarchy:** photography introduces the feeling of each route; copy sits on quiet surfaces so it remains readable.
- **Short, specific language:** headlines describe a human possibility, while lesson guides name a concrete outcome and time.
- **Desktop navigation:** one compact Apple-era navigation model is used throughout, per the project direction.
- **Trust through clarity:** the UI distinguishes mutual matches from open offers and discloses fictional data and local-only storage.
- **Motion with control:** sticky scenes, image transitions, hover feedback and a pausable gallery create depth; reduced-motion styles remove movement.
- **Variety with purpose:** 20 distinct images show different people, environments, activities and lighting rather than repeating one stock scene.

## Technical approach

React renders route-specific pages from `src/pages.jsx`. `src/domain.js` contains pure matching, circle search, duplicate prevention and storage validation. `src/App.jsx` owns routing, local persistence, dialogs and state. CSS is split between shared tokens and editorial page treatments. Native form controls, semantic headings, labelled fields, focus management and keyboard-operable dialogs support accessible use.

## AI usage

See [`AI_USAGE_LOG.md`](./AI_USAGE_LOG.md) for the required tool-by-tool disclosure. The student reviewed, modified and tested every AI-assisted result.

## Learning journey

The project developed skills in problem framing, interface hierarchy, responsive desktop layout, React state, pure JavaScript logic, browser storage, accessibility, asset direction, testing and explaining design decisions. The largest challenge was preserving an image-led Apple-inspired calm while adding enough depth and real exchange functionality; critique cycles exposed repetition, contrast and matching-state issues that were then corrected.
