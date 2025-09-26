import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { animeList } from '../data/animeList'
import { categories as defaultCategories } from '../data/categories'
import { type Candidate, type Category } from '../types'
import { loadFromStorage, saveToStorage } from '../utils/localStorage'

export type SortType =
  | 'name-asc'
  | 'name-desc'
  | 'year-asc'
  | 'year-desc'
  | 'random'

interface TierMakerContextType {
  categories: Category[]
  placements: Record<number, number[]>
  sortType: SortType
  setSortType: (sortType: SortType) => void
  placeCandidate: (
    candidateId: number,
    categoryId: number,
    index?: number
  ) => void
  removeCandidate: (candidateId: number) => void
  reorderInCategory: (
    categoryId: number,
    fromIndex: number,
    toIndex: number
  ) => void
  getCandidatesInCategory: (categoryId: number) => Candidate[]
  getUnplacedCandidates: () => Candidate[]
  openModal: (candidate: Candidate) => void
  closeModal: () => void
  selectedCandidate: Candidate | null
}

const TierMakerContext = createContext<TierMakerContextType | null>(null)

export function TierMakerProvider({ children }: { children: ReactNode }) {
  // Load initial data from localStorage or use defaults
  const initializeData = () => {
    const saved = loadFromStorage()
    return {
      categories: saved?.categories || defaultCategories,
      placements: saved?.placements || {},
    }
  }

  const initialData = initializeData()
  const [categories] = useState<Category[]>(initialData.categories)
  const [placements, setPlacements] = useState<Record<number, number[]>>(
    initialData.placements
  )
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null
  )
  const [sortType, setSortType] = useState<SortType>('name-asc')
  const [randomSeed, setRandomSeed] = useState<number>(Math.random())

  const handleSetSortType = (newSortType: SortType) => {
    setSortType(newSortType)
    if (newSortType === 'random') {
      setRandomSeed(Math.random())
    }
  }

  // Auto-save to localStorage when data changes
  useEffect(() => {
    saveToStorage({ categories, placements })
  }, [categories, placements])

  const placeCandidate = (
    candidateId: number,
    categoryId: number,
    index?: number
  ) => {
    setPlacements((prev) => {
      const newPlacements = { ...prev }

      // Remove candidate from any existing category
      Object.keys(newPlacements).forEach((catId) => {
        const catIdNum = parseInt(catId)
        newPlacements[catIdNum] =
          newPlacements[catIdNum]?.filter((id) => id !== candidateId) || []
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
      Object.keys(newPlacements).forEach((catId) => {
        const catIdNum = parseInt(catId)
        newPlacements[catIdNum] =
          newPlacements[catIdNum]?.filter((id) => id !== candidateId) || []
      })
      return newPlacements
    })
  }

  const reorderInCategory = (
    categoryId: number,
    fromIndex: number,
    toIndex: number
  ) => {
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
    return candidateIds
      .map((id) => animeList.find((candidate) => candidate.id === id))
      .filter(Boolean) as Candidate[]
  }

  const getUnplacedCandidates = (): Candidate[] => {
    const placedIds = new Set(Object.values(placements).flat())
    const unplaced = animeList.filter(
      (candidate) => !placedIds.has(candidate.id)
    )

    return sortCandidates(unplaced, sortType)
  }

  const sortCandidates = (
    candidates: Candidate[],
    type: SortType
  ): Candidate[] => {
    switch (type) {
      case 'name-asc':
        return [...candidates].sort((a, b) => a.name.localeCompare(b.name))
      case 'name-desc':
        return [...candidates].sort((a, b) => b.name.localeCompare(a.name))
      case 'year-asc':
        return [...candidates].sort((a, b) => a.year - b.year)
      case 'year-desc':
        return [...candidates].sort((a, b) => b.year - a.year)
      case 'random':
        return [...candidates].sort((a, b) => {
          const seedA = (a.id * randomSeed) % 1
          const seedB = (b.id * randomSeed) % 1
          return seedA - seedB
        })
      default:
        return candidates
    }
  }

  const openModal = (candidate: Candidate) => {
    setSelectedCandidate(candidate)
  }

  const closeModal = () => {
    setSelectedCandidate(null)
  }

  const value: TierMakerContextType = {
    categories,
    placements,
    sortType,
    setSortType: handleSetSortType,
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
