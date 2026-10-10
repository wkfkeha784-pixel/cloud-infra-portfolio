import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Projects', href: '/#projects' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Contact', href: '/#contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header" onKeyDown={(event) => {
      if (event.key === 'Escape' && open) {
        setOpen(false)
        event.currentTarget.querySelector<HTMLButtonElement>('.menu-button')?.focus()
      }
    }}>
      <div className="container header-inner">
        <Link className="brand" to="/" aria-label="박희철 포트폴리오 홈" onClick={() => setOpen(false)}>
          PH<span>.</span>
        </Link>

        <button
          className="menu-button"
          type="button"
          aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
          aria-controls="main-navigation"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          ☰
        </button>

        <nav id="main-navigation" className={`nav ${open ? 'is-open' : ''}`} aria-label="주요 메뉴">
          <NavLink to="/" onClick={() => setOpen(false)}>
            Home
          </NavLink>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
          <a
            href="https://github.com/wkfkeha784-pixel"
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
          >
            GitHub
          </a>
          <a className="button button-small" href="mailto:wkfkeha784@gmail.com" onClick={() => setOpen(false)}>
            Email
          </a>
        </nav>
      </div>
    </header>
  )
}
