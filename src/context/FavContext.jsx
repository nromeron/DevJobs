import { createContext, use, useState } from 'react'

const FavoritesContext = createContext(undefined)

export function FavoritesProvider ({ children }) {
  const [favorites, setFavorites] = useState([])

  const addFavorite = (job) => {
    setFavorites((prevFavorites) => [...prevFavorites, job])
  }

  const removeFavorite = (jobId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((job) => job.id !== jobId)
    )
  }

  const isFavorite = (jobId) => {
    return favorites.some((job) => job.id === jobId)
  }

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite
  }

  return (
    <FavoritesContext value={value}>
      {children}
    </FavoritesContext>
  )
}

// The hook is intentionally exported from this context module so consumers
// can access the provider's state through the same API.
// eslint-disable-next-line react-refresh/only-export-components
export function useFavorites() {
  const context = use(FavoritesContext)

  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }

  return context
}