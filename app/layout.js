// app/layout.js
import './globals.css'
import Header from '../components/Header'

export const metadata = {
  title: 'My Notes App',
  description: 'A simple note-taking application',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}