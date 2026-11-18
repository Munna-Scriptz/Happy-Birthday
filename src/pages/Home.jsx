import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import flag from '../assets/1.png'
import balloonOne from '../assets/balloon1.png'
import balloonTwo from '../assets/balloon2.png'
import bottomDecoration from '../assets/decorate.png'
import flowerDecoration from '../assets/decorate_flower.png'
import partyHat from '../assets/hat.png'
import smileyIcon from '../assets/smiley_icon.png'
import BookCanvas from '../components/BookCanvas'
import SmallLetter from '../components/SmallLetter'
import ScrapbookTab from '../components/ScrapbookTab'
import { home, person, sender } from '../data/siteData'

// Fixed presentation values — the whole choreography is sped up with one
// multiplier so the JavaScript and CSS timings stay in sync.
const HOME_SPEED = 0.55
const TITLE_TIMING = {
  happyStartSeconds: 4 * HOME_SPEED,
  birthdayStartSeconds: 5 * HOME_SPEED,
  stepSeconds: 0.2 * HOME_SPEED,
}
const DATE_TYPING_DELAY_MS = 12000 * HOME_SPEED
const DATE_TYPING_INTERVAL_MS = 100 * HOME_SPEED
const DECORATION_START_SECONDS = 15 * HOME_SPEED
const HAPPY_LETTERS = ['H', 'a', 'p', 'p', 'y']
const BIRTHDAY_LETTERS = ['B', 'i', 'r', 't', 'h', 'd', 'a', 'y']

const DateHeart = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <path
      fill="#a31414"
      d="M18.483 16.767A8.5 8.5 0 0 1 8.118 7.081a1 1 0 0 1-.113.097c-.28.213-.63.292-1.33.45l-.635.144c-2.46.557-3.69.835-3.983 1.776c-.292.94.546 1.921 2.223 3.882l.434.507c.476.557.715.836.822 1.18c.107.345.071.717-.001 1.46l-.066.677c-.253 2.617-.38 3.925.386 4.506s1.918.052 4.22-1.009l.597-.274c.654-.302.981-.452 1.328-.452s.674.15 1.329.452l.595.274c2.303 1.06 3.455 1.59 4.22 1.01c.767-.582.64-1.89.387-4.507z"
    />
    <path
      fill="#a31414"
      opacity="0.5"
      d="m9.153 5.408l-.328.588c-.36.646-.54.969-.82 1.182q.06-.045.113-.097a8.5 8.5 0 0 0 10.366 9.686l-.02-.19c-.071-.743-.107-1.115 0-1.46c.107-.344.345-.623.822-1.18l.434-.507c1.677-1.96 2.515-2.941 2.222-3.882c-.292-.941-1.522-1.22-3.982-1.776l-.636-.144c-.699-.158-1.049-.237-1.33-.45c-.28-.213-.46-.536-.82-1.182l-.327-.588C13.58 3.136 12.947 2 12 2s-1.58 1.136-2.847 3.408"
    />
  </svg>
)

const MailHeartIcon = () => (
  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true">
    <path fill="#d13852" d="M63.841 18.646c-.246-3.85-1.072-6.977-3.752-10.198c-5.369-6.439-17.71-7.511-23.23-1.312c-.963.912-1.872 2.01-2.785 3.322l-2.066 2.969l-2.067-2.969c-.916-1.312-1.827-2.411-2.79-3.322C21.627.937 9.287 2.008 3.921 8.448C1.237 11.669.412 14.796.166 18.646C-.184 30.092 8.122 39.257 9.147 40.6c5.637 6.613 11.786 12.866 18.03 18.627c1.13.989 2.106 1.812 3.082 2.628c.587.479 1.166.964 1.749 1.44c.582-.477 1.159-.961 1.743-1.44c.98-.816 1.956-1.639 3.082-2.628c6.247-5.761 12.397-12.01 18.04-18.627c1.025-1.343 9.332-10.508 8.979-21.954" />
    <path fill="#f1a5b1" d="M60.39 16.604a10.1 10.1 0 0 0-.457-2.909a9 9 0 0 0-1.169-2.42c-2.973-4.369-9.451-5.943-14.863-4.837c-2.111.508-4.225 1.302-5.197 3.318c-.331.865.365 1.281 1.44 1.228c3.894-.435 8.202-.043 11.645 1.63c.858.42 1.661.918 2.395 1.503c2.47 1.913 3.537 4.887 4.02 7.837c1.201-.242 1.854-1.683 2.01-2.965a10.5 10.5 0 0 0 .177-2.385" />
  </svg>
)

const EnvelopeIcon = () => (
  <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72" aria-hidden="true">
    <path fill="#fff" d="M65.086 55.5H6.878A2.877 2.877 0 0 1 4 52.623V17.248A2.25 2.25 0 0 1 6.248 15h59.446A2.306 2.306 0 0 1 68 17.306v35.28a2.914 2.914 0 0 1-2.914 2.914" />
    <path fill="#ea5a47" d="M47.064 33.552A5.885 5.885 0 0 0 36 30.755a5.885 5.885 0 0 0-11.064 2.797c0 1.398.49 2.68 1.304 3.69l-.002.002L36 49.342l9.762-12.098l-.003-.002a5.86 5.86 0 0 0 1.305-3.69" />
    <g fill="none" stroke="#000" strokeMiterlimit="10" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M65.086 55.5H6.878A2.877 2.877 0 0 1 4 52.623V17.248A2.25 2.25 0 0 1 6.248 15h59.446A2.306 2.306 0 0 1 68 17.306v35.28a2.914 2.914 0 0 1-2.914 2.914" />
      <path strokeLinecap="round" d="m5 16l15 16m47-16L52 32" />
      <path strokeLinejoin="round" d="M47.064 33.552A5.885 5.885 0 0 0 36 30.755a5.885 5.885 0 0 0-11.064 2.797c0 1.398.49 2.68 1.304 3.69l-.002.002L36 49.342l9.762-12.098l-.003-.002a5.86 5.86 0 0 0 1.305-3.69z" />
    </g>
  </svg>
)

