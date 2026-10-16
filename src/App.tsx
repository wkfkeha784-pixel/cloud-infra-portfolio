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

  // React Router does not re-run the [pathname, hash] effect when a user
  // activates the exact same anchor. Handle that reactivation separately,
  // without creating a duplicate history entry.
  useEffect(() => {
    const handleSameHashClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href]') : null
      if (!link) return

      const destination = new URL(link.href, window.location.href)
      if (
        !destination.hash ||
        destination.origin !== window.location.origin ||
        destination.pathname !== window.location.pathname ||
        destination.search !== window.location.search ||
        destination.hash !== window.location.hash
      ) return

      const target = document.getElementById(decodeURIComponent(destination.hash.slice(1)))
      if (!target) return

      // Stop Link from pushing the same URL again; restore reading position
      // for both pointer clicks and keyboard Enter.
      event.preventDefault()
      event.stopPropagation()
      requestAnimationFrame(() => {
        target.scrollIntoView({ block: 'start' })
        if (!target.hasAttribute('tabindex')) target.tabIndex = -1
        target.focus({ preventScroll: true })
      })
    }

    document.addEventListener('click', handleSameHashClick, true)
    return () => document.removeEventListener('click', handleSameHashClick, true)
  }, [])

  return null
}

export default function App() {
  return (
    <>
      <RouteScrollBehavior />
      <a className="skip-link" href="#main-content">본문으로 건너뛰기</a>
      <Header />
      <main id="main-content" tabIndex={-1}>
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
