import React, { useEffect, useMemo, useState } from 'react';
import {
  Globe2, Search, Shuffle, Heart, Stamp, Trophy,
  MapPinned, Sparkles, Compass, TimerReset, PlaneTakeoff, CloudSun, Clock3, Map, Image as ImageIcon
} from 'lucide-react';
import { categories, destinations } from './data.js';

const STORAGE = 'one-minute-from-earth-v1';

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE)) || { favorites: [], history: [], stamps: [] };
  } catch {
    return { favorites: [], history: [], stamps: [] };
  }
}

function saveState(next) {
  localStorage.setItem(STORAGE, JSON.stringify(next));
}

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [seconds, setSeconds] = useState(60);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [saved, setSaved] = useState(loadState);
  const [tab, setTab] = useState('discover');
  const [liveWeather, setLiveWeather] = useState(null);
  const [photoUrl, setPhotoUrl] = useState('');
  const [jumping, setJumping] = useState(false);
  const current = destinations[currentIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((value) => {
        if (value <= 1) {
          setCurrentIndex((index) => (index + 1) % destinations.length);
          return 60;
        }
        return value - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const loadLiveData = async () => {
      try {
        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${current.lat}&longitude=${current.lon}&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=auto`
        );
        const weatherJson = await weatherResponse.json();
        if (!cancelled && weatherJson.current) setLiveWeather(weatherJson.current);
      } catch {
        if (!cancelled) setLiveWeather(null);
      }

      try {
        const wikiResponse = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(current.wikiTitle)}`
        );
        const wikiJson = await wikiResponse.json();
        if (!cancelled) setPhotoUrl(wikiJson?.thumbnail?.source || wikiJson?.originalimage?.source || '');
      } catch {
        if (!cancelled) setPhotoUrl('');
      }
    };
    loadLiveData();
    return () => { cancelled = true; };
  }, [current.id, current.lat, current.lon, current.wikiTitle]);

  useEffect(() => {
    setJumping(true);
    const timeout = setTimeout(() => setJumping(false), 700);
    return () => clearTimeout(timeout);
  }, [current.id]);

  useEffect(() => {
    setSaved((previous) => {
      const history = [current.id, ...previous.history.filter((id) => id !== current.id)].slice(0, 20);
      const stamps = previous.stamps.includes(current.id) ? previous.stamps : [...previous.stamps, current.id];
      const next = { ...previous, history, stamps };
      saveState(next);
      return next;
    });
  }, [current.id]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return destinations.filter((destination) => {
      const categoryMatch = category === 'All' || destination.category === category;
      const queryMatch = !normalized || [
        destination.name,
        destination.country,
        destination.continent,
        destination.category
      ].some((value) => value.toLowerCase().includes(normalized));
      return categoryMatch && queryMatch;
    });
  }, [query, category]);

  const surpriseMe = () => {
    let next = currentIndex;
    while (next === currentIndex && destinations.length > 1) {
      next = Math.floor(Math.random() * destinations.length);
    }
    setCurrentIndex(next);
    setSeconds(60);
  };

  const jumpTo = (id) => {
    const next = destinations.findIndex((item) => item.id === id);
    if (next >= 0) {
      setCurrentIndex(next);
      setSeconds(60);
      setTab('discover');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleFavorite = () => {
    setSaved((previous) => {
      const favorites = previous.favorites.includes(current.id)
        ? previous.favorites.filter((id) => id !== current.id)
        : [...previous.favorites, current.id];
      const next = { ...previous, favorites };
      saveState(next);
      return next;
    });
  };

  const visited = saved.stamps.length;
  const continents = new Set(
    saved.stamps.map((id) => destinations.find((d) => d.id === id)?.continent).filter(Boolean)
  ).size;

  const localTime = new Intl.DateTimeFormat(undefined, {
    timeZone: current.timeZone,
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date());

  const weatherLabel = liveWeather
    ? `${Math.round(liveWeather.temperature_2m)}°C`
    : '—';

  const mapUrl = `https://www.openstreetmap.org/?mlat=${current.lat}&mlon=${current.lon}#map=7/${current.lat}/${current.lon}`;

  const achievement =
    visited >= 8 ? 'World Hopper' :
    visited >= 5 ? 'Globetrotter' :
    visited >= 3 ? 'Explorer' :
    'First Steps';

  return (
    <div className={`app-shell ${jumping ? 'jumping' : ''}`}>
      <header className="topbar">
        <button className="brand" onClick={() => setTab('discover')} aria-label="Go to Discover">
          <span className="brand-orbit"><Globe2 size={24} /></span>
          <span>One Minute From Earth</span>
        </button>

        <nav aria-label="Primary navigation">
          <button className={tab === 'discover' ? 'active' : ''} onClick={() => setTab('discover')}>Discover</button>
          <button className={tab === 'passport' ? 'active' : ''} onClick={() => setTab('passport')}>Passport</button>
          <button className={tab === 'history' ? 'active' : ''} onClick={() => setTab('history')}>History</button>
        </nav>
      </header>

      {tab === 'discover' && (
        <>
          <main className={`hero accent-${current.accent}`}>
            <div className="aurora aurora-one" />
            <div className="aurora aurora-two" />

            <section className="hero-copy">
              <p className="eyebrow"><Sparkles size={16} /> THE WORLD IN 60 SECONDS</p>
              <h1>Wake up somewhere <span>unexpected.</span></h1>
              <p className="lede">
                Every minute, discover a new corner of Earth — strange landscapes, cultural gems,
                beautiful places, and one fact worth remembering.
              </p>

              <div className="hero-actions">
                <button className="primary" onClick={surpriseMe}><Shuffle size={18} /> Surprise me</button>
                <button className="secondary" onClick={() => document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' })}>
                  <Compass size={18} /> Explore places
                </button>
              </div>

              <div className="micro-stats">
                <span><Stamp size={15} /> {visited} stamps</span>
                <span><MapPinned size={15} /> {continents} continents</span>
                <span><Trophy size={15} /> {achievement}</span>
              </div>
            </section>

            <section className="globe-stage" aria-label="Animated globe">
              <div className="orbit orbit-a" />
              <div className="orbit orbit-b" />
              <div className="globe">
                <span className="continent c1" />
                <span className="continent c2" />
                <span className="continent c3" />
                <span className="pin">●</span>
              </div>

              <div className="countdown-card">
                <div className="countdown-label"><TimerReset size={16} /> Next jump in</div>
                <strong>00:{String(seconds).padStart(2, '0')}</strong>
                <div className="progress"><span style={{ width: `${(seconds / 60) * 100}%` }} /></div>
              </div>
            </section>
          </main>

          <section className="destination-panel">
            <div className="destination-main">
              <div className="flag">{current.emoji}</div>
              <div>
                <p className="eyebrow">YOU'VE LANDED IN</p>
                <h2>{current.name}</h2>
                <p className="country">{current.country} · {current.continent}</p>
              </div>
              <button
                className={`heart ${saved.favorites.includes(current.id) ? 'liked' : ''}`}
                onClick={toggleFavorite}
                aria-label="Toggle favorite"
              >
                <Heart size={21} fill="currentColor" />
              </button>
            </div>

            <div className="destination-grid">
              <article
                className="scene-card scene-large"
                style={photoUrl ? {
                  backgroundImage: `linear-gradient(180deg, rgba(7,20,38,.12), rgba(7,20,38,.84)), url("${photoUrl}")`
                } : undefined}
              >
                <div className="scene-badge">{current.category}</div>
                <div className="scene-overlay">
                  <h3>{current.intro}</h3>
                  <div className="scene-links">
                    <a href={mapUrl} target="_blank" rel="noreferrer"><Map size={16} /> Open map</a>
                    {photoUrl && <span><ImageIcon size={16} /> Live image</span>}
                  </div>
                </div>
              </article>

              <article className="info-card">
                <span><CloudSun size={15} /> Live weather</span>
                <strong>{weatherLabel}</strong>
                <small>{liveWeather ? `Feels like ${Math.round(liveWeather.apparent_temperature)}°C · Wind ${Math.round(liveWeather.wind_speed_10m)} km/h` : 'Live data unavailable'}</small>
              </article>

              <article className="info-card">
                <span><Clock3 size={15} /> Local time</span>
                <strong>{localTime}</strong>
                <small>{current.timeZone}</small>
              </article>

              <article className="fact-card">
                <Sparkles size={20} />
                <div>
                  <span>One-minute fact</span>
                  <p>{current.fact}</p>
                </div>
              </article>
            </div>
          </section>

          <section id="explore" className="explore">
            <div className="section-heading">
              <div>
                <p className="eyebrow">KEEP EXPLORING</p>
                <h2>Find your next tiny adventure</h2>
              </div>

              <label className="search">
                <Search size={18} />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search a place, country, or category…"
                />
              </label>
            </div>

            <div className="category-row">
              {categories.map((item) => (
                <button
                  key={item}
                  className={category === item ? 'selected' : ''}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="card-grid">
              {filtered.map((destination) => (
                <button
                  className={`place-card accent-${destination.accent}`}
                  key={destination.id}
                  onClick={() => jumpTo(destination.id)}
                >
                  <div className="place-visual">
                    <span>{destination.emoji}</span>
                    <PlaneTakeoff size={22} />
                  </div>
                  <div className="place-copy">
                    <small>{destination.category}</small>
                    <strong>{destination.name}</strong>
                    <span>{destination.country}</span>
                  </div>
                </button>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="empty-state">
                <Globe2 size={34} />
                <h3>No tiny adventure found</h3>
                <p>Try another search or category.</p>
              </div>
            )}
          </section>
        </>
      )}

      {tab === 'passport' && (
        <main className="dashboard">
          <div className="section-heading">
            <div>
              <p className="eyebrow">YOUR JOURNEY</p>
              <h1>Digital Passport</h1>
              <p className="lede small">Every new destination earns a stamp automatically.</p>
            </div>
          </div>

          <div className="stats-grid">
            <article><Stamp /><strong>{visited}</strong><span>Passport stamps</span></article>
            <article><MapPinned /><strong>{continents}</strong><span>Continents reached</span></article>
            <article><Heart /><strong>{saved.favorites.length}</strong><span>Favorites</span></article>
            <article><Trophy /><strong>{achievement}</strong><span>Current achievement</span></article>
          </div>

          <div className="passport-grid">
            {destinations.map((destination) => (
              <button
                className={`stamp-card ${saved.stamps.includes(destination.id) ? 'earned' : 'locked'}`}
                key={destination.id}
                onClick={() => saved.stamps.includes(destination.id) && jumpTo(destination.id)}
              >
                <span className="stamp-emoji">{destination.emoji}</span>
                <strong>{destination.name}</strong>
                <small>{saved.stamps.includes(destination.id) ? 'STAMPED' : 'UNDISCOVERED'}</small>
              </button>
            ))}
          </div>
        </main>
      )}

      {tab === 'history' && (
        <main className="dashboard">
          <div className="section-heading">
            <div>
              <p className="eyebrow">TRAVEL LOG</p>
              <h1>Places you’ve discovered</h1>
            </div>
          </div>

          <div className="history-list">
            {saved.history.map((id, position) => {
              const destination = destinations.find((item) => item.id === id);
              if (!destination) return null;

              return (
                <button key={id} onClick={() => jumpTo(id)}>
                  <span>{destination.emoji}</span>
                  <div>
                    <strong>{destination.name}</strong>
                    <small>{destination.country} · {destination.continent}</small>
                  </div>
                  <b>#{position + 1}</b>
                </button>
              );
            })}
          </div>
        </main>
      )}

      <footer>
        <Globe2 size={18} />
        One Minute From Earth · built for curiosity, not checklists.
      </footer>
    </div>
  );
}
