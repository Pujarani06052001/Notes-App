'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import useStore from '../store/useStore'
import styles from '../styles/Header.module.css'

export default function Header() {
  const { isLoggedIn, logout } = useStore()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  if (!isLoggedIn) return null

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logoArea}>
          <Link href="/notes" className={styles.logo}>📝 My Notes</Link>
          <button
            className={`${styles.hamburger} ${isOpen ? styles.active : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <ul className={`${styles.navLinks} ${isOpen ? styles.showMenu : ''}`}>
          <li onClick={toggleMenu}><Link href="/notes" className={styles.navLink}>Notes</Link></li>
          <li onClick={toggleMenu}><Link href="/about" className={styles.navLink}>About</Link></li>
          <li onClick={toggleMenu}><Link href="/account" className={styles.navLink}>Account</Link></li>
          <li>
            <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  )
}