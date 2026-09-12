import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowsClockwise,
  BagSimple,
  BookmarkSimple,
  CalendarBlank,
  Camera,
  CaretRight,
  Check,
  Clock,
  Code,
  Globe,
  Guitar,
  MagnifyingGlass,
  Microphone,
  PaintBrush,
  PianoKeys,
  Strategy,
  VideoCamera,
  X,
  CookingPot,
  Plant,
  Wrench,
  Needle,
  MoonStars,
  Palette,
} from '@phosphor-icons/react';
import { CATEGORY, SKILLS } from './data.js';
import { isMutual, localDate } from './domain.js';

const iconMap = {
  Guitar,
  Photography: Camera,
  'Web design': Code,
  Coding: Code,
  Japanese: Globe,
  Drawing: PaintBrush,
  Ceramics: PaintBrush,
  'Public speaking': Microphone,
  'Video editing': VideoCamera,
  Piano: PianoKeys,
  Chess: Strategy,
  'Home cooking': CookingPot,
  Gardening: Plant,
  'Bike repair': Wrench,
  Sewing: Needle,
  Astronomy: MoonStars,
  Printmaking: Palette,
};

export function SkillIcon({ skill, size = 24, ...props }) {
  const Icon = iconMap[skill] || ArrowsClockwise;
  return <Icon size={size} weight="light" aria-hidden="true" {...props} />;
}

export function RouteLink({ to, navigate, children, onClick, ...props }) {
  return (
    <a
      href={to}
      onClick={(event) => {
        onClick?.(event);
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          props.target
        ) return;
        event.preventDefault();
        navigate(to);
      }}
      {...props}
    >
      {children}
    </a>
  );
}

const NAV_ITEMS = [
  ['/explore', 'Explore'],
  ['/skills/music', 'Music'],
  ['/skills/photography', 'Photography'],
  ['/skills/code', 'Code'],
  ['/circles', 'Circles'],
  ['/how-it-works', 'How it works'],
];

const LOCAL_TITLES = {
  explore: 'Explore skills',
  music: 'Music',
  photography: 'Photography',
  code: 'Code',
  circles: 'Swap circles',
  'how-it-works': 'How it works',
  'my-swaps': 'My swaps',
  share: 'Share a skill',
  about: 'About Minerva',
  guidelines: 'Community guidelines',
};

