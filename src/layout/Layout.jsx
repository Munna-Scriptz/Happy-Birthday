import { Outlet } from 'react-router'
import HeartTransition from '../components/HeartTransition'

const Layout = () => {
  return (
    <HeartTransition>
      <Outlet />
    </HeartTransition>
  )
}

export default Layout
