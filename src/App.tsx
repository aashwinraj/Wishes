import { useMemo, useState } from 'react'

type FloatItem = {
  id: number
  left: string
  delay: string
  duration: string
  size: string
}

const heartBubbles: FloatItem[] = Array.from({ length: 34 }, (_, index) => ({
  id: index,
  left: `${2 + ((index * 17) % 96)}%`,
  delay: `${(index % 8) * 0.45}s`,
  duration: `${6.4 + (index % 6) * 0.7}s`,
  size: `${14 + (index % 5) * 9}px`,
}))

function App() {
  const [giftOpened, setGiftOpened] = useState(false)
  const [letterOpened, setLetterOpened] = useState(false)

  const floatingKisses = useMemo(
    () =>
      Array.from({ length: 10 }, (_, index) => ({
        id: index,
        left: `${8 + index * 8.6}%`,
        top: `${12 + (index % 4) * 18}%`,
        delay: `${index * 0.55}s`,
        duration: `${7.8 + (index % 3) * 1.1}s`,
        rotation: `${-16 + (index % 5) * 8}deg`,
        hue: ['#ff84a8', '#ff5d7d', '#ff9abb', '#d93561'][index % 4],
      })),
    [],
  )

  const prompt = !giftOpened
    ? 'Click the gift box'
    : !letterOpened
      ? 'Click the envelope to open your love letter'
      : 'Happy 5 year anniversary baby'

  return (
    <main className="page-shell">
      <div className="veil veil-left" />
      <div className="veil veil-right" />

      <div className="bubble-layer" aria-hidden="true">
        {heartBubbles.map((heart) => (
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
        {floatingKisses.map((kiss) => (
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
        <header className="hero-copy">
          <p className="eyebrow">A tiny surprise for my favorite person</p>
          <h1>Happy Anniversary Baby</h1>
          <p className="intro">
            One little present, one little envelope, and one very big forever kind of love.
          </p>
        </header>

        <section className="interactive-stage">
          <div className={`rose-cluster rose-left ${giftOpened ? 'active' : ''}`} aria-hidden="true">
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

          <div className={`dove-group dove-left ${giftOpened ? 'active' : ''}`} aria-hidden="true">
            <div className="dove">
              <span className="dove-wing wing-back" />
              <span className="dove-body" />
              <span className="dove-wing wing-front" />
              <span className="dove-head" />
              <span className="dove-beak" />
            </div>
          </div>

          <div className="center-scene">
            <div className="halo-ring halo-one" />
            <div className="halo-ring halo-two" />

            <div className={`plush-row ${giftOpened ? 'active' : ''}`} aria-hidden="true">
              <div className="plush teddy-bear">
                <span className="bear-ear bear-ear-left" />
                <span className="bear-ear bear-ear-right" />
                <span className="bear-head">
                  <span className="bear-eye bear-eye-left" />
                  <span className="bear-eye bear-eye-right" />
                  <span className="bear-snout" />
                </span>
                <span className="bear-body">
                  <span className="bear-paw bear-paw-left" />
                  <span className="bear-paw bear-paw-right" />
                </span>
              </div>

              <div className="plush panda-bear">
                <span className="bear-ear bear-ear-left" />
                <span className="bear-ear bear-ear-right" />
                <span className="bear-head">
                  <span className="panda-patch panda-patch-left" />
                  <span className="panda-patch panda-patch-right" />
                  <span className="bear-eye bear-eye-left" />
                  <span className="bear-eye bear-eye-right" />
                  <span className="bear-snout" />
                </span>
                <span className="bear-body">
                  <span className="bear-paw bear-paw-left" />
                  <span className="bear-paw bear-paw-right" />
                </span>
              </div>
            </div>

            <button
              type="button"
              className={`gift-box ${giftOpened ? 'opened' : ''}`}
              onClick={() => {
                setGiftOpened(true)
                setLetterOpened(false)
              }}
              aria-label="Open gift box"
            >
              <span className="gift-lid" />
              <span className="gift-ribbon-vertical" />
              <span className="gift-ribbon-horizontal" />
              <span className="gift-bow bow-left" />
              <span className="gift-bow bow-right" />
              <span className="gift-box-base" />
            </button>

            <button
              type="button"
              className={`envelope-stage ${giftOpened ? 'visible' : ''} ${letterOpened ? 'open' : ''}`}
              onClick={() => {
                if (giftOpened) {
                  setLetterOpened(true)
                }
              }}
              aria-label="Open envelope"
            >
              <span className="envelope-shadow" />
              <span className="envelope-back" />
              <span className="envelope-flap" />
              <span className="envelope-front" />
              <span className="wax-seal" />
              <span className="letter-sheet">
                <span className="letter-title">To My Baby</span>
                <span className="letter-message">
                  Happy 5 year anniversary baby. Thank you for being my safest place, my sweetest smile,
                  and my forever favorite love story.
                </span>
              </span>
            </button>

            <div className={`petal-burst ${giftOpened ? 'active' : ''}`} aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>

          <div className={`dove-group dove-right ${giftOpened ? 'active' : ''}`} aria-hidden="true">
            <div className="dove">
              <span className="dove-wing wing-back" />
              <span className="dove-body" />
              <span className="dove-wing wing-front" />
              <span className="dove-head" />
              <span className="dove-beak" />
            </div>
          </div>

          <div className={`rose-cluster rose-right ${giftOpened ? 'active' : ''}`} aria-hidden="true">
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

        <footer className="prompt-panel">
          <div className={`prompt-badge ${giftOpened ? 'glow' : ''}`}>{prompt}</div>
        </footer>
      </div>
    </main>
  )
}

export default App
