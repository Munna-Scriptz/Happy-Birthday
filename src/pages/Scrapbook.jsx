import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import confetti from 'canvas-confetti'
import { memories, person, reasons, scrapbook, timeline, wishes } from '../data/siteData'
import '../Scrapbook.css'

/* --------------------------------------------------------------------------
 * Fixed artwork + copy. Personal content lives in src/data/siteData.js.
 * ------------------------------------------------------------------------ */

const TAPE = [
  '/stickers/tape-1.webp',
  '/stickers/tape-2.webp',
  '/stickers/tape-3.webp',
  '/stickers/tape-4.webp',
  '/stickers/tape-5.webp',
  '/stickers/tape-6.webp',
  '/stickers/tape-7.webp',
]

const MEMORY_STICKERS = [
  '/stickers/sticker-4.webp',
  '/stickers/sticker-2.webp',
  '/stickers/sticker-1.webp',
  '/stickers/sticker-5.webp',
  '/stickers/sticker-6.webp',
  '/stickers/sticker-3.webp',
]

const TIMELINE_STICKERS = [
  '/stickers/sticker-6.webp',
  '/stickers/sticker-5.webp',
  '/stickers/sticker-2.webp',
  '/stickers/sticker-4.webp',
  '/stickers/sticker-1.webp',
]

const MEMORY_ROTATIONS = [-3, 2.4, -1.6, 3, -2.2, 1.8]
const STICKER_ROTATIONS = [-6, 4, -3, 6, -5, 3, -2, 5]

const STICKER_WALL = [
  { src: '/stickers/sticker-1.webp', caption: 'A rose for you' },
  { src: '/stickers/sticker-2.webp', caption: 'One gold star' },
  { src: '/stickers/sticker-3.webp', caption: 'Pressed flowers' },
  { src: '/stickers/sticker-4.webp', caption: 'Paper heart' },
  { src: '/stickers/sticker-5.webp', caption: 'A blue butterfly' },
  { src: '/stickers/sticker-6.webp', caption: 'Lavender, just because' },
  { src: '/stickers/cat-hugging.webp', caption: 'The two of us' },
  { src: '/stickers/cat-glasses.webp', caption: 'Main-character energy' },
]

const NAV_ITEMS = [
  { id: 'memories', label: 'Memories' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'reasons', label: 'Reasons' },
  { id: 'wish-jar', label: 'Wish Jar' },
  { id: 'sticker-wall', label: 'Stickers' },
]

const SECTIONS = {
  memories: {
    kicker: '01 — The archive',
    title: 'Memories worth keeping',
    subtitle: 'Pinned crooked on purpose, because perfect is boring.',
  },
  timeline: {
    kicker: '02 — How we got here',
    title: 'A timeline of little miracles',
    subtitle: 'One line, a thousand tiny moments that led to today.',
  },
  reasons: {
    kicker: '03 — The why',
    title: 'Reasons you are impossible to forget',
    subtitle: 'Tap a card. There is more love hiding on the other side.',
  },
  wishJar: {
    kicker: '04 — Make a wish',
    title: 'The birthday wish jar',
    subtitle: 'Draw a wish, close your eyes, and let the universe do the rest.',
    button: 'Draw a wish',
    buttonAgain: 'Draw another wish',
    ariaLabel: 'Draw a birthday wish',
  },
  stickers: {
    kicker: '05 — The sticker wall',
    title: 'A few more things I saved for you',
    subtitle: 'Flowers, stars, butterflies, and two cats who clearly know what love is.',
  },
}

const HEART_PATH = 'M12 21s-7.2-4.6-9.4-9C.9 8.2 3 4 7 4c2 0 3.4 1.1 5 3 1.6-1.9 3-3 5-3 4 0 6.1 4.2 4.4 8-2.2 4.4-9.4 9-9.4 9z'

