import { useCallback, useEffect, useRef, useState } from 'react'
import { littleLetter, person } from '../data/siteData'
import '../SmallLetter.css'

// Must match the close animation duration in SmallLetter.css.
const CLOSE_ANIMATION_MS = 420

const SmallLetter = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const closeTimer = useRef(0)
  const letterRef = useRef(null)

  const openLetter = () => {
    window.clearTimeout(closeTimer.current)
    setIsClosing(false)
    setIsOpen(true)
  }

  const closeLetter = useCallback(() => {
    if (!isOpen) return

    window.clearTimeout(closeTimer.current)
    setIsOpen(false)
    setIsClosing(true)
    closeTimer.current = window.setTimeout(() => setIsClosing(false), CLOSE_ANIMATION_MS)
  }, [isOpen])

  const toggleLetter = () => {
    if (isOpen) {
      closeLetter()
    } else {
      openLetter()
    }
  }

  useEffect(() => () => window.clearTimeout(closeTimer.current), [])

  useEffect(() => {
    if (!isOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeLetter()
    }

    // Tapping/clicking anywhere outside the letter closes it — no need to find
    // the tiny × button, which is especially handy on phones.
    const handleOutsidePress = (event) => {
      if (letterRef.current && !letterRef.current.contains(event.target)) {
        closeLetter()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('pointerdown', handleOutsidePress)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('pointerdown', handleOutsidePress)
    }
  }, [isOpen, closeLetter])

  const stateClass = isOpen
    ? 'small-rajib-letter--open'
    : isClosing
      ? 'small-rajib-letter--close'
      : ''

  return (
    <div ref={letterRef} className={`small-rajib-letter ${stateClass}`.trim()}>
      <button
        type="button"
        className="small-rajib-envelope"
        onClick={toggleLetter}
        aria-expanded={isOpen}
        aria-controls="small-rajib-paper"
        aria-label={isOpen ? `Close the little letter for ${person.name}` : `Open the little letter for ${person.name}`}
      >
        <span className="small-rajib-flap" aria-hidden="true"></span>

        <span className="small-rajib-envelope-body" aria-hidden="true">
          <span className="small-rajib-postmark">
            <span className="small-rajib-postmark-ring"></span>
            <small>with love</small>
          </span>

          <span className="small-rajib-stamp">
            <img src={littleLetter.stamp} alt="" />
            <span>LOVE</span>
          </span>

          <span className="small-rajib-address">
            <span className="small-rajib-address-to">To</span>
            <strong>{person.name}</strong>
          </span>
        </span>

        <span className="small-rajib-wax" aria-hidden="true">{person.name.charAt(0)}</span>
      </button>

      <article
        className="small-rajib-paper"
        id="small-rajib-paper"
        aria-hidden={!isOpen}
      >
        <span className="small-rajib-paper-texture" aria-hidden="true"></span>

        {isOpen && (
          <button
            type="button"
            className="small-rajib-paper-close"
            onClick={closeLetter}
            aria-label={`Close the little letter for ${person.name}`}
          >
            ×
          </button>
        )}

        <div className="small-rajib-paper-content">
          <p className="small-rajib-greeting">{littleLetter.greeting}</p>

          {littleLetter.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}

          <p className="small-rajib-closing">{littleLetter.closing}</p>
          <p className="small-rajib-signature">{littleLetter.signature}</p>
        </div>
      </article>
    </div>
  )
}

export default SmallLetter
