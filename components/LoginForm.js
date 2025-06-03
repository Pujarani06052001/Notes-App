'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import useStore from '../store/useStore'
import styles from '../styles/Login.module.css'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { isLoggedIn, login } = useStore()
  const router = useRouter()

  // Prevent hydration mismatch
  const [hasHydrated, setHasHydrated] = useState(false)
  useEffect(() => {
    setHasHydrated(true)
  }, [])

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/notes') // replaces URL to prevent going "back" to login
    }
  }, [isLoggedIn, router])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email && password) {
      login({ email, name: email.split('@')[0] })
      // router.replace('/notes') will happen automatically in useEffect
    }
  }

  // Wait for hydration before rendering to avoid flicker
  if (!hasHydrated) return null

  // Don't show form if already logged in (for safety)
  if (isLoggedIn) return null

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.imageSide}>
          <h2 className={styles.imageText}>
            Welcome Back!
            <br />
            Start Your Note Journey
          </h2>
        </div>
        <div className={styles.loginBox}>
          <h1 className={styles.title}>Login</h1>
          <p className={styles.subtitle}>
            Access your smart notes anytime, anywhere.
          </p>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
            />
            <button type="submit" className={styles.button}>
              Login
            </button>
          </form>
          <div className={styles.link}>
            Don't have an account? <Link href="/signup">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
