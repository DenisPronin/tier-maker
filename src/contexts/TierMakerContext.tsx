import { createContext, type ReactNode, useContext, useState } from 'react'
import { animeList } from '../data/animeList'
import { type Candidate } from '../types'

interface TierMakerContextType {
  placements: Record<number, number[]>
  placeCandidate: (candidateId: number, categoryId: number, index?: number) => void
  removeCandidate: (candidateId: number) => void
  reorderInCategory: (categoryId: number, fromIndex: number, toIndex: number) => void
  getCandidatesInCategory: (categoryId: number) => Candidate[]
  getUnplacedCandidates: () => Candidate[]
  openModal: (candidate: Candidate) => void
  closeModal: () => void
  selectedCandidate: Candidate | null
}

const TierMakerContext = createContext<TierMakerContextType | null>(null)

export function TierMakerProvider({ children }: { children: ReactNode }) {
  // placements: { [categoryId]: candidateId[] }
  const [placements, setPlacements] = useState<Record<number, number[]>>({})
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)

  const placeCandidate = (candidateId: number, categoryId: number, index?: number) => {
    setPlacements((prev) => {
      const newPlacements = { ...prev }

      // Remove candidate from any existing category
      Object.keys(newPlacements).forEach(catId => {
        const catIdNum = parseInt(catId)
        newPlacements[catIdNum] = newPlacements[catIdNum]?.filter(id => id !== candidateId) || []
      })

      // Add to new category
      if (!newPlacements[categoryId]) {
        newPlacements[categoryId] = []
      }

      if (index !== undefined) {
        newPlacements[categoryId].splice(index, 0, candidateId)
      } else {
        newPlacements[categoryId].push(candidateId)
      }

      return newPlacements
    })
  }

  const removeCandidate = (candidateId: number) => {
    setPlacements((prev) => {
      const newPlacements = { ...prev }
      Object.keys(newPlacements).forEach(catId => {
        const catIdNum = parseInt(catId)
        newPlacements[catIdNum] = newPlacements[catIdNum]?.filter(id => id !== candidateId) || []
      })
      return newPlacements
    })
  }

  const reorderInCategory = (categoryId: number, fromIndex: number, toIndex: number) => {
    setPlacements((prev) => {
      const newPlacements = { ...prev }
      if (!newPlacements[categoryId]) return prev

      const categoryItems = [...newPlacements[categoryId]]
      const [movedItem] = categoryItems.splice(fromIndex, 1)
      categoryItems.splice(toIndex, 0, movedItem)

      newPlacements[categoryId] = categoryItems
      return newPlacements
    })
  }

  const getCandidatesInCategory = (categoryId: number): Candidate[] => {
    const candidateIds = placements[categoryId] || []
    return candidateIds.map(id => animeList.find(candidate => candidate.id === id)).filter(Boolean) as Candidate[]
  }

  const getUnplacedCandidates = (): Candidate[] => {
    const placedIds = new Set(
      Object.values(placements).flat()
    )
    return animeList.filter(candidate => !placedIds.has(candidate.id))
  }

  const openModal = (candidate: Candidate) => {
    setSelectedCandidate(candidate)
  }

  const closeModal = () => {
    setSelectedCandidate(null)
  }

  const value: TierMakerContextType = {
    placements,
    placeCandidate,
    removeCandidate,
    reorderInCategory,
    getCandidatesInCategory,
    getUnplacedCandidates,
    openModal,
    closeModal,
    selectedCandidate,
  }

  return (
    <TierMakerContext.Provider value={value}>
      {children}
    </TierMakerContext.Provider>
  )
}

export function useTierMaker() {
  const context = useContext(TierMakerContext)
  if (!context) {
    throw new Error('useTierMaker must be used within a TierMakerProvider')
  }
  return context
}
