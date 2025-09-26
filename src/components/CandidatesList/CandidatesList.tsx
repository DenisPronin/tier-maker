import { Box, Flex, Title } from '@mantine/core'
import { useDroppable } from '@dnd-kit/core'
import { CandidateCard } from '../CandidateCard'
import { useTierMaker } from '../../contexts/TierMakerContext'

export function CandidatesList() {
  const { getUnplacedCandidates } = useTierMaker()
  const unplacedCandidates = getUnplacedCandidates()
  const { setNodeRef, isOver } = useDroppable({
    id: 'unplaced',
  })

  return (
    <Box mt="xl">
      <Title order={2} mb="md">
        Candidates ({unplacedCandidates.length})
      </Title>
      <Box
        ref={setNodeRef}
        style={{
          backgroundColor: isOver ? 'var(--mantine-color-dark-6)' : 'transparent',
          padding: '16px',
          borderRadius: '8px',
          transition: 'background-color 0.2s ease',
        }}
      >
        <Flex wrap="wrap" gap="16px">
          {unplacedCandidates.map((anime) => (
            <CandidateCard key={anime.id} candidate={anime} />
          ))}
        </Flex>
      </Box>
    </Box>
  )
}