const Home = () => {
  const [letterOpen, setLetterOpen] = useState(true)
  const [typedDate, setTypedDate] = useState('')
  const [dateComplete, setDateComplete] = useState(false)

  useEffect(() => {
    const characters = home.date.split('')
    let index = 0
    let intervalId

    const delayId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        if (index >= characters.length) {
          window.clearInterval(intervalId)
          setDateComplete(true)
          return
        }

        index += 1
        setTypedDate(characters.slice(0, index).join(''))
      }, DATE_TYPING_INTERVAL_MS)
    }, DATE_TYPING_DELAY_MS)

    return () => {
      window.clearTimeout(delayId)
      window.clearInterval(intervalId)
    }
  }, [])

  const renderTitle = (letters, startSeconds) => letters.map((letter, index) => (
    <span key={`${letter}-${index}`} style={{ '--t': `${startSeconds + index * TITLE_TIMING.stepSeconds}s` }}>
      {letter}
    </span>
  ))

  return (
    <>
      <div id="wrapper" style={{ '--home-speed': HOME_SPEED }}>
        <div className="flag__birthday">
          <img src={flag} alt="" width="350" className="flag__left" />
          <img src={flag} alt="" width="350" className="flag__right" />
        </div>

        <div className="content">
          <div className="left">
            <div className="title">
              <h1 className="happy">
                {renderTitle(HAPPY_LETTERS, TITLE_TIMING.happyStartSeconds)}
              </h1>
              <h1 className="birthday">
                {renderTitle(BIRTHDAY_LETTERS, TITLE_TIMING.birthdayStartSeconds)}
              </h1>
              <div className="hat">
                <img src={partyHat} alt="" width="130" />
              </div>
            </div>

            <div className="date__of__birth" aria-label={home.date}>
              {dateComplete && <DateHeart />}
              <span>{typedDate}</span>
              {dateComplete && <DateHeart />}
            </div>

            <div className="btn flex flex-row gap-2 justify-center md:justify-start">
              <button
                onClick={() => setLetterOpen(!letterOpen)}
                id="btn__letter"
                type="button"
                aria-label={home.letterButton}
                className='!px-4'
              >
                <div className="mail flex items-center justify-center gap-2 md:text-[1rem] text-sm">
                  <MailHeartIcon />
                  <span>
                    <span className="btn-prefix">Click Here </span>{person.name}
                  </span>
                </div>
              </button>
              <div id="FromRexon" className='!px-4'>
                <Link to="/love-letter" aria-label={home.notesButton} className="flex items-center gap-2 md:text-[1rem] text-sm">
                  <EnvelopeIcon />
                  <span>
                    <span className="btn-prefix">From </span>{sender.name}
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <div className="right">
            <div className="box__account">
              <div className="image">
                <img src={person.photo} alt={person.photoAlt} />
              </div>
              <div className="name">
                <i className="fa-solid fa-heart" aria-hidden="true"></i>
                <span>{home.greeting}</span>
                <i className="fa-solid fa-heart" aria-hidden="true"></i>
              </div>
              <div className="balloon_one">
                <img width="100px" src={balloonOne} alt="" />
              </div>
              <div className="balloon_two">
                <img width="100px" src={balloonTwo} alt="" />
              </div>
            </div>

            <div className="cricle">
              <div className="text__cricle">
                {['h', 'a', 'p', 'p', 'y', '-', 'b', 'i', 'r', 't', 'h', 'd', 'a', 'y', '-'].map(
                  (char, index) => (
                    <span key={index} style={{ '--i': index + 1 }}>
                      {char}
                    </span>
                  )
                )}
              </div>
              <span className="cricle-center" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    fill="#b10505"
                    d="M12 21s-7.5-4.7-9.6-9A5.6 5.6 0 0 1 12 6.4 5.6 5.6 0 0 1 21.6 12c-2.1 4.3-9.6 9-9.6 9z"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>

        {[1, 2, 3, 4, 5].map((n, index) => (
          <div
            key={n}
            className={`decorate_star star${n}`}
            style={{ '--t': `${DECORATION_START_SECONDS + index * 0.2 * HOME_SPEED}s` }}
          ></div>
        ))}

        <div className="decorate_flower--one" style={{ '--t': `${DECORATION_START_SECONDS}s` }}>
          <img width="20" src={flowerDecoration} alt="" />
        </div>
        <div className="decorate_flower--two" style={{ '--t': `${DECORATION_START_SECONDS + 0.3 * HOME_SPEED}s` }}>
          <img width="20" src={flowerDecoration} alt="" />
        </div>
        <div className="decorate_flower--three" style={{ '--t': `${DECORATION_START_SECONDS + 0.6 * HOME_SPEED}s` }}>
          <img width="20" src={flowerDecoration} alt="" />
        </div>

        <div className="decorate_bottom">
          <img src={bottomDecoration} alt="" width="100" />
        </div>

        <div className="smiley__icon">
          <img src={smileyIcon} alt="" width="100" />
        </div>

        <BookCanvas active={letterOpen} setActive={setLetterOpen} />

        <section className="smallLetter absolute bottom-0 md:bottom-2 md:left-[45%] left-[50%] -translate-x-1/2">
          <SmallLetter />
        </section>
      </div>

      <ScrapbookTab />
    </>
  )
}

export default Home
