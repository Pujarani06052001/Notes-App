'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useStore from '../../store/useStore'
import styles from '../../styles/About.module.css'

export default function AboutPage() {
  const { isLoggedIn } = useStore()
  const router = useRouter()

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/')
    }
  }, [isLoggedIn, router])

  if (!isLoggedIn) return <div className={styles.loading}>Loading...</div>

  return (
    <div className={styles.container}>
      <div className={styles.heroSection}>
        <div className={styles.textBlock}>
          <h1 className={styles.title}>Welcome to My Notes App</h1>
          <p className={styles.subtitle}>
            Organize your ideas, tasks, and reminders with ease.
          </p>
          <p className={styles.description}>
            This app is designed to help you capture and manage your thoughts
            quickly and beautifully. It's built using modern technologies like
            <strong> Next.js</strong> and <strong>Zustand</strong> to ensure speed and simplicity.
          </p>
          <ul className={styles.features}>
            <li>Create, edit, and delete notes seamlessly</li>
            <li>Login system for personal note management</li>
            <li>Clean, responsive design for all devices</li>
            <li>Modern user interface and smooth experience</li>
          </ul>
        </div>
        <div className={styles.imageBlock}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYudGB1SyYpNx1CEu65RBO2Fki_qX5gEEcXw&s"
            alt="Notes Illustration"
            className={styles.illustration}
          />
        </div>
      </div>

      <footer className={styles.footer}>
        <p>Built with by Paras Diwakar — 2025</p>
      </footer>
    </div>
  )
}
