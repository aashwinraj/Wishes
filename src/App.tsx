import { useEffect, useRef, useState } from 'react'

type BurstHeart = {
  id: number
  left: string
  delay: string
  duration: string
}

const loveNotes = [
  'You still make my world feel soft, sparkly, and completely ours.',
  'If I had to choose again, I would still choose you in every lifetime.',
  'Every ordinary moment with you turns into my favorite memory.',
]

const memoryButtons = [
  'First cuddle energy',
  'Movie date magic',
  'Forever favorite human',
]

const ambientHearts = Array.from({ length: 14 }, (_, index) => ({
  id: index,
  left: `${4 + index * 7}%`,
  size: `${18 + (index % 4) * 10}px`,
  duration: `${9 + (index % 5)}s`,
  delay: `${(index % 6) * 0.7}s`,
}))

function App() {
  const [noteIndex, setNoteIndex] = useState(0)
  const [envelopeOpen, setEnvelopeOpen] = useState(false)
  const [burstHearts, setBurstHearts] = useState<BurstHeart[]>([])
  const burstTimeoutRef = useRef<number | null>(null)

  useEffect(
    () => () => {
      if (burstTimeoutRef.current !== null) {
        window.clearTimeout(burstTimeoutRef.current)
      }
    },
    [],
  )

  const createHeartBurst = () => {
    const nextNote = (noteIndex + 1) % loveNotes.length
    setNoteIndex(nextNote)

    const batch = Array.from({ length: 12 }, (_, index) => ({
      id: Date.now() + index,
      left: `${18 + index * 5.5}%`,
      delay: `${index * 0.08}s`,
      duration: `${2.9 + (index % 3) * 0.35}s`,
    }))

    setBurstHearts(batch)

    if (burstTimeoutRef.current !== null) {
      window.clearTimeout(burstTimeoutRef.current)
    }

    burstTimeoutRef.current = window.setTimeout(() => setBurstHearts([]), 3600)
  }

  return (
    <main className="page-shell">
      <div className="sky-glow sky-glow-left" />
      <div className="sky-glow sky-glow-right" />

      <div className="ambient-hearts" aria-hidden="true">
        {ambientHearts.map((heart) => (
          <span
            key={heart.id}
            className="heart"
            style={{
              left: heart.left,
              width: heart.size,
              height: heart.size,
              animationDuration: heart.duration,
              animationDelay: heart.delay,
            }}
          />
        ))}
      </div>

      <section className="hero-card">
        <div className="hero-copy">
          <p className="eyebrow">Our sweetest little celebration</p>
          <h1>Happy Anniversary Baby</h1>
          <p className="intro">
            A tiny love-filled page for the person who makes every day softer,
            sillier, warmer, and a whole lot prettier.
          </p>
        </div>

        <div className="cta-row">
          <button type="button" className="primary-button" onClick={createHeartBurst}>
            Make it rain hearts
          </button>
          <button
            type="button"
            className="secondary-button"
            onClick={() => setEnvelopeOpen((open) => !open)}
          >
            {envelopeOpen ? 'Hide love note' : 'Open love note'}
          </button>
        </div>

        <div className="burst-layer" aria-hidden="true">
          {burstHearts.map((heart) => (
            <span
              key={heart.id}
              className="heart burst-heart"
              style={{
                left: heart.left,
                animationDelay: heart.delay,
                animationDuration: heart.duration,
              }}
            />
          ))}
        </div>

        <div className={`envelope ${envelopeOpen ? 'open' : ''}`}>
          <div className="envelope-top" />
          <div className="letter">
            <p className="letter-label">Love note</p>
            <p>{loveNotes[noteIndex]}</p>
          </div>
        </div>
      </section>

      <section className="cartoon-stage" aria-label="Cute anniversary scene">
        <div className="sparkles" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="character bunny bunny-left">
          <div className="ear ear-left" />
          <div className="ear ear-right" />
          <div className="face">
            <span className="eye eye-left" />
            <span className="eye eye-right" />
            <span className="nose" />
            <span className="blush blush-left" />
            <span className="blush blush-right" />
          </div>
          <div className="body">
            <span className="paw paw-left" />
            <span className="paw paw-right" />
          </div>
        </div>

        <div className="love-centerpiece">
          <div className="big-heart" aria-hidden="true" />
          <p>Together is my favorite place.</p>
        </div>

        <div className="character bunny bunny-right">
          <div className="ear ear-left" />
          <div className="ear ear-right" />
          <div className="face">
            <span className="eye eye-left" />
            <span className="eye eye-right" />
            <span className="nose" />
            <span className="blush blush-left" />
            <span className="blush blush-right" />
          </div>
          <div className="body">
            <span className="paw paw-left" />
            <span className="paw paw-right" />
          </div>
        </div>
      </section>

      <section className="memory-board">
        <div>
          <p className="board-kicker">Tap around for extra mush</p>
          <h2>Three tiny reminders from my heart</h2>
        </div>

        <div className="memory-actions">
          {memoryButtons.map((label, index) => (
            <button
              key={label}
              type="button"
              className={index === noteIndex ? 'memory-chip active' : 'memory-chip'}
              onClick={() => setNoteIndex(index)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="quote-card">
          <div className="quote-heart" aria-hidden="true" />
          <p>{loveNotes[noteIndex]}</p>
        </div>
      </section>
    </main>
  )
}

export default App
