import { Link } from 'react-router'
import { home } from '../data/siteData'
import '../ScrapbookTab.css'

const ScrapbookTab = () => (
  <Link className="scrapbook-tab" to="/scrapbook" aria-label={`Open ${home.scrapbookLabel}`}>
    <span className="scrapbook-tab__tape" aria-hidden="true"></span>
    <span className="scrapbook-tab__kicker">New</span>
    <span className="scrapbook-tab__label">{home.scrapbookLabel}</span>
    <span className="scrapbook-tab__arrow" aria-hidden="true">→</span>
  </Link>
)

export default ScrapbookTab
