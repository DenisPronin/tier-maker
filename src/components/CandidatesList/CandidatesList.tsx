import { Box, Flex, Title, Group, Select } from '@mantine/core'
import { useDroppable } from '@dnd-kit/core'
import { CandidateCard } from '../CandidateCard'
import { useTierMaker, type SortType } from '../../contexts/TierMakerContext'

export function CandidatesList() {
  const { getUnplacedCandidates, sortType, setSortType } = useTierMaker()
  const unplacedCandidates = getUnplacedCandidates()
  const { setNodeRef, isOver } = useDroppable({
    id: 'unplaced',
  })

  const sortOptions = [
    { value: 'name-asc', label: 'По имени (А-Я)' },
    { value: 'name-desc', label: 'По имени (Я-А)' },
    { value: 'year-asc', label: 'По году (старые)' },
    { value: 'year-desc', label: 'По году (новые)' },
    { value: 'random', label: 'Случайно' },
  ]

  return (
    <Box mt="xl">
      <Group justify="space-between" mb="md">
        <Title order={2}>
          Candidates ({unplacedCandidates.length})
        </Title>
        <Select
          data={sortOptions}
          value={sortType}
          onChange={(value) => setSortType(value as SortType)}
          w={180}
          size="sm"
        />
      </Group>
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