import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Airplane,
  ArrowRight,
  ArrowsClockwise,
  Barbell,
  Basketball,
  Bicycle,
  BookOpen,
  BookmarkSimple,
  Bread,
  Calculator,
  Camera,
  Check,
  Code,
  Compass,
  CookingPot,
  Desktop,
  Dog,
  FilmSlate,
  FirstAid,
  Flower,
  ForkKnife,
  Globe,
  Guitar,
  Hammer,
  Headphones,
  Lightbulb,
  MapTrifold,
  MagnifyingGlass,
  Microphone,
  MusicNotes,
  Needle,
  PaintBrush,
  PaintBucket,
  Palette,
  PenNib,
  PersonSimpleRun,
  PianoKeys,
  Plant,
  Plus,
  PresentationChart,
  RocketLaunch,
  Scissors,
  Shapes,
  ShieldCheck,
  SneakerMove,
  SwimmingPool,
  Translate,
  UsersThree,
  VideoCamera,
  VinylRecord,
  Wrench,
} from '@phosphor-icons/react';
import { CATEGORIES, PEOPLE, SKILLS } from './data.js';
import { filterPeople, findCircles } from './domain.js';
import {
  CircleCard,
  EmptyState,
  OfferCard,
  RequestCard,
  RouteLink,
  Select,
} from './components.jsx';

const ASSETS = {
  hero: '/assets/hero.webp',
  music: '/assets/music.webp',
  photography: '/assets/photography.webp',
  code: '/assets/code.webp',
  community: '/assets/community-editorial-v2.webp',
  circle: '/assets/circle-editorial-v2.webp',
  craft: '/assets/craft-editorial-v2.webp',
  rehearsal: '/assets/rehearsal-v3.webp',
  fieldPhoto: '/assets/field-photo-v3.webp',
  makerspace: '/assets/makerspace-v3.webp',
  garden: '/assets/garden-v3.webp',
  kitchen: '/assets/kitchen-v3.webp',
  repair: '/assets/repair-v3.webp',
  sketchwalk: '/assets/sketchwalk-v3.webp',
  chesspark: '/assets/chesspark-v3.webp',
  circleSession: '/assets/circle-session-v3.webp',
  textiles: '/assets/textiles-v3.webp',
  language: '/assets/language-v3.webp',
  stargazing: '/assets/stargazing-v3.webp',
  printmaking: '/assets/printmaking-v3.webp',
};

const CATEGORY_PAGES = {
  music: {
    eyebrow: 'MUSIC',
    title: 'One chord can open a whole world.',
    copy: 'Find someone who remembers what the first note felt like.',
    image: ASSETS.rehearsal,
    alt: 'A bassist and drummer rehearsing in a brick music room under amber and blue stage lights',
    mood: 'night',
    detail: 'From counting the beat to playing with someone else. Start with a rhythm you can feel.',
    lessons: [
      ['Find the pulse.', 'Tap four steady beats. Count aloud, then keep the same pace while you change chords.', '5 minutes · no instrument needed'],
      ['Make the change.', 'Practise moving between G and C slowly. Aim for clean notes before you add speed.', '15 minutes · guitar'],
      ['Play it together.', 'Take turns holding the rhythm and playing a melody. Record a short take to hear your progress.', '10 minutes · any two instruments'],
    ],
    skills: ['Guitar', 'Piano'],
  },
  photography: {
    eyebrow: 'PHOTOGRAPHY',
    title: 'Light is everywhere. Learn to see it.',
    copy: 'Trade what you know for a new way of noticing.',
    image: ASSETS.fieldPhoto,
    alt: 'Two photographers learning to frame waves on a windswept rocky coast under a cloudy sky',
    mood: 'coast',
    detail: 'A change of position can change the whole picture. Take the camera you already own outside.',
    lessons: [
      ['Choose one subject.', 'Make three frames of the same scene: wide, medium and close. Notice what each frame leaves out.', '10 minutes · phone or camera'],
      ['Follow the light.', 'Photograph an object from two sides. Compare the edges, shadows and background before editing.', '10 minutes · daylight'],
      ['Make a selection.', 'Choose your strongest photograph and explain why. Ask your partner what they noticed first.', '10 minutes · three photographs'],
    ],
    skills: ['Photography'],
  },
  code: {
    eyebrow: 'CODE',
    title: 'Your first idea deserves a screen.',
    copy: 'Start small. Share the keyboard. Leave with something working.',
    image: ASSETS.makerspace,
    alt: 'Two makers collaborating on a small robot at an accessible electronics bench in an industrial workshop',
    mood: 'workshop',
    detail: 'A question becomes a sketch. A sketch becomes something that responds. Build the first small version.',
    lessons: [
      ['Give the idea a shape.', 'Write one sentence describing what your page should do. Sketch its heading, content and primary action.', '5 minutes · paper'],
      ['Make one thing work.', 'Create a heading, an input and a button. Connect the button to one visible result before adding more.', '25 minutes · laptop'],
      ['Try to break it.', 'Test an empty input, a long answer and keyboard navigation. Fix one problem and explain the change.', '15 minutes · a curious partner'],
    ],
    skills: ['Web design', 'Coding', 'Video editing'],
  },
};