const ReasonIcon = ({ name }) => {
  const icons = {
    smile: (
      <>
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="9" cy="10" r="1.15" fill="currentColor" />
        <circle cx="15" cy="10" r="1.15" fill="currentColor" />
        <path d="M8.4 14.4c.9 1.7 2.1 2.6 3.6 2.6s2.7-.9 3.6-2.6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
    star: <path d="M12 2.6l2.9 5.9 6.5.95-4.7 4.6 1.1 6.5L12 17.5l-5.8 3.05 1.1-6.5-4.7-4.6 6.5-.95z" fill="currentColor" />,
    heart: <path d={HEART_PATH} fill="currentColor" />,
    flower: (
      <>
        <circle cx="12" cy="7" r="3" fill="currentColor" opacity="0.85" />
        <circle cx="17" cy="11" r="3" fill="currentColor" opacity="0.85" />
        <circle cx="15" cy="17" r="3" fill="currentColor" opacity="0.85" />
        <circle cx="9" cy="17" r="3" fill="currentColor" opacity="0.85" />
        <circle cx="7" cy="11" r="3" fill="currentColor" opacity="0.85" />
        <circle cx="12" cy="12" r="2.2" fill="currentColor" />
      </>
    ),
    butterfly: (
      <>
        <path d="M12 11c-1.5-3.6-4.3-6-6.6-5.4C3 6.2 3.4 10 5.3 12.3c1.2 1.4 3.4 2 5 1.2" fill="currentColor" opacity="0.85" />
        <path d="M12 11c1.5-3.6 4.3-6 6.6-5.4 2.4.6 2 4.4.1 6.7-1.2 1.4-3.4 2-5 1.2" fill="currentColor" opacity="0.85" />
        <path d="M12 10.5v6.2" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </>
    ),
    sparkle: (
      <>
        <path d="M12 2.5c.7 4.5 2.3 6.1 6.8 6.8-4.5.7-6.1 2.3-6.8 6.8-.7-4.5-2.3-6.1-6.8-6.8 4.5-.7 6.1-2.3 6.8-6.8z" fill="currentColor" />
        <path d="M18.4 15.4c.35 2.2 1.15 3 3.35 3.35-2.2.35-3 1.15-3.35 3.35-.35-2.2-1.15-3-3.35-3.35 2.2-.35 3-1.15 3.35-3.35z" fill="currentColor" opacity="0.7" />
      </>
    ),
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {icons[name] ?? icons.heart}
    </svg>
  )
}

const SectionHeading = ({ id, kicker, title, subtitle }) => (
  <header className="scrapbook-heading" data-reveal>
    <p className="scrapbook-kicker">{kicker}</p>
    <h2 id={id}>{title}</h2>
    <p className="scrapbook-subtitle">{subtitle}</p>
  </header>
)


const WishJar = () => (
  <svg className="wish-jar__svg" viewBox="0 0 220 300" role="img" aria-label="A glass jar full of birthday wishes">
    <defs>
      <linearGradient id="jarGlass" x1="0" x2="1">
        <stop offset="0" stopColor="#ffffff" stopOpacity="0.85" />
        <stop offset="0.5" stopColor="#fdf2e2" stopOpacity="0.5" />
        <stop offset="1" stopColor="#e7c6b4" stopOpacity="0.72" />
      </linearGradient>
      <linearGradient id="jarLid" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#cf9665" />
        <stop offset="1" stopColor="#8a5734" />
      </linearGradient>
      <clipPath id="jarClip">
        <path d="M60 66h100c6 0 10 5 10 11v168c0 13-11 24-24 24H74c-13 0-24-11-24-24V77c0-6 4-11 10-11z" />
      </clipPath>
    </defs>

    <ellipse cx="110" cy="284" rx="64" ry="9" fill="rgba(90,50,40,.13)" />
    <rect x="70" y="32" width="80" height="22" rx="8" fill="url(#jarLid)" />
    <rect x="76" y="51" width="68" height="8" rx="4" fill="#a9744a" />
    <path
      className="wish-jar__glass"
      d="M60 66h100c6 0 10 5 10 11v168c0 13-11 24-24 24H74c-13 0-24-11-24-24V77c0-6 4-11 10-11z"
      fill="url(#jarGlass)"
      stroke="#d8b8a0"
      strokeWidth="2"
    />
    <path d="M56 96h108" stroke="rgba(255,255,255,.85)" strokeWidth="3" strokeLinecap="round" />

    <g clipPath="url(#jarClip)">
      {/* Floating hearts */}
      {[
        [72, 200, "#e98a94", "0s"],
        [104, 236, "#d9b36c", "-1.1s"],
        [138, 196, "#b45a67", "-2.3s"],
        [86, 152, "#c98fa8", "-0.6s"],
        [134, 140, "#e98a94", "-1.7s"],
        [110, 112, "#d9b36c", "-2.8s"],
        [148, 232, "#f1f0c3", "-0.3s"],
        [78, 250, "#fff6e5", "-1.4s"],
      ].map(([x, y, color, delay], i) => (
        <g
          key={i}
          className="wish-jar__heart"
          style={{ "--d": delay, "--i": i }}
          transform={`translate(${x} ${y})`}
        >
          <path
            d="M0 10C-7 4-12 0-9-5c2-3 6-2 9 2 3-4 7-5 9-2 3 5-2 9-9 15z"
            fill={color}
          />
        </g>
      ))}

      {/* Twinkling sparkles */}
      {[
        [91, 130, 2],
        [151, 148, 2.5],
        [116, 170, 1.8],
        [70, 180, 2],
        [155, 205, 1.8],
        [94, 220, 2.5],
        [125, 250, 1.7],
        [83, 238, 1.5],
        [143, 116, 1.8],
        [105, 95, 1.5],
      ].map(([x, y, size], i) => (
        <g
          key={i}
          className="wish-jar__sparkle"
          style={{ "--d": `${i * -0.35}s` }}
          transform={`translate(${x} ${y})`}
        >
          <path
            d={`M0 ${-size * 2} L${size * 0.5} ${-size * 0.5} L${size * 2} 0 L${size * 0.5} ${size * 0.5} L0 ${size * 2} L${-size * 0.5} ${size * 0.5} L${-size * 2} 0 L${-size * 0.5} ${-size * 0.5}Z`}
            fill="#fff3c4"
          />
        </g>
      ))}

      {/* Tiny glowing dots */}
      {[
        [82, 115], [145, 180], [105, 195],
        [160, 245], [66, 215], [120, 130],
      ].map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r="1.5"
          fill="#fff"
          className="wish-jar__glow"
          style={{ "--d": `${i * -0.5}s` }}
        />
      ))}
    </g>

    <path d="M64 88c0-3 2-5 5-5" fill="none" stroke="rgba(255,255,255,.9)" strokeWidth="3" strokeLinecap="round" />
    <path d="M158 128c2 25 2 72-1 108" fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="5" strokeLinecap="round" />
  </svg>
);


