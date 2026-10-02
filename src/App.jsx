import React, { useEffect, useMemo, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import {
  Globe2, Search, Shuffle, Heart, Stamp, Trophy,
  MapPinned, Sparkles, Compass, TimerReset, PlaneTakeoff, CloudSun, Clock3, Map, Image as ImageIcon, Utensils, Landmark, Languages, Star, ArrowLeft, DoorOpen, Sun, Moon, BookOpen, BadgeCheck, Lightbulb, Camera, Music2, Leaf, Palette, CheckCircle2, Award, CircleHelp, Volume2, VolumeX, Route, ListPlus, PlayCircle
} from 'lucide-react';
import { categories, destinations } from './data.js';
import { curatedVideos, fetchWikiImages, youtubeSearchUrl, topFoodHighlights, topCultureHighlights, fetchVerifiedFeatureCard, ambientForDestination } from './media.js';

const STORAGE = 'one-minute-from-earth-v1';

function loadState() {
  const fallback = { favorites: [], history: [], stamps: [], badges: [] };
  try {
    return { ...fallback, ...(JSON.parse(localStorage.getItem(STORAGE)) || {}) };
  } catch {
    return fallback;
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
  const [journeyOpen, setJourneyOpen] = useState(false);
  const [journeyTab, setJourneyTab] = useState('overview');
  const [journeyMedia, setJourneyMedia] = useState({ overview: [], food: [], culture: [], special: [] });
  const [liveWeather, setLiveWeather] = useState(null);
  const [photoUrl, setPhotoUrl] = useState('');
  const [photoMap, setPhotoMap] = useState({});
  const [jumping, setJumping] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('one-minute-theme') || 'dark');
  const [foodHighlights, setFoodHighlights] = useState([]);
  const [cultureHighlights, setCultureHighlights] = useState([]);
  const [journeySeenTabs, setJourneySeenTabs] = useState(() => new Set(['overview']));
  const [quizAnswer, setQuizAnswer] = useState('');
  const [stampBurst, setStampBurst] = useState(false);
  const [arrivalOpen, setArrivalOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('one-minute-wishlist') || '[]'));
  const [tasteList, setTasteList] = useState(() => JSON.parse(localStorage.getItem('one-minute-tastes') || '[]'));
  const [exploreMode, setExploreMode] = useState('quick');
  const [landmarkRevealed, setLandmarkRevealed] = useState(false);
  const [routeStops, setRouteStops] = useState([]);
  const globeRef = useRef();
  const audioRef = useRef();
  const current = destinations[currentIndex];
  const ambient = ambientForDestination(current);

  const fallbackImage = (destination, label = 'Explore') => {
    const bg = theme === 'dark' ? '#102238' : '#e8f1fb';
    const fg = theme === 'dark' ? '#ffffff' : '#102033';
    const accent = destination?.accent === 'rose' ? '#d76498' : destination?.accent === 'sunset' ? '#ef9b55' : '#4ec7d2';
    const title = String(label).slice(0, 34).replace(/[<>&"']/g, '');
    const country = String(destination?.country || '').replace(/[<>&"']/g, '');
    const emoji = destination?.emoji || '🌍';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="650">
      <defs><linearGradient id="g" x1="0" x2="1"><stop stop-color="${bg}"/><stop offset="1" stop-color="${accent}"/></linearGradient></defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
      <circle cx="760" cy="120" r="150" fill="rgba(255,255,255,.10)"/>
      <circle cx="100" cy="560" r="120" fill="rgba(255,255,255,.08)"/>
      <text x="70" y="130" font-size="72">${emoji}</text>
      <text x="70" y="420" fill="${fg}" font-family="Arial,sans-serif" font-size="52" font-weight="700">${title}</text>
      <text x="70" y="480" fill="${fg}" opacity=".72" font-family="Arial,sans-serif" font-size="26">${country}</text>
    </svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setSoundOn(false);
    setJourneySeenTabs(new Set(['overview']));
    setQuizAnswer('');
    setLandmarkRevealed(false);
    setArrivalOpen(true);
    const t = setTimeout(() => setArrivalOpen(false), 1400);
    return () => clearTimeout(t);
  }, [current.id]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('one-minute-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (exploreMode === 'deep') return;
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
  }, [exploreMode]);

  useEffect(() => {
    let cancelled = false;
    const loadCardImages = async () => {
      const pairs = await Promise.all(destinations.map(async (destination) => {
        try {
          const response = await fetch(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(destination.wikiTitle)}`
          );
          const json = await response.json();
          return [destination.id, json?.thumbnail?.source || json?.originalimage?.source || ''];
        } catch {
          return [destination.id, ''];
        }
      }));
      if (!cancelled) setPhotoMap(Object.fromEntries(pairs));
    };
    loadCardImages();
    return () => { cancelled = true; };
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
    if (!journeyOpen) return;
    let cancelled = false;
    const loadJourneyMedia = async () => {
      const specialQuery = current.museum ? current.museum.split(',')[0] : current.knownFor?.[0];
      const [overview, food, culture, special] = await Promise.all([
        fetchWikiImages(`${current.name} ${current.country}`, 4).catch(() => []),
        fetchWikiImages(`${current.name} ${current.country} food cuisine`, 4).catch(() => []),
        fetchWikiImages(`${current.name} ${current.country} culture tradition`, 4).catch(() => []),
        fetchWikiImages(`${specialQuery || current.name} ${current.country}`, 3).catch(() => [])
      ]);
      if (!cancelled) setJourneyMedia({ overview, food, culture, special });

      const foodNames = topFoodHighlights(current);
      const cultureNames = topCultureHighlights(current);

      const foodCards = await Promise.all(
        foodNames.map((feature) => fetchVerifiedFeatureCard(feature, current, 'food'))
      );

      const cultureCards = await Promise.all(
        cultureNames.map((feature) => fetchVerifiedFeatureCard(feature, current, 'culture'))
      );

      if (!cancelled) {
        setFoodHighlights(foodCards);
        setCultureHighlights(cultureCards);
      }
    };
    loadJourneyMedia();
    return () => { cancelled = true; };
  }, [journeyOpen, current.id]);

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

  const startThemedRoute = (themeName) => {
    const pools = {
      islands: destinations.filter((d) => ['Coastal','Rare'].includes(d.category)),
      culture: destinations.filter((d) => d.category === 'Culture'),
      wild: destinations.filter((d) => ['Wild','Mountains','Desert'].includes(d.category))
    };
    const pool = pools[themeName] || destinations;
    const picks = [...pool].sort(() => Math.random() - 0.5).slice(0, 5);
    setRouteStops(picks.map((d) => d.id));
    if (picks[0]) jumpTo(picks[0].id);
  };

  const rareSurprise = () => {
    const rare = destinations.filter((d) => d.category === 'Rare');
    const pick = rare[Math.floor(Math.random() * rare.length)];
    if (pick) jumpTo(pick.id);
  };

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
      setJourneyOpen(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const speak = (text) => {
    if (!('speechSynthesis' in window) || !text) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text.replace(/\([^)]*\)/g, '').trim());
    window.speechSynthesis.speak(utterance);
  };

  const toggleWishlist = () => {
    setWishlist((prev) => {
      const next = prev.includes(current.id) ? prev.filter((id) => id !== current.id) : [...prev, current.id];
      localStorage.setItem('one-minute-wishlist', JSON.stringify(next));
      return next;
    });
  };

  const saveTaste = (name) => {
    if (!name) return;
    setTasteList((prev) => {
      const next = prev.includes(name) ? prev : [...prev, name];
      localStorage.setItem('one-minute-tastes', JSON.stringify(next));
      return next;
    });
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

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;
    try {
      globe.pointOfView({ lat: current.lat, lng: current.lon, altitude: 1.55 }, 1200);
      const controls = globe.controls?.();
      if (controls) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.35;
      }
    } catch {
      // WebGL or control APIs may be unavailable in some browsers.
    }
  }, [current.id, current.lat, current.lon]);

  const achievement =
    visited >= 8 ? 'World Hopper' :
    visited >= 5 ? 'Globetrotter' :
    visited >= 3 ? 'Explorer' :
    'First Steps';

  const journeyProgress = Math.round((journeySeenTabs.size / 5) * 100);

  const badgeDefinitions = [
    { id: 'taste-explorer', label: 'Taste Explorer', icon: '🍽️', unlocked: journeySeenTabs.has('food') },
    { id: 'culture-hunter', label: 'Culture Hunter', icon: '🎭', unlocked: journeySeenTabs.has('culture') },
    { id: 'sound-seeker', label: 'Sound Seeker', icon: '🎧', unlocked: journeySeenTabs.has('watch') },
    { id: 'local-lens', label: 'Local Lens', icon: '🗺️', unlocked: journeySeenTabs.has('special') },
    { id: 'deep-diver', label: 'Deep Diver', icon: '🏅', unlocked: journeySeenTabs.size === 5 }
  ];

  const guideReaction = {
    overview: `Start with the big picture — then pick a trail.`,
    food: `Good choice. Food tells you a lot about how people live here.`,
    culture: `This is where the place becomes more than a postcard.`,
    watch: `Turn the volume up a little — sound changes how a place feels.`,
    special: `One last stop. This is the detail I’d want you to remember.`
  }[journeyTab];

  const quizOptions = useMemo(() => {
    const correct = foodHighlights[0]?.name;
    if (!correct) return [];
    const distractors = destinations
      .filter((d) => d.id !== current.id)
      .flatMap((d) => topFoodHighlights(d))
      .map((item) => item?.name)
      .filter(Boolean)
      .filter((name) => name !== correct)
      .slice((currentIndex * 2) % 8, ((currentIndex * 2) % 8) + 2);
    return [correct, ...distractors].slice(0, 3);
  }, [current.id, currentIndex, foodHighlights]);

  const handleJourneyTab = (id) => {
    setJourneyTab(id);
    setJourneySeenTabs((previous) => {
      const next = new Set(previous);
      next.add(id);
      return next;
    });
  };

  const departToNext = () => {
    setStampBurst(true);
    setTimeout(() => {
      setStampBurst(false);
      setJourneyOpen(false);
      surpriseMe();
    }, 800);
  };

  return (
    <div className={`app-shell ${jumping ? 'jumping' : ''}`}>
      <header className="topbar">
        <button className="brand" onClick={() => setTab('discover')} aria-label="Go to Discover">
          <span className="brand-orbit"><Globe2 size={24} /></span>
          <span>One Minute From Earth</span>
        </button>

        <div className="topbar-actions">
          <nav aria-label="Primary navigation">
            <button className={tab === 'discover' ? 'active' : ''} onClick={() => setTab('discover')}>Discover</button>
            <button className={tab === 'passport' ? 'active' : ''} onClick={() => setTab('passport')}>Passport</button>
            <button className={tab === 'history' ? 'active' : ''} onClick={() => setTab('history')}>History</button>
          </nav>
          <button
            className={`theme-switch ${theme}`}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle light and dark mode"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <span className="theme-switch-track">
              <span className="theme-icon sun"><Sun size={15}/></span>
              <span className="theme-icon moon"><Moon size={15}/></span>
              <span className="theme-switch-thumb">{theme === 'dark' ? <Moon size={14}/> : <Sun size={14}/>}</span>
            </span>
            <span className="theme-switch-label">{theme === 'dark' ? 'Dark' : 'Light'}</span>
          </button>
        </div>
      </header>

      {arrivalOpen && (
        <div className="arrival-overlay" aria-live="polite">
          <div className="arrival-flight-line"><PlaneTakeoff size={26}/></div>
          <span>{current.emoji}</span>
          <small>ARRIVING IN</small>
          <strong>{current.name}</strong>
          <p>Packing your passport…</p>
        </div>
      )}

      {tab === 'discover' && journeyOpen && (
        <main className={`journey-page local-${localTime.slice(-2)}`}>
          <div className="journey-hero" style={photoMap[current.id] ? {
            backgroundImage: `linear-gradient(180deg, rgba(6,17,31,.10), rgba(6,17,31,.92)), url("${photoMap[current.id]}")`
          } : undefined}>
            <button className="journey-back" onClick={() => setJourneyOpen(false)}><ArrowLeft size={18}/> Back to world</button>
            <div className="guide-bubble">
              <div className="guide-avatar">{current.guide?.emoji}</div>
              <div>
                <span>{current.guide?.name} says</span>
                <h2>{current.greeting}</h2>
                <p>{journeyTab === 'overview' ? current.guide?.line : guideReaction}</p>
              </div>
            </div>

            <div className="journey-title">
              <p className="eyebrow">YOU'VE ARRIVED</p>
              <h1>{current.name}</h1>
              <p>{current.country} · {current.continent}</p>
            </div>
          </div>

          <section className="journey-content">
            <div className="journey-tabs" role="tablist" aria-label="Destination sections">
              {[
                ['overview','Overview'],
                ['food','Food'],
                ['culture','Culture'],
                ['watch','Watch'],
                ['special','Special Place']
              ].map(([id,label]) => (
                <button key={id} className={journeyTab === id ? 'active' : ''} onClick={() => handleJourneyTab(id)}>
                  {journeySeenTabs.has(id) && <CheckCircle2 size={13}/>} {label}
                </button>
              ))}
            </div>

            <div className="journey-progress-strip">
              <div className="journey-progress-copy">
                <span>Destination completion</span>
                <strong>{journeyProgress}%</strong>
              </div>
              <div className="journey-progress-line"><span style={{width: `${journeyProgress}%`}}/></div>
              <div className="journey-badge-row">
                {badgeDefinitions.map((badge) => (
                  <span key={badge.id} className={badge.unlocked ? 'unlocked' : 'locked'}>
                    <b>{badge.icon}</b>{badge.label}
                  </span>
                ))}
              </div>
            </div>

            {journeyTab === 'overview' && <>
            <div className="journey-intro-card">
              <div>
                <span className="journey-kicker">WHY PEOPLE REMEMBER IT</span>
                <h2>{current.intro}</h2>
                <p>{current.unique}</p>
              </div>
              <div className="known-for-list">
                {current.knownFor?.map((item) => <span key={item}><Star size={14}/>{item}</span>)}
              </div>
            </div>

            <section className="landmark-challenge">
              <div>
                <span className="journey-kicker">LANDMARK CHALLENGE</span>
                <h3>Can you recognize {current.name} before the reveal?</h3>
              </div>
              <div className={`landmark-photo ${landmarkRevealed ? 'revealed' : ''}`} style={{
                backgroundImage: `linear-gradient(180deg,rgba(4,10,18,.08),rgba(4,10,18,.35)),url("${photoMap[current.id] || fallbackImage(current, current.name)}")`
              }}>
                {!landmarkRevealed && <button onClick={() => setLandmarkRevealed(true)}><Camera size={18}/> Reveal landmark</button>}
                {landmarkRevealed && <span>{current.emoji} {current.name}, {current.country}</span>}
              </div>
            </section>

            <div className="overview-extras">
              <article className="did-you-know-card">
                <Lightbulb size={24}/>
                <span>Did you know?</span>
                <p>{current.fact}</p>
              </article>
              <article className="explorer-badges-card">
                <span className="journey-kicker">COLLECTIBLE MOMENTS</span>
                <div className="mini-badges">
                  <span><Camera size={15}/> Visual icon</span>
                  <span><Utensils size={15}/> Food story</span>
                  <span><Music2 size={15}/> Culture & sound</span>
                  <span><Leaf size={15}/> Local feature</span>
                </div>
              </article>
            </div>

            <div className="media-mosaic">
              {journeyMedia.overview.map((item, index) => (
                <figure key={item.url} className={index === 0 ? 'wide' : ''}>
                  <img src={item.url} alt={item.title} loading="lazy" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = fallbackImage(current, item.title); }}/>
                  <figcaption>{item.title}</figcaption>
                </figure>
              ))}
            </div>
            </>}

            {journeyTab === 'food' && <section className="journey-tab-panel">
              <div className="tab-heading"><Utensils size={22}/><div><span className="journey-kicker">3 FAMOUS DISHES</span><h2>Taste {current.name}</h2></div></div>
              <div className="feature-three-grid">
                {foodHighlights.map((item, index) => (
                  <article className="feature-showcase-card" key={item.name}>
                    <div className="feature-image-wrap">
                      {item.image ? <img src={item.image} alt={item.name} loading="lazy" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = fallbackImage(current, item.name); }}/> : (
                        <div className="feature-art-fallback food-art">
                          <span className="fallback-flag">{current.emoji}</span>
                          <Utensils size={34}/>
                          <b>{item.name}</b>
                          <small>{current.country}</small>
                        </div>
                      )}
                      <span className="feature-number">0{index + 1}</span>
                    </div>
                    <div className="feature-card-copy">
                      <span>Local favourite</span>
                      <h3>{item.name}</h3>
                      <p>{item.fact}</p>
                      <button className={`taste-save ${tasteList.includes(item.name) ? 'saved' : ''}`} onClick={() => saveTaste(item.name)}>
                        <ListPlus size={14}/>{tasteList.includes(item.name) ? 'Saved to Taste List' : 'Would try this'}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>}

            {journeyTab === 'culture' && <section className="journey-tab-panel">
              <div className="tab-heading"><Languages size={22}/><div><span className="journey-kicker">3 CULTURAL SIGNATURES</span><h2>Meet the people behind the place</h2></div></div>
              <div className="culture-callout">
                <strong>{current.greeting}</strong>
                <span>{current.language}</span>
                <p>{current.guide?.line}</p>
                <div className="local-words">
                  <button onClick={() => speak(current.greeting)}><Volume2 size={15}/> Hear hello</button>
                  <button onClick={() => speak(current.goodbye)}><Volume2 size={15}/> Hear goodbye</button>
                  <span><b>Hello</b>{current.greeting}</span>
                  <span><b>Goodbye</b>{current.goodbye}</span>
                </div>
              </div>
              <div className="feature-three-grid">
                {cultureHighlights.map((item, index) => (
                  <article className="feature-showcase-card culture-feature" key={item.name}>
                    <div className="feature-image-wrap">
                      {item.image ? <img src={item.image} alt={item.name} loading="lazy" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = fallbackImage(current, item.name); }}/> : (
                        <div className="feature-art-fallback culture-art">
                          <span className="fallback-flag">{current.emoji}</span>
                          <Palette size={34}/>
                          <b>{item.name}</b>
                          <small>{current.country}</small>
                        </div>
                      )}
                      <span className="feature-number">0{index + 1}</span>
                    </div>
                    <div className="feature-card-copy">
                      <span>Culture</span>
                      <h3>{item.name}</h3>
                      <p>{item.fact}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>}

            {journeyTab === 'watch' && <section className="journey-tab-panel">
              <div className="tab-heading"><PlaneTakeoff size={22}/><div><span className="journey-kicker">WATCH & LISTEN</span><h2>Hear the place, not just read about it</h2></div></div>
              <div className="video-grid">
                {(curatedVideos[current.id] || []).map((video) => (
                  <article className="video-card" key={video.youtubeId}>
                    <iframe
                      src={`https://www.youtube.com/embed/${video.youtubeId}`}
                      title={video.title}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                    <div><span>{video.type}</span><h3>{video.title}</h3></div>
                  </article>
                ))}
                {(curatedVideos[current.id] || []).length === 0 && (
                  <article className="video-fallback">
                    <span className="journey-kicker">CURATED SEARCH</span>
                    <h3>Find authentic music, food and culture clips for {current.name}</h3>
                    <p>Open a focused YouTube search for local music, traditional food and cultural life.</p>
                    <a href={youtubeSearchUrl(`${current.name} ${current.country} culture music food travel`)} target="_blank" rel="noreferrer">Browse videos ↗</a>
                  </article>
                )}
              </div>
            </section>}

            {journeyTab === 'special' && <section className="journey-tab-panel">
              <div className="tab-heading"><Landmark size={22}/><div><span className="journey-kicker">{current.museum ? 'MUSEUMS & HERITAGE' : 'SIGNATURE LOCAL FEATURE'}</span><h2>{current.museum || current.knownFor?.[0]}</h2></div></div>
              <p className="special-copy">{current.museum ? 'A place to go deeper into the history, art or heritage of this destination.' : current.unique}</p>
              <div className="media-mosaic special-mosaic">
                {journeyMedia.special.map((item) => (
                  <figure key={item.url}><img src={item.url} alt={item.title} loading="lazy" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = fallbackImage(current, item.title); }}/><figcaption>{item.title}</figcaption></figure>
                ))}
              </div>
            </section>}

            <section className="journey-quiz-card">
              <div className="quiz-heading">
                <CircleHelp size={22}/>
                <div>
                  <span className="journey-kicker">QUICK MEMORY CHECK</span>
                  <h3>Which one belongs to {current.name}?</h3>
                </div>
              </div>
              <div className="quiz-options">
                {quizOptions.map((option) => {
                  const isCorrect = option === foodHighlights[0]?.name;
                  const answered = Boolean(quizAnswer);
                  return (
                    <button
                      key={option}
                      className={answered ? (isCorrect ? 'correct' : quizAnswer === option ? 'wrong' : '') : ''}
                      onClick={() => !answered && setQuizAnswer(option)}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              {quizAnswer && (
                <p className="quiz-result">
                  {quizAnswer === foodHighlights[0]?.name
                    ? `Nice — ${foodHighlights[0]?.name} is one of the dishes to remember.`
                    : `Almost. The local answer here is ${foodHighlights[0]?.name}.`}
                </p>
              )}
            </section>

            <div className="before-you-leave">
              <Lightbulb size={24}/>
              <div>
                <span className="journey-kicker">BEFORE YOU LEAVE</span>
                <h3>Remember this one thing</h3>
                <p>{current.fact}</p>
              </div>
            </div>

            <div className="journey-footer-card">
              <div className="guide-avatar large">{current.guide?.emoji}</div>
              <div>
                <span className="journey-kicker">{current.guide?.name} is seeing you off</span>
                <h2>{current.goodbye}</h2>
                <p>{journeyProgress === 100 ? `Full journey complete — your ${current.name} stamp is ready.` : `You explored ${journeyProgress}% of this destination. You can still leave and come back later.`}</p>
              </div>
              <button className="primary" onClick={departToNext}>
                <DoorOpen size={18}/> Stamp & travel
              </button>
            </div>

            {stampBurst && (
              <div className="stamp-burst" aria-live="polite">
                <div className="stamp-burst-mark">
                  <Stamp size={42}/>
                  <span>{current.emoji}</span>
                  <strong>{current.name}</strong>
                  <small>ENTRY STAMPED</small>
                </div>
              </div>
            )}
          </section>
        </main>
      )}

      {tab === 'discover' && !journeyOpen && (
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
                <button className="secondary" onClick={rareSurprise}><Sparkles size={18}/> Rare place</button>
                <button className="secondary" onClick={() => document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' })}>
                  <Compass size={18} /> Explore places
                </button>
              </div>

              <div className="mode-route-row">
                <div className="mode-switch">
                  <button className={exploreMode === 'quick' ? 'active' : ''} onClick={() => setExploreMode('quick')}>60-sec mode</button>
                  <button className={exploreMode === 'deep' ? 'active' : ''} onClick={() => setExploreMode('deep')}>Deep Explore</button>
                </div>
                <div className="route-actions">
                  <button onClick={() => startThemedRoute('islands')}>Island Escape</button>
                  <button onClick={() => startThemedRoute('culture')}>Culture Trail</button>
                  <button onClick={() => startThemedRoute('wild')}>Wild Route</button>
                </div>
              </div>

              <div className="micro-stats">
                <span><Stamp size={15} /> {visited} stamps</span>
                <span><MapPinned size={15} /> {continents} continents</span>
                <span><Trophy size={15} /> {achievement}</span>
              </div>
            </section>

            <section className="globe-stage" aria-label="Interactive 3D globe">
              <div className="orbit orbit-a" />
              <div className="orbit orbit-b" />
              <div className="real-globe-wrap">
                <Globe
                  ref={globeRef}
                  width={420}
                  height={420}
                  backgroundColor="rgba(0,0,0,0)"
                  globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                  bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
                  pointsData={destinations}
                  pointLat="lat"
                  pointLng="lon"
                  pointAltitude={(d) => d.id === current.id ? 0.08 : 0.03}
                  pointRadius={(d) => d.id === current.id ? 0.34 : 0.18}
                  pointColor={(d) => d.id === current.id ? '#ff66c4' : '#58e5ff'}
                  pointLabel={(d) => `${d.emoji} ${d.name}, ${d.country}`}
                  onPointClick={(d) => jumpTo(d.id)}
                  atmosphereColor="#5bdcff"
                  atmosphereAltitude={0.18}
                />
                <div className="globe-caption">
                  <span>Drag to explore</span>
                  <strong>{current.name}</strong>
                </div>
              </div>

              <div className="countdown-card">
                <div className="countdown-label"><TimerReset size={16} /> {exploreMode === 'deep' ? 'Deep Explore' : 'Next jump in'}</div>
                <strong>{exploreMode === 'deep' ? '∞' : `00:${String(seconds).padStart(2, '0')}`}</strong>
                <div className="progress"><span style={{ width: exploreMode === 'deep' ? '100%' : `${(seconds / 60) * 100}%` }} /></div>
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
              <button className={`wishlist-btn ${wishlist.includes(current.id) ? 'saved' : ''}`} onClick={toggleWishlist}>
                <ListPlus size={16}/>{wishlist.includes(current.id) ? 'On wishlist' : 'Would visit'}
              </button>
              <button
                className="sound-btn"
                onClick={() => {
                  const next = !soundOn;
                  setSoundOn(next);
                  if (!audioRef.current) return;
                  if (next) {
                    audioRef.current.volume = 0.38;
                    audioRef.current.play().catch(() => setSoundOn(false));
                  } else {
                    audioRef.current.pause();
                  }
                }}
              >
                {soundOn ? <Volume2 size={16}/> : <VolumeX size={16}/>}
                {soundOn ? ambient.label : 'Ambient off'}
              </button>
              <audio ref={audioRef} src={ambient.url} loop preload="none" />
              <a className="ambient-credit" href={ambient.source} target="_blank" rel="noreferrer">
                {ambient.label} · {ambient.license} · Wikimedia Commons
              </a>
            </div>

            <div className="destination-grid">
              <button
                className="scene-card scene-large scene-explore-button"
                onClick={() => jumpTo(current.id)}
                aria-label={`Explore ${current.name}`}
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
                    <span className="explore-photo-cta"><PlayCircle size={16}/> Explore this place</span>
                  </div>
                </div>
              </button>

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
                  className={`place-card accent-${destination.accent} ${saved.stamps.includes(destination.id) ? 'discovered-card' : ''}`}
                  key={destination.id}
                  onClick={() => jumpTo(destination.id)}
                >
                  <div
                    className="place-visual"
                    style={photoMap[destination.id] ? {
                      backgroundImage: `linear-gradient(180deg, rgba(6,17,31,.08), rgba(6,17,31,.72)), url("${photoMap[destination.id]}")`
                    } : undefined}
                  >
                    <div className="poster-topline">
                      <span className="poster-badge">{destination.category}</span>
                      <span className="poster-flag">{destination.emoji}</span>
                    </div>
                    <div className="poster-bottomline">
                      <span>{destination.continent}</span>
                      <PlaneTakeoff size={22} />
                    </div>
                    {saved.stamps.includes(destination.id) && <span className="visited-stamp">EXPLORED</span>}
                  </div>
                  <div className="place-copy">
                    <small>{destination.country}</small>
                    <strong>{destination.name}</strong>
                    <p>{destination.fact}</p>
                    <div className="place-meta">
                      <span>{destination.category}</span>
                      <b>Explore now →</b>
                    </div>
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
        <main className="dashboard passport-page">
          <section className="passport-hero passport-hero-upgraded">
            <div className="passport-cover passport-cover-premium">
              <div className="passport-cover-pattern" />
              <div className="passport-cover-top">
                <span className="passport-label">ONE MINUTE FROM EARTH</span>
                <span className="passport-chip">{current.emoji}</span>
              </div>
              <div className="passport-emblem"><Globe2 size={46}/></div>
              <h1>WORLD<br/>PASSPORT</h1>
              <p>Issued to a curious explorer</p>
              <div className="passport-cover-seal"><Stamp size={18}/> EXPLORER EDITION</div>
              <div className="passport-cover-footer">
                <BookOpen size={18}/>
                <span>{visited} destinations stamped · {continents} continents reached</span>
              </div>
            </div>

            <div className="passport-summary passport-id-page">
              <div className="passport-id-header">
                <div>
                  <p className="eyebrow">TRAVEL IDENTITY</p>
                  <h2>Your world, collected.</h2>
                </div>
                <div className="passport-avatar"><Globe2 size={34}/></div>
              </div>

              <div className="passport-id-fields">
                <div><span>Explorer status</span><strong>{achievement}</strong></div>
                <div><span>Places visited</span><strong>{visited}</strong></div>
                <div><span>Continents</span><strong>{continents}</strong></div>
                <div><span>Favorites</span><strong>{saved.favorites.length}</strong></div>
              </div>

              <div className="passport-progress-block">
                <div className="passport-progress-copy">
                  <span>WORLD DISCOVERY</span>
                  <strong>{Math.round((visited / destinations.length) * 100)}%</strong>
                </div>
                <div className="passport-progress-track">
                  <span style={{ width: `${Math.max(4, (visited / destinations.length) * 100)}%` }} />
                </div>
                <small>{visited} of {destinations.length} destinations collected</small>
              </div>

              <div className="passport-rank-card">
                <Trophy size={22}/>
                <div>
                  <span>Current travel rank</span>
                  <strong>{achievement}</strong>
                </div>
                <Sparkles size={18}/>
              </div>

              <div className="passport-badge-shelf">
                <span className="journey-kicker">EXPLORER BADGES</span>
                <div>
                  <span className={visited >= 1 ? 'earned' : ''}>🍽️ Taste Explorer</span>
                  <span className={visited >= 2 ? 'earned' : ''}>🎭 Culture Hunter</span>
                  <span className={continents >= 2 ? 'earned' : ''}>🌍 Border Crosser</span>
                  <span className={visited >= 5 ? 'earned' : ''}>🏅 World Hopper</span>
                </div>
              </div>

              <div className="passport-lists">
                <div><span>WISHLIST</span><strong>{wishlist.length}</strong><small>places you want to visit</small></div>
                <div><span>TASTE LIST</span><strong>{tasteList.length}</strong><small>dishes you want to try</small></div>
              </div>
            </div>
          </section>

          <section className="passport-scrapbook">
            <div className="passport-book-heading">
              <div><span className="journey-kicker">TRAVEL SCRAPBOOK</span><h2>Little things you collected</h2></div>
              <Camera size={28}/>
            </div>
            <div className="scrapbook-grid">
              {saved.stamps.slice(0,6).map((id) => {
                const d = destinations.find((item) => item.id === id);
                if (!d) return null;
                return <article key={id} style={{backgroundImage:`linear-gradient(180deg,transparent,rgba(5,10,18,.82)),url("${photoMap[id] || fallbackImage(d,d.name)}")`}}>
                  <span>{d.emoji}</span><strong>{d.name}</strong><small>{d.fact}</small>
                </article>;
              })}
            </div>
          </section>

          <section className="passport-book passport-book-premium">
            <div className="passport-book-heading">
              <div>
                <span className="journey-kicker">VISA & STAMP COLLECTION</span>
                <h2>Your travel pages</h2>
                <p>Each discovered place earns a visa-style stamp and becomes part of your world story.</p>
              </div>
              <BadgeCheck size={30}/>
            </div>

            <div className="passport-pages">
              {destinations.map((destination, index) => {
                const earned = saved.stamps.includes(destination.id);
                return (
                  <button
                    className={`passport-visa ${earned ? 'earned' : 'locked'} visa-${index % 4}`}
                    key={destination.id}
                    onClick={() => earned && jumpTo(destination.id)}
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(8,16,28,.45), rgba(8,16,28,.88)), url("${photoMap[destination.id] || fallbackImage(destination, destination.name)}")`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className="visa-topline">
                      <span>{earned ? 'ENTRY APPROVED' : 'NOT YET VISITED'}</span>
                      <span>{destination.emoji}</span>
                    </div>
                    <div className="visa-stamp-art">
                      <span className="visa-photo-chip">
                        <img
                          src={photoMap[destination.id] || fallbackImage(destination, destination.name)}
                          alt={destination.name}
                          loading="lazy"
                          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = fallbackImage(destination, destination.name); }}
                        />
                      </span>
                      <span className="visa-ring">
                        <Globe2 size={24}/>
                        <b>{destination.country.slice(0,3).toUpperCase()}</b>
                      </span>
                    </div>
                    <div className="visa-copy">
                      <small>{destination.continent}</small>
                      <strong>{destination.name}</strong>
                      <span>{destination.country}</span>
                    </div>
                    <div className="visa-footer">
                      <span>{earned ? `STAMP #${String(index + 1).padStart(2,'0')}` : 'LOCKED'}</span>
                      <span>{earned ? 'VALID' : 'EXPLORE TO UNLOCK'}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
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

          <div className="route-ribbon">
            <Route size={20}/>
            <span>{saved.history.slice().reverse().map((id) => destinations.find((d) => d.id === id)?.emoji).filter(Boolean).join('  →  ') || 'Your route will appear here'}</span>
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
