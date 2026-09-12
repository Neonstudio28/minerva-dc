const STATIC_ROUTES = new Set([
  '/',
  '/explore',
  '/circles',
  '/how-it-works',
  '/my-swaps',
  '/share',
  '/about',
  '/guidelines',
]);

export function normalizePath(pathname = '/') {
  const clean = ('/' + String(pathname).split('?')[0].split('#')[0])
    .replace(/\/{2,}/g, '/')
    .replace(/\/$/, '');
  return clean || '/';
}

export function parseRoute(pathname = '/') {
  const path = normalizePath(pathname);
  if (STATIC_ROUTES.has(path)) {
    return { page: path === '/' ? 'home' : path.slice(1), path };
  }
  const skill = path.match(/^\/skills\/(music|photography|code)$/);
  if (skill) return { page: 'skill', slug: skill[1], path };
  return { page: 'not-found', path };
}

export function pageTitle(route) {
  const titles = {
    home: 'Minerva — A world of possibility',
    explore: 'Explore skills — Minerva',
    circles: 'Swap circles — Minerva',
    'how-it-works': 'How Minerva works',
    'my-swaps': 'My swaps — Minerva',
    share: 'Share a skill — Minerva',
    about: 'About — Minerva',
    guidelines: 'Community guidelines — Minerva',
    'not-found': 'Page not found — Minerva',
  };
  if (route.page === 'skill') {
    const label = route.slug[0].toUpperCase() + route.slug.slice(1);
    return `${label} — Minerva`;
  }
  return titles[route.page] || titles['not-found'];
}