const Scrapbook = () => {
  const [flippedCards, setFlippedCards] = useState(() => new Set())
  const [wishIndex, setWishIndex] = useState(-1)
  const [wishKey, setWishKey] = useState(0)
  const [jarShaking, setJarShaking] = useState(false)
  const shakeTimer = useRef(0)

  useEffect(() => {
    const revealNodes = Array.from(document.querySelectorAll('.scrapbook [data-reveal]'))

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' })

    revealNodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  useEffect(() => () => window.clearTimeout(shakeTimer.current), [])

  const toggleReason = (index) => {
    setFlippedCards((previous) => {
      const next = new Set(previous)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  const drawWish = () => {
    if (wishes.length === 0) return

    let nextIndex = Math.floor(Math.random() * wishes.length)
    if (wishes.length > 1 && nextIndex === wishIndex) {
      nextIndex = (nextIndex + 1) % wishes.length
    }

    setWishIndex(nextIndex)
    setWishKey((key) => key + 1)
    setJarShaking(true)
    window.clearTimeout(shakeTimer.current)
    shakeTimer.current = window.setTimeout(() => setJarShaking(false), 700)

    
  }

  const wishButtonLabel = wishIndex === -1 ? SECTIONS.wishJar.button : SECTIONS.wishJar.buttonAgain

  return (
    <main className="scrapbook">
      <div className="scrapbook-grain" aria-hidden="true"></div>

      <div className="scrapbook-bar">
        <Link className="scrapbook-back" to="/">
          <span aria-hidden="true">←</span> Back home
        </Link>
        <span className="scrapbook-bar__note">For {person.name} · {person.birthday}</span>
      </div>

      <header className="scrapbook-hero">
        <div className="scrapbook-hero__copy">
          <p className="scrapbook-eyebrow">A little archive of us</p>
          <h1 className="scrapbook-title">
            <span>Our</span>
            <em>Scrapbook</em>
            <svg className="scrapbook-title__underline" viewBox="0 0 420 26" preserveAspectRatio="none" aria-hidden="true">
              <path d="M4 17C88 5 176 25 416 10" pathLength="1" />
            </svg>
          </h1>
          <p className="scrapbook-intro">{scrapbook.intro}</p>

          <nav className="scrapbook-nav" aria-label="Scrapbook sections">
            {NAV_ITEMS.map((item) => (
              <a key={item.id} className="scrapbook-nav__link" href={`#${item.id}`}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="scrapbook-hero__collage" aria-hidden="true">
          <svg className="hero-heart" viewBox="0 0 320 280">
            <path
              d="M160 252C96 204 24 146 24 86 24 46 55 18 92 18c28 0 51 15 68 42 17-27 40-42 68-42 37 0 68 28 68 68 0 60-72 118-136 166z"
              pathLength="1"
            />
          </svg>
          <div className="hero-photo">
            <img src={person.photo} alt="" />
          </div>
          <img className="hero-tape" src={TAPE[0]} alt="" />
          <img className="hero-sticker hero-sticker--rose" src="/stickers/sticker-1.webp" alt="" />
          <img className="hero-sticker hero-sticker--cat" src="/stickers/cat-glasses.webp" alt="" />
          <img className="hero-sticker hero-sticker--butterfly" src="/stickers/sticker-5.webp" alt="" />
          <span className="hero-scribble">for you, always</span>
        </div>
      </header>

      <section className="scrapbook-section" aria-labelledby="memories-title">
        <span id="memories" className="scrapbook-anchor" aria-hidden="true"></span>
        <SectionHeading id="memories-title" {...SECTIONS.memories} />

        <div className="memory-grid">
          {memories.map((memory, index) => (
            <div
              className="memory-cell"
              key={`${memory.title}-${index}`}
              data-reveal
              style={{ '--delay': `${index * 70}ms` }}
            >
              <figure
                className="memory-card"
                style={{ '--rotate': `${MEMORY_ROTATIONS[index % MEMORY_ROTATIONS.length]}deg` }}
              >
                <img className="memory-tape" src={TAPE[index % TAPE.length]} alt="" aria-hidden="true" />
                <img
                  className="memory-sticker"
                  src={MEMORY_STICKERS[index % MEMORY_STICKERS.length]}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                />
                <div className="memory-photo">
                  <img
                    src={memory.image}
                    alt={memory.imageAlt}
                    style={{ objectFit: memory.imageFit }}
                    loading="lazy"
                  />
                </div>
                <figcaption>
                  <span className="memory-date">{memory.date}</span>
                  <h3>{memory.title}</h3>
                  <p>{memory.caption}</p>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </section>

      <section className="scrapbook-section scrapbook-section--timeline" aria-labelledby="timeline-title">
        <span id="timeline" className="scrapbook-anchor" aria-hidden="true"></span>
        <SectionHeading id="timeline-title" {...SECTIONS.timeline} />

        <div className="timeline" data-reveal>
          <svg className="timeline-spine" viewBox="0 0 40 1000" preserveAspectRatio="none" aria-hidden="true">
            <path className="timeline-spine__path" d="M20 0C8 170 32 330 20 500s12 330 0 500" pathLength="1" />
          </svg>

          <ol className="timeline-list">
            {timeline.map((item, index) => (
              <li
                className={`timeline-item${item.highlight ? ' is-highlight' : ''}`}
                key={`${item.title}-${index}`}
                style={{ '--delay': `${index * 90}ms` }}
                data-reveal
              >
                <span className="timeline-node" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d={HEART_PATH} />
                  </svg>
                </span>
                <div className="timeline-card">
                  <span className="timeline-date">{item.date}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
                <img
                  className="timeline-sticker"
                  src={TIMELINE_STICKERS[index % TIMELINE_STICKERS.length]}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                />
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="scrapbook-section" aria-labelledby="reasons-title">
        <span id="reasons" className="scrapbook-anchor" aria-hidden="true"></span>
        <SectionHeading id="reasons-title" {...SECTIONS.reasons} />

        <div className="reason-grid">
          {reasons.map((reason, index) => {
            const isFlipped = flippedCards.has(index)

            return (
              <div
                className={`reason-card${isFlipped ? ' is-flipped' : ''}`}
                key={reason.front}
                data-reveal
                style={{ '--delay': `${index * 60}ms` }}
              >
                <button
                  type="button"
                  className="reason-card__button"
                  onClick={() => toggleReason(index)}
                  aria-pressed={isFlipped}
                  aria-label={`${reason.front}. ${isFlipped ? reason.back : 'Reveal the note'}`}
                >
                  <span className="reason-card__inner">
                    <span className="reason-card__face reason-card__front">
                      <span className="reason-card__icon">
                        <ReasonIcon name={['smile', 'star', 'heart', 'flower', 'butterfly', 'sparkle'][index % 6]} />
                      </span>
                      <span className="reason-card__title">{reason.front}</span>
                      <span className="reason-card__hint">Tap to open</span>
                    </span>
                    <span className="reason-card__face reason-card__back">
                      <span className="reason-card__quote" aria-hidden="true">“</span>
                      <span className="reason-card__text">{reason.back}</span>
                      <span className="reason-card__hint">Tap to close</span>
                    </span>
                  </span>
                </button>
              </div>
            )
          })}
        </div>
      </section>

      <section className="scrapbook-section scrapbook-section--wish" aria-labelledby="wish-jar-title">
        <span id="wish-jar" className="scrapbook-anchor" aria-hidden="true"></span>
        <SectionHeading id="wish-jar-title" {...SECTIONS.wishJar} />

        <div className="wish-layout">
          <div className={`wish-jar${jarShaking ? ' is-shaking' : ''}`} data-reveal aria-hidden="true">
            <WishJar />
          </div>

          <div className="wish-panel" data-reveal style={{ '--delay': '120ms' }}>
            <span className="wish-panel__tape" aria-hidden="true">
              <img src={TAPE[3]} alt="" />
            </span>

            {wishIndex === -1 ? (
              <p className="wish-slip wish-slip--empty">The jar is full of tiny wishes. Pick one.</p>
            ) : (
              <p className="wish-slip" key={wishKey}>
                <span className="wish-slip__quote" aria-hidden="true">“</span>
                {wishes[wishIndex]}
              </p>
            )}

            <button type="button" className="wish-button" onClick={drawWish} aria-label={SECTIONS.wishJar.ariaLabel}>
              {wishButtonLabel}
            </button>

            <span className="wish-count">{wishes.length} little wishes inside</span>
          </div>
        </div>
      </section>

      <section className="scrapbook-section" aria-labelledby="sticker-wall-title">
        <span id="sticker-wall" className="scrapbook-anchor" aria-hidden="true"></span>
        <SectionHeading id="sticker-wall-title" {...SECTIONS.stickers} />

        <div className="sticker-wall" data-reveal>
          {STICKER_WALL.map((sticker, index) => (
            <figure
              className="sticker-tile"
              key={sticker.src}
              style={{ '--rotate': `${STICKER_ROTATIONS[index % STICKER_ROTATIONS.length]}deg` }}
            >
              <img src={sticker.src} alt="" loading="lazy" />
              <figcaption>{sticker.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <footer className="scrapbook-footer">
        <p>{scrapbook.footer}</p>
        <Link to="/" className="scrapbook-footer__link">Back home <span aria-hidden="true">→</span></Link>
      </footer>
    </main>
  )
}

export default Scrapbook
