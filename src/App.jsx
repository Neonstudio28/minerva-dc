import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Check } from '@phosphor-icons/react';
import { PEOPLE } from './data.js';
import { addRequest, requestKey, validateStore } from './domain.js';
import { Footer, Header, ProfileModal, RequestModal } from './components.jsx';
import {
  AboutPage,
  CirclesPage,
  ExplorePage,
  GuidelinesPage,
  HomePage,
  HowItWorksPage,
  MySwapsPage,
  NotFoundPage,
  SharePage,
  SkillPage,
} from './pages.jsx';
import { pageTitle, parseRoute } from './navigation.js';

const STORE_KEY = 'skillswap.apple.v1';
const EMPTY_STORE = { offers: [], requests: [], saved: [] };

function currentUrl() {
  return { path: window.location.pathname, search: window.location.search };
}

function readStore() {
  try {
    return validateStore(JSON.parse(localStorage.getItem(STORE_KEY)));
  } catch {
    return EMPTY_STORE;
  }
}

export function App() {
  const [url, setUrl] = useState(currentUrl);
  const [store, setStore] = useState(readStore);
  const [userSkills, setUserSkills] = useState({ teach: 'Photography', learn: 'Guitar' });
  const [profile, setProfile] = useState(null);
  const [requestTarget, setRequestTarget] = useState(null);
  const [toast, setToast] = useState('');

  const route = useMemo(() => parseRoute(url.path), [url.path]);
  const allPeople = useMemo(() => [...store.offers, ...PEOPLE], [store.offers]);
  const savedPeople = useMemo(() => allPeople.filter((person) => store.saved.includes(person.id)), [allPeople, store.saved]);

  const navigate = useCallback((to, options = {}) => {
    const next = new URL(to, window.location.origin);
    const nextValue = { path: next.pathname, search: next.search };
    if (options.replace) window.history.replaceState({}, '', `${next.pathname}${next.search}${next.hash}`);
    else window.history.pushState({}, '', `${next.pathname}${next.search}${next.hash}`);
    setUrl(nextValue);
  }, []);

  useEffect(() => {
    const onPopState = () => setUrl(currentUrl());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORE_KEY, JSON.stringify({ version: 1, ...store }));
  }, [store]);

  useEffect(() => {
    document.title = pageTitle(route);
    setProfile(null);
    setRequestTarget(null);
    window.scrollTo(0, 0);
    requestAnimationFrame(() => document.querySelector('#content')?.focus({ preventScroll: true }));
  }, [route.path]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(''), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.documentElement.classList.toggle('motion-ready', !reduced);
    const observed = new WeakSet();
    const reveal = (element) => {
      if (observed.has(element)) return;
      observed.add(element);
      if (reduced) element.classList.add('is-visible');
      else observer.observe(element);
    };
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }, { rootMargin: '0px 0px -9% 0px', threshold: 0.08 });
    document.querySelectorAll('[data-reveal]').forEach(reveal);
    const mutationObserver = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (!(node instanceof Element)) continue;
          if (node.matches('[data-reveal]')) reveal(node);
          node.querySelectorAll?.('[data-reveal]').forEach(reveal);
        }
      }
    });
    const content = document.querySelector('#content');
    if (content) mutationObserver.observe(content, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      document.documentElement.classList.remove('motion-ready');
    };
  }, [route.path]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const heroProgress = Math.min(Math.max(window.scrollY / 720, 0), 1);
      document.documentElement.style.setProperty('--hero-scroll', heroProgress.toFixed(3));
      document.querySelectorAll('[data-scroll-scene]').forEach((scene) => {
        const rect = scene.getBoundingClientRect();
        const distance = Math.max(scene.offsetHeight - window.innerHeight, 1);
        const progress = Math.min(Math.max(-rect.top / distance, 0), 1);
        scene.style.setProperty('--scene-progress', progress.toFixed(3));
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [route.path]);

  function toggleSave(id) {
    setStore((current) => ({
      ...current,
      saved: current.saved.includes(id) ? current.saved.filter((savedId) => savedId !== id) : [id, ...current.saved],
    }));
  }

  function openProfile(person, teach, learn, own = false) {
    setProfile({ person, teach, learn, own });
  }

  function planPair(person, teach, learn) {
    setProfile(null);
    setRequestTarget({
      kind: 'pair',
      key: requestKey('pair', [person.id], teach, learn),
      title: person.title,
      withName: person.name,
      teach,
      learn,
    });
  }

  function planCircle(circle) {
    setRequestTarget({
      kind: 'circle',
      key: requestKey('circle', [circle.first.id, circle.second.id], circle.teach, circle.learn),
      title: `${circle.teach} to ${circle.learn}, together`,
      withName: `${circle.first.name} and ${circle.second.name}`,
      teach: circle.teach,
      learn: circle.learn,
    });
  }

  function saveRequest(request) {
    const result = addRequest(store.requests, request);
    if (result.duplicate) {
      setToast('This exchange is already in My swaps.');
      return;
    }
    setStore((current) => ({ ...current, requests: result.requests }));
    setRequestTarget(null);
    setToast('Swap saved in My swaps.');
    navigate('/my-swaps');
  }

  function publishOffer(offer) {
    setStore((current) => ({ ...current, offers: [offer, ...current.offers] }));
    setToast('Your skill is ready for matching.');
    navigate('/my-swaps');
  }

  function completeRequest(id) {
    setStore((current) => ({ ...current, requests: current.requests.map((request) => request.id === id ? { ...request, status: 'completed' } : request) }));
    setToast('Session marked complete.');
  }

  function removeRequest(id) {
    setStore((current) => ({ ...current, requests: current.requests.filter((request) => request.id !== id) }));
    setToast('Plan removed.');
  }

  function removeOffer(id) {
    setStore((current) => ({ ...current, offers: current.offers.filter((offer) => offer.id !== id), saved: current.saved.filter((savedId) => savedId !== id) }));
    setToast('Offer removed.');
  }

  let page;
  switch (route.page) {
    case 'home':
      page = <HomePage navigate={navigate} userSkills={userSkills} setUserSkills={setUserSkills} />;
      break;
    case 'explore':
      page = <ExplorePage url={url} navigate={navigate} allPeople={allPeople} saved={store.saved} toggleSave={toggleSave} openProfile={openProfile} userSkills={userSkills} setUserSkills={setUserSkills} />;
      break;
    case 'skill':
      page = <SkillPage userSkills={userSkills} slug={route.slug} navigate={navigate} allPeople={allPeople} saved={store.saved} toggleSave={toggleSave} openProfile={openProfile} />;
      break;
    case 'circles':
      page = <CirclesPage userSkills={userSkills} setUserSkills={setUserSkills} onPlanCircle={planCircle} navigate={navigate} />;
      break;
    case 'how-it-works':
      page = <HowItWorksPage navigate={navigate} />;
      break;
    case 'my-swaps':
      page = <MySwapsPage userSkills={userSkills} navigate={navigate} requests={store.requests} offers={store.offers} savedPeople={savedPeople} openProfile={openProfile} onComplete={completeRequest} onRemove={removeRequest} onRemoveOffer={removeOffer} toggleSave={toggleSave} />;
      break;
    case 'share':
      page = <SharePage navigate={navigate} onPublish={publishOffer} />;
      break;
    case 'about':
      page = <AboutPage navigate={navigate} />;
      break;
    case 'guidelines':
      page = <GuidelinesPage navigate={navigate} />;
      break;
    default:
      page = <NotFoundPage navigate={navigate} />;
  }

  const existingRequest = requestTarget ? store.requests.some((request) => request.key === requestTarget.key && request.status !== 'cancelled') : false;

  return (
    <div className="app-shell">
      <Header route={route} navigate={navigate} savedCount={store.saved.length + store.requests.filter((request) => request.status === 'pending').length} />
      <main id="content" className="route-view" tabIndex="-1" key={route.path}>{page}</main>
      <Footer navigate={navigate} />

      {profile && <ProfileModal selection={profile} onClose={() => setProfile(null)} onPlan={planPair} />}
      {requestTarget && <RequestModal target={requestTarget} existing={existingRequest} onClose={() => setRequestTarget(null)} onSave={saveRequest} />}

      <div className={`toast ${toast ? 'is-visible' : ''}`} role="status" aria-live="polite">
        <Check size={17} /> {toast}
      </div>
    </div>
  );
}