const SKILL_VISUALS = [
  ['Photography', Camera], ['Guitar', Guitar], ['Web design', Code], ['Home cooking', CookingPot], ['Drawing', PenNib],
  ['Piano', PianoKeys], ['Gardening', Plant], ['Language exchange', Translate], ['Cycling', Bicycle], ['Chess', Shapes],
  ['Film editing', FilmSlate], ['Public speaking', Microphone], ['Painting', Palette], ['Woodwork', Hammer], ['Sewing', Needle],
  ['Strength', Barbell], ['Basketball', Basketball], ['Running', PersonSimpleRun], ['Travel planning', MapTrifold], ['First aid', FirstAid],
  ['Dog training', Dog], ['Baking', Bread], ['Mathematics', Calculator], ['Presentations', PresentationChart], ['Music production', Headphones],
  ['Calligraphy', PaintBrush], ['Ceramics', PaintBucket], ['Swimming', SwimmingPool], ['Home repair', Wrench], ['DJing', VinylRecord],
  ['Science', Lightbulb], ['Origami', Shapes], ['Podcasting', Microphone], ['Screenwriting', BookOpen], ['World history', Globe],
  ['Tailoring', Scissors], ['Songwriting', MusicNotes], ['App design', Desktop], ['Nutrition', ForkKnife], ['Flower arranging', Flower],
  ['Hiking', SneakerMove], ['Videography', VideoCamera], ['Architecture', Shapes], ['Geography', Globe], ['Bike repair', Wrench],
  ['Music theory', MusicNotes], ['Portraits', Camera], ['Rocket science', RocketLaunch], ['Pottery', PaintBucket], ['Flight basics', Airplane],
];

