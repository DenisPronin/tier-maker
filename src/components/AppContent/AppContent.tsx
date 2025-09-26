import { Layout } from '../Layout'
import { CategoriesList } from '../CategoriesList'
import { CandidatesList } from '../CandidatesList'
import { CandidateModal } from '../CandidateModal'
import { useTierMaker } from '../../contexts/TierMakerContext'

export function AppContent() {
  const { selectedCandidate, closeModal } = useTierMaker()

  return (
    <Layout>
      <CategoriesList />
      <CandidatesList />

      {selectedCandidate && (
        <CandidateModal
          candidate={selectedCandidate}
          opened={!!selectedCandidate}
          onClose={closeModal}
        />
      )}
    </Layout>
  )
}