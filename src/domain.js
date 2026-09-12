import { SKILLS, CATEGORY } from './data.js';

export function isMutual(person, teach, learn) {
  return Boolean(teach && learn && person.teach === learn && person.learn === teach);
}
export function filterPeople(people, { query = '', category = 'All skills', teach = '', learn = '', mutual = false } = {}) {
  const q = query.trim().toLocaleLowerCase();
  return people.filter(p =>
    (!q || [p.name, p.teach, p.learn, p.title].join(' ').toLocaleLowerCase().includes(q)) &&
    (category === 'All skills' || CATEGORY[p.teach] === category) &&
    (!learn || p.teach === learn) &&
    (!mutual || isMutual(p, teach, learn))
  );
}
// Directed cycle: you teach A -> first teaches B -> second teaches C -> you learn C.
// Identity is checked independently of skill names; the same person cannot fill two seats.
export function findCircles(people, teach, learn) {
  if (!teach || !learn || teach === learn) return [];
  const circles = [];
  for (const first of people) {
    if (first.learn !== teach || first.teach === learn) continue;
    for (const second of people) {
      if (second.id === first.id || second.learn !== first.teach || second.teach !== learn) continue;
      circles.push({ id: [teach, first.id, second.id, learn].join(':'), first, second, teach, learn });
    }
  }
  return circles;
}
export function requestKey(kind, ids, teach, learn) {
  return [kind, ...ids, teach, learn].join('|');
}
export function addRequest(requests, request) {
  if (requests.some(r => r.key === request.key && r.status !== 'cancelled')) return { requests, duplicate: true };
  return { requests: [request, ...requests], duplicate: false };
}
export function localDate(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return [y, m, d].join('-');
}
export function validateStore(value) {
  if (!value || value.version !== 1) return { offers: [], requests: [], saved: [] };
  const text = (s, max = 500) => typeof s === 'string' && s.length > 0 && s.length <= max;
  return {
    offers: Array.isArray(value.offers) ? value.offers.filter(p => p && text(p.id, 100) && text(p.name, 60) && SKILLS.includes(p.teach) && SKILLS.includes(p.learn) && p.teach !== p.learn && text(p.title, 90) && text(p.outcome) && text(p.bio) && text(p.need) && [30,45,60].includes(p.duration)).slice(0, 100) : [],
    requests: Array.isArray(value.requests) ? value.requests.filter(r => r && text(r.id, 100) && text(r.key, 300) && text(r.title, 150) && text(r.withName, 150) && SKILLS.includes(r.teach) && SKILLS.includes(r.learn) && ['pending','completed','cancelled'].includes(r.status) && /^\d{4}-\d{2}-\d{2}$/.test(r.date) && /^\d{2}:\d{2}$/.test(r.time) && [30,45,60].includes(r.duration) && typeof r.message === 'string' && r.message.length <= 500).slice(0, 100) : [],
    saved: Array.isArray(value.saved) ? [...new Set(value.saved.filter(s => text(s, 100)))].slice(0, 100) : []
  };
}