function SkillUniverse({ navigate }) {
  return (
    <section className="skill-universe" aria-labelledby="skill-universe-title">
      <div className="skill-universe-heading" data-reveal>
        <span className="eyebrow">FIFTY WAYS TO BEGIN</span>
        <h2 id="skill-universe-title">What you know<br />can take someone further.</h2>
        <p>And what they know can do the same for you.</p>
      </div>
      <div className="skill-rails" aria-label="Fifty skill starting points">
        {[SKILL_VISUALS.slice(0, 25), SKILL_VISUALS.slice(25)].map((row, rowIndex) => (
          <div className={`skill-rail skill-rail-${rowIndex + 1}`} key={rowIndex}>
            {[...row, ...row].map(([label, Icon], index) => (
              <RouteLink
                className="skill-token"
                to={`/explore?q=${encodeURIComponent(label)}`}
                navigate={navigate}
                key={`${label}-${index}`}
                aria-label={`Explore ${label}`}
                aria-hidden={index >= row.length ? 'true' : undefined}
                tabIndex={index >= row.length ? -1 : undefined}
              >
                <Icon size={28} weight="light" aria-hidden="true" />
                <span>{label}</span>
              </RouteLink>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function ImageLink({ image, title, copy, to, navigate, className = '' }) {
  return (
    <RouteLink className={`image-link ${className}`} to={to} navigate={navigate} data-reveal>
      <img src={image} alt="" loading="lazy" />
      <span className="image-link-copy">
        <strong>{title}</strong>
        <span>{copy}</span>
        <span className="blue-link">Explore {title.replace(/\.$/, '').toLowerCase()} <span aria-hidden="true">›</span></span>
      </span>
    </RouteLink>
  );
}

function EditorialHero({ eyebrow, title, copy, image, alt, mood = 'day', children }) {
  return (
    <section className={`world-hero world-hero-${mood}`}>
      <div className="world-hero-heading">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        {copy && <p>{copy}</p>}
        {children}
      </div>
      <figure className="world-hero-photo"><img src={image} alt={alt} fetchPriority="high" /></figure>
    </section>
  );
}

function ImageJournal({ eyebrow, title, entries, navigate }) {
  return <section className="image-journal"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2><div className="journal-grid">{entries.map(({ image, alt, title: itemTitle, copy, link, label }) => <article className="journal-card" key={itemTitle}><figure><img src={image} alt={alt} loading="lazy" /></figure><h3>{itemTitle}</h3><p>{copy}</p><RouteLink className="blue-link" to={link} navigate={navigate}>{label} <span aria-hidden="true">›</span></RouteLink></article>)}</div></section>;
}

export function HomePage({ navigate, userSkills, setUserSkills }) {
  const [teach, setTeach] = useState(userSkills.teach);
  const [learn, setLearn] = useState(userSkills.learn);

  function findMatch(event) {
    event.preventDefault();
    setUserSkills({ teach, learn });
    navigate(`/explore?teach=${encodeURIComponent(teach)}&learn=${encodeURIComponent(learn)}&mutual=1`);
  }

  return (
    <>
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero-copy" data-reveal>
          <h1 id="home-title"><span>A little of your talent.</span><span>A world of possibility.</span></h1>
          <p>Trade what you know for something you’ve always wanted to learn.</p>
          <div className="hero-actions">
            <RouteLink className="button" to="/explore" navigate={navigate}>Find your swap</RouteLink>
            <RouteLink className="blue-link" to="/how-it-works" navigate={navigate}>See how it works <span aria-hidden="true">›</span></RouteLink>
          </div>
        </div>
        <div className="hero-media" aria-hidden="true">
          <img src={ASSETS.hero} alt="" fetchPriority="high" />
        </div>
        <div className="hero-captions" aria-hidden="true">
          <span>Learn your first chords.</span>
          <span>Share your eye for a great photo.</span>
        </div>
      </section>

      <section className="match-strip" aria-label="Find a mutual skill match">
        <form onSubmit={findMatch}>
          <Select id="home-teach" label="I can teach" value={teach} onChange={setTeach} />
          <Select id="home-learn" label="I want to learn" value={learn} onChange={setLearn} />
          <button className="blue-link match-submit" type="submit">Show matching people <span aria-hidden="true">›</span></button>
        </form>
        <span className="demo-label">Demo community</span>
      </section>

      <section className="category-panels" aria-label="Featured skills">
        <ImageLink image={ASSETS.music} title="Music." copy="Your first song starts here." to="/skills/music" navigate={navigate} />
        <ImageLink image={ASSETS.photography} title="Photography." copy="See the everyday differently." to="/skills/photography" navigate={navigate} />
        <ImageLink image={ASSETS.code} title="Code." copy="Build something of your own." to="/skills/code" navigate={navigate} />
      </section>

      <SkillUniverse navigate={navigate} />

      <section className="editorial-panel editorial-community" data-reveal>
        <img src={ASSETS.community} alt="Two people exchanging sketching and photography skills at a bright table" loading="lazy" />
        <div className="editorial-copy">
          <span className="eyebrow">LEARN TOGETHER</span>
          <h2>Teach one thing.<br />Change two futures.</h2>
          <RouteLink className="blue-link" to="/explore" navigate={navigate}>Meet the community <span aria-hidden="true">›</span></RouteLink>
        </div>
      </section>

      <section className="editorial-panel editorial-circle" data-reveal>
        <img src={ASSETS.circle} alt="A guitar, camera and laptop connected by a blue ribbon" loading="lazy" />
        <div className="editorial-copy editorial-copy-dark">
          <span className="eyebrow">SWAP CIRCLES</span>
          <h2>Two can miss.<br />Three can make a circle.</h2>
          <RouteLink className="blue-link" to="/circles" navigate={navigate}>Explore circles <span aria-hidden="true">›</span></RouteLink>
        </div>
      </section>
    </>
  );
}

export function ExplorePage({ url, navigate, allPeople, saved, toggleSave, openProfile, userSkills, setUserSkills }) {
  const params = useMemo(() => new URLSearchParams(url.search), [url.search]);
  const initialLearn = SKILLS.includes(params.get('learn')) ? params.get('learn') : '';
  const initialTeach = SKILLS.includes(params.get('teach')) ? params.get('teach') : userSkills.teach;
  const [query, setQuery] = useState(params.get('q') || '');
  const [category, setCategory] = useState('All skills');
  const [teach, setTeach] = useState(initialTeach);
  const [learn, setLearn] = useState(initialLearn);
  const [mutualOnly, setMutualOnly] = useState(params.get('mutual') === '1' && Boolean(initialLearn));
  const [savedOnly, setSavedOnly] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const nextLearn = SKILLS.includes(params.get('learn')) ? params.get('learn') : '';
    const nextTeach = SKILLS.includes(params.get('teach')) ? params.get('teach') : userSkills.teach;
    setQuery(params.get('q') || '');
    setTeach(nextTeach);
    setLearn(nextLearn);
    setMutualOnly(params.get('mutual') === '1' && Boolean(nextLearn));
    if (params.get('focus') === 'search') requestAnimationFrame(() => searchRef.current?.focus());
  }, [params, userSkills.teach]);

  useEffect(() => {
    if (teach && learn) setUserSkills({ teach, learn });
  }, [teach, learn, setUserSkills]);

  useEffect(() => {
    if (!params.has('q') && !params.has('learn') && params.get('focus') !== 'search') return undefined;
    const frame = requestAnimationFrame(() => {
      document.querySelector('#explore-heading')?.scrollIntoView({ block: 'start', behavior: 'instant' });
      if (params.get('focus') === 'search') searchRef.current?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [params]);

  const results = useMemo(() => filterPeople(allPeople, {
    query,
    category,
    teach,
    learn,
    mutual: mutualOnly,
  }).filter((person) => !savedOnly || saved.includes(person.id)), [allPeople, query, category, teach, learn, mutualOnly, savedOnly, saved]);

  function resetFilters() {
    setQuery('');
    setCategory('All skills');
    setLearn('');
    setMutualOnly(false);
    setSavedOnly(false);
  }

  return (
    <>
      <EditorialHero eyebrow="EXPLORE THE COMMUNITY" title={<>There’s a whole world<br />of know-how around you.</>} copy="Grow a cutting. Fix a puncture. Find your first chord. Start with one thing you want to try." image={ASSETS.garden} alt="Three gardeners of different generations exchanging seedlings among sunlit raised beds" mood="garden">
        <a className="blue-link" href="#explore-heading">Browse the lessons <span aria-hidden="true">↓</span></a>
      </EditorialHero>

      <section className="explore-workspace" aria-labelledby="explore-heading">
        <div className="section-heading" data-reveal>
          <div><span className="eyebrow">THE COMMUNITY</span><h2 id="explore-heading">Small lessons. Big openings.</h2></div>
          <RouteLink className="button button-quiet" to="/share" navigate={navigate}><Plus size={16} /> Share a skill</RouteLink>
        </div>

        <div className="filters" data-reveal>
          <label className="search-field" htmlFor="skill-search">
            <MagnifyingGlass size={18} weight="light" aria-hidden="true" />
            <span className="sr-only">Search people and skills</span>
            <input ref={searchRef} id="skill-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search people and skills" />
          </label>
          <label className="filter-select" htmlFor="category-filter">
            <span className="sr-only">Category</span>
            <select id="category-filter" value={category} onChange={(event) => setCategory(event.target.value)}>
              {CATEGORIES.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label className="filter-select" htmlFor="learn-filter">
            <span className="sr-only">Skill to learn</span>
            <select id="learn-filter" value={learn} onChange={(event) => { setLearn(event.target.value); if (!event.target.value) setMutualOnly(false); }}>
              <option value="">Any skill</option>
              {SKILLS.map((skill) => <option key={skill}>{skill}</option>)}
            </select>
          </label>
          <button className={`filter-button ${savedOnly ? 'is-active' : ''}`} aria-pressed={savedOnly} onClick={() => setSavedOnly((value) => !value)}>
            <BookmarkSimple size={17} weight={savedOnly ? 'fill' : 'regular'} /> Saved
          </button>
        </div>

        <div className="results-toolbar" data-reveal>
          <p><strong>{results.length}</strong> {results.length === 1 ? 'person' : 'people'} found</p>
          <label className={`checkbox-label ${!learn ? 'is-disabled' : ''}`}>
            <input type="checkbox" checked={mutualOnly} disabled={!learn} onChange={(event) => setMutualOnly(event.target.checked)} />
            Mutual matches only
          </label>
        </div>

        {mutualOnly && results.length > 0 && (
          <div className="mutual-banner" data-reveal>
            <Check size={18} /> Both sides line up: you teach {teach}, and learn {learn}.
          </div>
        )}

        {results.length ? (
          <div className={`offer-grid ${results.length <= 2 ? `compact-results compact-results-${results.length}` : ''}`}>
            {results.map((person) => (
              <OfferCard
                key={person.id}
                person={person}
                teach={teach || userSkills.teach}
                learn={learn || userSkills.learn}
                saved={saved.includes(person.id)}
                toggleSave={toggleSave}
                onOpen={() => openProfile(person, teach || userSkills.teach, learn || userSkills.learn, person.own)}
                own={person.own}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No one fits every filter yet."
            action={<button className="blue-link" onClick={resetFilters}>Clear filters <span aria-hidden="true">›</span></button>}
          >Try another skill, or build a three-person circle.</EmptyState>
        )}
      </section>
      <ImageJournal eyebrow="THE EVERYDAY EXCHANGE" title="Skills that stay with you." navigate={navigate} entries={[
        { image: ASSETS.textiles, alt: 'Two pairs of hands mending denim with orange thread among colorful textiles', title: 'A small stitch. A longer life.', copy: 'Practise a running stitch, patch a worn pocket and learn when to mend by hand. Bring one piece you want to keep wearing.', link: '/explore?q=Sewing', label: 'Find a mending lesson' },
        { image: ASSETS.language, alt: 'Two friends practising vocabulary over dinner in a rain-lit ramen shop', title: 'Let the conversation wander.', copy: 'Order a meal, introduce a friend and ask a follow-up question. Take turns speaking your strongest language and learning another.', link: '/explore?learn=Japanese', label: 'Try a language exchange' },
      ]} />
    </>
  );
}

export function SkillPage({ userSkills, slug, navigate, allPeople, saved, toggleSave, openProfile }) {
  const page = CATEGORY_PAGES[slug];
  const people = allPeople.filter((person) => page.skills.includes(person.teach));
  return (
    <>
      <EditorialHero eyebrow={page.eyebrow} title={page.title} copy={page.copy} image={page.image} alt={page.alt} mood={page.mood}>
        <RouteLink className="blue-link" to={`/explore?learn=${encodeURIComponent(page.skills[0])}`} navigate={navigate}>Find a {slug === 'music' ? 'music' : slug === 'code' ? 'coding' : 'photography'} partner <span aria-hidden="true">›</span></RouteLink>
      </EditorialHero>
      <section className="lesson-guide" aria-labelledby="lesson-guide-title">
        <div className="lesson-guide-intro"><span className="eyebrow">YOUR FIRST SESSION</span><h2 id="lesson-guide-title">{slug === 'music' ? 'Less watching. More playing.' : slug === 'photography' ? 'Three frames. A new perspective.' : 'From “what if” to “it works”.'}</h2><p>{page.detail}</p></div>
        <div className="lesson-guide-grid">{page.lessons.map(([title, body, meta], index) => <article key={title}><span className="lesson-step">0{index + 1}</span><h3>{title}</h3><p>{body}</p><small>{meta}</small></article>)}</div>
      </section>
      <section className="curated-section">
        <div className="section-heading" data-reveal>
          <div><span className="eyebrow">START SMALL</span><h2>Meet your first teacher.</h2></div>
          <RouteLink className="blue-link" to="/explore" navigate={navigate}>Explore every skill <span aria-hidden="true">›</span></RouteLink>
        </div>
        <div className="offer-grid curated-grid">
          {people.map((person) => (
            <OfferCard
              key={person.id}
              person={person}
              teach={userSkills.teach}
              learn={userSkills.learn}
              saved={saved.includes(person.id)}
              toggleSave={toggleSave}
              onOpen={() => openProfile(person, userSkills.teach, userSkills.learn, person.own)}
              own={person.own}
            />
          ))}
        </div>
      </section>
      <section className="specific-closing"><span className="eyebrow">BEFORE YOU BEGIN</span><h2>{slug === 'music' ? 'Bring your instrument. Leave perfection at home.' : slug === 'photography' ? 'Your phone is enough. Your eye does the rest.' : 'A browser. An idea. Room to experiment.'}</h2><p>{slug === 'music' ? 'Agree on a quiet place and check your tuning. If you are meeting online, test your sound before the lesson.' : slug === 'photography' ? 'Charge your battery and ask before photographing people. Meet in a public place and give yourselves time to walk.' : 'Bring a charged laptop and a project folder. Use sample data and keep passwords out of shared screens.'}</p><RouteLink className="blue-link" to="/share" navigate={navigate}>Offer something in return <span aria-hidden="true">›</span></RouteLink></section>
    </>
  );
}

export function CirclesPage({ userSkills, setUserSkills, onPlanCircle, navigate }) {
  const [teach, setTeach] = useState(userSkills.teach);
  const [learn, setLearn] = useState(userSkills.learn);
  const circles = useMemo(() => findCircles(PEOPLE, teach, learn), [teach, learn]);

  useEffect(() => {
    if (teach !== learn) setUserSkills({ teach, learn });
  }, [teach, learn, setUserSkills]);

  return (
    <>
      <EditorialHero eyebrow="SWAP CIRCLES" title={<>Three interests.<br />One shared beginning.</>} copy="You help one person. They help another. The next lesson comes back to you." image={ASSETS.circleSession} alt="Three adults with a ukulele, sketchbook and laptop exchanging interests in an emerald community hall" mood="circle">
        <a className="blue-link" href="#circle-heading">See who completes your circle <span aria-hidden="true">↓</span></a>
      </EditorialHero>

      <section className="circle-workspace" aria-labelledby="circle-heading">
        <div className="section-heading circle-title" data-reveal>
          <div><span className="eyebrow">BUILD YOUR CIRCLE</span><h2 id="circle-heading">Choose your two skills.</h2></div>
          <div className="circle-selectors">
            <Select id="circle-teach" label="I teach" value={teach} onChange={setTeach} />
            <Select id="circle-learn" label="I learn" value={learn} onChange={setLearn} />
          </div>
        </div>
        {teach === learn ? (
          <EmptyState title="Choose two different skills.">A circle begins with something to give and something new to learn.</EmptyState>
        ) : circles.length ? (
          <div className="circle-list">{circles.slice(0, 3).map((circle) => <CircleCard key={circle.id} circle={circle} onPlan={onPlanCircle} />)}</div>
        ) : (
          <EmptyState
            title="That circle is still forming."
            action={<RouteLink className="blue-link" to="/share" navigate={navigate}>Share what you know <span aria-hidden="true">›</span></RouteLink>}
          >Try another pair of skills to explore the available demo circles. Your own offers are kept separate from other members.</EmptyState>
        )}
      </section>
    </>
  );
}

const STORY = [
  {
    number: '01',
    kicker: 'SHARE ONE THING',
    title: 'Name the thing you can show.',
    copy: '“Sketch a doorway in ten minutes” is a better first lesson than “learn to draw”. Pick a result your partner can try before you leave.',
    image: ASSETS.sketchwalk,
    alt: 'Two urban sketchers studying terracotta buildings on a wet cobbled street',
  },
  {
    number: '02',
    kicker: 'FIND THE EXCHANGE',
    title: 'Make room for both of you.',
    copy: 'Read what your partner wants to learn. Agree on a starting level and split the time. Ask questions before you make a plan.',
    image: ASSETS.chesspark,
    alt: 'An older man and a younger woman discussing chess in an autumn park at dusk',
  },
  {
    number: '03',
    kicker: 'COME PREPARED',
    title: 'A little preparation goes a long way.',
    copy: 'Choose a date, gather your materials and write down one question. After your lesson, keep one small thing to practise.',
    image: ASSETS.craft,
    alt: 'A prepared sketchbook, pencils, paper model and handmade cup on a desk',
  },
];

export function HowItWorksPage({ navigate }) {
  return (
    <>
      <section className="how-intro" data-reveal>
        <span className="eyebrow">HOW IT WORKS</span>
        <h1>You already have<br />the first half.</h1>
        <p>Bring one thing you know. Leave with one thing you didn’t.</p>
      </section>
      <div className="story-sequence">
        {STORY.map((item) => (
          <section className="story-chapter" data-scroll-scene key={item.number}>
            <div className="story-sticky">
              <img src={item.image} alt={item.alt} loading="lazy" />
              <div className="story-copy">
                <span className="story-number">{item.number}</span>
                <span className="eyebrow">{item.kicker}</span>
                <h2>{item.title}</h2>
                <p>{item.copy}</p>
              </div>
            </div>
          </section>
        ))}
      </div>
      <section className="how-closing" data-reveal>
        <h2>Your next beginning may be something you already know.</h2>
        <div><RouteLink className="button" to="/explore" navigate={navigate}>Find your swap</RouteLink><RouteLink className="blue-link" to="/share" navigate={navigate}>Share a skill <span aria-hidden="true">›</span></RouteLink></div>
      </section>
    </>
  );
}

export function MySwapsPage({ userSkills, navigate, requests, offers, savedPeople, openProfile, onComplete, onRemove, onRemoveOffer, toggleSave }) {
  return (
    <>
      <section className="simple-hero" data-reveal>
        <span className="eyebrow">MY SWAPS</span>
        <h1>Every beginning,<br />right where you left it.</h1>
        <RouteLink className="button" to="/explore" navigate={navigate}>Find another swap</RouteLink>
      </section>
      <section className="account-section" aria-labelledby="plans-heading">
        <div className="section-heading" data-reveal><div><span className="eyebrow">PLANS</span><h2 id="plans-heading">Your sessions.</h2></div><span className="count-label">{requests.length}</span></div>
        {requests.length ? (
          <div className="request-list">{requests.map((request) => <RequestCard key={request.id} request={request} onComplete={onComplete} onRemove={onRemove} />)}</div>
        ) : (
          <EmptyState title="No sessions planned yet." action={<RouteLink className="blue-link" to="/explore" navigate={navigate}>Meet a teacher <span aria-hidden="true">›</span></RouteLink>}>A saved plan will appear here.</EmptyState>
        )}
      </section>

      <section className="account-section muted-section" aria-labelledby="offers-heading">
        <div className="section-heading" data-reveal><div><span className="eyebrow">SHARED BY YOU</span><h2 id="offers-heading">Your offers.</h2></div><RouteLink className="blue-link" to="/share" navigate={navigate}>Add an offer <span aria-hidden="true">›</span></RouteLink></div>
        {offers.length ? offers.map((offer) => (
          <article className="own-offer-row" key={offer.id} data-reveal>
            <div><strong>{offer.title}</strong><span>{offer.teach} for {offer.learn}</span></div>
            <div><button className="text-button" onClick={() => openProfile(offer, offer.teach, offer.learn, true)}>View</button><button className="text-button quiet-action" onClick={() => onRemoveOffer(offer.id)}>Remove</button></div>
          </article>
        )) : <p className="section-empty">You have not shared a skill yet.</p>}
      </section>

      <section className="account-section" aria-labelledby="saved-heading">
        <div className="section-heading" data-reveal><div><span className="eyebrow">SAVED</span><h2 id="saved-heading">People to revisit.</h2></div><span className="count-label">{savedPeople.length}</span></div>
        {savedPeople.length ? (
          <div className="offer-grid curated-grid">{savedPeople.map((person) => <OfferCard key={person.id} person={person} teach={userSkills.teach} learn={userSkills.learn} saved toggleSave={toggleSave} onOpen={() => openProfile(person, userSkills.teach, userSkills.learn, person.own)} />)}</div>
        ) : <p className="section-empty">Save an offer in Explore and it will appear here.</p>}
      </section>
    </>
  );
}

export function SharePage({ navigate, onPublish }) {
  const [teach, setTeach] = useState('Photography');
  const [learn, setLearn] = useState('Guitar');
  const [error, setError] = useState('');

  function submit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (teach === learn) {
      setError('Choose a different skill to learn.');
      return;
    }
    const fields = Object.fromEntries(['name', 'title', 'outcome', 'bio', 'need'].map(key => [key, String(form.get(key) || '').trim()]));
    if (Object.values(fields).some(value => !value) || fields.outcome.length < 12 || fields.bio.length < 12) {
      setError('Complete every field. Your outcome and introduction each need at least 12 characters.');
      return;
    }
    onPublish({
      id: crypto.randomUUID(),
      name: form.get('name').trim(),
      teach,
      learn,
      title: form.get('title').trim(),
      outcome: form.get('outcome').trim(),
      bio: form.get('bio').trim(),
      need: form.get('need').trim(),
      duration: Number(form.get('duration')),
      level: 'Beginner',
      tint: 'blue',
      own: true,
    });
  }

  return (
    <section className="share-layout">
      <EditorialHero eyebrow="SHARE A SKILL" title={<>The thing you do naturally<br />could be someone’s first.</>} copy="A family recipe. A shortcut you figured out. A technique worth passing on. Give your lesson a name." image={ASSETS.kitchen} alt="An older man in teal and a woman in a red apron rolling flatbread in a colorful tiled kitchen" mood="kitchen" />
      <div className="share-form-wrap" data-reveal>
        <p className="share-intro">Make the first lesson small, clear and welcoming.</p>
        <form className="share-form" onSubmit={submit}>
          <label>Your name<input name="name" maxLength={60} required placeholder="e.g. Jordan P." /></label>
          <div className="form-row">
            <Select id="share-teach" label="I can teach" value={teach} onChange={(value) => { setTeach(value); setError(''); }} />
            <Select id="share-learn" label="I want to learn" value={learn} onChange={(value) => { setLearn(value); setError(''); }} />
          </div>
          <label>Offer title<input name="title" maxLength={90} required placeholder="e.g. Take a portrait in window light" /></label>
          <label>A concrete first outcome<textarea name="outcome" maxLength={500} minLength={12} rows={2} required placeholder="What will someone make or understand?" /></label>
          <label>A short introduction<textarea name="bio" maxLength={500} minLength={12} rows={3} required placeholder="How will you make a beginner feel welcome?" /></label>
          <label>What to bring<input name="need" maxLength={300} required placeholder="e.g. A phone camera and a nearby window" /></label>
          <label>Time for each skill<select name="duration" defaultValue="30"><option value="30">30 minutes</option><option value="45">45 minutes</option><option value="60">60 minutes</option></select></label>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="button button-full" type="submit">Publish this offer <ArrowRight size={17} /></button>
          <p className="fine-print">This demo saves the offer only on this device.</p>
        </form>
        <RouteLink className="blue-link back-link" to="/explore" navigate={navigate}>Browse the community <span aria-hidden="true">›</span></RouteLink>
      </div>
    </section>
  );
}

export function AboutPage({ navigate }) {
  return (
    <>
      <EditorialHero eyebrow="WHY SKILLSWAP" title={<>Useful things deserve<br />to be passed on.</>} copy="The repair that saves a bike. The recipe that outlives its notebook. We all know something worth sharing." image={ASSETS.repair} alt="Two mechanics replacing an inner tube in a narrow bicycle workshop with orange cabinets and hanging wheels" mood="repair" />
      <section className="prose-section" data-reveal>
        <h2>A fairer way to begin.</h2>
        <p>Learning often begins with someone beside you saying, “Try it this way.” Minerva makes room for that moment. Each offer names a small outcome, the materials to bring and something the teacher wants to learn in return.</p>
        <h2>Time is the shared currency.</h2><p>There are no paid tiers or bidding wars in this prototype. Each partner gets equal teaching time. A circle extends the same idea to three people when a direct exchange cannot connect their interests.</p>
        <p>The prototype uses fictional profiles and stores plans locally. It demonstrates the journey without pretending a real message was sent.</p>
        <RouteLink className="button" to="/how-it-works" navigate={navigate}>See how it works</RouteLink>
      </section>
      <ImageJournal eyebrow="CURIOSITY HAS NO FINISH LINE" title="There is always another first." navigate={navigate} entries={[
        { image: ASSETS.stargazing, alt: 'Three people with a telescope under a vast starry sky on a mountain ridge', title: 'Look up. Ask more.', copy: 'Learn how to set up a telescope, find a bright constellation and keep an observing log. Share the wonder as well as the technique.', link: '/explore?q=Astronomy', label: 'Explore astronomy' },
        { image: ASSETS.printmaking, alt: 'Two printmakers using rollers and yellow ink in a colorful industrial studio', title: 'Make something unmistakably yours.', copy: 'Roll ink onto a plate, pull your first print and compare the marks. A shared workshop gives every experiment a second pair of eyes.', link: '/explore?q=Printmaking', label: 'Discover printmaking' },
      ]} />
    </>
  );
}

export function GuidelinesPage({ navigate }) {
  const items = [
    ['Keep the first lesson small.', 'Promise one clear result that fits the time you set.'],
    ['Respect equal time.', 'Every person should have room to teach, learn and ask questions.'],
    ['Meet with care.', 'Use a public or trusted setting, protect personal information and leave any exchange that feels wrong.'],
    ['Be honest about experience.', 'Share what you know without claiming credentials you do not have.'],
  ];
  return (
    <>
      <section className="simple-hero guidelines-hero" data-reveal>
        <ShieldCheck size={39} weight="light" />
        <span className="eyebrow">COMMUNITY GUIDELINES</span>
        <h1>Good people make<br />good exchanges.</h1>
      </section>
      <section className="guideline-list">
        {items.map(([title, copy], index) => <article key={title} data-reveal><span>0{index + 1}</span><div><h2>{title}</h2><p>{copy}</p></div></article>)}
        <div className="guideline-cta" data-reveal><UsersThree size={28} weight="light" /><p>A real public launch would also need verified accounts, reporting, moderation and safeguarding.</p><RouteLink className="blue-link" to="/explore" navigate={navigate}>Explore the demo <span aria-hidden="true">›</span></RouteLink></div>
      </section>
      <section className="submission-note" aria-labelledby="submission-note-title">
        <span className="eyebrow">DESIGN CHAMPIONSHIP</span>
        <h2 id="submission-note-title">Built to be understood.</h2>
        <div className="submission-note-grid">
          <div><h3>Original work</h3><p>Minerva is a custom React/Vite creation made for this championship. It is not a CMS or ready-made template.</p></div>
          <div><h3>AI, disclosed</h3><p>AI helped with research, image generation, copy drafts, code assistance and critique. The student selected, edited, tested and can explain the final work.</p></div>
          <div><h3>Ready to present</h3><p>The project folder includes source code, design and concept documentation, an AI usage log, attribution and a judge walkthrough.</p></div>
        </div>
      </section>
    </>
  );
}

export function NotFoundPage({ navigate }) {
  return (
    <section className="not-found" data-reveal>
      <Compass size={42} weight="light" />
      <span className="eyebrow">PAGE NOT FOUND</span>
      <h1>That path doesn’t lead to a skill yet.</h1>
      <RouteLink className="button" to="/" navigate={navigate}>Return home</RouteLink>
    </section>
  );
}
