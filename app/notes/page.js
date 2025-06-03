'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useStore from '../../store/useStore'
import styles from '../../styles/Notes.module.css'

export default function NotesPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const { isLoggedIn, notes, addNote, updateNote, deleteNote, user } = useStore()
  const router = useRouter()

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/')
    }
  }, [isLoggedIn, router])

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 18) return 'Good Afternoon'
    return 'Good Evening'
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title && content) {
      if (editingId) {
        updateNote(editingId, { title, content })
        setEditingId(null)
      } else {
        addNote({ title, content })
      }
      setTitle('')
      setContent('')
      setShowForm(false)
    }
  }

  const handleEdit = (note) => {
    setTitle(note.title)
    setContent(note.content)
    setEditingId(note.id)
    setShowForm(true)
  }

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this note?')) {
      deleteNote(id)
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
    setTitle('')
    setContent('')
    setShowForm(false)
  }

  if (!isLoggedIn) {
    return <div>Loading...</div>
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.greeting}>
        {getGreeting()}, {user?.name || 'User'}
      </h2>
      <h1 className={styles.title}>My Notes</h1>

      {showForm && (
        <div className={styles.addNoteSection}>
          <h2 className={styles.subtitle}>{editingId ? 'Edit Note' : 'Add New Note'}</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Note Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.input}
              required
            />
            <textarea
              placeholder="Note Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={styles.textarea}
              required
            />
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" className={styles.addBtn}>
                {editingId ? 'Update Note' : 'Add Note'}
              </button>
              <button type="button" onClick={cancelEdit} className={styles.deleteBtn}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {notes.length === 0 ? (
        <div className={styles.emptyState}>
          No notes yet. Click the + button to add one!
        </div>
      ) : (
        <div className={styles.notesGrid}>
          {notes.map((note) => (
            <div key={note.id} className={styles.noteCard}>
              <h3 className={styles.noteTitle}>{note.title}</h3>
              <p className={styles.noteContent}>{note.content}</p>
              <p className={styles.noteDate}>Created: {note.createdAt}</p>
              <div className={styles.noteActions}>
                <button 
                  onClick={() => handleEdit(note)}
                  className={styles.editBtn}
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(note.id)}
                  className={styles.deleteBtn}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <button 
        className={styles.fab} 
        onClick={() => setShowForm(!showForm)}
        aria-label="Add Note"
      >
        +
      </button>
    </div>
  )
}
