import { Box, Flex, Title } from '@mantine/core'
import { CandidateCard } from '../CandidateCard'
import { animeList } from '../../data/animeList'

export function CandidatesList() {
  return (
    <Box mt="xl">
      <Title order={2} mb="md">
        Candidates
      </Title>
      <Flex wrap="wrap" gap="16px">
        {animeList.map((anime) => (
          <CandidateCard key={anime.id} candidate={anime} />
        ))}
      </Flex>
    </Box>
  )
}