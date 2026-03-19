import { useEffect, useRef, useState } from 'react'

type FloatItem = {
  id: number
  left: string
  delay: string
  duration: string
  size: string
}

type KissItem = {
  id: number
  left: string
  top: string
  delay: string
  duration: string
  rotation: string
  hue: string
}

const loveNotes = [
  'You are still my favorite hello, my calm place, and my cutest forever.',
  'Every little thing feels softer and sweeter because I get to share it with you.',
  'Happy anniversary baby. I would choose your heart in every timeline.',
]

const noteLabels = ['Sweetest hello', 'Warmest cuddle', 'Forever us']

const bubbleHearts: FloatItem[] = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: `${4 + index * 5.2}%`,
  delay: `${(index % 6) * 0.65}s`,
  duration: `${7.8 + (index % 5) * 0.9}s`,
  size: `${18 + (index % 4) * 10}px`,
}))

const driftingKisses: KissItem[] = Array.from({ length: 12 }, (_, index) => ({
  id: index,
  left: `${6 + index * 7.7}%`,
  top: `${10 + (index % 4) * 19}%`,
  delay: `${index * 0.55}s`,
  duration: `${8.4 + (index % 3) * 1.2}s`,
  rotation: `${-18 + (index % 5) * 9}deg`,
  hue: ['#ff7b9c', '#ff5c7b', '#ff97b8', '#f1486e'][index % 4],
}))

function App() {
  const [noteIndex, setNoteIndex] = useState(0)
  const [burstHearts, setBurstHearts] = useState<FloatItem[]>([])
  const [burstKisses, setBurstKisses] = useState<KissItem[]>([])
  const timeoutRef = useRef<number | null>(null)

  useEffect(
    () => () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current)
      }
    },
    [],
  )

  const triggerLoveStorm = () => {
    const nextIndex = (noteIndex + 1) % loveNotes.length
    setNoteIndex(nextIndex)

    const heartBatch: FloatItem[] = Array.from({ length: 14 }, (_, index) => ({
      id: Date.now() + index,
      left: `${18 + index * 4.5}%`,
      delay: `${index * 0.07}s`,
      duration: `${2.6 + (index % 4) * 0.28}s`,
      size: `${20 + (index % 3) * 10}px`,
    }))

    const kissBatch: KissItem[] = Array.from({ length: 8 }, (_, index) => ({
      id: Date.now() + 100 + index,
      left: `${12 + index * 10}%`,
      top: `${58 - (index % 3) * 8}%`,
      delay: `${index * 0.08}s`,
      duration: `${2.3 + (index % 3) * 0.22}s`,
      rotation: `${-25 + index * 7}deg`,
      hue: ['#ff8aa7', '#ff5d7a', '#ff7292', '#d92d58'][index % 4],
    }))

    setBurstHearts(heartBatch)
    setBurstKisses(kissBatch)

    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = window.setTimeout(() => {
      setBurstHearts([])
      setBurstKisses([])
    }, 3200)
  }

  return (
    <main className="page-shell">
      <div className="veil veil-left" />
      <div className="veil veil-right" />

      <div className="bubble-layer" aria-hidden="true">
        {bubbleHearts.map((heart) => (
          <span
            key={heart.id}
            className="bubble-heart"
            style={{
              left: heart.left,
              width: heart.size,
              height: heart.size,
              animationDelay: heart.delay,
              animationDuration: heart.duration,
            }}
          />
        ))}
      </div>

      <div className="kiss-layer" aria-hidden="true">
        {driftingKisses.map((kiss) => (
          <span
            key={kiss.id}
            className="kiss-mark"
            style={{
              left: kiss.left,
              top: kiss.top,
              animationDelay: kiss.delay,
              animationDuration: kiss.duration,
              ['--kiss-rotation' as string]: kiss.rotation,
              color: kiss.hue,
            }}
          />
        ))}
      </div>

      <div className="viewport-frame">
        <section className="top-copy">
          <p className="eyebrow">For my baby, with extra mush</p>
          <h1>Happy Anniversary Baby</h1>
          <p className="intro">
            A full-screen little love world with roses, kisses, heart bubbles,
            and all the soft dramatic romance you asked for.
          </p>
        </section>

        <section className="main-stage" aria-label="Anniversary scene">
          <div className="rose-column rose-column-left" aria-hidden="true">
            <div className="rose rose-large">
              <span className="petal petal-a" />
              <span className="petal petal-b" />
              <span className="petal petal-c" />
              <span className="petal petal-d" />
              <span className="rose-core" />
              <span className="stem" />
              <span className="leaf leaf-left" />
              <span className="leaf leaf-right" />
            </div>
            <div className="rose rose-small">
              <span className="petal petal-a" />
              <span className="petal petal-b" />
              <span className="petal petal-c" />
              <span className="petal petal-d" />
              <span className="rose-core" />
              <span className="stem" />
              <span className="leaf leaf-left" />
              <span className="leaf leaf-right" />
            </div>
          </div>

          <div className="center-stage">
            <div className="sparkles" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>

            <div className="storm-layer" aria-hidden="true">
              {burstHearts.map((heart) => (
                <span
                  key={heart.id}
                  className="bubble-heart burst-heart"
                  style={{
                    left: heart.left,
                    width: heart.size,
                    height: heart.size,
                    animationDelay: heart.delay,
                    animationDuration: heart.duration,
                  }}
                />
              ))}

              {burstKisses.map((kiss) => (
                <span
                  key={kiss.id}
                  className="kiss-mark kiss-burst"
                  style={{
                    left: kiss.left,
                    top: kiss.top,
                    animationDelay: kiss.delay,
                    animationDuration: kiss.duration,
                    ['--kiss-rotation' as string]: kiss.rotation,
                    color: kiss.hue,
                  }}
                />
              ))}
            </div>

            <div className="couple-stage">
              <div className="bunny">
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

              <div className="heart-core">
                <div className="big-heart" />
                <div className="halo-ring halo-one" />
                <div className="halo-ring halo-two" />
                <p>Together is my favorite place</p>
              </div>

              <div className="bunny bunny-right">
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
            </div>
          </div>

          <div className="rose-column rose-column-right" aria-hidden="true">
            <div className="rose rose-small">
              <span className="petal petal-a" />
              <span className="petal petal-b" />
              <span className="petal petal-c" />
              <span className="petal petal-d" />
              <span className="rose-core" />
              <span className="stem" />
              <span className="leaf leaf-left" />
              <span className="leaf leaf-right" />
            </div>
            <div className="rose rose-large">
              <span className="petal petal-a" />
              <span className="petal petal-b" />
              <span className="petal petal-c" />
              <span className="petal petal-d" />
              <span className="rose-core" />
              <span className="stem" />
              <span className="leaf leaf-left" />
              <span className="leaf leaf-right" />
            </div>
          </div>
        </section>

        <section className="bottom-panel">
          <div className="cta-row">
            <button type="button" className="primary-button" onClick={triggerLoveStorm}>
              Shower me with love
            </button>
            <div className="memory-actions">
              {noteLabels.map((label, index) => (
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
          </div>

          <div className="note-card">
            <div className="mini-kiss" aria-hidden="true" />
            <p>{loveNotes[noteIndex]}</p>
          </div>
        </section>
      </div>
    </main>
  )
}

export default App
