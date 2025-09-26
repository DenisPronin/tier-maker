import { createContext, type ReactNode, useContext, useState } from 'react'
import { animeList } from '../data/animeList'
import { type Candidate } from '../types'

interface TierMakerContextType {
  placements: Record<number, number>
  placeCandidate: (candidateId: number, categoryId: number) => void
  removeCandidate: (candidateId: number) => void
  getCandidatesInCategory: (categoryId: number) => Candidate[]
  getUnplacedCandidates: () => Candidate[]
  openModal: (candidate: Candidate) => void
  closeModal: () => void
  selectedCandidate: Candidate | null
}

const TierMakerContext = createContext<TierMakerContextType | null>(null)

export function TierMakerProvider({ children }: { children: ReactNode }) {
  // placements: { [candidateId]: categoryId }
  const [placements, setPlacements] = useState<Record<number, number>>({})
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)

  const placeCandidate = (candidateId: number, categoryId: number) => {
    setPlacements((prev) => ({ ...prev, [candidateId]: categoryId }))
  }

  const removeCandidate = (candidateId: number) => {
    setPlacements((prev) => {
      const { [candidateId]: removed, ...rest } = prev
      return rest
    })
  }

  const getCandidatesInCategory = (categoryId: number): Candidate[] => {
    return animeList.filter(
      (candidate) => placements[candidate.id] === categoryId
    )
  }

  const getUnplacedCandidates = (): Candidate[] => {
    return animeList.filter((candidate) => !(candidate.id in placements))
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
