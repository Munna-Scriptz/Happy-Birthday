import { useRef, useState } from 'react'
import heartArtwork from '../assets/heart.png'
import { loveNotes, person, sender } from '../data/siteData'

// Fixed visual values — not personal data.
const FALLING_HEART_COUNT = 12
const FALLING_HEART_OFFSETS = [
  '1%', '10%', '20%', '30%', '40%', '50%',
  '60%', '70%', '80%', '90%', '15%', '75%',
]

const LoveLetter = () => {
  const [openEnvelope, setOpenEnvelope] = useState(false)
  const [letters, setLetters] = useState(() => loveNotes.map((msg, index) => ({
    id: index + 1,
    name: sender.name,
    msg,
  })))
  const zIndexCounter = useRef(10)

  const handleDragStart = (event) => {
    if (event.button !== 0) return
    if (event.target.closest('button, a, input, textarea')) return

    const letterEl = event.currentTarget
    const rect = letterEl.getBoundingClientRect()
    const offsetX = event.clientX - rect.left
    const offsetY = event.clientY - rect.top
    const startLeft = rect.left + window.scrollX
    const startTop = rect.top + window.scrollY

    letterEl.style.transform = 'none'
    letterEl.classList.remove('-translate-x-1/2', '-translate-y-1/2')
    letterEl.style.position = 'absolute'
    letterEl.style.left = `${startLeft}px`
    letterEl.style.top = `${startTop}px`
    letterEl.style.margin = '0'
    letterEl.style.zIndex = String(zIndexCounter.current)
    zIndexCounter.current += 1

    const onPointerMove = (moveEvent) => {
      letterEl.style.left = `${moveEvent.clientX - offsetX}px`
      letterEl.style.top = `${moveEvent.clientY - offsetY}px`
    }

    const onPointerUp = () => {
      document.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerup', onPointerUp)
      document.removeEventListener('pointercancel', onPointerUp)
    }

    document.addEventListener('pointermove', onPointerMove)
    document.addEventListener('pointerup', onPointerUp)
    document.addEventListener('pointercancel', onPointerUp)
  }

  const handleCloseLetter = (id) => {
    setLetters((previous) => previous.filter((letter) => letter.id !== id))
  }

  return (
    <main className="munna bg-[#8b0000] h-screen w-full overflow-hidden">
      <section className="munna cssletter z-10">
        <div className={`envelope ${openEnvelope ? 'active' : ''}`}>
          <button
            type="button"
            className="munna heart"
            id="openEnvelope"
            aria-label={`Open ${sender.name}'s letter for ${person.name}`}
            onClick={() => setOpenEnvelope(true)}
          >
            <span className="munna heart-text">Open</span>
          </button>
          <div className="munna envelope-flap text-black relative">
            <div className="munna absolute left-1/2 top-[20%] -translate-x-1/2 flex items-center justify-center flex-col md:gap-y-2">
              <span className="munna font-sriracha md:text-2xl text-lg">Envelope Of Love</span>
              <span className="munna font-dancingScript md:text-3xl text-xl">Dear {person.name}</span>
            </div>
          </div>
          <div className="munna envelope-folds">
            <div className="munna envelope-left"></div>
            <div className="munna envelope-right"></div>
            <div className="munna envelope-bottom"></div>
          </div>
        </div>

        <div className="munna letters">
          {letters.map((letter) => (
            <blockquote
              key={letter.id}
              className="munna letter center -translate-x-1/2 -translate-y-1/2"
              tabIndex={0}
              aria-label={`Note from ${letter.name}`}
              style={{ position: 'absolute', top: '50%', left: '50%', transform: 'none' }}
              onPointerDown={handleDragStart}
            >
              <button
                type="button"
                className="munna closeLetter"
                title={`Close ${letter.name}'s letter`}
                aria-label={`Close ${letter.name}'s letter`}
                onClick={() => handleCloseLetter(letter.id)}
              >
                Close {letter.name}'s letter
              </button>
              <p>{letter.msg}</p>
              <cite>{letter.name}</cite>
            </blockquote>
          ))}
        </div>
      </section>

      <div className="munna heart-container absolute top-[20%] md:left-20 left-6" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="munna heartBeating md:w-[150px] w-[110px] h-[200px]">
          <path
            d="M471.7 73.6c-54.5-46.4-136-38.3-186.4 15.8L256 120.6l-29.3-31.2C176.3 35.3 94.8 27.2 40.3 73.6-18 125.4-13.3 221 43 273.7l187.3 177.6a24 24 0 0032.4 0L469 273.7c56.3-52.8 61-148.3 2.7-200.1z"
            fill="#b10505"
          />
        </svg>
      </div>
      <div className="munna heart-container absolute bottom-[10%] md:right-20 right-6 rotate-180" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="munna heartBeating md:w-[150px] w-[110px] h-[200px]">
          <path
            d="M471.7 73.6c-54.5-46.4-136-38.3-186.4 15.8L256 120.6l-29.3-31.2C176.3 35.3 94.8 27.2 40.3 73.6-18 125.4-13.3 221 43 273.7l187.3 177.6a24 24 0 0032.4 0L469 273.7c56.3-52.8 61-148.3 2.7-200.1z"
            fill="#b10505"
          />
        </svg>
      </div>

      <div className="munna snowflakes z-0" aria-hidden="true">
        {Array.from({ length: FALLING_HEART_COUNT }, (_, index) => (
          <div
            className="munna snowflake"
            key={index}
            style={{ left: FALLING_HEART_OFFSETS[index % FALLING_HEART_OFFSETS.length] }}
          >
            <img src={heartArtwork} width="25" alt="" />
          </div>
        ))}
      </div>
    </main>
  )
}

export default LoveLetter
