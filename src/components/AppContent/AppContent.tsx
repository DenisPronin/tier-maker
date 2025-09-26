import { DndContext, type DragEndEvent, DragOverlay } from '@dnd-kit/core'
import { useState } from 'react'
import { useTierMaker } from '../../contexts/TierMakerContext'
import { animeList } from '../../data/animeList'
import { type Candidate } from '../../types'
import { CandidateCard } from '../CandidateCard'
import { CandidateModal } from '../CandidateModal'
import { CandidatesList } from '../CandidatesList'
import { CategoriesList } from '../CategoriesList'
import { Layout } from '../Layout'

export function AppContent() {
  const { selectedCandidate, closeModal, placeCandidate, removeCandidate } =
    useTierMaker()
  const [activeCandidate, setActiveCandidate] = useState<Candidate | null>(null)

  const handleDragStart = (event: DragEndEvent) => {
    const candidate = animeList.find((c) => c.id.toString() === event.active.id)
    setActiveCandidate(candidate || null)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveCandidate(null)

    if (!over) return

    const candidateId = parseInt(active.id as string)
    const droppableId = over.id as string

    if (droppableId === 'unplaced') {
      removeCandidate(candidateId)
    } else {
      const categoryId = parseInt(droppableId)
      placeCandidate(candidateId, categoryId)
    }
  }

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <Layout>
        <CategoriesList />
        <CandidatesList />

        <DragOverlay
          dropAnimation={null}
          style={{
            cursor: 'grabbing',
          }}
        >
          {activeCandidate && (
            <div style={{
              pointerEvents: 'none'
            }}>
              <CandidateCard candidate={activeCandidate} />
            </div>
          )}
        </DragOverlay>

        {selectedCandidate && (
          <CandidateModal
            candidate={selectedCandidate}
            opened={!!selectedCandidate}
            onClose={closeModal}
          />
        )}
      </Layout>
    </DndContext>
  )
}
