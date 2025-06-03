'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useStore from '../../store/useStore'
import styles from '../../styles/Account.module.css'

export default function AccountPage() {
  const { isLoggedIn, user, notes } = useStore()
  const router = useRouter()

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/')
    }
  }, [isLoggedIn, router])

  if (!isLoggedIn) {
    return <div className={styles.loading}>Loading...</div>
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Account Overview</h1>
      <div className={styles.card}>
        <div className={styles.info}>
          <span className={styles.label}>Name:</span>
          <span className={styles.value}>{user?.name || 'User'}</span>
        </div>
        <div className={styles.info}>
          <span className={styles.label}>Email:</span>
          <span className={styles.value}>{user?.email}</span>
        </div>
        <div className={styles.info}>
          <span className={styles.label}>Total Notes:</span>
          <span className={styles.value}>{notes.length}</span>
        </div>
        <div className={styles.info}>
          <span className={styles.label}>Member Since:</span>
          <span className={styles.value}>Today</span>
        </div>
      </div>
    </div>
  )
}