export function Header({ route, navigate, savedCount }) {
  const active = (to) => route.path === to || (to !== '/' && route.path.startsWith(to));
  const localKey = route.page === 'skill' ? route.slug : route.page;
  const localTitle = LOCAL_TITLES[localKey];

  return (
    <>
      <a className="skip-link" href="#content">Skip to content</a>
      <header className={`global-header ${localTitle ? 'has-local-nav' : ''}`}>
        <nav className="global-nav" aria-label="Global navigation">
          <RouteLink className="nav-mark" to="/" navigate={navigate} aria-label="Minerva home">
            <img className="nav-mark-image" src="/assets/minerva-mark.png" alt="" />
          </RouteLink>

          <div id="global-nav-links" className="global-nav-links">
            {NAV_ITEMS.map(([to, label]) => (
              <RouteLink
                key={to}
                to={to}
                navigate={navigate}
                aria-current={active(to) ? 'page' : undefined}
              >
                {label}
              </RouteLink>
            ))}
          </div>

          <div className="nav-tools">
            <RouteLink className="nav-icon" to="/explore?focus=search" navigate={navigate} aria-label="Search skills">
              <MagnifyingGlass size={18} weight="light" aria-hidden="true" />
            </RouteLink>
            <RouteLink className="nav-icon nav-bag" to="/my-swaps" navigate={navigate} aria-label={`My swaps${savedCount ? `, ${savedCount} saved items` : ''}`}>
              <BagSimple size={18} weight="light" aria-hidden="true" />
              {savedCount > 0 && <span aria-hidden="true">{Math.min(savedCount, 9)}</span>}
            </RouteLink>
          </div>
        </nav>
        {localTitle && (
          <nav className="local-nav" aria-label={`${localTitle} navigation`}>
            <div className="local-nav-inner">
              <RouteLink className="local-nav-title" to={route.path} navigate={navigate}>{localTitle}</RouteLink>
              <div className="local-nav-links">
                <RouteLink to="/explore" navigate={navigate}>Community</RouteLink>
                <RouteLink to="/how-it-works" navigate={navigate}>How it works</RouteLink>
                <RouteLink className="local-nav-cta" to="/share" navigate={navigate}>Share</RouteLink>
              </div>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}

export function Footer({ navigate }) {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-columns">
          <div>
            <h2>Discover</h2>
            <RouteLink to="/explore" navigate={navigate}>Explore skills</RouteLink>
            <RouteLink to="/skills/music" navigate={navigate}>Music</RouteLink>
            <RouteLink to="/skills/photography" navigate={navigate}>Photography</RouteLink>
            <RouteLink to="/skills/code" navigate={navigate}>Code</RouteLink>
          </div>
          <div>
            <h2>Exchange</h2>
            <RouteLink to="/circles" navigate={navigate}>Swap circles</RouteLink>
            <RouteLink to="/share" navigate={navigate}>Share a skill</RouteLink>
            <RouteLink to="/my-swaps" navigate={navigate}>My swaps</RouteLink>
          </div>
          <div>
            <h2>Minerva</h2>
            <RouteLink to="/how-it-works" navigate={navigate}>How it works</RouteLink>
            <RouteLink to="/about" navigate={navigate}>About</RouteLink>
            <RouteLink to="/guidelines" navigate={navigate}>Community guidelines</RouteLink>
          </div>
        </div>
        <div className="footer-legal">
          <span>Copyright © 2026 Minerva. Demo only.</span>
          <span>Everyone teaches. Everyone learns.</span>
        </div>
      </div>
    </footer>
  );
}

export function Select({ label, value, onChange, id, skills = SKILLS, ...props }) {
  return (
    <label className="select-label" htmlFor={id}>
      <span>{label}</span>
      <select id={id} value={value} onChange={(event) => onChange(event.target.value)} {...props}>
        {skills.map((skill) => <option key={skill}>{skill}</option>)}
      </select>
    </label>
  );
}

export function Avatar({ person }) {
  return (
    <span className={`avatar ${person.tint || 'blue'}`} aria-hidden="true">
      {person.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}
    </span>
  );
}

export function Modal({ title, children, onClose, wide = false }) {
  const ref = useRef(null);
  const returnFocus = useRef(null);

  useEffect(() => {
    returnFocus.current = document.activeElement;
    const dialog = ref.current;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (!dialog.open) dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = oldOverflow;
      returnFocus.current?.focus?.({ preventScroll: true });
    };
  }, []);

  return (
    <dialog
      className={`modal ${wide ? 'modal-wide' : ''}`}
      ref={ref}
      aria-labelledby="modal-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
    >
      <div className="modal-inner">
        <button className="icon-button modal-close" aria-label="Close dialog" onClick={onClose}>
          <X size={22} />
        </button>
        <h2 id="modal-title">{title}</h2>
        {children}
      </div>
    </dialog>
  );
}

export function OfferCard({ person, teach, learn, saved, toggleSave, onOpen, own = false }) {
  const mutual = isMutual(person, teach, learn);
  return (
    <article className="offer-card" data-reveal>
      <div className="offer-meta">
        <span>{CATEGORY[person.teach]}</span>
        {!own && (
          <button
            className={`icon-button save-button ${saved ? 'is-saved' : ''}`}
            aria-label={`${saved ? 'Remove' : 'Save'} ${person.name}'s offer`}
            aria-pressed={saved}
            onClick={() => toggleSave(person.id)}
          >
            <BookmarkSimple size={20} weight={saved ? 'fill' : 'regular'} />
          </button>
        )}
      </div>
      <SkillIcon className="offer-icon" skill={person.teach} size={44} />
      <h2>{person.title}</h2>
      <p className="offer-outcome">{person.outcome}</p>
      <div className="person-line">
        <Avatar person={person} />
        <div>
          <strong>{person.name}</strong>
          <span>{person.level || 'Beginner'} · {person.duration} min</span>
        </div>
      </div>
      <dl className="exchange-pair">
        <div><dt>Can teach</dt><dd>{person.teach}</dd></div>
        <ArrowsClockwise size={19} weight="light" aria-hidden="true" />
        <div><dt>Wants to learn</dt><dd>{person.learn}</dd></div>
      </dl>
      <div className="offer-bottom">
        <span className={mutual ? 'mutual-label' : 'quiet'}>
          {own ? 'Your offer' : mutual ? <><Check size={14} /> Mutual match</> : 'Open to exchange'}
        </span>
        <button className="text-button" onClick={() => onOpen(person)}>
          {own ? 'View offer' : 'View swap'} <CaretRight size={14} />
        </button>
      </div>
    </article>
  );
}

export function ProfileModal({ selection, onClose, onPlan }) {
  const { person, teach, learn, own } = selection;
  const mutual = isMutual(person, teach, learn);
  return (
    <Modal title={person.title} onClose={onClose}>
      <div className="profile-person">
        <Avatar person={person} />
        <div>
          <strong>{person.name}</strong>
          <p>Shares {person.teach.toLowerCase()} · {person.level || 'Beginner'} friendly</p>
        </div>
      </div>
      <p className="profile-bio">{person.bio}</p>
      <div className="lesson-block">
        <span className="eyebrow">YOUR FIRST SESSION</span>
        <h3>{person.outcome}</h3>
        <p><Clock size={17} /> {person.duration} minutes for each skill</p>
      </div>
      <div className="profile-details">
        <div><h4>Bring along</h4><p>{person.need}</p></div>
        <div><h4>{person.name.split(' ')[0]} wants to learn</h4><p>{person.learn}</p></div>
      </div>
      {!own && (
        <div className={`match-reason ${mutual ? 'is-positive' : ''}`}>
          <ArrowsClockwise size={21} weight="light" />
          <p>
            {mutual
              ? `You can teach ${teach.toLowerCase()}, and ${person.name.split(' ')[0]} can teach ${learn.toLowerCase()}.`
              : `Offer ${person.learn.toLowerCase()} and learn ${person.teach.toLowerCase()} in equal time.`}
          </p>
        </div>
      )}
      {!own && (
        <button className="button button-full" onClick={() => onPlan(person, person.learn, person.teach)}>
          {mutual ? 'Plan this swap' : `I can teach ${person.learn.toLowerCase()}. Plan swap`} <ArrowRight size={17} />
        </button>
      )}
      <p className="fine-print">Illustrative profile. Plans in this prototype stay in your browser.</p>
    </Modal>
  );
}

export function RequestModal({ target, onClose, onSave, existing }) {
  const [message, setMessage] = useState('I would love to exchange skills. Let’s start with one small thing we can each learn.');
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [date, setDate] = useState(localDate(tomorrow));
  const [time, setTime] = useState('17:00');
  const [duration, setDuration] = useState(30);
  const [error, setError] = useState('');

  function submit(event) {
    event.preventDefault();
    if (date < localDate() || new Date(`${date}T${time}`).getTime() <= Date.now()) {
      setError('Choose a session time in the future.');
      return;
    }
    if (message.trim().length < 8) {
      setError('Add a short note of at least 8 characters.');
      return;
    }
    onSave({
      ...target,
      id: crypto.randomUUID(),
      date,
      time,
      duration: Number(duration),
      message: message.trim(),
      status: 'pending',
    });
  }

  return (
    <Modal title={target.kind === 'circle' ? 'Plan your swap circle.' : 'A good exchange starts here.'} onClose={onClose}>
      <p className="modal-intro">With {target.withName.replace(/\.$/, '')}. Equal time to teach and learn.</p>
      <div className="request-summary">
        <div><span>You share</span><strong>{target.teach}</strong></div>
        <ArrowsClockwise size={26} weight="light" />
        <div><span>You learn</span><strong>{target.learn}</strong></div>
      </div>
      <form className="modal-form" onSubmit={submit}>
        <div className="form-row">
          <label>Preferred date<input type="date" value={date} min={localDate()} required onChange={(event) => { setDate(event.target.value); setError(''); }} /></label>
          <label>Your local time<input type="time" value={time} required onChange={(event) => { setTime(event.target.value); setError(''); }} /></label>
        </div>
        <label>
          Time for each skill
          <select value={duration} onChange={(event) => setDuration(event.target.value)}>
            <option value={30}>30 minutes each</option>
            <option value={45}>45 minutes each</option>
            <option value={60}>60 minutes each</option>
          </select>
        </label>
        <p className="field-note">{duration * (target.kind === 'circle' ? 3 : 2)} minutes in total.</p>
        <label>
          A note to start the conversation
          <textarea value={message} minLength={8} maxLength={500} rows={3} required onChange={(event) => { setMessage(event.target.value); setError(''); }} />
        </label>
        {error && <p className="form-error" role="alert">{error}</p>}
        {existing ? (
          <p className="match-reason is-positive"><Check size={19} /> This exchange is already in My swaps.</p>
        ) : (
          <button className="button button-full" type="submit">Save swap request <ArrowRight size={17} /></button>
        )}
        <p className="fine-print">Demo mode: no invitation or message is sent.</p>
      </form>
    </Modal>
  );
}

export function CircleCard({ circle, onPlan }) {
  return (
    <article className="circle-card" data-reveal>
      <div className="circle-label"><span>THREE-PERSON EXCHANGE</span><span>Everyone gives. Everyone receives.</span></div>
      <div className="circle-route" aria-label={`You teach ${circle.teach}, ${circle.first.name} teaches ${circle.first.teach}, and ${circle.second.name} teaches ${circle.learn}`}>
        <div>
          <span className="circle-person">You</span>
          <SkillIcon skill={circle.teach} size={34} />
          <h2>{circle.teach}</h2>
          <p>you share</p>
        </div>
        <ArrowRight className="circle-arrow" size={23} weight="light" />
        <div>
          <Avatar person={circle.first} />
          <h2>{circle.first.name}</h2>
          <p>shares {circle.first.teach}</p>
        </div>
        <ArrowRight className="circle-arrow" size={23} weight="light" />
        <div>
          <Avatar person={circle.second} />
          <h2>{circle.second.name}</h2>
          <p>shares {circle.learn}</p>
        </div>
      </div>
      <div className="circle-footer">
        <p>You share {circle.teach}. {circle.learn} comes back to you.</p>
        <button className="button" onClick={() => onPlan(circle)}>Plan this circle <ArrowRight size={16} /></button>
      </div>
    </article>
  );
}

export function RequestCard({ request, onComplete, onRemove }) {
  return (
    <article className="request-card" data-reveal>
      <div className="request-card-icon"><CalendarBlank size={25} weight="light" /></div>
      <div className="request-card-copy">
        <span className="eyebrow">{request.kind === 'circle' ? 'SWAP CIRCLE' : 'SKILL SWAP'}</span>
        <h2>{request.title}</h2>
        <p>{request.withName}</p>
        <div className="session-meta"><span><CalendarBlank size={15} /> {request.date}</span><span><Clock size={15} /> {request.time}</span><span>{request.duration} min each</span></div>
      </div>
      <div className="request-card-actions">
        <span className={`status-pill ${request.status}`}>{request.status}</span>
        {request.status === 'pending' && <button className="text-button" onClick={() => onComplete(request.id)}>Mark complete</button>}
        <button className="text-button quiet-action" onClick={() => onRemove(request.id)}>Remove</button>
      </div>
    </article>
  );
}

export function EmptyState({ title, children, action }) {
  return (
    <div className="empty-state" data-reveal>
      <ArrowsClockwise size={35} weight="light" />
      <h2>{title}</h2>
      <p>{children}</p>
      {action}
    </div>
  );
}
