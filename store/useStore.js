import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(persist(
  (set) => ({
    // User state
    user: null,
    isLoggedIn: false,

    // Notes state
    notes: [],

    // User actions
    login: (userData) => set({
      user: userData,
      isLoggedIn: true
    }),

    logout: () => set({
      user: null,
      isLoggedIn: false,
      notes: []
    }),

    signup: (userData) => set({
      user: userData,
      isLoggedIn: true
    }),

    // Notes actions
    addNote: (note) => set((state) => ({
      notes: [...state.notes, {
        id: Date.now(),
        title: note.title,
        content: note.content,
        createdAt: new Date().toLocaleDateString()
      }]
    })),

    updateNote: (id, updatedNote) => set((state) => ({
      notes: state.notes.map(note =>
        note.id === id
          ? { ...note, ...updatedNote }
          : note
      )
    })),

    deleteNote: (id) => set((state) => ({
      notes: state.notes.filter(note => note.id !== id)
    })),
  }),
  {
    name: 'zustand-store', // localStorage key
    partialize: (state) => ({
      user: state.user,
      isLoggedIn: state.isLoggedIn,
      notes: state.notes
    }),
  }
))

export default useStore
