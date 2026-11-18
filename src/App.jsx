import { useEffect, useState } from 'react'
import './App.css'
import './LoveLetter.css'
import './BookCanvas.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import Layout from './layout/Layout'
import Home from './pages/Home'
import LoveLetter from './pages/LoveLetter'
import Scrapbook from './pages/Scrapbook'
import Test from './pages/Test'
import OpeningAnimation from './components/OpeningAnimation'

// Fixed presentation timings — not personal data, so they stay out of siteData.js.
const OPENING_TIMINGS = {
  animateOutAtMs: 8400,
  showContentAtMs: 8600,
  hideLoaderAtMs: 9000,
}

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout />}>
    <Route index element={<Home />} />
    <Route path='love-letter' element={<LoveLetter />} />
    <Route path='scrapbook' element={<Scrapbook />} />
    <Route path='test' element={<Test />} />
  </Route>
))

const App = () => {
  const [loading, setLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const [animateOut, setAnimateOut] = useState(false)

  useEffect(() => {
    let timers = []

    const startLoader = () => {
      timers = [
        window.setTimeout(() => setAnimateOut(true), OPENING_TIMINGS.animateOutAtMs),
        window.setTimeout(() => setShowContent(true), OPENING_TIMINGS.showContentAtMs),
        window.setTimeout(() => setLoading(false), OPENING_TIMINGS.hideLoaderAtMs),
      ]
    }

    if (document.readyState === 'complete') {
      startLoader()
    } else {
      window.addEventListener('load', startLoader, { once: true })
    }

    return () => {
      window.removeEventListener('load', startLoader)
      timers.forEach((timer) => window.clearTimeout(timer))
    }
  }, [])

  return (
    <>
      {loading && <OpeningAnimation animateOut={animateOut} />}
      {showContent && <RouterProvider router={router} />}
    </>
  )
}

export default App
