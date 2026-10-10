import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'

function RouteScrollBehavior() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const target = hash
      ? document.getElementById(decodeURIComponent(hash.slice(1)))
      : document.querySelector<HTMLElement>('main h1')
    if (!target) return

    const frame = requestAnimationFrame(() => {
      if (hash) target.scrollIntoView({ block: 'start' })
      else window.scrollTo({ top: 0, left: 0, behavior: 'auto' })

      // Keep keyboard reading at the destination without adding a tab stop.
      if (!target.hasAttribute('tabindex')) target.tabIndex = -1
      target.focus({ preventScroll: true })
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <>
      <RouteScrollBehavior />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
