'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import useStore from '../store/useStore'
import styles from '../styles/Signup.module.css'

export default function SignupForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signup } = useStore()
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name && email && password) {
      signup({ name, email })
      router.push('/notes')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.imageSide}>
          <h2 className={styles.imageText}>Join Us Today!<br />Create and Manage Your Notes</h2>
        </div>
        <div className={styles.signupBox}>
          <h1 className={styles.title}>Sign Up</h1>
          <p className={styles.subtitle}>Start organizing your thoughts in one place.</p>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
              required
            />
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
            <button type="submit" className={styles.button}>Sign Up</button>
          </form>
          <div className={styles.link}>
            Already have an account? <Link href="/">Login</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
