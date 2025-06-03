// app/page.js
'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useStore from '../store/useStore'
import LoginForm from '../components/LoginForm'

export default function Home() {
  const { isLoggedIn } = useStore()
  const router = useRouter()

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/notes')
    }
  }, [isLoggedIn, router])

  return <LoginForm />
}