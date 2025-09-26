import { Box, Flex, Title } from '@mantine/core'
import { useState } from 'react'
import { CandidateCard } from '../CandidateCard'
import { CandidateModal } from '../CandidateModal'
import { useTierMaker } from '../../contexts/TierMakerContext'
import { type Candidate } from '../../types'

export function CandidatesList() {
  const { getUnplacedCandidates } = useTierMaker()
  const unplacedCandidates = getUnplacedCandidates()
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)

  const handleOpenModal = (candidate: Candidate) => {
    setSelectedCandidate(candidate)
  }

  const handleCloseModal = () => {
    setSelectedCandidate(null)
  }

  return (
    <Box mt="xl">
      <Title order={2} mb="md">
        Candidates
      </Title>
      <Flex wrap="wrap" gap="16px">
        {unplacedCandidates.map((anime) => (
          <CandidateCard key={anime.id} candidate={anime} onOpenModal={handleOpenModal} />
        ))}
      </Flex>

      {selectedCandidate && (
        <CandidateModal
          candidate={selectedCandidate}
          opened={!!selectedCandidate}
          onClose={handleCloseModal}
        />
      )}
    </Box>
  )
}