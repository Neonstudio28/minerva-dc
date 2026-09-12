import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizePath, pageTitle, parseRoute } from '../src/navigation.js';

test('normalizes duplicate and trailing slashes without losing the root route', () => {
  assert.equal(normalizePath('/'), '/');
  assert.equal(normalizePath('//explore///'), '/explore');
  assert.equal(normalizePath('/circles/?from=home#plan'), '/circles');
});

test('resolves every public page and the three curated skill routes', () => {
  assert.equal(parseRoute('/').page, 'home');
  for (const page of ['explore', 'circles', 'how-it-works', 'my-swaps', 'share', 'about', 'guidelines']) {
    assert.equal(parseRoute(`/${page}`).page, page);
  }
  assert.deepEqual(parseRoute('/skills/photography'), {
    page: 'skill',
    slug: 'photography',
    path: '/skills/photography',
  });
});

test('unknown routes produce a clear not-found title', () => {
  const route = parseRoute('/skills/pottery');
  assert.equal(route.page, 'not-found');
  assert.equal(pageTitle(route), 'Page not found — Minerva');
});
