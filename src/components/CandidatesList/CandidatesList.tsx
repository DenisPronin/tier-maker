import { Box, Flex, Title } from '@mantine/core'
import { CandidateCard } from '../CandidateCard'
import { useTierMaker } from '../../contexts/TierMakerContext'

export function CandidatesList() {
  const { getUnplacedCandidates } = useTierMaker()
  const unplacedCandidates = getUnplacedCandidates()

  return (
    <Box mt="xl">
      <Title order={2} mb="md">
        Candidates
      </Title>
      <Flex wrap="wrap" gap="16px">
        {unplacedCandidates.map((anime) => (
          <CandidateCard key={anime.id} candidate={anime} />
        ))}
      </Flex>
    </Box>
  )
}